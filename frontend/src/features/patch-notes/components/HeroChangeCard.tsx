import { useState } from 'react';
import { ROLE_ACCENT_COLOR, ROLE_ICON, ROLE_RING_COLOR } from '../../../constants/roles';
import type { PatchHeroChange } from '../../../types/patchNote';

interface HeroChangeCardProps {
  heroChange: PatchHeroChange;
}

function HeroPortrait({ hero, role, portraitUrl }: Pick<PatchHeroChange, 'hero' | 'role' | 'portraitUrl'>) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-surface-dim ${ROLE_RING_COLOR[role]}`}
    >
      {portraitUrl && !failed ? (
        <img
          src={portraitUrl}
          alt={hero}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-headline-md text-xs italic text-on-surface">{hero.slice(0, 1)}</span>
      )}
    </div>
  );
}

export function HeroChangeCard({ heroChange }: HeroChangeCardProps) {
  const { hero, role, portraitUrl, description, changes } = heroChange;
  const RoleIcon = ROLE_ICON[role];

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container p-4">
      <div className="mb-2 flex items-center gap-2">
        <HeroPortrait hero={hero} role={role} portraitUrl={portraitUrl} />
        <h4 className="font-headline-md text-base text-on-surface">{hero}</h4>
        <RoleIcon className={`h-3.5 w-3.5 ${ROLE_ACCENT_COLOR[role]}`} />
      </div>

      {description && <p className="mb-3 text-sm leading-relaxed text-on-surface-variant">{description}</p>}

      <div className="space-y-2">
        {changes.map((change, index) => (
          <div key={change.ability ?? index}>
            {change.ability && <p className="text-label-sm font-label-sm uppercase text-secondary">{change.ability}</p>}
            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-on-surface">
              {change.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
