import { create } from 'zustand';

interface MockUser {
  email: string;
  uid: string;
}

interface AuthState {
  user: MockUser | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  setUser: (user: MockUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // Start with loading true
  error: null,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setInitialized: (isInitialized) => set({ isInitialized }),
}));
