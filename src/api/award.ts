import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type { AwardsApiResponse, AwardsFilters } from "@/types/award";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class AwardService {
  static async getAwards(
    filters: AwardsFilters = {}
  ): Promise<AwardsApiResponse["data"]> {
    const params = new URLSearchParams();

    if (filters.limit) {
      params.append("limit", filters.limit.toString());
    }

    if (filters.page) {
      params.append("page", filters.page.toString());
    }

    const response = await api.get<AwardsApiResponse>(
      `/awards?${params.toString()}`
    );

    return response.data.data;
  }
}
