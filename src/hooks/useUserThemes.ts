// src/hooks/useUserThemes.ts
import { useQuery } from "@tanstack/react-query";
import { ThemeService } from "@/api/theme";

// Query Keys
export const themeKeys = {
  all: ["themes"] as const,
  userThemes: () => [...themeKeys.all, "user-themes"] as const,
};

// Hook para listar temas do usuário
export function useUserThemes() {
  return useQuery({
    queryKey: themeKeys.userThemes(),
    queryFn: () => ThemeService.getUserThemes(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}
