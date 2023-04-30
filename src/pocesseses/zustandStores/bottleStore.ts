import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IBottleState {
  chosenBottle: null | number;
  setChosenBottle: (bottleId: number | null) => void;
  filledBottles: string[][];
  setFilledBottles: (bottles: string[][]) => void;
}

export const useBottleStore = create<IBottleState>()(
  devtools(
    persist(
      (set) => ({
        chosenBottle: null,
        setChosenBottle: (bottleId) => set(() => ({ chosenBottle: bottleId })),
        filledBottles: [[]],
        setFilledBottles: (bottles) => set(() => ({ filledBottles: bottles })),
      }),
      {
        name: 'bottleState',
      }
    )
  )
);
