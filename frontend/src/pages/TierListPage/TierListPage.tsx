import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { KoreaServerNotice } from '../../features/tier-list/components/KoreaServerNotice';
import { MetaDataDisclosure } from '../../features/tier-list/components/MetaDataDisclosure';
import { MetaStatsSummary } from '../../features/tier-list/components/MetaStatsSummary';
import { PatchVersionSelect, type PatchVersionOption } from '../../features/tier-list/components/PatchVersionSelect';
import { RankFilter } from '../../features/tier-list/components/RankFilter';
import { RoleTabs } from '../../features/tier-list/components/RoleTabs';
import { ServerFilter, SERVERS_WITHOUT_DATA } from '../../features/tier-list/components/ServerFilter';
import { TIER_META, TierSection } from '../../features/tier-list/components/TierSection';
import { buildTierList } from '../../features/tier-list/data/tierList';
import { PATCH_NOTES } from '../../features/patch-notes/data/patchNotes';
import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import type { HeroRole } from '../../types/hero';
import type { TierRank } from '../../types/tier';

const TIER_ORDER: TierRank[] = ['S', 'A', 'B', 'C', 'D'];
const ROLE_ORDER: Record<HeroRole, number> = { tank: 0, damage: 1, support: 2 };
const VALID_ROLES: Array<HeroRole | 'all'> = ['all', 'tank', 'damage', 'support'];
const DEFAULT_RANK = '전체';
const DEFAULT_SERVER = '아시아';

// heroRates.ts는 패치별 스냅샷이 아니라 "가장 최근 확인 시점" 단일 데이터라, 과거 패치를 골라도
// 실제로는 같은 수치가 나온다. 그래서 선택 가능한 옵션은 실제 최신 패치 하나만 제공한다.
const CURRENT_PATCH = PATCH_NOTES[0];
const PATCH_VERSIONS: PatchVersionOption[] = [
  { value: CURRENT_PATCH.version, label: `${CURRENT_PATCH.patchDate} 패치 (최신)` },
];

const ALL_TIERS_OPEN: Record<TierRank, boolean> = { S: true, A: true, B: true, C: true, D: true };

export function TierListPage() {
  useDocumentMeta({
    title: '오버워치 메타 티어리스트 (S~D) | WatchMeta',
    description: '오버워치 서버·랭크별 영웅 픽률·승률·밴률로 계산한 S~D 메타 티어리스트를 확인하세요.',
    path: ROUTES.tierList,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [heroQuery, setHeroQuery] = useState('');
  const [openTiers, setOpenTiers] = useState<Record<TierRank, boolean>>(ALL_TIERS_OPEN);

  const roleParam = searchParams.get('role');
  const role: HeroRole | 'all' = VALID_ROLES.includes(roleParam as HeroRole | 'all')
    ? (roleParam as HeroRole | 'all')
    : 'all';
  const rank = searchParams.get('rank') ?? DEFAULT_RANK;
  const server = searchParams.get('server') ?? DEFAULT_SERVER;
  const patchVersion = searchParams.get('patch') ?? PATCH_VERSIONS[0].value;

  // 필터를 URL 쿼리스트링에 반영해 새로고침·공유·뒤로가기에서도 선택 상태가 유지되게 한다.
  // 기본값과 같은 값은 쿼리에서 지워 URL을 깔끔하게 유지한다.
  function updateParam(key: string, value: string, defaultValue: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === defaultValue) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      },
      { replace: false },
    );
  }

  const setRole = (next: HeroRole | 'all') => updateParam('role', next, 'all');
  const setRank = (next: string) => updateParam('rank', next, DEFAULT_RANK);
  const setServer = (next: string) => updateParam('server', next, DEFAULT_SERVER);
  const setPatchVersion = (next: string) => updateParam('patch', next, PATCH_VERSIONS[0].value);

  const hasServerData = !SERVERS_WITHOUT_DATA.includes(server);
  const tierList = useMemo(() => buildTierList(rank, hasServerData ? server : DEFAULT_SERVER), [rank, server, hasServerData]);

  const normalizedHeroQuery = heroQuery.trim();
  const tierGroups = useMemo(() => {
    const byRole = role === 'all' ? tierList : tierList.filter((entry) => entry.role === role);
    const filtered = normalizedHeroQuery
      ? byRole.filter((entry) => entry.heroName.includes(normalizedHeroQuery))
      : byRole;
    return TIER_ORDER.map((tier) => ({
      tier,
      entries: filtered.filter((entry) => entry.tier === tier).sort((a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role]),
    }));
  }, [tierList, role, normalizedHeroQuery]);

  const visibleEntries = useMemo(() => tierGroups.flatMap((group) => group.entries), [tierGroups]);
  const nonEmptyTiers = tierGroups.filter((group) => group.entries.length > 0).map((group) => group.tier);
  const patchLabel = PATCH_VERSIONS.find((version) => version.value === patchVersion)?.label ?? patchVersion;
  const roleLabel = role === 'all' ? '전체 역할' : ROLES.find((r) => r.id === role)?.label ?? role;

  const setTierOpen = (tier: TierRank, open: boolean) => setOpenTiers((prev) => ({ ...prev, [tier]: open }));
  const collapseAll = () =>
    setOpenTiers(TIER_ORDER.reduce((acc, tier) => ({ ...acc, [tier]: false }), {} as Record<TierRank, boolean>));
  const expandAll = () => setOpenTiers(ALL_TIERS_OPEN);

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-[1600px] space-y-8 px-4 pt-6 lg:px-8">
        <section className="flex flex-col items-start justify-between gap-4 border-l-4 border-primary pl-4 md:flex-row md:items-end">
          <div>
            <h1 className="font-headline-xl text-headline-xl italic uppercase text-primary">4시즌 메타 데이터</h1>
            <p className="max-w-xl text-body-lg font-body-lg text-on-surface-variant">
              {server} · {rank} 랭크 · {roleLabel} · 경쟁전 · {patchLabel} 기준
            </p>
          </div>
          <Link
            to={ROUTES.mapStats}
            className="shrink-0 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
          >
            전장별 승률 보기
          </Link>
        </section>

        <div className="-mx-4 space-y-3 border-b border-outline-variant/40 bg-background/95 px-4 pb-4 pt-2 backdrop-blur sm:sticky sm:top-16 sm:z-20 lg:-mx-8 lg:px-8">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_repeat(3,minmax(160px,220px))]">
            <RoleTabs role={role} onChange={setRole} />
            <ServerFilter server={server} onChange={setServer} />
            <RankFilter rank={rank} onChange={setRank} />
            <PatchVersionSelect version={patchVersion} versions={PATCH_VERSIONS} onChange={setPatchVersion} />
          </section>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex w-full max-w-xs items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-3 py-1.5 transition-colors focus-within:border-primary">
              <Search className="h-3.5 w-3.5 shrink-0 text-on-surface-variant" />
              <input
                type="text"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="영웅 이름으로 찾기"
                className="w-full bg-transparent text-xs text-on-surface outline-none placeholder:text-on-surface-variant/60"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              {nonEmptyTiers.map((tier) => (
                <a
                  key={tier}
                  href={`#tier-${tier}`}
                  onClick={() => setTierOpen(tier, true)}
                  className={`-skew-x-[10deg] px-2.5 py-1 text-[11px] font-bold text-white transition-opacity hover:opacity-80 ${TIER_META[tier].badgeClass}`}
                >
                  <span className="block skew-x-[10deg]">{tier}</span>
                </a>
              ))}
              <span className="mx-1 h-4 w-px bg-outline-variant" aria-hidden="true" />
              <button
                type="button"
                onClick={expandAll}
                className="rounded-full border border-outline-variant px-2.5 py-1 text-[11px] font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
              >
                모두 펼치기
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="rounded-full border border-outline-variant px-2.5 py-1 text-[11px] font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
              >
                모두 접기
              </button>
            </div>
          </div>
        </div>

        {!hasServerData && <KoreaServerNotice server={server} />}

        <MetaDataDisclosure />

        {normalizedHeroQuery && visibleEntries.length === 0 && (
          <p className="py-6 text-center text-sm text-on-surface-variant">
            '{normalizedHeroQuery}' 이름을 가진 영웅을 찾지 못했어요.
          </p>
        )}

        <div className="space-y-10">
          {tierGroups.map(({ tier, entries }) => (
            <TierSection
              key={tier}
              tier={tier}
              entries={entries}
              open={openTiers[tier]}
              onToggle={(open) => setTierOpen(tier, open)}
            />
          ))}
        </div>

        <MetaStatsSummary entries={visibleEntries} rank={rank} patchLabel={patchLabel} />
      </div>
    </div>
  );
}
