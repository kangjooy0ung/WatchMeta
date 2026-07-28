import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyProfileState {
  myBattleTag: string | null;
  setMyBattleTag: (battleTag: string) => void;
  clearMyBattleTag: () => void;
}

export const useMyProfileStore = create<MyProfileState>()(
  persist(
    (set) => ({
      myBattleTag: null,
      setMyBattleTag: (battleTag) => set({ myBattleTag: battleTag }),
      clearMyBattleTag: () => set({ myBattleTag: null }),
    }),
    { name: 'watchmeta-my-profile' },
  ),
);
