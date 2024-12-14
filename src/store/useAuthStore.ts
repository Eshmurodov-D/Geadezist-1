// import create from "zustand";

import { create } from "zustand";
import { AuthState, User } from "../types/roles";

const useAuthStore = create<AuthState>((set) => ({
  user: null,  // Boshlang‘ich holat null
  login: (user: User) => set({ user }), 
  // Login qilish
  logout: () => set({ user: null }), // Logout qilish
}));

export default useAuthStore;
