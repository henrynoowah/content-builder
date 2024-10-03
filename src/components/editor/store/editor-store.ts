// src/stores/counter-store.ts
import { Block, Section } from "@src/types";
import { createStore } from "zustand/vanilla";

export type CounterState = {
  section?: Section;
  block?: Block;
};

export type CounterActions = {
  setBlock: (block: Block) => void;
};

export type CounterStore = CounterState & CounterActions;

export const defaultInitState: CounterState = {};

export const createCounterStore = (
  initState: CounterState = defaultInitState
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    setBlock: (block) => set((state) => ({ ...state, block })),
  }));
};
