import { Link } from 'react-router-dom';
import { HeroPortrait } from '../../../components/hero/HeroPortrait';
import { ROLE_ACCENT_COLOR, ROLE_ICON } from '../../../constants/roles';
import { ROUTES } from '../../../constants/routes';
import type { TierListEntry } from '../../../types/tier';
import { RateBar } from './RateBar';

interface HeroTierCardProps {
  entry: TierListEntry;
}

export function HeroTierCard({ entry }: HeroTierCardProps) {
  const RoleIcon = ROLE_ICON[entry.role];

  return (
    <Link
      to={ROUTES.heroDetail(entry.heroId)}
      className="glass-panel flex min-w-[360px] max-w-[440px] flex-1 items-center gap-5 rounded-xl p-6 transition-colors hover:border-primary"
    >
      <div className="relative shrink-0">
        <HeroPortrait name={entry.heroName} role={entry.role} portraitUrl={entry.portraitUrl} className="h-16 w-16" />
        <div className="absolute -bottom-1 -right-1 flex items-center justify-center rounded border border-outline-variant bg-surface-container p-0.5">
          <RoleIcon className={`h-3 w-3 ${ROLE_ACCENT_COLOR[entry.role]}`} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-1.5">
          <p className="truncate font-headline-md text-on-surface">{entry.heroName}</p>
          {entry.isNew && (
            <span
              title="출시된 지 얼마 안 돼 메타가 아직 안정되지 않은 신규 영웅이에요"
              className="shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-surface-container-lowest"
            >
              신규
            </span>
          )}
          {entry.lowSample && (
            <span
              title="픽률이 낮아 승률이 표본 변동에 흔들리기 쉬워요"
              className="shrink-0 rounded-full border border-outline-variant px-1.5 py-0.5 text-[9px] font-semibold text-on-surface-variant"
            >
              표본 적음
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <RateBar label="픽률" percentage={entry.pickRate} colorClass="bg-primary" />
          <RateBar label="승률" percentage={entry.winRate} colorClass="bg-secondary" />
          {typeof entry.banRate === 'number' && (
            <RateBar label="밴률" percentage={entry.banRate} colorClass="bg-tier-s" />
          )}
        </div>
      </div>
    </Link>
  );
}
