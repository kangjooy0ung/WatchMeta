import { useMemo, useState } from 'react';
import { MetaStatsSummary } from '../../features/tier-list/components/MetaStatsSummary';
import { PatchVersionSelect, type PatchVersionOption } from '../../features/tier-list/components/PatchVersionSelect';
import { RankFilter } from '../../features/tier-list/components/RankFilter';
import { RoleTabs } from '../../features/tier-list/components/RoleTabs';
import { TierSection } from '../../features/tier-list/components/TierSection';
import type { HeroRole } from '../../types/hero';
import type { TierListEntry, TierRank } from '../../types/tier';

const TIER_ORDER: TierRank[] = ['S', 'A', 'B', 'C', 'D'];

const PATCH_VERSIONS: PatchVersionOption[] = [
  { value: '10.5', label: '10.5 패치 (최신)' },
  { value: '10.4', label: '10.4 패치' },
  { value: '10.3', label: '10.3 패치' },
];

const MOCK_TIER_LIST: TierListEntry[] = [
  { heroId: 'reinhardt', heroName: '라인하르트', role: 'tank', tier: 'S', winRate: 54, pickRate: 22 },
  { heroId: 'orisa', heroName: '오리사', role: 'tank', tier: 'A', winRate: 51, pickRate: 18 },
  { heroId: 'roadhog', heroName: '로드호그', role: 'tank', tier: 'B', winRate: 49, pickRate: 12 },
  { heroId: 'doomfist', heroName: '둠피스트', role: 'tank', tier: 'B', winRate: 48, pickRate: 9 },
  { heroId: 'genji', heroName: '겐지', role: 'damage', tier: 'S', winRate: 55, pickRate: 24 },
  { heroId: 'tracer', heroName: '트레이서', role: 'damage', tier: 'A', winRate: 52, pickRate: 20 },
  { heroId: 'cassidy', heroName: '캐서디', role: 'damage', tier: 'A', winRate: 51, pickRate: 17 },
  { heroId: 'widowmaker', heroName: '위도우메이커', role: 'damage', tier: 'B', winRate: 49, pickRate: 11 },
  { heroId: 'ana', heroName: '아나', role: 'support', tier: 'S', winRate: 56, pickRate: 26 },
  { heroId: 'mercy', heroName: '메르시', role: 'support', tier: 'A', winRate: 53, pickRate: 23 },
  { heroId: 'lucio', heroName: '루시우', role: 'support', tier: 'B', winRate: 50, pickRate: 15 },
  { heroId: 'zenyatta', heroName: '젠야타', role: 'support', tier: 'B', winRate: 48, pickRate: 10 },
];

// TODO: useTierList({ role, rank, patchVersion })로 교체 예정 - 현재는 Mock Data를 역할/티어 기준으로 클라이언트에서만 그룹핑함
export function TierListPage() {
  const [role, setRole] = useState<HeroRole | 'all'>('all');
  const [rank, setRank] = useState('전체');
  const [patchVersion, setPatchVersion] = useState(PATCH_VERSIONS[0].value);

  const tierGroups = useMemo(() => {
    const filtered = role === 'all' ? MOCK_TIER_LIST : MOCK_TIER_LIST.filter((entry) => entry.role === role);
    return TIER_ORDER.map((tier) => ({ tier, entries: filtered.filter((entry) => entry.tier === tier) }));
  }, [role]);

  const visibleEntries = useMemo(() => tierGroups.flatMap((group) => group.entries), [tierGroups]);
  const patchLabel = PATCH_VERSIONS.find((version) => version.value === patchVersion)?.label ?? patchVersion;

  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-[1600px] space-y-8 px-4 pt-6 lg:px-8">
        <section className="flex flex-col items-start justify-between gap-4 border-l-4 border-primary pl-4 md:flex-row md:items-end">
          <div>
            <h1 className="font-headline-xl text-headline-xl italic uppercase text-primary">Season 13 메타 데이터</h1>
            <p className="max-w-xl text-body-lg font-body-lg text-on-surface-variant">
              {rank} 랭크 · {patchLabel} 기준 통계입니다.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_repeat(2,minmax(160px,220px))]">
          <RoleTabs role={role} onChange={setRole} />
          <RankFilter rank={rank} onChange={setRank} />
          <PatchVersionSelect version={patchVersion} versions={PATCH_VERSIONS} onChange={setPatchVersion} />
        </section>

        <div className="space-y-10">
          {tierGroups.map(({ tier, entries }) => (
            <TierSection key={tier} tier={tier} entries={entries} />
          ))}
        </div>

        <MetaStatsSummary entries={visibleEntries} rank={rank} patchLabel={patchLabel} />
      </div>
    </div>
  );
}
