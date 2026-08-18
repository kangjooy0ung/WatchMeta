import { ChevronDown } from 'lucide-react';
import { PATCH_NOTES_SOURCE_URL } from '../data/patchNotes';
import type { PatchNote } from '../../../types/patchNote';
import { PatchSectionBlock } from './PatchSectionBlock';

interface PatchNoteCardProps {
  patchNote: PatchNote;
  defaultOpen?: boolean;
  heroFilter?: string;
}

// title에는 소스 페이지에 적힌 게시일이 그대로 들어있는데, 이 값이 patchDate(패치 적용일 기준,
// version과 정렬 기준을 맞춘 값)와 하루씩 어긋나는 항목이 있다. 같은 카드에 서로 다른 날짜
// 두 개를 보여주지 않도록, 제목에서는 날짜 부분을 떼어내고 patchDate 하나만 표시한다.
function stripTrailingDate(title: string): string {
  return title.replace(/\s*-\s*\d{4}년\s*\d{1,2}월\s*\d{1,2}일\s*$/, '');
}

export function PatchNoteCard({ patchNote, defaultOpen = false, heroFilter }: PatchNoteCardProps) {
  return (
    <details className="glass-panel group rounded-xl p-5" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <div>
          <p className="text-label-sm font-label-sm text-on-surface-variant">{patchNote.patchDate}</p>
          <h2 className="font-headline-lg text-xl italic text-on-surface">{stripTrailingDate(patchNote.title)}</h2>
        </div>
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-on-surface-variant transition-transform group-open:rotate-180"
        />
      </summary>

      {patchNote.highlight && (
        <p className="mt-3 rounded-lg bg-surface-container-high px-3 py-2 text-sm text-on-surface-variant">
          {patchNote.highlight}
        </p>
      )}

      <div className="mt-5 space-y-6">
        {patchNote.sections.map((section) => (
          <PatchSectionBlock key={section.title} section={section} heroFilter={heroFilter} />
        ))}
      </div>

      <a
        href={PATCH_NOTES_SOURCE_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block text-xs text-on-surface-variant underline decoration-dotted underline-offset-2 hover:text-primary"
      >
        원문 보기
      </a>
    </details>
  );
}
