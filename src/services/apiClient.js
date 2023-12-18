import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth.js";

const apiClient = axios.create({
  baseURL: "https://dist.nd.ru/api/",
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const access = authStore?.authTokens?.tokens?.accessToken;
    if (access) config.headers.Authorization = `Bearer ${access}`;

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    if (error?.response?.status === 401) {
      await router.push({ name: "HomeView" });
      await authStore.logoutUser();
    }
    // await router.push({ name: "HomeView" });

    return Promise.reject(error);
  }
);

export default apiClient;
