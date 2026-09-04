import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { HeroPortrait } from '../../components/hero/HeroPortrait';
import { PageContainer } from '../../components/layout/PageContainer';
import { ALL_HEROES } from '../../constants/heroes';
import { ROLE_ACCENT_COLOR, ROLE_ICON, ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';
import { PerkCard } from '../../features/perks/components/PerkCard';
import {
  HERO_PERKS,
  PERKS_CHECKED_AT,
  PERKS_PREFER_SOURCE_URL,
  type Perk,
} from '../../features/perks/data/heroPerks';
import { useDocumentMeta } from '../../lib/useDocumentMeta';

const ROLE_BAR_ACCENT: Record<string, string> = {
  tank: 'bg-tank-blue',
  damage: 'bg-damage-red',
  support: 'bg-support-yellow',
};

function PerkGroup({
  title,
  level,
  perks,
  accentClass,
}: {
  title: string;
  level: string;
  perks: readonly [Perk, Perk];
  accentClass: string;
}) {
  const preferredIndex = perks[0].preferRate >= perks[1].preferRate ? 0 : 1;

  return (
    <section className="glass-panel space-y-3 rounded-xl p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-headline-md text-on-surface">{title}</h2>
        <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">{level}</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {perks.map((perk, index) => (
          <PerkCard key={perk.name} perk={perk} preferred={index === preferredIndex} accentClass={accentClass} />
        ))}
      </div>
    </section>
  );
}

export function HeroPerkDetailPage() {
  const { heroId } = useParams<{ heroId: string }>();
  const hero = ALL_HEROES.find((h) => h.id === heroId);
  const perks = heroId ? HERO_PERKS[heroId] : undefined;

  useDocumentMeta({
    title: hero ? `${hero.name} 특전(퍽) 정리 · 선호 특전 | WatchMeta` : '영웅 특전 | WatchMeta',
    description: hero
      ? `오버워치 ${hero.name}의 마이너·메이저 특전 효과와 커뮤니티가 더 많이 고르는 특전을 확인하세요.`
      : undefined,
    path: heroId ? ROUTES.perkDetail(heroId) : undefined,
  });

  if (!hero || !perks) {
    return (
      <PageContainer>
        <div className="pt-6 text-center text-on-surface-variant">
          <p className="mb-4">특전 정보가 없는 영웅이에요.</p>
          <Link to={ROUTES.perks} className="text-sm font-semibold text-primary underline">
            특전 목록으로 돌아가기
          </Link>
        </div>
      </PageContainer>
    );
  }

  const RoleIcon = ROLE_ICON[hero.role];
  const roleLabel = ROLES.find((r) => r.id === hero.role)?.label ?? hero.role;
  const accentClass = ROLE_BAR_ACCENT[hero.role] ?? 'bg-secondary';

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-2xl space-y-5 px-4 pt-6 lg:px-8">
        <Link
          to={ROUTES.perks}
          className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          특전 목록으로 돌아가기
        </Link>

        <section className="glass-panel flex items-center gap-5 rounded-xl p-6">
          <div className="relative shrink-0">
            <HeroPortrait name={hero.name} role={hero.role} portraitUrl={hero.portraitUrl} className="h-20 w-20" />
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center rounded border border-outline-variant bg-surface-container p-0.5">
              <RoleIcon className={`h-3.5 w-3.5 ${ROLE_ACCENT_COLOR[hero.role]}`} />
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-headline-xl text-headline-lg italic text-on-surface">{hero.name}</p>
            <p className={`font-label-sm text-label-sm ${ROLE_ACCENT_COLOR[hero.role]}`}>{roleLabel} · 특전</p>
          </div>
          <Link
            to={ROUTES.heroDetail(hero.id)}
            className="ml-auto shrink-0 rounded-full border border-outline-variant px-3 py-1.5 text-xs font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
          >
            메타 지표
          </Link>
        </section>

        <PerkGroup title="마이너 특전" level="레벨 2 · 2택 1" perks={perks.minor} accentClass={accentClass} />
        <PerkGroup title="메이저 특전" level="레벨 3 · 2택 1" perks={perks.major} accentClass={accentClass} />

        <section className="glass-panel rounded-xl p-5 text-xs leading-relaxed text-on-surface-variant">
          특전 효과·이름은 인게임 한글 표기 기준이에요. <b className="text-on-surface">커뮤니티 선호율</b>은{' '}
          <a
            href={PERKS_PREFER_SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-primary"
          >
            owperks.com
          </a>{' '}
          커뮤니티 투표 집계({PERKS_CHECKED_AT} 확인)로, 플레이어들이 "가장 자주 고른다"고 응답한 비율이에요. 실제
          게임 내 채용률이나 승률과는 다를 수 있고, 두 특전 중 한쪽 값에서 나머지를 환산했어요.
        </section>
      </div>
    </div>
  );
}
