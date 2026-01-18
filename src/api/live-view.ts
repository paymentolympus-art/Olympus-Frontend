import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type {
  LiveViewPeaksResponse,
  LiveViewSeriesParams,
  LiveViewSeriesResponse,
  LiveViewSummary,
  LiveViewVisitParams,
  LiveViewVisitsResponse,
} from "@/types/live-view";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class LiveViewService {
  static async getVisits(
    params: LiveViewVisitParams = {}
  ): Promise<LiveViewVisitsResponse> {
    const response = await api.get("/live-view/visits", { params });
    return response.data.data;
  }

  static async getSummary(): Promise<LiveViewSummary> {
    const response = await api.get("/live-view/analytics/summary");
    return response.data.data;
  }

  static async getSeries(
    params: LiveViewSeriesParams = {}
  ): Promise<LiveViewSeriesResponse> {
    const response = await api.get("/live-view/analytics/series", { params });
    return response.data.data;
  }

  static async getPeaks(): Promise<LiveViewPeaksResponse> {
    const response = await api.get("/live-view/analytics/peaks");
    return response.data.data;
  }
}
