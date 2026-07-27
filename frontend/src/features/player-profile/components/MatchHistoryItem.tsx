import { Skeleton } from '../../../components/feedback/Skeleton';
import { ROLE_BADGE_COLOR } from '../../../constants/roles';
import type { MatchHistoryItem as MatchHistoryItemType } from '../../../types/player';

interface MatchHistoryItemProps {
  match: MatchHistoryItemType;
}

const RESULT_LABEL: Record<MatchHistoryItemType['result'], string> = {
  win: '승리',
  loss: '패배',
  draw: '무승부',
};

const RESULT_BAR_COLOR: Record<MatchHistoryItemType['result'], string> = {
  win: 'bg-blue-500',
  loss: 'bg-red-500',
  draw: 'bg-gray-400',
};

const RESULT_TEXT_COLOR: Record<MatchHistoryItemType['result'], string> = {
  win: 'text-blue-500',
  loss: 'text-red-500',
  draw: 'text-gray-400',
};

function formatRelativeTime(iso: string) {
  const diffHours = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60));
  if (diffHours < 1) return '방금 전';
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${Math.floor(diffHours / 24)}일 전`;
}

export function MatchHistoryItem({ match }: MatchHistoryItemProps) {
  return (
    <div className="flex items-stretch gap-3 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <span className={`w-1.5 shrink-0 ${RESULT_BAR_COLOR[match.result]}`} />
      <span
        className={`my-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${ROLE_BADGE_COLOR[match.role]}`}
      >
        {match.heroName.slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1 py-3">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{match.map}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{match.heroName}</p>
      </div>
      <div className="shrink-0 py-3 pr-3 text-right">
        <p className={`text-sm font-semibold ${RESULT_TEXT_COLOR[match.result]}`}>{RESULT_LABEL[match.result]}</p>
        <p className="text-[11px] text-gray-400">{formatRelativeTime(match.playedAt)}</p>
      </div>
    </div>
  );
}

export function MatchHistoryItemSkeleton() {
  return (
    <div className="flex animate-pulse items-stretch gap-3 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <span className="w-1.5 shrink-0 bg-gray-200 dark:bg-gray-800" />
      <Skeleton className="my-3 h-10 w-10 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2 py-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="shrink-0 space-y-2 py-3 pr-3 text-right">
        <Skeleton className="ml-auto h-4 w-10" />
        <Skeleton className="ml-auto h-3 w-12" />
      </div>
    </div>
  );
}
