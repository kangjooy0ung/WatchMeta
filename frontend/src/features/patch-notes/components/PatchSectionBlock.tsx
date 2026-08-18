import type { PatchSection } from '../../../types/patchNote';
import { HeroChangeCard } from './HeroChangeCard';

interface PatchSectionBlockProps {
  section: PatchSection;
  heroFilter?: string;
}

export function PatchSectionBlock({ section, heroFilter }: PatchSectionBlockProps) {
  const isFiltering = Boolean(heroFilter);
  const matchedHeroes = section.heroes?.filter((h) => h.hero.toLowerCase().includes(heroFilter ?? ''));

  // 영웅 검색 중에는 영웅 변경점이 없는 섹션(이벤트 공지, 일반 버그 수정 등)은 결과에서 제외해
  // 검색한 영웅 관련 내용만 보이게 한다.
  if (isFiltering && (!matchedHeroes || matchedHeroes.length === 0)) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-3 border-l-4 border-primary pl-3 font-headline-md text-lg text-primary">{section.title}</h3>

      {!isFiltering &&
        section.paragraphs?.map((paragraph) => (
          <p key={paragraph} className="mb-2 text-sm leading-relaxed text-on-surface-variant">
            {paragraph}
          </p>
        ))}

      {!isFiltering && section.bullets && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-on-surface">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {matchedHeroes && (
        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
          {matchedHeroes.map((heroChange) => (
            <HeroChangeCard key={heroChange.hero} heroChange={heroChange} />
          ))}
        </div>
      )}
    </div>
  );
}
