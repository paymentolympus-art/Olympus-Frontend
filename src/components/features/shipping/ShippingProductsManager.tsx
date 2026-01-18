import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Package, Plus } from "lucide-react";
import {
  getShippingProducts,
  associateProductToShipping,
  disassociateProductFromShipping,
} from "@/api/shipping";
import { ProductService } from "@/api/product";
import type { ShippingOption } from "@/validators/shipping";
import { toast } from "sonner";

interface ShippingProductsManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipping: ShippingOption;
  onSuccess?: () => void;
}

export function ShippingProductsManager({
  open,
  onOpenChange,
  shipping,
  onSuccess,
}: ShippingProductsManagerProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [productToDisassociate, setProductToDisassociate] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const queryClient = useQueryClient();

  // Query para buscar produtos associados
  const {
    data: associatedProducts,
    isLoading: isLoadingAssociated,
    refetch: refetchAssociated,
  } = useQuery({
    queryKey: ["shipping-products", shipping.id],
    queryFn: () => getShippingProducts(shipping.id),
    enabled: open && !!shipping.id,
  });

  // Query para buscar todos os produtos disponíveis
  const { data: allProductsData, isLoading: isLoadingAll } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => ProductService.getProducts({}),
    enabled: open,
  });

  // Filtrar produtos que ainda não estão associados
  const availableProducts =
    allProductsData?.products.filter(
      (product) =>
        !associatedProducts?.products.some(
          (associated) => associated.id === product.id
        )
    ) || [];

  // Mutation para associar produto
  const associateMutation = useMutation({
    mutationFn: (productId: string) =>
      associateProductToShipping(shipping.id, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shipping-products", shipping.id],
      });
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
      setSelectedProductId("");
      toast.success("Produto associado com sucesso!");
      refetchAssociated();
      onSuccess?.();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erro ao associar produto";
      toast.error(message);
    },
  });

  // Mutation para desassociar produto
  const disassociateMutation = useMutation({
    mutationFn: (productId: string) =>
      disassociateProductFromShipping(shipping.id, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shipping-products", shipping.id],
      });
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
      toast.success("Produto desassociado com sucesso!");
      refetchAssociated();
      onSuccess?.();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erro ao desassociar produto";
      toast.error(message);
    },
  });

  const handleAssociate = () => {
    if (!selectedProductId) {
      return;
    }
    associateMutation.mutate(selectedProductId);
  };

  const handleDisassociate = (productId: string, productName: string) => {
    setProductToDisassociate({ id: productId, name: productName });
  };

  const handleConfirmDisassociate = () => {
    if (productToDisassociate) {
      disassociateMutation.mutate(productToDisassociate.id);
      setProductToDisassociate(null);
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "DISABLED":
        return "secondary";
      case "PENDING":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Ativo";
      case "DISABLED":
        return "Desabilitado";
      case "PENDING":
        return "Pendente";
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar Produtos do Frete</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Frete: <span className="font-semibold">{shipping.name}</span>
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Seção de produtos associados */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Produtos Associados</h3>
            {isLoadingAssociated ? (
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : associatedProducts?.products.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <Package className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhum produto associado a este frete
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {associatedProducts?.products.map((product: any) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {product.image || product.imageUrl ? (
                        <img
                          src={product.image || product.imageUrl}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={getStatusBadgeVariant(product.status)}
                            className="text-xs"
                          >
                            {getStatusLabel(product.status)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleDisassociate(product.id, product.name)
                      }
                      disabled={disassociateMutation.isPending}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seção para associar novo produto */}
          <div className="space-y-3 border-t pt-4">
            <h3 className="text-sm font-semibold">Associar Novo Produto</h3>
            {isLoadingAll ? (
              <Skeleton className="h-10 w-full" />
            ) : availableProducts.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  Todos os produtos já estão associados a este frete
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <Select
                  value={selectedProductId}
                  onValueChange={setSelectedProductId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex items-center gap-2">
                          <span>{product.name}</span>
                          <Badge
                            variant={getStatusBadgeVariant(product.status)}
                            className="text-xs"
                          >
                            {getStatusLabel(product.status)}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedProductId && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Produto selecionado:</strong>{" "}
                      {
                        availableProducts.find(
                          (p) => p.id === selectedProductId
                        )?.name
                      }
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleAssociate}
                  disabled={!selectedProductId || associateMutation.isPending}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {associateMutation.isPending
                    ? "Associando..."
                    : "Associar Produto"}
                </Button>
              </div>
            )}
          </div>

          {/* Botão de fechar */}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* AlertDialog de confirmação para desassociar */}
      {/* Quero posicionar ao topo da tela */}
      <AlertDialog
        open={!!productToDisassociate}
        onOpenChange={(open) => {
          if (!open) {
            setProductToDisassociate(null);
          }
        }}
      >
        <AlertDialogContent className="top-25">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Desassociação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja desassociar o produto{" "}
              <strong>"{productToDisassociate?.name}"</strong> deste frete?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setProductToDisassociate(null)}
              disabled={disassociateMutation.isPending}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDisassociate}
              className="bg-red-500/80 hover:bg-red-500/90"
              disabled={disassociateMutation.isPending}
            >
              {disassociateMutation.isPending
                ? "Desassociando..."
                : "Desassociar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
