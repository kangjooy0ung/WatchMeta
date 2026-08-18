import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroImage } from '../../../components/hero/HeroImage';
import { ROUTES } from '../../../constants/routes';
import type { HeroRole } from '../../../types/hero';
import type { HeroStat } from '../../../types/player';
import { ROLE_ICON, ROLE_LABEL, ROLE_TEXT_COLOR } from '../constants/roleTheme';

interface RecentHeroesCardProps {
  battleTag: string;
  heroStats: HeroStat[];
}

const COLLAPSED_VISIBLE = 8;
const ROLE_FILTERS: Array<HeroRole | 'all'> = ['all', 'tank', 'damage', 'support'];

type SortKey = 'playtime' | 'winRate' | 'kda' | 'games';

const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: 'playtime', label: '플레이 시간' },
  { key: 'winRate', label: '승률' },
  { key: 'kda', label: 'KDA' },
  { key: 'games', label: '경기수' },
];

const SORT_COMPARATORS: Record<SortKey, (a: HeroStat, b: HeroStat) => number> = {
  playtime: (a, b) => b.playTimeHours - a.playTimeHours,
  winRate: (a, b) => b.winRate - a.winRate,
  kda: (a, b) => b.kda - a.kda,
  games: (a, b) => b.gamesPlayed - a.gamesPlayed,
};

export function RecentHeroesCard({ battleTag, heroStats }: RecentHeroesCardProps) {
  const [roleFilter, setRoleFilter] = useState<HeroRole | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('playtime');
  const [expanded, setExpanded] = useState(false);

  const filteredHeroes = useMemo(() => {
    const played = heroStats.filter((hero) => hero.gamesPlayed > 0);
    const byRole = roleFilter === 'all' ? played : played.filter((hero) => hero.role === roleFilter);
    return [...byRole].sort(SORT_COMPARATORS[sortKey]);
  }, [heroStats, roleFilter, sortKey]);

  const visibleHeroes = expanded ? filteredHeroes : filteredHeroes.slice(0, COLLAPSED_VISIBLE);
  const hiddenCount = filteredHeroes.length - visibleHeroes.length;

  return (
    <section className="glass-panel rounded-xl p-4 lg:p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 lg:mb-4">
        <h3 className="font-headline-lg text-headline-md italic uppercase text-on-surface">Hero Activity</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">영웅별 활동 · {filteredHeroes.length}명</span>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 rounded-lg border border-outline-variant bg-surface-container-high p-1">
          {ROLE_FILTERS.map((role) => {
            const isActive = roleFilter === role;
            const label = role === 'all' ? '전체' : ROLE_LABEL[role];
            return (
              <button
                key={role}
                type="button"
                aria-pressed={isActive}
                onClick={() => setRoleFilter(role)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  isActive ? 'bg-primary text-surface-container-lowest' : 'text-on-surface-variant hover:bg-surface-variant/40'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <select
          aria-label="정렬 기준"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="rounded-lg border border-outline-variant bg-surface-container-high px-2 py-1 text-[11px] font-semibold text-on-surface-variant"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}순
            </option>
          ))}
        </select>
      </div>

      {filteredHeroes.length === 0 ? (
        <p className="py-6 text-center font-label-sm text-label-sm text-on-surface-variant">
          아직 플레이한 영웅 기록이 없어요.
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          <div className="hidden bg-surface-variant/40 px-4 py-2 font-label-sm text-label-sm uppercase italic tracking-wider text-on-surface-variant lg:grid lg:grid-cols-12">
            <div className="col-span-5">영웅</div>
            <div className="col-span-3 text-right">경기수</div>
            <div className="col-span-2 text-right">KDA</div>
            <div className="col-span-2 text-right">승률</div>
          </div>
          {visibleHeroes.map((hero) => {
            const Icon = ROLE_ICON[hero.role];
            const isWinning = hero.winRate >= 50;
            return (
              <Link
                key={hero.heroId}
                to={ROUTES.profileHero(battleTag, hero.heroId)}
                className={`flex items-center gap-3 border-l-4 bg-surface-container px-3 py-2 transition-colors hover:bg-surface-bright lg:grid lg:grid-cols-12 lg:items-center lg:gap-0 lg:px-3.5 lg:py-2.5 ${isWinning ? 'border-tier-b' : 'border-damage-red'}`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 lg:col-span-5">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-surface-dim">
                    <HeroImage src={hero.portraitUrl} alt={hero.heroName} className="h-full w-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-surface-container bg-surface-container-lowest">
                      <Icon className={`h-2.5 w-2.5 ${ROLE_TEXT_COLOR[hero.role]}`} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-body-md text-sm font-bold italic text-on-surface">{hero.heroName}</p>
                    <p className="truncate font-label-sm text-[11px] text-on-surface-variant lg:hidden">
                      {hero.gamesPlayed}경기 · KDA {hero.kda.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="hidden truncate font-label-sm text-[11px] text-on-surface-variant lg:col-span-3 lg:block lg:text-right">
                  {hero.gamesPlayed}경기
                </p>
                <p className="hidden truncate font-label-sm text-[11px] text-on-surface-variant lg:col-span-2 lg:block lg:text-right">
                  {hero.kda.toFixed(2)}
                </p>
                <span
                  className={`shrink-0 font-headline-md text-xs italic lg:col-span-2 lg:text-right ${isWinning ? 'text-tier-b' : 'text-damage-red'}`}
                >
                  {hero.winRate.toFixed(1)}%
                </span>
              </Link>
            );
          })}
          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-1 rounded-lg border border-outline-variant py-2 text-xs font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
              {hiddenCount}명 더보기
            </button>
          )}
          {expanded && filteredHeroes.length > COLLAPSED_VISIBLE && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="mt-1 rounded-lg border border-outline-variant py-2 text-xs font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
              접기
            </button>
          )}
        </div>
      )}
    </section>
  );
}
