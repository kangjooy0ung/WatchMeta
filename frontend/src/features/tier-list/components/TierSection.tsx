import { ChevronDown } from 'lucide-react';
import type { TierListEntry, TierRank } from '../../../types/tier';
import { HeroTierCard } from './HeroTierCard';

export const TIER_META: Record<TierRank, { badgeClass: string; glowClass?: string; description: string }> = {
  S: { badgeClass: 'bg-tier-s', glowClass: 'shadow-[0_0_15px_rgba(255,126,255,0.4)]', description: '현재 메타의 핵심' },
  A: { badgeClass: 'bg-tier-a', description: '강력한 성능의 주력 요원' },
  B: { badgeClass: 'bg-tier-b', description: '숙련된 유저를 위한 전략적 선택' },
  C: { badgeClass: 'bg-outline', description: '상황에 따라 활용 가능한 카드' },
  D: { badgeClass: 'bg-surface-variant', description: '까다로운 숙련도가 요구됨' },
};

interface TierSectionProps {
  tier: TierRank;
  entries: TierListEntry[];
  open: boolean;
  onToggle: (open: boolean) => void;
}

export function TierSection({ tier, entries, open, onToggle }: TierSectionProps) {
  if (entries.length === 0) return null;

  const meta = TIER_META[tier];

  return (
    <details
      id={`tier-${tier}`}
      open={open}
      onToggle={(e) => onToggle(e.currentTarget.open)}
      className="group scroll-mt-36"
    >
      <summary className="mb-4 flex cursor-pointer list-none items-center gap-3">
        <div className={`-skew-x-[15deg] px-4 py-1 ${meta.badgeClass} ${meta.glowClass ?? ''}`}>
          <span className="block skew-x-[15deg] font-headline-md italic text-white">{tier}-TIER</span>
        </div>
        <span className="text-label-sm font-label-sm text-on-surface-variant opacity-80">{meta.description}</span>
        <span className="text-label-sm font-label-sm text-on-surface-variant/60">{entries.length}명</span>
        <ChevronDown
          aria-hidden="true"
          className="ml-auto h-4 w-4 shrink-0 text-on-surface-variant transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="flex flex-wrap gap-4">
        {entries.map((entry) => (
          <HeroTierCard key={entry.heroId} entry={entry} />
        ))}
      </div>
    </details>
  );
}
