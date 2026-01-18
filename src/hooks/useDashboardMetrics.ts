import { useQuery } from "@tanstack/react-query";
import { getUserMetrics, getUserAnalyticsChart } from "@/api/user";
import type {
  UserMetrics,
  SalesVisitsChart,
  ChartPeriod,
} from "@/types/dashboard";
import { toast } from "sonner";

export const useDashboardMetrics = () => {
  const {
    data: metrics,
    isLoading,
    error,
    refetch,
  } = useQuery<UserMetrics>({
    queryKey: ["user-metrics"],
    queryFn: async () => {
      try {
        return await getUserMetrics();
      } catch (err: any) {
        const errorMessage =
          err.message || "Erro ao carregar métricas do dashboard";
        toast.error(errorMessage);
        throw err;
      }
    },
    staleTime: 1 * 60 * 1000, // 1 minuto
    refetchInterval: 60 * 1000, // Atualiza a cada 1 minuto
  });

  return {
    metrics,
    isLoading,
    error,
    refetch,
  };
};

export const useDashboardChart = (period: ChartPeriod = "30_DAYS") => {
  const {
    data: chartData,
    isLoading,
    error,
    refetch,
  } = useQuery<SalesVisitsChart>({
    queryKey: ["user-analytics-chart", period],
    queryFn: async () => {
      try {
        return await getUserAnalyticsChart(period);
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao carregar dados do gráfico";
        toast.error(errorMessage);
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    chartData,
    isLoading,
    error,
    refetch,
  };
};
