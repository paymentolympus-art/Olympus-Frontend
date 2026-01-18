import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PixelService } from "@/api/pixel";
import type {
  CreateFacebookPixelData,
  CreateGooglePixelData,
  CreateTikTokPixelData,
  UpdatePixelData,
} from "@/types/pixel";

export function usePixels(productId: string) {
  return useQuery({
    queryKey: ["pixels", productId],
    queryFn: () => PixelService.getPixels(productId),
    enabled: !!productId,
  });
}

export function useCreateFacebookPixel(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFacebookPixelData) =>
      PixelService.createFacebookPixel(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pixels", productId] });
      toast.success("Pixel do Facebook criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao criar pixel do Facebook"
      );
    },
  });
}

export function useCreateGooglePixel(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGooglePixelData) =>
      PixelService.createGooglePixel(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pixels", productId] });
      toast.success("Pixel do Google criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao criar pixel do Google"
      );
    },
  });
}

export function useCreateTikTokPixel(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTikTokPixelData) =>
      PixelService.createTikTokPixel(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pixels", productId] });
      toast.success("Pixel do TikTok criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao criar pixel do TikTok"
      );
    },
  });
}

export function useUpdateFacebookPixel(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pixelId,
      data,
    }: {
      pixelId: string;
      data: UpdatePixelData;
    }) => PixelService.updateFacebookPixel(productId, pixelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pixels", productId] });
      toast.success("Pixel do Facebook atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar pixel do Facebook"
      );
    },
  });
}

export function useUpdateGooglePixel(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pixelId,
      data,
    }: {
      pixelId: string;
      data: UpdatePixelData;
    }) => PixelService.updateGooglePixel(productId, pixelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pixels", productId] });
      toast.success("Pixel do Google atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar pixel do Google"
      );
    },
  });
}

export function useUpdateTikTokPixel(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pixelId,
      data,
    }: {
      pixelId: string;
      data: UpdatePixelData;
    }) => PixelService.updateTikTokPixel(productId, pixelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pixels", productId] });
      toast.success("Pixel do TikTok atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar pixel do TikTok"
      );
    },
  });
}

export function useDeletePixel(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pixelId: string) =>
      PixelService.deletePixel(productId, pixelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pixels", productId] });
      toast.success("Pixel deletado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao deletar pixel");
    },
  });
}
