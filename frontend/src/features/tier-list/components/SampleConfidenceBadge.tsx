import { getSampleConfidence } from '../lib/sampleConfidence';

interface SampleConfidenceBadgeProps {
  pickRate: number;
  className?: string;
}

const LABEL = { caution: '표본 주의', low: '표본 적음' } as const;
const TITLE = {
  caution: '픽률이 낮은 편이라 승률이 조금 흔들릴 수 있어요',
  low: '픽률이 낮아 승률이 표본 변동에 흔들리기 쉬워요',
} as const;

export function SampleConfidenceBadge({ pickRate, className = '' }: SampleConfidenceBadgeProps) {
  const confidence = getSampleConfidence(pickRate);
  if (confidence === 'sufficient') return null;

  return (
    <span
      title={TITLE[confidence]}
      className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${
        confidence === 'low'
          ? 'border-outline-variant text-on-surface-variant'
          : 'border-outline-variant/60 text-on-surface-variant/70'
      } ${className}`}
    >
      {LABEL[confidence]}
    </span>
  );
}
