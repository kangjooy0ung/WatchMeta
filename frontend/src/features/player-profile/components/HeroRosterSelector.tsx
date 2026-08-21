import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { HeroImage } from '../../../components/hero/HeroImage';
import { ROUTES } from '../../../constants/routes';
import type { HeroRole } from '../../../types/hero';
import type { HeroStat } from '../../../types/player';
import { ROLE_ICON, ROLE_LABEL, ROLE_TEXT_COLOR } from '../constants/roleTheme';

interface HeroRosterSelectorProps {
  battleTag: string;
  heroStats: HeroStat[];
  activeHeroId: string;
}

const ROLE_ORDER: HeroRole[] = ['tank', 'damage', 'support'];

// 가로 스크롤 영역에 더 많은 영웅이 있다는 걸 놓치기 쉬워서, 스크롤 가능한 방향에만 화살표 버튼을
// 보여준다. 스크롤이 끝까지 갔을 때는 해당 방향 버튼을 숨겨 더 볼 게 없다는 걸 알 수 있게 한다.
function HeroScrollRow({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
  }, [children]);

  const scrollByAmount = (delta: number) => scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' });

  return (
    <div className="relative">
      <div ref={scrollRef} onScroll={updateScrollState} className="flex gap-1.5 overflow-x-auto pb-1">
        {children}
      </div>
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByAmount(-140)}
          aria-label="왼쪽으로 스크롤"
          className="absolute -left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant bg-surface-container-high/90 text-on-surface-variant shadow-sm backdrop-blur hover:text-primary"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByAmount(140)}
          aria-label="오른쪽으로 스크롤"
          className="absolute -right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant bg-surface-container-high/90 text-on-surface-variant shadow-sm backdrop-blur hover:text-primary"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export function HeroRosterSelector({ battleTag, heroStats, activeHeroId }: HeroRosterSelectorProps) {
  return (
    <section className="glass-panel rounded-xl p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-headline-lg text-headline-md italic uppercase text-on-surface">Heroes</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">영웅 선택</span>
      </div>

      <div className="flex flex-col gap-3">
        {ROLE_ORDER.map((role) => {
          const heroes = heroStats.filter((hero) => hero.role === role);
          if (heroes.length === 0) return null;
          const Icon = ROLE_ICON[role];

          return (
            <div key={role}>
              <div className="mb-1.5 flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${ROLE_TEXT_COLOR[role]}`} />
                <span className={`font-label-sm text-[10px] uppercase tracking-wider ${ROLE_TEXT_COLOR[role]}`}>
                  {ROLE_LABEL[role]}
                </span>
              </div>
              <HeroScrollRow>
                {heroes.map((hero) => {
                  const isActive = hero.heroId === activeHeroId;
                  const isPlayed = hero.gamesPlayed > 0;
                  return (
                    <Link
                      key={hero.heroId}
                      to={ROUTES.profileHero(battleTag, hero.heroId)}
                      title={hero.heroName}
                      className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        isActive
                          ? 'border-primary'
                          : 'border-transparent hover:border-outline-variant'
                      }`}
                    >
                      <HeroImage
                        src={hero.portraitUrl}
                        alt={hero.heroName}
                        className={`h-full w-full object-cover ${isPlayed ? '' : 'opacity-30 grayscale'}`}
                      />
                    </Link>
                  );
                })}
              </HeroScrollRow>
            </div>
          );
        })}
      </div>
    </section>
  );
}
