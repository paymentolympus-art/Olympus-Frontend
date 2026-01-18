import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HiPlus, HiTrash, HiCheck } from "react-icons/hi2";
import {
  useDomains,
  useAddProductToDomain,
  useRemoveProductFromDomain,
} from "@/hooks/useDomains";
import { useDomainsByProduct } from "@/hooks/useDomains";
import { format } from "@/lib/format";

interface TabDomainContentProps {
  productId: string;
}

export function TabDomainContent({ productId }: TabDomainContentProps) {
  const [selectedDomainId, setSelectedDomainId] = useState<string>("");

  // Buscar todos os domínios disponíveis
  const { data: domainsData, isLoading: isLoadingDomains } = useDomains();
  const domains = domainsData?.domains || [];

  // Buscar domínios já vinculados ao produto
  const { data: productDomainsData, isLoading: isLoadingProductDomains } =
    useDomainsByProduct(productId);
  const productDomains = productDomainsData?.domains || [];
  const currentDomain = productDomains[0]; // Apenas um vínculo permitido

  // Mutations
  const addProductMutation = useAddProductToDomain();
  const removeProductMutation = useRemoveProductFromDomain();

  const handleAddDomain = async () => {
    if (!selectedDomainId) return;

    try {
      await addProductMutation.mutateAsync({
        domainId: selectedDomainId,
        productId,
      });
      setSelectedDomainId("");
    } catch (error) {
      console.error("Erro ao adicionar domínio:", error);
    }
  };

  const handleRemoveDomain = async () => {
    if (!currentDomain) return;

    try {
      await removeProductMutation.mutateAsync({
        domainId: currentDomain.id,
        productId,
      });
    } catch (error) {
      console.error("Erro ao remover domínio:", error);
    }
  };

  // Filtrar domínios que não estão vinculados ao produto
  const availableDomains = domains.filter(
    (domain) => !productDomains.some((pd) => pd.id === domain.id)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return (
          <Badge variant="default" className="text-xs">
            Verificado
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="secondary" className="text-xs">
            Pendente
          </Badge>
        );
      case "ERROR":
        return (
          <Badge variant="destructive" className="text-xs">
            Erro
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Estados de Loading */}
      {(isLoadingDomains || isLoadingProductDomains) && (
        <div className="text-center py-8">Carregando domínios...</div>
      )}

      {/* Domínio Atual */}
      {!isLoadingDomains && currentDomain && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiCheck className="h-5 w-5 text-green-600" />
              Domínio Vinculado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{currentDomain.name}</span>
                  {getStatusBadge(currentDomain.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Vinculado em {format.date(currentDomain.createdAt)}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveDomain}
                disabled={removeProductMutation.isPending}
                className="text-destructive hover:text-destructive"
              >
                <HiTrash className="h-4 w-4" />
                Remover
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Adicionar Novo Domínio */}
      {!isLoadingDomains && !currentDomain && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiPlus className="h-5 w-5" />
              Vincular Domínio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Selecionar Domínio
                </label>
                <Select
                  value={selectedDomainId}
                  onValueChange={setSelectedDomainId}
                  disabled={isLoadingDomains}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um domínio para vincular" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDomains.map((domain) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        <div className="flex items-center gap-2">
                          <span>{domain.name}</span>
                          {getStatusBadge(domain.status)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {availableDomains.length === 0 && !isLoadingDomains && (
                <div className="text-center py-4 text-muted-foreground">
                  Nenhum domínio disponível para vincular
                </div>
              )}

              <Button
                onClick={handleAddDomain}
                disabled={!selectedDomainId || addProductMutation.isPending}
                className="w-full"
              >
                {addProductMutation.isPending
                  ? "Vinculando..."
                  : "Vincular Domínio"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
