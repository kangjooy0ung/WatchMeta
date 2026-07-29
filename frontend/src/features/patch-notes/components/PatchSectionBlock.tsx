import type { PatchSection } from '../../../types/patchNote';
import { HeroChangeCard } from './HeroChangeCard';

interface PatchSectionBlockProps {
  section: PatchSection;
}

export function PatchSectionBlock({ section }: PatchSectionBlockProps) {
  return (
    <div>
      <h3 className="mb-3 border-l-4 border-primary pl-3 font-headline-md text-lg text-primary">{section.title}</h3>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mb-2 text-sm leading-relaxed text-on-surface-variant">
          {paragraph}
        </p>
      ))}

      {section.bullets && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-on-surface">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {section.heroes && (
        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
          {section.heroes.map((heroChange) => (
            <HeroChangeCard key={heroChange.hero} heroChange={heroChange} />
          ))}
        </div>
      )}
    </div>
  );
}
