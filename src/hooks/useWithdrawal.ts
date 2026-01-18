import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WithdrawalService } from "@/api/withdrawal";
import type {
  CreateWithdrawalData,
  CreatePixKeyData,
  DeletePixKeyData,
  CodeType,
} from "@/types/withdrawal";
import { toast } from "sonner";

export const useWithdrawalBalance = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["withdrawal-balance"],
    queryFn: () => WithdrawalService.getBalance(),
    staleTime: 30 * 1000, // 30 segundos
  });

  return {
    balance: data,
    isLoading,
    error,
    refetch,
  };
};

export const useWithdrawals = (page: number = 1, limit: number = 10) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["withdrawals", page, limit],
    queryFn: () => WithdrawalService.getWithdrawals(page, limit),
    staleTime: 30 * 1000, // 30 segundos
  });

  return {
    withdrawals: data?.withdrawals || [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWithdrawalData) =>
      WithdrawalService.createWithdrawal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawal-balance"] });
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
      toast.success("Saque solicitado com sucesso!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Erro ao solicitar saque";
      toast.error(message);
    },
  });
};

export const useSendWithdrawalCode = () => {
  return useMutation({
    mutationFn: (type?: CodeType) => WithdrawalService.sendCode(type),
    onSuccess: (data) => {
      toast.success(
        `Código enviado! Expira em ${Math.floor(data.expiresIn / 60)} minutos.`
      );
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Erro ao enviar código";
      toast.error(message);
    },
  });
};

export const usePixKeys = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["pix-keys"],
    queryFn: () => WithdrawalService.getPixKeys(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    pixKeys: data?.pixKeys || [],
    isLoading,
    error,
    refetch,
  };
};

export const useCreatePixKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePixKeyData) =>
      WithdrawalService.createPixKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pix-keys"] });
      toast.success("Chave PIX cadastrada com sucesso!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error || "Erro ao cadastrar chave PIX";
      toast.error(message);
    },
  });
};

export const useDeletePixKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pixKeyId,
      data,
    }: {
      pixKeyId: string;
      data: DeletePixKeyData;
    }) => WithdrawalService.deletePixKey(pixKeyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pix-keys"] });
      toast.success("Chave PIX removida com sucesso!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error || "Erro ao remover chave PIX";
      toast.error(message);
    },
  });
};
