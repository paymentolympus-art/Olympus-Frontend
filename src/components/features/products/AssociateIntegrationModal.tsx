import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAvailableIntegrations } from "@/hooks/useAvailableIntegrations";
import type { ProductDetails } from "@/types/product";

interface AssociateIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductDetails;
  onSuccess?: () => void;
}

export function AssociateIntegrationModal({
  open,
  onOpenChange,
  product,
  onSuccess,
}: AssociateIntegrationModalProps) {
  const [selectedIntegrationId, setSelectedIntegrationId] =
    useState<string>("");

  const {
    availableIntegrations,
    loading,
    error,
    associateIntegration,
    isAssociating,
  } = useAvailableIntegrations(product?.id || "");

  const handleAssociate = async () => {
    if (!selectedIntegrationId) {
      return;
    }

    try {
      await associateIntegration(selectedIntegrationId);
      setSelectedIntegrationId("");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "UTMIFY":
        return "Traqueamento";
      case "WEBHOOK":
        return "Webhook";
      default:
        return type;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "UTMIFY":
        return "default";
      case "WEBHOOK":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Associar Integração ao Produto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Selecione uma integração para associar ao produto{" "}
              <span className="font-semibold text-foreground">
                {product?.name || "Produto"}
              </span>
            </p>
          </div>

          {loading ? (
            <div className="space-y-3">
              <div className="h-10 bg-muted animate-pulse rounded" />
              <div className="h-10 bg-muted animate-pulse rounded" />
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-red-600 text-sm">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                Tentar Novamente
              </Button>
            </div>
          ) : availableIntegrations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Todas as integrações já estão associadas a este produto
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <label className="text-sm font-medium">Integração</label>
                <Select
                  value={selectedIntegrationId}
                  onValueChange={setSelectedIntegrationId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma integração" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {availableIntegrations.map((integration) => (
                      <SelectItem key={integration.id} value={integration.id}>
                        <div className="flex items-center gap-2">
                          <span>{integration.name}</span>
                          <Badge
                            variant={getTypeBadgeVariant(integration.type)}
                          >
                            {`${integration.type} - ${getTypeLabel(integration.type)}`}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedIntegrationId && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Integração selecionada:</strong>{" "}
                    {
                      availableIntegrations.find(
                        (i) => i.id === selectedIntegrationId
                      )?.name
                    }
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isAssociating}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAssociate}
                  disabled={!selectedIntegrationId || isAssociating}
                >
                  {isAssociating ? "Associando..." : "Associar Integração"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
