import { ROLE_RING_COLOR } from '../../constants/roles';
import type { HeroRole } from '../../types/hero';
import { useDeferredImageLoad } from './useDeferredImageLoad';

interface HeroPortraitProps {
  name: string;
  role: HeroRole;
  portraitUrl?: string;
  className?: string;
}

export function HeroPortrait({ name, role, portraitUrl, className = 'h-8 w-8' }: HeroPortraitProps) {
  const { containerRef, shouldRenderImage, handleLoad, handleError } = useDeferredImageLoad(portraitUrl);

  return (
    <div
      ref={containerRef}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-surface-dim ${ROLE_RING_COLOR[role]} ${className}`}
    >
      {shouldRenderImage ? (
        <img src={portraitUrl} alt={name} className="h-full w-full object-cover" onLoad={handleLoad} onError={handleError} />
      ) : (
        <span className="font-headline-md italic text-on-surface">{name.slice(0, 1)}</span>
      )}
    </div>
  );
}
