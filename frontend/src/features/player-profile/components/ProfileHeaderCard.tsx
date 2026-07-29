import { Gem, Hexagon, Star } from 'lucide-react';
import type { PlayerOverviewData } from '../../../types/player';

interface ProfileHeaderCardProps {
  overview: PlayerOverviewData;
  isMine: boolean;
  onToggleSave: () => void;
}

export function ProfileHeaderCard({ overview, isMine, onToggleSave }: ProfileHeaderCardProps) {
  return (
    <section className="glass-panel relative overflow-hidden rounded-xl border-l-4 border-primary p-5">
      <button
        type="button"
        onClick={onToggleSave}
        aria-label={isMine ? '내 계정으로 저장 해제' : '내 계정으로 저장'}
        className={`absolute right-4 top-4 rounded-full p-1.5 transition-colors ${
          isMine ? 'text-primary' : 'text-on-surface-variant/50 hover:text-on-surface-variant'
        }`}
      >
        <Star className="h-5 w-5" fill={isMine ? 'currentColor' : 'none'} />
      </button>

      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary bg-surface-dim p-1">
          <img
            src={overview.avatarUrl}
            alt={overview.battleTag}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate font-headline-lg text-headline-md italic text-on-surface">
              {overview.battleTag}
            </h2>
          </div>
          <div className="mt-1 flex items-center gap-2 bg-surface-container-high px-2 py-0.5">
            <Hexagon className="h-3.5 w-3.5 text-primary" fill="currentColor" fillOpacity={0.15} />
            <span className="font-label-sm text-label-sm tracking-widest text-primary">LVL {overview.level}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-outline-variant/30 pt-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-secondary">
            <Gem className="platinum-glow h-4 w-4" />
            <span className="font-headline-md text-sm italic">{overview.tier}</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">{overview.platform}</span>
        </div>
        <div className="text-right">
          <p className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
            총 플레이 시간
          </p>
          <p className="font-stat-value text-xl italic text-primary">
            {overview.totalPlaytimeHours} <span className="text-xs">시간</span>
          </p>
        </div>
      </div>
    </section>
  );
}
