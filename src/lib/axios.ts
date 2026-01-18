import axios from "axios";
import { clearSessionToken } from "@/lib/cookies";
import { clearAuthData } from "@/lib/local-storage";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Verifica se está em um domínio customizado de checkout
 * (não é o domínio principal do gateway)
 */
function isCheckoutCustomDomain(): boolean {
  const hostname = window.location.hostname;
  
  // Domínios principais do gateway (onde mostra o dashboard completo)
  const mainDomains = [
    "olympuspayment.com.br",
    "www.olympuspayment.com.br",
    "olympus-frontend-swart.vercel.app",
    "localhost",
    "127.0.0.1",
  ];
  
  // Se não está em nenhum domínio principal, é um domínio customizado
  return !mainDomains.some(domain => hostname.includes(domain));
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // NÃO redirecionar para login se:
    // 1. É a rota de autenticação
    // 2. Está em um domínio customizado de checkout (usuário não precisa estar logado)
    if (
      error.config.url !== "/auth/session" &&
      error.response?.status === 401 &&
      !isCheckoutCustomDomain() // Só redireciona se NÃO for domínio customizado
    ) {
      clearSessionToken();
      clearAuthData();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
