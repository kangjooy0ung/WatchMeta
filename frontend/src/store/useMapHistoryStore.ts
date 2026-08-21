import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RecentMapEntry {
  mapKey: string;
  mapName: string;
}

interface MapHistoryState {
  recentMaps: RecentMapEntry[];
  addMap: (entry: RecentMapEntry) => void;
}

export const useMapHistoryStore = create<MapHistoryState>()(
  persist(
    (set) => ({
      recentMaps: [],
      addMap: (entry) =>
        set((state) => ({
          recentMaps: [entry, ...state.recentMaps.filter((m) => m.mapKey !== entry.mapKey)].slice(0, 6),
        })),
    }),
    { name: 'watchmeta-map-history-v1' },
  ),
);
