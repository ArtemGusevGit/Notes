import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import apiClient from "@/services/apiClient.js";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      authTokens: useStorage("authTokens", {
        tokens: null,
      }),
      userData: useStorage("userData", {
        userData: null,
      }),
    };
  },

  getters: {
    isUserAuthenticated: (state) => Boolean(state.authTokens.tokens),
  },

  actions: {
    async signInUser(payload) {
      try {
        const { data } = await apiClient.post("/auth", payload);
        this.authTokens = {
          tokens: data,
        };
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async signUpUser(payload) {
      try {
        await apiClient.post("/reg", payload);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async getUserData() {
      try {
        const { data } = await apiClient.get("/auth");
        this.userData = {
          userEmail: data.email,
        };
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async logoutUser() {
      try {
        // await apiClient.delete("/auth");
        this.authTokens = {
          tokens: null,
        };
        this.userData = {
          userEmail: null,
        };
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    // async refreshTokenSend() {},
  },
});
