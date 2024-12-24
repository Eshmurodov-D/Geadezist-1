// import create from "zustand";

import { create } from "zustand";
import { AuthState, Role } from "../types/roles";

const useAuthStore = create<AuthState>((set) => ({
  role: null,  // Boshlang‘ich holat null
  login: (role: Role) => set({ role }), 
  // Login qilish
  logout: () => set({ role: null }), // Logout qilish
}));

export default useAuthStore;
