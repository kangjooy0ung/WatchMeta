import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryState {
  recentSearches: string[];
  addSearch: (battleTag: string) => void;
  removeSearch: (battleTag: string) => void;
  clearSearches: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addSearch: (battleTag) =>
        set((state) => ({
          recentSearches: [battleTag, ...state.recentSearches.filter((tag) => tag !== battleTag)].slice(0, 10),
        })),
      removeSearch: (battleTag) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((tag) => tag !== battleTag),
        })),
      clearSearches: () => set({ recentSearches: [] }),
    }),
    { name: 'watchmeta-search-history' },
  ),
);
