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
      <label className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm transition-colors focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:ring-orange-900/40">
        <Search className="h-5 w-5 shrink-0 text-gray-400" />
        <input
          type="text"
          value={battleTag}
          onChange={(e) => setBattleTag(e.target.value)}
          placeholder="닉네임#태그 (예: Player#1234)"
          className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
        />
      </label>
      <button
        type="submit"
        className="mt-3 w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm transition-colors active:bg-orange-600"
      >
        전적 검색
      </button>
    </form>
  );
}
