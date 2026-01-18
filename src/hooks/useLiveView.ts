import { useQuery } from "@tanstack/react-query";
import { LiveViewService } from "@/api/live-view";
import type {
  LiveViewPeaksResponse,
  LiveViewSeriesParams,
  LiveViewSeriesResponse,
  LiveViewSummary,
  LiveViewVisitParams,
  LiveViewVisitsResponse,
} from "@/types/live-view";
import { toast } from "sonner";

const handleError = (err: any, fallbackMessage: string) => {
  const errorMessage = err.response.data.error || fallbackMessage;
  toast.error(errorMessage);
  throw err;
};

export const useLiveViewVisits = (params: LiveViewVisitParams = {}) =>
  useQuery<LiveViewVisitsResponse>({
    queryKey: ["live-view", "visits", params],
    queryFn: () =>
      LiveViewService.getVisits(params).catch((err) =>
        handleError(err, "Erro ao carregar visitas ao vivo")
      ),
    refetchInterval: 5000,
    staleTime: 5000,
  });

export const useLiveViewSummary = () =>
  useQuery<LiveViewSummary>({
    queryKey: ["live-view", "summary"],
    queryFn: () =>
      LiveViewService.getSummary().catch((err) =>
        handleError(err, "Erro ao carregar resumo")
      ),
    refetchInterval: 30000,
    staleTime: 30000,
  });

export const useLiveViewSeries = (params: LiveViewSeriesParams = {}) =>
  useQuery<LiveViewSeriesResponse>({
    queryKey: ["live-view", "series", params],
    queryFn: () =>
      LiveViewService.getSeries(params).catch((err) =>
        handleError(err, "Erro ao carregar série histórica")
      ),
    refetchInterval: 30000,
    staleTime: 30000,
  });

export const useLiveViewPeaks = () =>
  useQuery<LiveViewPeaksResponse>({
    queryKey: ["live-view", "peaks"],
    queryFn: () =>
      LiveViewService.getPeaks().catch((err) =>
        handleError(err, "Erro ao carregar horários de pico")
      ),
    refetchInterval: 30000,
    staleTime: 30000,
  });
