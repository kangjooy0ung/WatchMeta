import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { HeroPortrait } from '../../components/hero/HeroPortrait';
import { PageContainer } from '../../components/layout/PageContainer';
import { ALL_HEROES } from '../../constants/heroes';
import { ROLE_ACCENT_COLOR, ROLE_ICON, ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';
import { RateBar } from '../../features/tier-list/components/RateBar';
import { buildTierList, LOW_SAMPLE_PICK_RATE_THRESHOLD } from '../../features/tier-list/data/tierList';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import type { TierRank } from '../../types/tier';

const TIER_BADGE_CLASS: Record<TierRank, string> = {
  S: 'bg-tier-s',
  A: 'bg-tier-a',
  B: 'bg-tier-b',
  C: 'bg-outline',
  D: 'bg-surface-variant',
};

export function HeroDetailPage() {
  const { heroId } = useParams<{ heroId: string }>();
  const hero = ALL_HEROES.find((h) => h.id === heroId);
  useDocumentMeta({
    title: hero ? `${hero.name} 메타 분석 (픽률·승률·밴률) | WatchMeta` : '영웅 메타 분석 | WatchMeta',
    description: hero ? `오버워치 ${hero.name}의 아시아 서버 픽률·승률·밴률과 메타 티어를 확인하세요.` : undefined,
    path: heroId ? ROUTES.heroDetail(heroId) : undefined,
  });

  if (!hero) {
    return (
      <PageContainer>
        <div className="pt-6 text-center text-on-surface-variant">
          <p className="mb-4">존재하지 않는 영웅이에요.</p>
          <Link to={ROUTES.tierList} className="text-sm font-semibold text-primary underline">
            메타로 돌아가기
          </Link>
        </div>
      </PageContainer>
    );
  }

  // 필터별(랭크·서버) 상세 진입 경로가 아직 없어, 메타 화면의 기본값(전체 랭크 · 아시아)
  // 기준으로 이 영웅의 위치를 보여준다. 다른 랭크·서버 기준은 메타 화면에서 필터로 확인.
  const entry = buildTierList('전체', '아시아').find((e) => e.heroId === hero.id);
  const RoleIcon = ROLE_ICON[hero.role];
  const roleLabel = ROLES.find((r) => r.id === hero.role)?.label ?? hero.role;

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-2xl space-y-5 px-4 pt-6 lg:px-8">
        <Link
          to={ROUTES.tierList}
          className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          메타로 돌아가기
        </Link>

        <section className="glass-panel flex items-center gap-5 rounded-xl p-6">
          <div className="relative shrink-0">
            <HeroPortrait name={hero.name} role={hero.role} portraitUrl={hero.portraitUrl} className="h-20 w-20" />
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center rounded border border-outline-variant bg-surface-container p-0.5">
              <RoleIcon className={`h-3.5 w-3.5 ${ROLE_ACCENT_COLOR[hero.role]}`} />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-headline-xl text-headline-lg italic text-on-surface">{hero.name}</p>
              {hero.isNew && (
                <span
                  title="출시된 지 얼마 안 돼 메타가 아직 안정되지 않은 신규 영웅이에요"
                  className="shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-surface-container-lowest"
                >
                  신규
                </span>
              )}
            </div>
            <p className={`font-label-sm text-label-sm ${ROLE_ACCENT_COLOR[hero.role]}`}>{roleLabel}</p>
          </div>
          {entry && (
            <div
              className={`ml-auto flex h-12 w-12 shrink-0 -skew-x-[10deg] items-center justify-center ${TIER_BADGE_CLASS[entry.tier]}`}
            >
              <span className="block skew-x-[10deg] font-headline-lg italic text-white">{entry.tier}</span>
            </div>
          )}
        </section>

        {entry ? (
          <section className="glass-panel space-y-4 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-on-surface">현재 메타 지표</h2>
              {entry.lowSample && (
                <span
                  title="픽률이 낮아 승률이 표본 변동에 흔들리기 쉬워요"
                  className="rounded-full border border-outline-variant px-2 py-0.5 text-[10px] font-semibold text-on-surface-variant"
                >
                  표본 적음
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <RateBar label="픽률" percentage={entry.pickRate} colorClass="bg-primary" />
              <RateBar label="승률" percentage={entry.winRate} colorClass="bg-secondary" />
              {typeof entry.banRate === 'number' && (
                <RateBar label="밴률" percentage={entry.banRate} colorClass="bg-tier-s" />
              )}
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              아시아 서버 · 전체 랭크 · 경쟁전 기준이에요. 다른 서버·랭크 기준으로 보려면{' '}
              <Link to={ROUTES.tierList} className="underline decoration-dotted underline-offset-2 hover:text-primary">
                메타 화면
              </Link>
              에서 필터를 바꿔 확인하세요.
              {entry.pickRate < LOW_SAMPLE_PICK_RATE_THRESHOLD &&
                ' 픽률이 낮은 영웅이라 승률 변동폭이 클 수 있어요.'}
            </p>
          </section>
        ) : (
          <section className="glass-panel rounded-xl p-6 text-sm text-on-surface-variant">
            이 영웅은 아직 메타 데이터가 수집되지 않았어요.
          </section>
        )}

        <section className="glass-panel rounded-xl p-6 text-sm text-on-surface-variant">
          조합·카운터·랭크별 성능 비교 같은 심화 분석은 아직 준비 중이에요.
        </section>
      </div>
    </div>
  );
}
