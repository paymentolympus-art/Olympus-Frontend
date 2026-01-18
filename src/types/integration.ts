export interface Integration {
  id: string;
  name: string;
  key?: string;
  secret?: string;
  token?: string;
  data?: any;
  type: "UTMIFY" | "WEBHOOK";
  active: boolean;
  createdAt: string;
  updatedAt: string;
  productIntegration: ProductIntegration[];
}

export interface ProductIntegration {
  id: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    status?: string;
  };
  integration: {
    id: string;
    name: string;
    type: string;
  };
}

export interface CreateIntegrationData {
  name: string;
  key?: string;
  secret?: string;
  token?: string;
  data?: any;
  type: "UTMIFY" | "WEBHOOK";
}

export interface UpdateIntegrationData {
  name?: string;
  key?: string;
  secret?: string;
  token?: string;
  data?: any;
  type?: "UTMIFY" | "WEBHOOK";
  active?: boolean;
}

export interface IntegrationFilters {
  search?: string;
  type?: "UTMIFY" | "WEBHOOK";
  active?: boolean;
  page?: number;
  limit?: number;
}

export interface IntegrationListResponse {
  integrations: Integration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IntegrationVerificationResponse {
  message: string;
  verified: boolean;
  details?: any;
}

// Tipos específicos para UTMify
export interface CreateUtmifyIntegrationData {
  name: string;
  token: string;
}

export interface UpdateUtmifyIntegrationData {
  name?: string;
  token?: string;
  active?: boolean;
}

// Tipos específicos para Webhook
export interface WebhookData {
  url: string;
  notifications: string[];
}

export interface CreateWebhookIntegrationData {
  name: string;
  type: "WEBHOOK";
  key?: string;
  secret?: string;
  data: WebhookData;
}

export interface UpdateWebhookIntegrationData {
  name?: string;
  type?: "WEBHOOK";
  key?: string;
  secret?: string;
  data?: WebhookData;
  active?: boolean;
}

// Tipos para teste de integração
export interface IntegrationTestResponse {
  isValid: boolean;
  message: string;
  details?: Record<string, unknown> | null;
}

export interface TestUtmifyData {
  token: string;
}

export interface TestWebhookData {
  url: string;
}
