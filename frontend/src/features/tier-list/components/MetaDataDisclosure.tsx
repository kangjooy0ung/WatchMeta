import { Info } from 'lucide-react';
import { HERO_RATES_CHECKED_AT, HERO_RATES_SOURCE_URL } from '../data/heroRates';
import { TIER_SIZE_RATIO } from '../data/tierList';

const TIER_LABEL_ORDER: Array<keyof typeof TIER_SIZE_RATIO> = ['S', 'A', 'B', 'C', 'D'];

export function MetaDataDisclosure() {
  return (
    <details className="group rounded-xl border border-outline-variant bg-surface-container p-3 text-on-surface-variant open:pb-4">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-on-surface-variant marker:content-none">
        <Info className="h-3.5 w-3.5 shrink-0" />
        이 데이터는 어떻게 계산되나요?
      </summary>
      <div className="mt-3 space-y-2 text-xs leading-relaxed">
        <p>
          <span className="font-semibold text-on-surface">출처·수집 시각</span>
          {' — '}
          <a
            href={HERO_RATES_SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-primary"
          >
            블리자드 공식 승률 통계 페이지
          </a>
          를 {HERO_RATES_CHECKED_AT} 기준으로 확인해 반영했어요. 실시간 자동 갱신이 아니라 수동 스냅샷이라, 이후 변동은
          바로 반영되지 않을 수 있어요.
        </p>
        <p>
          <span className="font-semibold text-on-surface">픽률·승률 기준</span>
          {' — '}
          PC 플랫폼, 역할 고정 경쟁전 기준이며, 선택한 서버·랭크 필터별로 값이 달라져요.
        </p>
        <p>
          <span className="font-semibold text-on-surface">티어 산정 기준</span>
          {' — '}
          승률과 픽률을 각각 정규화해 5:5로 합산한 점수로 영웅을 줄 세운 뒤, 상위{' '}
          {TIER_LABEL_ORDER.map((tier, i) => (
            <span key={tier}>
              {i > 0 && ' · '}
              {tier}티어 {Math.round(TIER_SIZE_RATIO[tier] * 100)}%
            </span>
          ))}
          로 구간을 나눠요.
        </p>
        <p className="text-on-surface-variant/70">
          표본 수(경기 수)는 출처 페이지가 공개하지 않아 이 화면에서도 제공하지 않아요.
        </p>
      </div>
    </details>
  );
}
