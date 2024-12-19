// import create from "zustand";

import { create } from "zustand";
import { AuthState, User } from "../types/roles";
import axiosConfiguration from "@/services/axios";

const useAuthStore = create<AuthState>((set) => ({
  user: null, // Boshlang‘ich holat null
  login: (user: User) => set({ user }),
  getMe: async () => {
    try {
      const { data } = await axiosConfiguration.get("user/get/me");
      set({ user: data.body });
    } catch (error) {
      console.log(error);
    }
  },
  // Login qilish
  logout: () => set({ user: null }), // Logout qilish
}));

export default useAuthStore;
