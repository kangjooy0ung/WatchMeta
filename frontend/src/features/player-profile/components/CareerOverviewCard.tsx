import type { HeroRole } from '../../../types/hero';
import type { PlayerOverviewData } from '../../../types/player';
import { ROLE_ICON, ROLE_LABEL, ROLE_TEXT_COLOR } from '../constants/roleTheme';
import { SegmentedBar } from './SegmentedBar';

interface CareerOverviewCardProps {
  overview: PlayerOverviewData;
}

const ROLE_ORDER: HeroRole[] = ['tank', 'damage', 'support'];

const MODE_ROWS: { key: keyof PlayerOverviewData['modeHours']; label: string; borderClass: string }[] = [
  { key: 'competitive', label: '경쟁전', borderClass: 'border-damage-red' },
  { key: 'quickplay', label: '빠른 대전', borderClass: 'border-tank-blue' },
];

export function CareerOverviewCard({ overview }: CareerOverviewCardProps) {
  const maxRoleHours = Math.max(...ROLE_ORDER.map((role) => overview.roleHours[role]));

  return (
    <section className="glass-panel flex flex-col gap-4 rounded-xl p-4 lg:gap-5 lg:p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-headline-lg text-headline-md italic text-on-surface">CAREER OVERVIEW</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">경력 개요</span>
      </div>

      <div className="flex flex-col gap-3">
        {ROLE_ORDER.map((role) => {
          const Icon = ROLE_ICON[role];
          return (
            <div key={role} className="space-y-1.5">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${ROLE_TEXT_COLOR[role]}`} />
                  <span className="text-on-surface">{ROLE_LABEL[role]}</span>
                </div>
                <span className="text-on-surface-variant">{overview.roleHours[role]} 시간</span>
              </div>
              <SegmentedBar role={role} value={overview.roleHours[role]} maxValue={maxRoleHours} />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        {MODE_ROWS.map(({ key, label, borderClass }) => (
          <div key={key} className={`flex items-center justify-between border-r-4 ${borderClass} bg-white/5 p-3`}>
            <span className="font-label-sm text-sm text-on-surface">{label}</span>
            <span className="font-stat-value text-base text-on-surface">{overview.modeHours[key]} 시간</span>
          </div>
        ))}
      </div>
    </section>
  );
}
