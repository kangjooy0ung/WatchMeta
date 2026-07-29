import { useState } from 'react';
import { ROLE_RING_COLOR } from '../../constants/roles';
import type { HeroRole } from '../../types/hero';

interface HeroPortraitProps {
  name: string;
  role: HeroRole;
  portraitUrl?: string;
  className?: string;
}

export function HeroPortrait({ name, role, portraitUrl, className = 'h-8 w-8' }: HeroPortraitProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-surface-dim ${ROLE_RING_COLOR[role]} ${className}`}
    >
      {portraitUrl && !failed ? (
        <img
          src={portraitUrl}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-headline-md italic text-on-surface">{name.slice(0, 1)}</span>
      )}
    </div>
  );
}
