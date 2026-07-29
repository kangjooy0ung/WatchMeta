import type { PatchNote } from '../../../types/patchNote';
import { PatchSectionBlock } from './PatchSectionBlock';

interface PatchNoteCardProps {
  patchNote: PatchNote;
  defaultOpen?: boolean;
}

export function PatchNoteCard({ patchNote, defaultOpen = false }: PatchNoteCardProps) {
  return (
    <details className="glass-panel group rounded-xl p-5" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <div>
          <p className="text-label-sm font-label-sm text-on-surface-variant">{patchNote.patchDate}</p>
          <h2 className="font-headline-lg text-xl italic text-on-surface">{patchNote.title}</h2>
        </div>
        <span className="text-on-surface-variant transition-transform group-open:rotate-180">▾</span>
      </summary>

      {patchNote.highlight && (
        <p className="mt-3 rounded-lg bg-surface-container-high px-3 py-2 text-sm text-on-surface-variant">
          {patchNote.highlight}
        </p>
      )}

      <div className="mt-5 space-y-6">
        {patchNote.sections.map((section) => (
          <PatchSectionBlock key={section.title} section={section} />
        ))}
      </div>
    </details>
  );
}
