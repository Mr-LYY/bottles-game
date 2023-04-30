import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IDevPanelState {
  isDevPanelOpen: boolean;
  toggleDevPanel: () => void;
}

export const useDevPanelStore = create<IDevPanelState>()(
  devtools(
    persist(
      (set) => ({
        isDevPanelOpen: true,
        toggleDevPanel: () => set((state) => ({ isDevPanelOpen: !state.isDevPanelOpen })),
      }),
      {
        name: 'devPanelState',
      }
    )
  )
);
