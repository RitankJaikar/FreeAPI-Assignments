import axios from "axios";
import { tokenStorage } from "./tokenStorage";

const API_BASE_URL = "https://api.freeapi.app/api/v1/users";

// Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();

    // 📌 TESTING: Log outgoing request
    console.group(
      `🚀 REQUEST INTERCEPTOR - ${config.method?.toUpperCase()} ${config.url}`,
    );
    console.log("Request Config:", config);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Access Token Added:", token.substring(0, 20) + "...");
    } else {
      console.warn("⚠️ No Access Token Found");
    }
    console.groupEnd();

    return config;
  },
  (error) => {
    console.error("❌ Request Interceptor Error:", error);
    return Promise.reject(error);
  },
);

// --- Response Interceptor (Silent Refresh Logic) ---
api.interceptors.response.use(
  (response) => {
    // 📌 TESTING: Log successful response
    console.group(
      `✅ RESPONSE INTERCEPTOR - ${response.status} ${response.config.url}`,
    );
    console.log("Response Data:", response.data);
    console.groupEnd();
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 📌 TESTING: Log 401 error detection
    console.group("⚠️ RESPONSE ERROR HANDLER");
    console.error("Error Status:", error.response?.status);
    console.error(
      "Error Message:",
      error.response?.data?.message || error.message,
    );
    console.log("Original Request URL:", originalRequest?.url);

    // Agar 401 error hai aur humne abhi tak retry nahi kiya hai
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 401 Detected! Attempting Token Refresh...");
      originalRequest._retry = true; // custom flag - to prevent infinite loop of req/res

      try {
        const currentRefreshToken = tokenStorage.getRefreshToken();
        console.log(
          "📝 Current Refresh Token:",
          currentRefreshToken?.substring(0, 20) + "...",
        );

        // Refresh token API call
        console.log("🔗 Calling Refresh Token API...");
        const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
          refreshToken: currentRefreshToken,
        });

        const { accessToken, refreshToken } = response.data.data;

        // Naye tokens save karo
        console.log("💾 Saving New Tokens...");
        tokenStorage.setTokens(accessToken, refreshToken);
        console.log(
          "✅ New Access Token:",
          accessToken.substring(0, 20) + "...",
        );
        console.log(
          "✅ New Refresh Token:",
          refreshToken.substring(0, 20) + "...",
        );

        // Purani request mein naya token dalo aur dubara bhej do
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log("🔁 Retrying Original Request with New Token...");
        console.groupEnd();
        return api(originalRequest);
      } catch (refreshError) {
        // Agar refresh token bhi expire ho gaya hai, toh logout karwa do
        console.error("❌ Token Refresh Failed!");
        console.error(
          "Refresh Error:",
          refreshError.response?.data?.message || refreshError.message,
        );
        console.log("🚪 Clearing Tokens and Redirecting to Login...");
        tokenStorage.clearTokens();
        window.location.href = "/auth/login";
        console.groupEnd();
        return Promise.reject(refreshError);
      }
    }
    console.groupEnd();
    return Promise.reject(error);
  },
);

export default api;
