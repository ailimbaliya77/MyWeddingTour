import { create } from "zustand";

const useWeddingStore = create((set) => ({
  weddings: [],

  addWedding: (wedding) =>
    set((state) => ({
      weddings: [...state.weddings, wedding],
    })),
}));

export default useWeddingStore;
