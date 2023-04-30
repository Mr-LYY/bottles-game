import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IGameSettingsState {
  isGameActive: boolean;
  setIsGameActive: (isActive: boolean) => void;
}

export const useGameSettingsStore = create<IGameSettingsState>()(
  devtools(
    persist(
      (set) => ({
        isGameActive: false,
        setIsGameActive: (isActive) => set(() => ({ isGameActive: isActive })),
      }),
      {
        name: 'gameSettingsState',
      }
    )
  )
);
