import { MatchHistoryItem } from '../../features/player-profile/components/MatchHistoryItem';
import type { MatchHistoryItem as MatchHistoryItemType } from '../../types/player';

interface MatchesTabProps {
  battleTag: string;
}

const HOUR = 1000 * 60 * 60;

const MOCK_MATCHES: MatchHistoryItemType[] = [
  {
    matchId: 'm1',
    map: '하나무라',
    result: 'win',
    heroId: 'genji',
    heroName: '겐지',
    role: 'damage',
    playedAt: new Date(Date.now() - HOUR * 0.5).toISOString(),
  },
  {
    matchId: 'm2',
    map: '리알토',
    result: 'win',
    heroId: 'ana',
    heroName: '아나',
    role: 'support',
    playedAt: new Date(Date.now() - HOUR * 3).toISOString(),
  },
  {
    matchId: 'm3',
    map: '왕의 길',
    result: 'loss',
    heroId: 'reinhardt',
    heroName: '라인하르트',
    role: 'tank',
    playedAt: new Date(Date.now() - HOUR * 20).toISOString(),
  },
  {
    matchId: 'm4',
    map: '아이헨발데',
    result: 'win',
    heroId: 'tracer',
    heroName: '트레이서',
    role: 'damage',
    playedAt: new Date(Date.now() - HOUR * 27).toISOString(),
  },
  {
    matchId: 'm5',
    map: '오아시스',
    result: 'draw',
    heroId: 'mercy',
    heroName: '메르시',
    role: 'support',
    playedAt: new Date(Date.now() - HOUR * 50).toISOString(),
  },
];

// TODO: usePlayerProfile(battleTag) 연동의 매치 목록으로 교체 예정 - 현재는 Mock Data
export function MatchesTab({ battleTag: _battleTag }: MatchesTabProps) {
  return (
    <div className="flex flex-col gap-2">
      {MOCK_MATCHES.map((match) => (
        <MatchHistoryItem key={match.matchId} match={match} />
      ))}
    </div>
  );
}
