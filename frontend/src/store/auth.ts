import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";
import { isServer } from "@/lib/utils";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (token: string, user: AuthUser) => {
        if (!isServer()) {
          localStorage.setItem("auth_token", token);
          localStorage.setItem("auth_user", JSON.stringify(user));
        }
        set({
          token,
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        if (!isServer()) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updatedUser: Partial<AuthUser>) => {
        const currentUser = get().user;
        if (currentUser) {
          const newUser = { ...currentUser, ...updatedUser };
          if (!isServer()) {
            localStorage.setItem("auth_user", JSON.stringify(newUser));
          }
          set({
            user: newUser,
          });
        }
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() =>
        isServer()
          ? {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
          : localStorage
      ),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
