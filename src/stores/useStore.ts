import { create } from "zustand";

interface AppStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const useStore = create<AppStore>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
