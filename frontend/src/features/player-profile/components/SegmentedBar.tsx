import type { HeroRole } from '../../../types/hero';
import { ROLE_SEGMENT_CLASS } from '../constants/roleTheme';

interface SegmentedBarProps {
  role: HeroRole;
  value: number;
  maxValue: number;
  segmentCount?: number;
}

export function SegmentedBar({ role, value, maxValue, segmentCount = 12 }: SegmentedBarProps) {
  const filled = maxValue > 0 ? Math.round((value / maxValue) * segmentCount) : 0;

  return (
    <div className="segmented-bar-bg">
      {Array.from({ length: segmentCount }, (_, i) => (
        <div key={i} className={`segment ${i < filled ? ROLE_SEGMENT_CLASS[role] : ''}`} />
      ))}
    </div>
  );
}
