import { ROLE_BADGE_COLOR } from '../../../constants/roles';
import type { TierListEntry, TierRank } from '../../../types/tier';

interface TierRankCardProps {
  entry: TierListEntry;
}

const TIER_COLOR: Record<TierRank, string> = {
  S: 'bg-amber-400 text-amber-950',
  A: 'bg-purple-400 text-purple-950',
  B: 'bg-emerald-400 text-emerald-950',
  C: 'bg-sky-400 text-sky-950',
  D: 'bg-gray-300 text-gray-700',
};

export function TierRankCard({ entry }: TierRankCardProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold ${TIER_COLOR[entry.tier]}`}
      >
        {entry.tier}
      </span>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${ROLE_BADGE_COLOR[entry.role]}`}
      >
        {entry.heroName.slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{entry.heroName}</p>
        <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
          승률 {entry.winRate}% · 픽률 {entry.pickRate}%
        </p>
      </div>
    </div>
  );
}
