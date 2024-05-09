import { create } from 'zustand'

const useAuthStore = create((set) => ({
    currentUser: null,
    isAuthenticated: false,
    setlogin: (user) => set({ currentUser: user, isAuthenticated: true }),
    setlogout: () => set({ currentUser: null, isAuthenticated: false }),
}));

export default useAuthStore;