import { atom } from "jotai";

export const activeCountAtom = atom(0);

export const incrementActiveCountAtom = atom(
  (get) => activeCountAtom,
  (get, set) => set(activeCountAtom, get(activeCountAtom) + 1),
);
export const decrementActiveCountAtom = atom(
  (get) => activeCountAtom,
  (get, set) => set(activeCountAtom, get(activeCountAtom) - 1),
);

export const iterationCountAtom = atom(0);
