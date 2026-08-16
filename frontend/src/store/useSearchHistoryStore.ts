import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RecentSearchEntry {
  playerId: string;
  label: string;
}

interface SearchHistoryState {
  recentSearches: RecentSearchEntry[];
  addSearch: (entry: RecentSearchEntry) => void;
  removeSearch: (playerId: string) => void;
  clearSearches: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addSearch: (entry) =>
        set((state) => ({
          recentSearches: [entry, ...state.recentSearches.filter((s) => s.playerId !== entry.playerId)].slice(0, 10),
        })),
      removeSearch: (playerId) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((s) => s.playerId !== playerId),
        })),
      clearSearches: () => set({ recentSearches: [] }),
    }),
    { name: 'watchmeta-search-history-v2' },
  ),
);
