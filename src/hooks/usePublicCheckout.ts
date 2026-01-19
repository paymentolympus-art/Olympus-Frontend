import { useState, useEffect, useCallback } from "react";
import { PublicCheckoutService } from "@/api/publicCheckout";
import type {
  CheckoutApiResponse,
} from "@checkout-layout/types/checkout";

export const usePublicCheckout = (slug: string) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicCheckout = useCallback(async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await PublicCheckoutService.getPublicCheckoutBySlug(slug);
      setCheckoutData(data);
    } catch (err: any) {
      const errorMessage =
        err.message || "Erro ao carregar checkout";
      setError(errorMessage);
      console.error("Erro ao carregar checkout público:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchPublicCheckout();
    }
  }, [fetchPublicCheckout, slug]);

  return {
    checkoutData,
    loading,
    error,
    product: checkoutData?.product || null,
    theme: checkoutData?.theme || null,
    hasData: !!checkoutData,
    refetch: fetchPublicCheckout,
  };
};


