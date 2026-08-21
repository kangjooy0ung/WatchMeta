import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ROUTES } from '../../constants/routes';
import { PatchNoteCard } from '../../features/patch-notes/components/PatchNoteCard';
import { PATCH_NOTES, PATCH_NOTES_SOURCE_URL } from '../../features/patch-notes/data/patchNotes';
import { useDocumentMeta } from '../../lib/useDocumentMeta';

export function PatchNotesPage() {
  useDocumentMeta({
    title: '오버워치 패치 노트 정리 | WatchMeta',
    description: '오버워치 공식 패치 노트를 기반으로 정리한 최신 영웅 밸런스 변경 사항을 확인하세요.',
    path: ROUTES.patchNotes,
  });
  const [heroSearch, setHeroSearch] = useState('');
  const normalizedSearch = heroSearch.trim().toLowerCase();

  const filteredNotes = useMemo(() => {
    if (!normalizedSearch) return PATCH_NOTES;
    return PATCH_NOTES.filter((note) =>
      note.sections.some((section) =>
        section.heroes?.some((hero) => hero.hero.toLowerCase().includes(normalizedSearch)),
      ),
    );
  }, [normalizedSearch]);

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 pt-6 lg:px-8">
        <section className="border-l-4 border-primary pl-4">
          <h1 className="font-headline-xl text-headline-xl italic uppercase text-primary">패치 노트</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            오버워치 공식 패치 노트를 기반으로 정리한 최신 영웅 밸런스 변경 사항입니다.
          </p>
        </section>

        <label className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-4 py-2.5 transition-colors focus-within:border-primary">
          <Search className="h-4 w-4 shrink-0 text-on-surface-variant" />
          <input
            type="text"
            value={heroSearch}
            onChange={(e) => setHeroSearch(e.target.value)}
            placeholder="영웅 이름으로 변경 내역 검색 (예: 겐지)"
            className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
          />
        </label>

        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <p className="py-6 text-center text-sm text-on-surface-variant">
              '{heroSearch}' 관련 변경 내역을 찾지 못했어요.
            </p>
          ) : (
            filteredNotes.map((patchNote, index) => (
              <PatchNoteCard
                key={patchNote.version}
                patchNote={patchNote}
                defaultOpen={Boolean(normalizedSearch) || index === 0}
                heroFilter={normalizedSearch || undefined}
              />
            ))
          )}
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
