import { useMemo, useState } from 'react';
import { MetaStatsSummary } from '../../features/tier-list/components/MetaStatsSummary';
import { PatchVersionSelect, type PatchVersionOption } from '../../features/tier-list/components/PatchVersionSelect';
import { RankFilter } from '../../features/tier-list/components/RankFilter';
import { RoleTabs } from '../../features/tier-list/components/RoleTabs';
import { TierSection } from '../../features/tier-list/components/TierSection';
import { MOCK_TIER_LIST } from '../../features/tier-list/data/mockTierList';
import type { HeroRole } from '../../types/hero';
import type { TierRank } from '../../types/tier';

const TIER_ORDER: TierRank[] = ['S', 'A', 'B', 'C', 'D'];
const ROLE_ORDER: Record<HeroRole, number> = { tank: 0, damage: 1, support: 2 };

const PATCH_VERSIONS: PatchVersionOption[] = [
  { value: '10.5', label: '10.5 패치 (최신)' },
  { value: '10.4', label: '10.4 패치' },
  { value: '10.3', label: '10.3 패치' },
];

// TODO: useTierList({ role, rank, patchVersion })로 교체 예정 - 현재는 Mock Data를 역할/티어 기준으로 클라이언트에서만 그룹핑함
export function TierListPage() {
  const [role, setRole] = useState<HeroRole | 'all'>('all');
  const [rank, setRank] = useState('전체');
  const [patchVersion, setPatchVersion] = useState(PATCH_VERSIONS[0].value);

  const tierGroups = useMemo(() => {
    const filtered = role === 'all' ? MOCK_TIER_LIST : MOCK_TIER_LIST.filter((entry) => entry.role === role);
    return TIER_ORDER.map((tier) => ({
      tier,
      entries: filtered.filter((entry) => entry.tier === tier).sort((a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role]),
    }));
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
