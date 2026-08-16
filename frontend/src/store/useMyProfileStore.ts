import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MyProfile {
  playerId: string;
  label: string;
}

interface MyProfileState {
  myProfile: MyProfile | null;
  setMyProfile: (profile: MyProfile) => void;
  clearMyProfile: () => void;
}

export const useMyProfileStore = create<MyProfileState>()(
  persist(
    (set) => ({
      myProfile: null,
      setMyProfile: (profile) => set({ myProfile: profile }),
      clearMyProfile: () => set({ myProfile: null }),
    }),
    { name: 'watchmeta-my-profile-v2' },
  ),
);
