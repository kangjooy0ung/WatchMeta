import { Info } from 'lucide-react';
import { HERO_RATES_CHECKED_AT, HERO_RATES_SOURCE_URL } from '../data/heroRates';
import { LOW_SAMPLE_PICK_RATE_THRESHOLD, META_SCORE_WEIGHTS, TIER_SIZE_RATIO } from '../data/tierList';

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
          를 {HERO_RATES_CHECKED_AT} 기준으로 확인해 반영했습니다. 실시간 자동 갱신이 아니라 수동 스냅샷이라,
          이후 변동은 바로 반영되지 않을 수 있습니다.
        </p>
        <p>
          <span className="font-semibold text-on-surface">픽률·승률 기준</span>
          {' — '}
          PC 플랫폼, 역할 고정 경쟁전 기준이며, 선택한 서버·랭크 필터별로 값이 달라집니다.
        </p>
        <p>
          <span className="font-semibold text-on-surface">티어 산정 기준</span>
          {' — '}
          승률·픽률·밴률을 각각 정규화해 승률 {Math.round(META_SCORE_WEIGHTS.winRate * 100)}% · 픽률{' '}
          {Math.round(META_SCORE_WEIGHTS.pickRate * 100)}% · 밴률 {Math.round(META_SCORE_WEIGHTS.banRate * 100)}%
          비중으로 합산한 점수로 영웅을 줄 세운 뒤, 상위{' '}
          {TIER_LABEL_ORDER.map((tier, i) => (
            <span key={tier}>
              {i > 0 && ' · '}
              {tier}티어 {Math.round(TIER_SIZE_RATIO[tier] * 100)}%
            </span>
          ))}
          로 구간을 나눕니다. 밴률을 반영하는 이유는, 상대가 미리 금지할 만큼 위협적인 영웅은 밴 안 당한 판의
          승률·픽률만으로는 실제 체감 메타보다 낮게 잡히는 경향이 있기 때문입니다.
        </p>
        <p>
          <span className="font-semibold text-on-surface">표본 신뢰도</span>
          {' — '}
          출처 페이지가 실제 표본 수(경기 수)를 공개하지 않아 정확한 값은 제공하지 못합니다. 대신 픽률{' '}
          {LOW_SAMPLE_PICK_RATE_THRESHOLD}% 미만인 영웅에는 &apos;표본 적음&apos; 배지를 붙여, 승률이 표본
          변동에 흔들리기 쉬운 영웅이라는 걸 알려드립니다.
        </p>
      </div>
    </details>
  );
}
