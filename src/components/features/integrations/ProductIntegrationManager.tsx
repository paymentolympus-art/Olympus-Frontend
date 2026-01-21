import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Plus,
  X,
  Link,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { IntegrationService } from "@/api/integration";
import { toast } from "sonner";
import type { Integration } from "@/types/integration";

interface ProductIntegrationManagerProps {
  productId: string;
  productName?: string;
}

export function ProductIntegrationManager({
  productId,
  productName = "Produto",
}: ProductIntegrationManagerProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [productIntegrations, setProductIntegrations] = useState<Integration[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [showAssociateDialog, setShowAssociateDialog] = useState(false);
  const [selectedIntegrationId, setSelectedIntegrationId] =
    useState<string>("");

  useEffect(() => {
    fetchData();
  }, [productId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Buscar todas as integrações do usuário
      const integrationsResponse = await IntegrationService.getIntegrations();
      const allIntegrations = integrationsResponse.integrations;

      // Buscar integrações do produto
      const productResponse =
        await IntegrationService.getIntegrationsByProduct(productId);
      const productIntegrations = productResponse.integrations;

      setIntegrations(allIntegrations);
      setProductIntegrations(productIntegrations);
    } catch (error: any) {
      toast.error("Erro ao carregar integrações");
    } finally {
      setLoading(false);
    }
  };

  const handleAssociate = async () => {
    if (!selectedIntegrationId) return;

    try {
      await IntegrationService.associateIntegrationToProduct(
        selectedIntegrationId,
        productId
      );
      setShowAssociateDialog(false);
      setSelectedIntegrationId("");
      await fetchData(); // Recarregar dados
      toast.success("Integração associada com sucesso");
    } catch (error: any) {
      toast.error(error.message || "Erro ao associar integração");
    }
  };

  const handleRemove = async (integrationId: string) => {
    try {
      await IntegrationService.removeIntegrationFromProduct(
        integrationId,
        productId
      );
      await fetchData(); // Recarregar dados
      toast.success("Associação removida com sucesso");
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover associação");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "UTMIFY":
        return <Link className="h-4 w-4" />;
      case "META":
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "UTMIFY":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "META":
        return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const availableIntegrations = integrations.filter(
    (integration) => !productIntegrations.find((pi) => pi.id === integration.id)
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Integrações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Integrações do {productName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Integrações Atuais */}
        <div>
          <h3 className="text-lg font-medium mb-3">Integrações Associadas</h3>
          {productIntegrations.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Nenhuma integração associada
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {productIntegrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-background border">
                      {getTypeIcon(integration.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant="outline"
                          className={getTypeColor(integration.type)}
                        >
                          {integration.type}
                        </Badge>
                        <Badge
                          variant={integration.active ? "default" : "secondary"}
                          className="flex items-center space-x-1"
                        >
                          {integration.active ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          <span>
                            {integration.active ? "Ativa" : "Inativa"}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(integration.id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Adicionar Nova Integração */}
        {availableIntegrations.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Adicionar Integração</h3>
            <Dialog
              open={showAssociateDialog}
              onOpenChange={setShowAssociateDialog}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Associar Integração
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Associar Integração</DialogTitle>
                  <DialogDescription>
                    Selecione uma integração para associar ao {productName}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Integração</label>
                    <Select
                      value={selectedIntegrationId}
                      onValueChange={setSelectedIntegrationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma integração" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableIntegrations.map((integration) => (
                          <SelectItem
                            key={integration.id}
                            value={integration.id}
                          >
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(integration.type)}
                              <span>{integration.name}</span>
                              <Badge
                                variant="outline"
                                className={getTypeColor(integration.type)}
                              >
                                {integration.type}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAssociateDialog(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAssociate}
                      disabled={!selectedIntegrationId}
                    >
                      Associar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {availableIntegrations.length === 0 &&
          productIntegrations.length > 0 && (
            <div className="text-center py-4">
              <p className="text-muted-foreground">
                Todas as integrações disponíveis já estão associadas
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
