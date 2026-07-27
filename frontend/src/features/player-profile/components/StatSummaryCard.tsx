import { Skeleton } from '../../../components/feedback/Skeleton';
import { ROLE_BADGE_COLOR } from '../../../constants/roles';
import type { PlayerStatsSummary } from '../../../types/player';

interface StatSummaryCardProps {
  summary: PlayerStatsSummary;
}

export function StatSummaryCard({ summary }: StatSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-orange-500">{summary.winRate}%</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">승률</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{summary.kda.toFixed(1)}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">평균 KDA</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{summary.gamesPlayed}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">플레이 게임</span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800">
        <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">모스트 영웅</p>
        <div className="flex gap-3">
          {summary.topHeroes.slice(0, 3).map((hero) => (
            <div
              key={hero.heroId}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-gray-50 py-2 dark:bg-gray-800/60"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${ROLE_BADGE_COLOR[hero.role]}`}
              >
                {hero.heroName.slice(0, 1)}
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">{hero.heroName}</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">{hero.winRate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatSummaryCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="h-7 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800">
        <Skeleton className="mb-2 h-3 w-16" />
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-gray-50 py-3 dark:bg-gray-800/60"
            >
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
