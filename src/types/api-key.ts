export type ApiKeyStatus = "PENDING" | "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  status: ApiKeyStatus;
  ips: string[];
  domains: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiKeyWithSecret extends ApiKey {
  secret: string;
}

export interface CreateApiKeyData {
  name: string;
  ips?: string[];
  domains?: string[];
}

export interface UpdateApiKeyData {
  name?: string;
  status?: ApiKeyStatus;
  ips?: string[];
  domains?: string[];
}

export interface ApiKeyListResponse {
  apiKeys: ApiKey[];
  total: number;
}

export interface CreateApiKeyResponse {
  message: string;
  apiKey: ApiKeyWithSecret;
}

export interface UpdateApiKeyResponse {
  message: string;
  apiKey: ApiKey;
}

export interface DeleteApiKeyResponse {
  message: string;
}

