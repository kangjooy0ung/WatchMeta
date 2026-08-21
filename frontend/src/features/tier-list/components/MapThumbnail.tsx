import { Link } from 'react-router-dom';
import { useDeferredImageLoad } from '../../../components/hero/useDeferredImageLoad';
import type { MapMeta } from '../../../types/mapStats';

interface MapThumbnailProps {
  map: MapMeta;
  href: string;
  isActive: boolean;
}

export function MapThumbnail({ map, href, isActive }: MapThumbnailProps) {
  const { containerRef, shouldRenderImage, handleLoad, handleError } = useDeferredImageLoad<HTMLAnchorElement>(
    map.screenshot,
  );

  return (
    <Link
      to={href}
      ref={containerRef}
      className={`group relative block aspect-video overflow-hidden rounded-2xl border-2 transition-colors ${
        isActive ? 'border-primary' : 'border-transparent hover:border-outline-variant'
      }`}
    >
      {shouldRenderImage ? (
        <img
          src={map.screenshot}
          alt={map.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface-dim">
          <span className="font-headline-md italic text-on-surface">{map.name.slice(0, 1)}</span>
        </div>
      )}
      <div className="hero-card-gradient absolute inset-0 flex items-end p-2">
        <p className="line-clamp-2 font-headline-md text-xs leading-tight text-white [word-break:keep-all]">
          {map.name}
        </p>
      </div>
    </Link>
  );
}
