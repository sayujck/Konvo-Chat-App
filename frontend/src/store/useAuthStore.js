import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore = create((set) => ({
    authuser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authuser: res.data })
        } catch (error) {
            console.log(error);
            set({ authuser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {

    }

}))