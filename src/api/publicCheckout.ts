import api from "@/lib/axios";
import type {
  CheckoutApiResponse,
} from "@checkout-layout/types/checkout";

/**
 * Serviço para checkout público (sem autenticação)
 */
export class PublicCheckoutService {
  /**
   * Busca dados completos do checkout público por slug
   * Esta rota NÃO requer autenticação
   */
  static async getPublicCheckoutBySlug(
    slug: string
  ): Promise<CheckoutApiResponse> {
    // Determinar a URL base da API
    // Quando o frontend está em um domínio customizado (ex: pay.testandogat.shop),
    // ele precisa buscar dados do backend (olympus-payment.vercel.app)
    let backendUrl = import.meta.env.VITE_URL || "https://olympus-payment.vercel.app";
    
    // Se estiver em localhost, usar localhost do backend
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      backendUrl = import.meta.env.VITE_URL || "http://localhost:3000";
    }
    
    // Se o frontend estiver no mesmo domínio do backend (ex: olympuspayment.com.br),
    // usar caminho relativo
    const isSameOrigin = window.location.hostname.includes("olympuspayment.com.br") ||
                         window.location.hostname.includes("olympus-payment.vercel.app");
    
    if (isSameOrigin && !backendUrl.includes("localhost")) {
      backendUrl = "";
    }
    
    // Fazer requisição direta sem o interceptor de auth
    const response = await fetch(`${backendUrl}/checkout/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao carregar checkout");
    }

    const result = await response.json();
    
    // A resposta vem como { data: { product, theme } }
    // Precisamos retornar no formato CheckoutApiResponse
    return {
      product: result.data.product,
      theme: result.data.theme,
    };
  }
}

