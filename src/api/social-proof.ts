import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type {
  SocialProofItem,
  CreateSocialProofData,
  UpdateSocialProofData,
  SocialProofResponse,
  DeleteSocialProofResponse,
} from "@/types/social-proof";

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class SocialProofService {
  /**
   * Cria uma nova prova social para um produto
   */
  static async createSocialProof(
    productId: string,
    data: CreateSocialProofData
  ): Promise<SocialProofItem> {
    const formData = new FormData();

    // Imagem é opcional
    if (data.file) {
      formData.append("file", data.file);
    }

    formData.append("text", data.text);

    if (data.name) {
      formData.append("name", data.name);
    }

    if (data.rating !== undefined) {
      formData.append("rating", data.rating.toString());
    }

    const response = await api.post<SocialProofResponse>(
      `/theme/${productId}/social-proofs`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  }

  /**
   * Atualiza uma prova social existente
   */
  static async updateSocialProof(
    productId: string,
    proofId: string,
    data: UpdateSocialProofData
  ): Promise<SocialProofItem> {
    const formData = new FormData();

    if (data.file) {
      formData.append("file", data.file);
    }

    if (data.text !== undefined) {
      formData.append("text", data.text);
    }

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data.rating !== undefined) {
      formData.append("rating", data.rating.toString());
    }

    const response = await api.put<SocialProofResponse>(
      `/theme/${productId}/social-proofs/${proofId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  }

  /**
   * Remove uma prova social
   */
  static async deleteSocialProof(
    productId: string,
    proofId: string
  ): Promise<void> {
    await api.delete<DeleteSocialProofResponse>(
      `/theme/${productId}/social-proofs/${proofId}`
    );
  }

  /**
   * Busca todas as provas sociais de um produto
   * Nota: Esta rota não está na documentação, mas pode ser útil
   * Se não existir, retornamos array vazio
   */
  static async getSocialProofs(productId: string): Promise<SocialProofItem[]> {
    try {
      const response = await api.get<{ data: SocialProofItem[] }>(
        `/theme/${productId}/social-proofs`
      );
      return response.data.data || [];
    } catch (error) {
      // Se a rota não existir, retorna array vazio
      return [];
    }
  }
}
