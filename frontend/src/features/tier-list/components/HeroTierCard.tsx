import { HeroPortrait } from '../../../components/hero/HeroPortrait';
import { ROLE_ACCENT_COLOR, ROLE_ICON } from '../../../constants/roles';
import type { TierListEntry } from '../../../types/tier';
import { RateBar } from './RateBar';

interface HeroTierCardProps {
  entry: TierListEntry;
}

export function HeroTierCard({ entry }: HeroTierCardProps) {
  const RoleIcon = ROLE_ICON[entry.role];

  return (
    <div className="glass-panel flex min-w-[320px] max-w-[400px] flex-1 items-center gap-5 rounded-xl p-6">
      <div className="relative shrink-0">
        <HeroPortrait name={entry.heroName} role={entry.role} portraitUrl={entry.portraitUrl} className="h-16 w-16" />
        <div className="absolute -bottom-1 -right-1 flex items-center justify-center rounded border border-outline-variant bg-surface-container p-0.5">
          <RoleIcon className={`h-3 w-3 ${ROLE_ACCENT_COLOR[entry.role]}`} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-2 truncate font-headline-md text-on-surface">{entry.heroName}</p>
        <div className="grid grid-cols-2 gap-3">
          <RateBar label="픽률" percentage={entry.pickRate} colorClass="bg-primary" />
          <RateBar label="승률" percentage={entry.winRate} colorClass="bg-secondary" />
        </div>
      </div>
    </div>
  );
}
