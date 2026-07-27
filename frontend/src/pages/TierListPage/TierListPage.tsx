import { useMemo, useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { PatchVersionSelect, type PatchVersionOption } from '../../features/tier-list/components/PatchVersionSelect';
import { RankFilter } from '../../features/tier-list/components/RankFilter';
import { RoleTabs } from '../../features/tier-list/components/RoleTabs';
import { TierRankCard } from '../../features/tier-list/components/TierRankCard';
import type { HeroRole } from '../../types/hero';
import type { TierListEntry, TierRank } from '../../types/tier';

const TIER_ORDER: Record<TierRank, number> = { S: 0, A: 1, B: 2, C: 3, D: 4 };

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

// TODO: useTierList({ role, rank, patchVersion })로 교체 예정 - 랭크·패치 필터는 현재 UI만 연결됨 (Mock Data는 필터링 안 됨)
export function TierListPage() {
  const [role, setRole] = useState<HeroRole>('tank');
  const [rank, setRank] = useState('전체');
  const [patchVersion, setPatchVersion] = useState(PATCH_VERSIONS[0].value);

  const entries = useMemo(
    () =>
      MOCK_TIER_LIST.filter((entry) => entry.role === role).sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]),
    [role],
  );

  return (
    <PageContainer>
      <RoleTabs activeRole={role} onChange={setRole} />

      <div className="flex gap-2 pt-3">
        <RankFilter rank={rank} onChange={setRank} />
        <PatchVersionSelect version={patchVersion} versions={PATCH_VERSIONS} onChange={setPatchVersion} />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4">
        {entries.map((entry) => (
          <TierRankCard key={entry.heroId} entry={entry} />
        ))}
      </div>
    </PageContainer>
  );
}
