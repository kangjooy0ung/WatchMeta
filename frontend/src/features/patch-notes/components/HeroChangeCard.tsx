import { HeroPortrait } from '../../../components/hero/HeroPortrait';
import { ROLE_ACCENT_COLOR, ROLE_ICON } from '../../../constants/roles';
import type { PatchHeroChange } from '../../../types/patchNote';

interface HeroChangeCardProps {
  heroChange: PatchHeroChange;
}

export function HeroChangeCard({ heroChange }: HeroChangeCardProps) {
  const { hero, role, portraitUrl, description, changes } = heroChange;
  const RoleIcon = ROLE_ICON[role];

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container p-4">
      <div className="mb-2 flex items-center gap-2">
        <HeroPortrait name={hero} role={role} portraitUrl={portraitUrl} className="h-8 w-8" />
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
