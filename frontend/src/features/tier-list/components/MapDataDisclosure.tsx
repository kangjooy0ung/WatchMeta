import { Info } from 'lucide-react';
import { LOW_SAMPLE_PICK_RATE_THRESHOLD } from '../data/tierList';

function formatUpdatedAgo(seconds: number | null): string {
  if (seconds === null) return '갱신 시점 확인 불가';
  if (seconds < 60) return '방금 갱신';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `약 ${minutes}분 전 갱신`;
  const hours = Math.floor(minutes / 60);
  return `약 ${hours}시간 전 갱신`;
}

interface MapDataDisclosureProps {
  updatedSecondsAgo: number | null;
}

export function MapDataDisclosure({ updatedSecondsAgo }: MapDataDisclosureProps) {
  return (
    <details className="group rounded-xl border border-outline-variant bg-surface-container p-3 text-on-surface-variant open:pb-4">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-on-surface-variant marker:content-none">
        <Info className="h-3.5 w-3.5 shrink-0" />
        이 데이터는 어떻게 계산되나요? · {formatUpdatedAgo(updatedSecondsAgo)}
      </summary>
      <div className="mt-3 space-y-2 text-xs leading-relaxed">
        <p>
          <span className="font-semibold text-on-surface">출처·갱신</span>
          {' — '}
          블리자드 공식 통계를 반영하는{' '}
          <a
            href="https://overfast-api.tekrop.fr/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-primary"
          >
            OverFast API
          </a>
          를 실시간에 가깝게 조회합니다. 다만 출처가 정확한 집계 시각·기간을 공개하지 않아, 위 문구는
          "이 응답이 캐시된 지 얼마나 됐는지"만 보여줍니다. 실제 반영 시점은 이보다 더 최근일 수 있습니다.
        </p>
        <p>
          <span className="font-semibold text-on-surface">맵 이름 표기</span>
          {' — '}
          한글 공식 명칭이 확인된 것은 한글로, 확인되지 않은 것은 영문으로 표시합니다. PC · 경쟁전(역할 고정)
          기준입니다.
        </p>
        <p>
          <span className="font-semibold text-on-surface">표본 신뢰도</span>
          {' — '}
          출처가 실제 표본 수(경기 수)를 공개하지 않아 정확한 값은 제공하지 못합니다. 대신 픽률을 대리 지표로
          삼아 픽률 {LOW_SAMPLE_PICK_RATE_THRESHOLD}% 미만은 '표본 적음', 5% 미만은 '표본 주의' 배지를 붙여
          승률이 표본 변동에 흔들리기 쉬운 영웅이라는 걸 알려드립니다.
        </p>
        <p>
          <span className="font-semibold text-on-surface">종합 추천 정렬</span>
          {' — '}
          밴률 데이터는 맵 단위로 제공되지 않아, 승률 60% · 픽률 40% 비중으로 정규화해 합산한 점수로
          정렬합니다. 픽률이 아주 낮은 영웅이 승률만으로 과대평가되는 걸 줄이기 위함입니다.
        </p>
      </div>
    </details>
  );
}
