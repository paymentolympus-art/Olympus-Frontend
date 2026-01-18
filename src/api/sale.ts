import api from "@/lib/axios";
import type { SalesResponse, SaleQueryParams } from "@/types/sale";
import { getLocalSessionToken } from "@/lib/local-storage";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class SaleService {
  static async querySales(params: SaleQueryParams): Promise<SalesResponse> {
    const queryParams = new URLSearchParams();

    // Parâmetros básicos
    if (params.page !== undefined) {
      queryParams.append("page", params.page.toString());
    }
    if (params.pageSize !== undefined) {
      queryParams.append("pageSize", params.pageSize.toString());
    }
    if (params.status) {
      queryParams.append("status", params.status);
    }
    if (params.type) {
      queryParams.append("type", params.type);
    }
    if (params.search) {
      queryParams.append("search", params.search);
    }
    if (params.dateRange) {
      queryParams.append("dateRange", params.dateRange);
    }
    if (params.itemId) {
      queryParams.append("itemId", params.itemId);
    }
    if (params.method) {
      queryParams.append("method", params.method);
    }

    // Parâmetros UTM
    if (params.UTM) {
      if (params.UTM.utmSource) {
        queryParams.append("utmSource", params.UTM.utmSource);
      }
      if (params.UTM.utmMedium) {
        queryParams.append("utmMedium", params.UTM.utmMedium);
      }
      if (params.UTM.utmCampaign) {
        queryParams.append("utmCampaign", params.UTM.utmCampaign);
      }
      if (params.UTM.utmTerm) {
        queryParams.append("utmTerm", params.UTM.utmTerm);
      }
      if (params.UTM.utmContent) {
        queryParams.append("utmContent", params.UTM.utmContent);
      }
    }

    const response = await api.get(`/sales/query?${queryParams.toString()}`);
    return response.data.data;
  }
}
