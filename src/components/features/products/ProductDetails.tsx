import { useProductDetails } from "@/hooks/useProductDetails";
import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardDetails } from "@/components/features/products/ProductCardDetails";
import { ProductDetailsContent } from "@/components/features/products/ProductDetailsContent";

type ProductDetailsProps = {
  productId: string;
};
export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data, isLoading, error, refetch } = useProductDetails(productId);

  const renderContent = useCallback(() => {
    if (error && !data) {
      return (
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 mx-auto w-[60%]">
              <div className="flex items-center justify-center space-x-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span>Erro ao carregar produto</span>
              </div>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="mt-4 mx-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (isLoading) {
      return (
        <div className="flex flex-row gap-5 w-full h-full">
          <Card className="w-1/4 h-full rounded-sm">
            <CardContent className="p-6 flex flex-col gap-6">
              <div>
                <Skeleton className="h-48 w-full rounded-lg" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-12">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-1/2" />
              </div>

              <div className="flex flex-col gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="flex flex-col gap-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardContent>
          </Card>

          <Card className="w-3/4 h-min rounded-sm">
            <CardContent className="p-6 flex flex-col gap-6 relative">
              <div className="flex flex-row gap-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              <div className="flex flex-col gap-4 mt-12">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-1/2" />
              </div>

              <div className="flex flex-col gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="flex flex-col gap-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex sm:flex-row flex-col gap-5 w-full h-full">
        <ProductCardDetails product={data!} refetchProduct={refetch} />
        <ProductDetailsContent product={data!} />
      </div>
    );
  }, [isLoading, error, data, refetch]);

  return <div className="w-full h-full px-2">{renderContent()}</div>;
}
