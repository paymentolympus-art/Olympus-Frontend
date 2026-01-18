import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type {
  ApiKey,
  CreateApiKeyData,
  UpdateApiKeyData,
  ApiKeyListResponse,
  CreateApiKeyResponse,
  UpdateApiKeyResponse,
  DeleteApiKeyResponse,
} from "@/types/api-key";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class ApiKeyService {
  // Listar API Keys
  static async getApiKeys(): Promise<ApiKeyListResponse> {
    const response = await api.get("/api-keys");
    return response.data.data;
  }

  // Criar API Key
  static async createApiKey(data: CreateApiKeyData): Promise<CreateApiKeyResponse> {
    const response = await api.post("/api-keys", data);
    return response.data.data;
  }

  // Atualizar API Key
  static async updateApiKey(
    id: string,
    data: UpdateApiKeyData
  ): Promise<UpdateApiKeyResponse> {
    const response = await api.put(`/api-keys/${id}`, data);
    return response.data.data;
  }

  // Deletar API Key
  static async deleteApiKey(id: string): Promise<DeleteApiKeyResponse> {
    const response = await api.delete(`/api-keys/${id}`);
    return response.data.data;
  }

  // Buscar API Key por ID
  static async getApiKeyById(id: string): Promise<{ apiKey: ApiKey }> {
    const response = await api.get(`/api-keys/${id}`);
    return response.data.data;
  }
}

