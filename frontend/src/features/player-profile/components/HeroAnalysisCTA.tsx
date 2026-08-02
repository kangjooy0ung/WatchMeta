import { ChartColumn, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

interface HeroAnalysisCTAProps {
  battleTag: string;
  heroId: string;
}

export function HeroAnalysisCTA({ battleTag, heroId }: HeroAnalysisCTAProps) {
  return (
    <Link
      to={ROUTES.profileHero(battleTag, heroId)}
      className="group flex items-center justify-between gap-3 rounded-xl border-2 border-primary bg-primary/10 p-4 transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(255,194,127,0.4)] active:scale-[0.98]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-surface-container-lowest">
          <ChartColumn className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-headline-md text-sm italic text-primary">영웅별 전적 분석</p>
          <p className="truncate font-label-sm text-[11px] text-on-surface-variant">
            영웅마다 승률·KDA를 자세히 확인해 보세요
          </p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
