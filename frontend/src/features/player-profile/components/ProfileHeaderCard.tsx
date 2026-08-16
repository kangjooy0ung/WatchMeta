import { Star, ThumbsUp } from 'lucide-react';
import type { HeroRole } from '../../../types/hero';
import type { PlayerOverviewData } from '../../../types/player';
import { ROLE_ICON, ROLE_TEXT_COLOR } from '../constants/roleTheme';

interface ProfileHeaderCardProps {
  overview: PlayerOverviewData;
  isMine: boolean;
  onToggleSave: () => void;
}

const RANK_ROLE_ORDER: HeroRole[] = ['tank', 'damage', 'support'];

export function ProfileHeaderCard({ overview, isMine, onToggleSave }: ProfileHeaderCardProps) {
  return (
    <section className="glass-panel relative overflow-hidden rounded-xl border-l-4 border-primary p-4 lg:flex lg:items-end lg:justify-between lg:gap-6 lg:p-6">
      <button
        type="button"
        onClick={onToggleSave}
        aria-label={isMine ? '내 계정으로 저장 해제' : '내 계정으로 저장'}
        className={`absolute right-4 top-4 rounded-full p-1.5 transition-colors lg:right-6 lg:top-6 ${
          isMine ? 'text-primary' : 'text-on-surface-variant/50 hover:text-on-surface-variant'
        }`}
      >
        <Star className="h-5 w-5" fill={isMine ? 'currentColor' : 'none'} />
      </button>

      <div>
        <div className="flex items-center gap-3 lg:gap-5">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary bg-surface-dim p-1 lg:h-20 lg:w-20">
            <img
              src={overview.avatarUrl}
              alt={overview.displayName}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate pr-1 font-headline-lg text-headline-md italic text-on-surface lg:font-headline-xl lg:text-headline-xl">
                {overview.displayName}
              </h2>
            </div>
            {overview.title && (
              <p className="mt-0.5 truncate pr-1 font-label-sm text-label-sm italic text-on-surface-variant">
                {overview.title}
              </p>
            )}
            <div className="mt-1 flex w-fit items-center gap-2 bg-surface-container-high px-2 py-0.5 lg:mt-2">
              <ThumbsUp className="h-3.5 w-3.5 text-primary" fill="currentColor" fillOpacity={0.15} />
              <span className="font-label-sm text-label-sm tracking-widest text-primary">
                추천레벨 {overview.endorsementLevel}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-outline-variant/30 pt-2.5 lg:mt-2 lg:justify-start lg:gap-4 lg:border-t-0 lg:pt-0">
          <div className="flex flex-wrap items-center gap-3">
            {RANK_ROLE_ORDER.filter((role) => overview.competitiveRanks[role]).map((role) => {
              const rank = overview.competitiveRanks[role];
              if (!rank) return null;
              const Icon = ROLE_ICON[role];
              return (
                <div key={role} className="flex items-center gap-1.5">
                  <Icon className={`h-4 w-4 ${ROLE_TEXT_COLOR[role]}`} />
                  <span className="font-headline-md text-sm italic text-on-surface lg:text-headline-md">
                    {rank.division.toUpperCase()} {rank.tier}
                  </span>
                </div>
              );
            })}
            {RANK_ROLE_ORDER.every((role) => !overview.competitiveRanks[role]) && (
              <span className="font-label-sm text-label-sm text-on-surface-variant">경쟁전 미배치</span>
            )}
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {overview.platform.toUpperCase()}
            </span>
          </div>
          <div className="text-right lg:hidden">
            <p className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              총 플레이 시간
            </p>
            <p className="font-stat-value text-xl italic text-primary">
              {overview.totalPlaytimeHours} <span className="text-xs">시간</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden text-right lg:block">
        <p className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">
          총 플레이 시간
        </p>
        <p className="font-stat-value text-4xl italic text-primary">
          {overview.totalPlaytimeHours} <span className="text-xl">시간</span>
        </p>
      </div>
    </section>
  );
}
