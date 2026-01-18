import { useState, useEffect, useCallback } from "react";
import { CheckoutService } from "@/api/checkout";
import { toast } from "sonner";
import type {
  CheckoutApiResponse,
  CheckoutThemeType,
} from "@checkout-layout/types/checkout";

export const useCheckoutSetting = (productId: string) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCheckoutBuilder = useCallback(async () => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await CheckoutService.getCheckoutBuilder(productId);
      setCheckoutData(data);
    } catch (err: any) {
      const errorMessage =
        err.response.data.error || "Erro ao carregar dados do checkout";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  /**
   * Atualiza o tema do checkout
   */
  const updateCheckoutTheme = useCallback(
    async (theme: CheckoutThemeType) => {
      if (!productId) return;

      setLoading(true);
      setError(null);

      try {
        const updatedTheme = await CheckoutService.updateCheckoutTheme(
          productId,
          {
            theme: theme.theme,
            steps: theme.steps,
            font: theme.font,
            radius: theme.radius,
            cartVisible: theme.cartVisible,
            defaultTexts: theme.defaultTexts,
            defaultSnippets: theme.defaultSnippets,
            defaultColors: theme.defaultColors,
            defaultMargins: theme.defaultMargins,
            defaultSizes: theme.defaultSizes,
          }
        );

        // Atualiza o estado local
        setCheckoutData((prev) =>
          prev ? { ...prev, theme: updatedTheme } : null
        );

        toast.success("Tema do checkout atualizado com sucesso!");
        return updatedTheme;
      } catch (err: any) {
        const errorMessage =
          err.message || "Erro ao atualizar tema do checkout";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [productId]
  );

  /**
   * Recarrega os dados do checkout
   */
  const refetch = useCallback(() => {
    fetchCheckoutBuilder();
  }, [fetchCheckoutBuilder]);

  /**
   * Limpa os dados do estado
   */
  const clearData = useCallback(() => {
    setCheckoutData(null);
    setError(null);
  }, []);

  // Carrega os dados automaticamente quando o productId muda
  useEffect(() => {
    if (productId) {
      fetchCheckoutBuilder();
    }
  }, [fetchCheckoutBuilder, productId]);

  return {
    // Estado
    checkoutData,
    loading,
    error,

    // Dados específicos
    product: checkoutData?.product || null,
    theme: checkoutData?.theme || null,

    // Ações principais
    fetchCheckoutBuilder,
    updateCheckoutTheme,
    refetch,
    clearData,

    // Helpers
    hasData: !!checkoutData,
    hasProduct: !!checkoutData?.product,
    hasTheme: !!checkoutData?.theme,
  };
};
