import { ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HeroPortrait } from '../../components/hero/HeroPortrait';
import { ALL_HEROES } from '../../constants/heroes';
import { ROLES, ROLE_ACCENT_COLOR } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';
import { RoleTabs } from '../../features/tier-list/components/RoleTabs';
import {
  PERKS_CHECKED_AT,
  PERKS_PREFER_SOURCE_URL,
} from '../../features/perks/data/heroPerks';
import { consensusPicks, contestedPicks, heroTopPerks, type PerkPick } from '../../features/perks/lib/perkStats';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import type { HeroRole } from '../../types/hero';

const VALID_ROLES: Array<HeroRole | 'all'> = ['all', 'tank', 'damage', 'support'];
const ROLE_ORDER: Record<HeroRole, number> = { tank: 0, damage: 1, support: 2 };

function TrendRow({ pick }: { pick: PerkPick }) {
  const rate = Math.round(pick.preferRate);
  return (
    <li>
      <Link
        to={ROUTES.perkDetail(pick.heroId)}
        className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-variant/30"
      >
        <HeroPortrait
          name={pick.heroName}
          role={pick.heroRole}
          portraitUrl={pick.heroPortraitUrl}
          className="h-8 w-8"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="truncate font-semibold text-on-surface">{pick.name}</span>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              {pick.heroName} · {pick.tier === 'minor' ? '마이너' : '메이저'}
            </span>
          </div>
          <div className="mt-1 flex h-1 w-full overflow-hidden rounded-full bg-surface-container-low">
            <div className="h-full rounded-full bg-primary" style={{ width: `${rate}%` }} />
          </div>
        </div>
        <span className="shrink-0 font-headline-md text-on-surface">{rate}%</span>
      </Link>
    </li>
  );
}

export function PerksPage() {
  useDocumentMeta({
    title: '오버워치 영웅 특전(퍽) 정리 · 선호 특전 | WatchMeta',
    description:
      '오버워치 전 영웅의 마이너·메이저 특전 효과를 한글로 정리하고, 커뮤니티가 가장 많이 고르는 선호 특전을 보여줍니다.',
    path: ROUTES.perks,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [heroQuery, setHeroQuery] = useState('');

  const roleParam = searchParams.get('role');
  const role: HeroRole | 'all' = VALID_ROLES.includes(roleParam as HeroRole | 'all')
    ? (roleParam as HeroRole | 'all')
    : 'all';

  const setRole = (next: HeroRole | 'all') =>
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next === 'all') params.delete('role');
        else params.set('role', next);
        return params;
      },
      { replace: false },
    );

  const consensus = useMemo(() => consensusPicks(8), []);
  const contested = useMemo(() => contestedPicks(6), []);

  const query = heroQuery.trim();
  const heroes = useMemo(() => {
    return ALL_HEROES.filter((hero) => (role === 'all' ? true : hero.role === role))
      .filter((hero) => (query ? hero.name.includes(query) : true))
      .sort((a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role] || a.name.localeCompare(b.name, 'ko'));
  }, [role, query]);

  const roleLabel = role === 'all' ? '전체 역할' : ROLES.find((r) => r.id === role)?.label ?? role;

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-[1600px] space-y-8 px-4 pt-6 lg:px-8">
        <section className="border-l-4 border-primary pl-4">
          <h1 className="font-headline-xl text-headline-xl italic uppercase text-primary">영웅 특전</h1>
          <div className="mt-3 space-y-1">
            <p className="break-keep text-body-lg font-body-lg text-on-surface-variant lg:whitespace-nowrap">
              경쟁전에서 영웅은 레벨 2에 <b className="text-on-surface">마이너 특전</b> 1개, 레벨 3에{' '}
              <b className="text-on-surface">메이저 특전</b> 1개를 각각 2개 중에서 고릅니다.
            </p>
            <p className="max-w-2xl break-keep text-body-lg font-body-lg text-on-surface-variant">
              영웅별 특전 효과와 커뮤니티가 더 많이 고르는 특전을 정리했어요.
            </p>
          </div>
        </section>

        <div className="-mx-4 space-y-3 border-b border-outline-variant/40 bg-background/95 px-4 pb-4 pt-2 backdrop-blur sm:sticky sm:top-16 sm:z-20 lg:-mx-8 lg:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(200px,280px)]">
            <RoleTabs role={role} onChange={setRole} />
            <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container px-3 py-2 transition-colors focus-within:border-primary">
              <Search className="h-4 w-4 shrink-0 text-on-surface-variant" />
              <input
                type="text"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="영웅 이름으로 찾기"
                className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
              />
            </label>
          </div>
        </div>

        <section>
          <p className="mb-3 text-sm text-on-surface-variant">
            {roleLabel} · {heroes.length}명
          </p>
          {heroes.length === 0 ? (
            <p className="py-10 text-center text-sm text-on-surface-variant">
              '{query}' 이름을 가진 영웅을 찾지 못했어요.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {heroes.map((hero) => {
                const top = heroTopPerks(hero.id);
                return (
                  <Link
                    key={hero.id}
                    to={ROUTES.perkDetail(hero.id)}
                    className="glass-panel group flex flex-col gap-3 rounded-xl p-4 transition-colors hover:border-primary/50"
                  >
                    <div className="flex items-center gap-3">
                      <HeroPortrait
                        name={hero.name}
                        role={hero.role}
                        portraitUrl={hero.portraitUrl}
                        className="h-11 w-11"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-headline-md text-on-surface">{hero.name}</p>
                        <p className={`text-label-sm font-label-sm ${ROLE_ACCENT_COLOR[hero.role]}`}>
                          {ROLES.find((r) => r.id === hero.role)?.label}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-0.5" />
                    </div>

                    {top && (
                      <div className="grid grid-cols-2 gap-2 border-t border-outline-variant/40 pt-3">
                        {(['minor', 'major'] as const).map((tier) => {
                          const perk = top[tier];
                          return (
                            <div
                              key={tier}
                              className="flex flex-col gap-1.5 rounded-lg bg-surface-container-high/40 p-2"
                            >
                              <span className="text-[10px] font-bold tracking-wider text-on-surface-variant">
                                {tier === 'minor' ? '마이너' : '메이저'}
                              </span>
                              <div className="flex items-start gap-2">
                                <img
                                  src={perk.icon}
                                  alt=""
                                  loading="lazy"
                                  className="h-8 w-8 shrink-0 rounded-md bg-surface-container object-contain p-1"
                                />
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold leading-tight text-on-surface">{perk.name}</p>
                                  <p className="mt-0.5 text-[11px] text-on-surface-variant">
                                    선호 {Math.round(perk.preferRate)}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="space-y-4 border-t border-outline-variant/40 pt-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="glass-panel rounded-xl p-5">
              <h2 className="font-headline-md text-on-surface">거의 고정된 선택</h2>
              <p className="mt-0.5 text-xs text-on-surface-variant">
                커뮤니티 의견이 한쪽으로 가장 크게 쏠린 특전이에요.
              </p>
              <ul className="mt-3 space-y-0.5">
                {consensus.map((pick) => (
                  <TrendRow key={`${pick.heroId}-${pick.tier}`} pick={pick} />
                ))}
              </ul>
            </div>
            <div className="glass-panel rounded-xl p-5">
              <h2 className="font-headline-md text-on-surface">취향이 갈리는 선택</h2>
              <p className="mt-0.5 text-xs text-on-surface-variant">
                선호율이 반반에 가까워, 상황에 따라 골라 쓰는 특전이에요.
              </p>
              <ul className="mt-3 space-y-0.5">
                {contested.map((pick) => (
                  <TrendRow key={`${pick.heroId}-${pick.tier}`} pick={pick} />
                ))}
              </ul>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-on-surface-variant/70">
            선호율은{' '}
            <a
              href={PERKS_PREFER_SOURCE_URL}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-primary"
            >
              owperks.com
            </a>{' '}
            커뮤니티 투표 집계({PERKS_CHECKED_AT} 확인) 기준이며, 실제 게임 내 채용률과는 다를 수 있어요.
          </p>
        </section>
      </div>
    </div>
  );
}
