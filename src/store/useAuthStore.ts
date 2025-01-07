import { create } from 'zustand';

interface AuthState {
  userId: string | null;
  setUserId: (userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
  logout: () => set({ userId: null }),
}));