import type { MatchHistoryItem } from '../../../types/player';
import { ROLE_ICON, ROLE_TEXT_COLOR } from '../constants/roleTheme';

interface RecentMatchesCardProps {
  matches: MatchHistoryItem[];
}

const RESULT_LABEL: Record<MatchHistoryItem['result'], string> = {
  win: 'WIN',
  loss: 'LOSS',
  draw: 'DRAW',
};

const RESULT_BORDER_COLOR: Record<MatchHistoryItem['result'], string> = {
  win: 'border-tier-b',
  loss: 'border-damage-red',
  draw: 'border-outline-variant',
};

const RESULT_TEXT_COLOR: Record<MatchHistoryItem['result'], string> = {
  win: 'text-tier-b',
  loss: 'text-damage-red',
  draw: 'text-on-surface-variant',
};

function formatRelativeTime(iso: string): string {
  const diffHours = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60));
  if (diffHours < 1) return '방금 전';
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${Math.floor(diffHours / 24)}일 전`;
}

export function RecentMatchesCard({ matches }: RecentMatchesCardProps) {
  return (
    <section className="glass-panel rounded-xl p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-headline-lg text-headline-md italic uppercase text-on-surface">Recent Matches</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">최근 경기</span>
      </div>

      <div className="flex flex-col gap-2">
        {matches.map((match) => {
          const Icon = ROLE_ICON[match.role];
          return (
            <div
              key={match.matchId}
              className={`flex items-center gap-3 border-l-4 bg-surface-container px-3 py-2.5 ${RESULT_BORDER_COLOR[match.result]}`}
            >
              <span className={`w-10 shrink-0 font-headline-md text-xs italic ${RESULT_TEXT_COLOR[match.result]}`}>
                {RESULT_LABEL[match.result]}
              </span>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-surface-dim">
                <Icon className={`h-4 w-4 ${ROLE_TEXT_COLOR[match.role]}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body-md text-sm font-bold italic text-on-surface">{match.heroName}</p>
                <p className="truncate font-label-sm text-[11px] text-on-surface-variant">{match.map}</p>
              </div>
              <span className="shrink-0 font-label-sm text-[11px] text-on-surface-variant">
                {formatRelativeTime(match.playedAt)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
