import { Search } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useSearchHistoryStore } from '../../../store/useSearchHistoryStore';

interface SearchBarProps {
  onSearch: (battleTag: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [battleTag, setBattleTag] = useState('');
  const addSearch = useSearchHistoryStore((state) => state.addSearch);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = battleTag.trim();
    if (!trimmed) return;

    addSearch(trimmed);
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-4 py-3 transition-colors focus-within:border-primary">
        <Search className="h-5 w-5 shrink-0 text-on-surface-variant" />
        <input
          type="text"
          value={battleTag}
          onChange={(e) => setBattleTag(e.target.value)}
          placeholder="닉네임#태그 (예: Player#1234)"
          className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
        />
      </label>
      <button
        type="submit"
        className="mt-3 w-full -skew-x-[10deg] bg-primary py-3 text-sm font-bold text-surface-container-lowest transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(255,194,127,0.5)]"
      >
        <span className="block skew-x-[10deg]">전적 검색</span>
      </button>
    </form>
  );
}
