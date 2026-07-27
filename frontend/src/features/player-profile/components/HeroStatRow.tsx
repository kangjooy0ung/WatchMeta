import { ROLE_BADGE_COLOR } from '../../../constants/roles';
import type { HeroPlayStat } from '../../../types/player';

interface HeroStatRowProps {
  stat: HeroPlayStat;
}

function formatPlayTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours > 0 ? `${hours}시간 ${rest}분` : `${rest}분`;
}

export function HeroStatRow({ stat }: HeroStatRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${ROLE_BADGE_COLOR[stat.role]}`}
      >
        {stat.heroName.slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{stat.heroName}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{formatPlayTime(stat.playTimeMinutes)}</p>
      </div>
      <div className="flex shrink-0 gap-3 text-right">
        <div>
          <p className="text-sm font-semibold text-orange-500">{stat.winRate}%</p>
          <p className="text-[11px] text-gray-400">승률</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{stat.accuracy}%</p>
          <p className="text-[11px] text-gray-400">명중률</p>
        </div>
      </div>
    </div>
  );
}
