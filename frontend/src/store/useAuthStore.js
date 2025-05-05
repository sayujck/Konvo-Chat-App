import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            if (res.data.success === false) {
                set({ authUser: null })
                return
            }
            set({ authUser: res.data })
        } catch (error) {
            console.log(error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            toast.success("Account created successfully")
            set({ authUser: res.data })
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            if (res.data.success === false) {
                toast.error(res.data.message)
                return
            }
            toast.success("Logged in successfully")
            set({ authUser: res.data.user })
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile', data)
            set({ authUser: res.data })
            toast.success("Profile update successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    }

}))