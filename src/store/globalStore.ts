import { create } from 'zustand';

interface CounterState {
  cartTrigger: boolean;
  checkCart: () => void;
}

const useGlobalStore = create<CounterState>((set) => ({
  cartTrigger: true,
  checkCart: () => set((state) => ({ cartTrigger: !state.cartTrigger })),
}));

export default useGlobalStore;
