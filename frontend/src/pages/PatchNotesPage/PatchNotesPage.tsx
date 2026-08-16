import { PatchNoteCard } from '../../features/patch-notes/components/PatchNoteCard';
import { PATCH_NOTES, PATCH_NOTES_SOURCE_URL } from '../../features/patch-notes/data/patchNotes';

export function PatchNotesPage() {
  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 pt-6 lg:px-8">
        <section className="border-l-4 border-primary pl-4">
          <h1 className="font-headline-xl text-headline-xl italic uppercase text-primary">패치 노트</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            오버워치 공식 패치 노트를 기반으로 정리한 최신 영웅 밸런스 변경 사항입니다.
          </p>
        </section>

        <div className="space-y-4">
          {PATCH_NOTES.map((patchNote, index) => (
            <PatchNoteCard key={patchNote.version} patchNote={patchNote} defaultOpen={index === 0} />
          ))}
        </div>

        <p className="text-label-sm font-label-sm text-on-surface-variant">
          출처:{' '}
          <a href={PATCH_NOTES_SOURCE_URL} target="_blank" rel="noreferrer" className="underline">
            블리자드 공식 패치 노트
          </a>
        </p>
      </div>
    </div>
  );
}
