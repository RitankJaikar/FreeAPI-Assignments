import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authService } from "./authService";
import { tokenStorage } from "./tokenStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Initial Check (Refresh hone par user data fetch karna)
  const initAuth = useCallback(async () => {
    const token = tokenStorage.getAccessToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await authService.getCurrentUser();
      setUser(res.data);
    } catch (err) {
      console.error("Auth initialization failed:", err.message);
      tokenStorage.clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // 2. Global Logout (State + Storage dono clear karega)
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      // tokenStorage.clearTokens() already authService.logout ke finally mein hai
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
