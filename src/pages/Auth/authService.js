import api from "./axiosInstance";
import { tokenStorage } from "./tokenStorage";

export const authService = {
  // 1. Register
  async register(data) {
    const response = await api.post("/register", data);
    return response.data;
  },

  // 2. Login
  async login(data) {
    const response = await api.post("/login", data);
    const { accessToken, refreshToken } = response.data.data;
    tokenStorage.setTokens(accessToken, refreshToken);
    return response.data;
  },

  // 3. Logout
  async logout() {
    try {
      await api.post("/logout");
    } finally {
      tokenStorage.clearTokens();
    }
  },

  // 4. Get Current User
  async getCurrentUser() {
    const response = await api.get("/current-user");
    return response.data;
  },
};
