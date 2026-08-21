import axios from 'axios';
import { overfastClient } from './overfastClient.js';

export interface MapMeta {
  key: string;
  name: string;
  gamemodes: string[];
  screenshot: string;
}

// 오버워치 경쟁전(역할 고정)은 이 다섯 모드로만 진행된다. 나머지(격돌·데스매치·깃발 뺏기·연습장·
// 워크샵 등)는 아케이드 전용이라 애초에 후보에서 뺀다.
const COMPETITIVE_GAMEMODES = new Set(['control', 'escort', 'hybrid', 'push', 'flashpoint']);

// 나무위키 등 커뮤니티 자료로 확인한 공식(또는 통용) 한글 명칭. 확인 못 한 맵은 임의로 지어내지
// 않고 영문 키를 사람이 읽기 좋은 형태로만 바꿔서 보여준다.
const MAP_NAME_KO: Record<string, string> = {
  'antarctic-peninsula': '남극 반도',
  busan: '부산',
  ilios: '일리오스',
  'lijiang-tower': '리장 타워',
  nepal: '네팔',
  oasis: '오아시스',
  samoa: '사모아',
  'blizzard-world': '블리자드 월드',
  eichenwalde: '아이헨발데',
  hollywood: '할리우드',
  'kings-row': '왕의 길',
  midtown: '미드타운',
  'neon-junction': '네온 교차로',
  numbani: '눔바니',
  paraiso: '파라이수',
  'circuit-royal': '서킷 로얄',
  dorado: '도라도',
  havana: '하바나',
  junkertown: '정크타운',
  rialto: '리알토',
  'route-66': '66번 국도',
  'shambali-monastery': '샴발리 수도원',
  'watchpoint-gibraltar': '감시 기지: 지브롤터',
  colosseo: '콜로세오',
  esperanca: '이스페란사',
  'new-queen-street': '뉴 퀸 스트리트',
  'redwood-dam': '레드우드 제방',
  runasapi: '루나사피',
  aatlis: '아틀리스',
  'new-junk-city': '뉴 정크 시티',
  suravasa: '수라바사',
};

// OverFast가 아직 스크린샷을 못 올린 맵(대개 갓 출시된 신규 맵)에 한해, 우리가 직접 받아둔
// 인게임 로딩 화면 이미지를 프론트(frontend/public/maps)에서 대신 서빙한다.
const SCREENSHOT_OVERRIDES: Record<string, string> = {
  'neon-junction': '/maps/neon-junction.jpg',
};

let mapsCache: MapMeta[] | null = null;
let inflight: Promise<MapMeta[]> | null = null;

function toDisplayName(key: string): string {
  if (MAP_NAME_KO[key]) return MAP_NAME_KO[key];
  return key
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

// OverFast /maps의 gamemodes 태그만으로는 스타디움 전용 맵(예: wuxing-university, place-lacroix,
// gogadoro, arena-victoriae)을 걸러내지 못한다 — 태그상 control/push 등으로 찍혀 있지만 실제로는
// 일반 경쟁전에서 플레이할 수 없어 /heroes/stats에 넘기면 400이 난다. 그래서 후보군을 실제
// /heroes/stats 엔드포인트에 한 번씩 찔러봐서 진짜로 데이터가 나오는 맵만 남긴다.
// 확실히 "호환 안 됨"이라고 응답한 400만 제외 사유로 삼는다. 그 외 오류(레이트리밋 등, 이미
// overfastClient가 재시도까지 했는데도 실패한 경우)는 맵이 실제로 못 쓰는지 알 수 없으니,
// 멀쩡한 맵을 오판해서 빼는 것보다는 일단 포함해 두는 쪽이 안전하다.
async function isPlayableInCompetitive(mapKey: string): Promise<boolean> {
  try {
    await overfastClient.get('/heroes/stats', {
      params: { platform: 'pc', gamemode: 'competitive', region: 'asia', map: mapKey },
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      return false;
    }
    return true;
  }
}

const VALIDATION_BATCH_SIZE = 5;

// 검증 요청을 한꺼번에 다 쏘면 OverFast 레이트리밋에 걸리기 쉬워, 작은 묶음 단위로 나눠서 순차 처리한다.
async function filterPlayableMaps<T extends { key: string }>(candidates: T[]): Promise<T[]> {
  const playable: T[] = [];
  for (let i = 0; i < candidates.length; i += VALIDATION_BATCH_SIZE) {
    const batch = candidates.slice(i, i + VALIDATION_BATCH_SIZE);
    const results = await Promise.all(batch.map((map) => isPlayableInCompetitive(map.key)));
    batch.forEach((map, index) => {
      if (results[index]) playable.push(map);
    });
  }
  return playable;
}

async function fetchMaps(): Promise<MapMeta[]> {
  const { data } = await overfastClient.get<{ key: string; gamemodes: string[]; screenshot: string }[]>('/maps');
  const candidates = data.filter((map) => map.gamemodes.some((mode) => COMPETITIVE_GAMEMODES.has(mode)));
  const playable = await filterPlayableMaps(candidates);

  return playable.map((map) => ({
    key: map.key,
    name: toDisplayName(map.key),
    gamemodes: map.gamemodes.filter((mode) => COMPETITIVE_GAMEMODES.has(mode)),
    screenshot: SCREENSHOT_OVERRIDES[map.key] ?? map.screenshot,
  }));
}

export async function getCompetitiveMaps(): Promise<MapMeta[]> {
  if (mapsCache) return mapsCache;
  if (!inflight) {
    inflight = fetchMaps()
      .then((maps) => {
        mapsCache = maps;
        return maps;
      })
      .catch((error) => {
        inflight = null;
        throw error;
      });
  }
  return inflight;
}
