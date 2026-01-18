import api from "@/lib/axios";
import type { UserTheme } from "@/types/theme";
import { getLocalSessionToken } from "@/lib/local-storage";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class ThemeService {
  static async getUserThemes(): Promise<UserTheme[]> {
    const response = await api.get("/theme/user-themes");
    return response.data.data;
  }
}
