import { create } from 'zustand'

const useAuthStore = create((set) => ({
    currentUser: null,
    isAuthenticated: false,
    setLogin: (user) => set({ currentUser: user, isAuthenticated: true }),
    setLogout: () => set({ currentUser: null, isAuthenticated: false }),
}));

export default useAuthStore;