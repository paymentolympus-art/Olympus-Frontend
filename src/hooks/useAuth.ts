import { useState, useEffect } from "react";
import { clearSessionToken } from "@/lib/cookies";
import { getUserData, clearAuthData, type UserData } from "@/lib/local-storage";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);

  // Função para verificar autenticação
  const checkAuthentication = () => {
    try {
      const userData = getUserData();
      const authenticated = !!userData;
      setIsAuthenticated(authenticated);
      setUser(userData);

      return authenticated;
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Verificação inicial de autenticação
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      checkAuthentication();
    };

    initializeAuth();
  }, []);

  const logout = () => {
    clearSessionToken();
    clearAuthData();
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
  };

  const checkAuth = () => {
    return checkAuthentication();
  };

  const updateUser = (userData: UserData) => {
    setUser(userData);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    logout,
    checkAuth,
    updateUser,
  };
};
