import { useMemo, useState } from 'react';
import { MetaStatsSummary } from '../../features/tier-list/components/MetaStatsSummary';
import { PatchVersionSelect, type PatchVersionOption } from '../../features/tier-list/components/PatchVersionSelect';
import { RankFilter } from '../../features/tier-list/components/RankFilter';
import { RoleTabs } from '../../features/tier-list/components/RoleTabs';
import { ServerFilter } from '../../features/tier-list/components/ServerFilter';
import { TierSection } from '../../features/tier-list/components/TierSection';
import { buildTierList } from '../../features/tier-list/data/tierList';
import { PATCH_NOTES } from '../../features/patch-notes/data/patchNotes';
import type { HeroRole } from '../../types/hero';
import type { TierRank } from '../../types/tier';

const TIER_ORDER: TierRank[] = ['S', 'A', 'B', 'C', 'D'];
const ROLE_ORDER: Record<HeroRole, number> = { tank: 0, damage: 1, support: 2 };

// heroRates.ts는 패치별 스냅샷이 아니라 "가장 최근 확인 시점" 단일 데이터라, 과거 패치를 골라도
// 실제로는 같은 수치가 나온다. 그래서 선택 가능한 옵션은 실제 최신 패치 하나만 제공한다.
const CURRENT_PATCH = PATCH_NOTES[0];
const PATCH_VERSIONS: PatchVersionOption[] = [
  { value: CURRENT_PATCH.version, label: `${CURRENT_PATCH.patchDate} 패치 (최신)` },
];
export function TierListPage() {
  const [role, setRole] = useState<HeroRole | 'all'>('all');
  const [rank, setRank] = useState('전체');
  const [server, setServer] = useState('아시아');
  const [patchVersion, setPatchVersion] = useState(PATCH_VERSIONS[0].value);

  const tierList = useMemo(() => buildTierList(rank, server), [rank, server]);

  const tierGroups = useMemo(() => {
    const filtered = role === 'all' ? tierList : tierList.filter((entry) => entry.role === role);
    return TIER_ORDER.map((tier) => ({
      tier,
      entries: filtered.filter((entry) => entry.tier === tier).sort((a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role]),
    }));
  }, [tierList, role]);

  const visibleEntries = useMemo(() => tierGroups.flatMap((group) => group.entries), [tierGroups]);
  const patchLabel = PATCH_VERSIONS.find((version) => version.value === patchVersion)?.label ?? patchVersion;

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-[1600px] space-y-8 px-4 pt-6 lg:px-8">
        <section className="flex flex-col items-start justify-between gap-4 border-l-4 border-primary pl-4 md:flex-row md:items-end">
          <div>
            <h1 className="font-headline-xl text-headline-xl italic uppercase text-primary">4시즌 메타 데이터</h1>
            <p className="max-w-xl text-body-lg font-body-lg text-on-surface-variant">
              {server} 서버 · {rank} 랭크 · {patchLabel} 기준 통계입니다.
              <span className="ml-1 text-on-surface-variant/70">(경쟁전 기준)</span>
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_repeat(3,minmax(160px,220px))]">
          <RoleTabs role={role} onChange={setRole} />
          <ServerFilter server={server} onChange={setServer} />
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
