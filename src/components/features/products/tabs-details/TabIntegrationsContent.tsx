import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi2";
import { useProductIntegrations } from "@/hooks/useProductIntegrations";
import { IntegrationsTable } from "@/components/features/products/IntegrationsTable";
import { AssociateIntegrationModal } from "@/components/features/products/AssociateIntegrationModal";
import type { ProductDetails } from "@/types/product";

interface TabIntegrationsContentProps {
  product?: ProductDetails;
}

export function TabIntegrationsContent({
  product,
}: TabIntegrationsContentProps) {
  const [activeTab, setActiveTab] = useState("tracking");
  const [associateModalOpen, setAssociateModalOpen] = useState(false);

  const { integrations, loading, removeIntegration, isRemoving } =
    useProductIntegrations(product?.id || "");

  const handleRemoveIntegration = async (integrationId: string) => {
    if (confirm("Tem certeza que deseja remover esta integração?")) {
      await removeIntegration(integrationId);
    }
  };

  const handleAssociateSuccess = () => {
    // Não precisa mais chamar fetchIntegrations manualmente
    // O React Query invalida automaticamente as queries relacionadas
  };

  const getIntegrationsByType = (type: string) => {
    return integrations.filter((integration) => integration.type === type);
  };

  if (!product) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Integrações Associadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Produto não encontrado</p>
        </CardContent>
      </Card>
    );
  }

  const trackingIntegrations = getIntegrationsByType("UTMIFY");
  const webhookIntegrations = getIntegrationsByType("WEBHOOK");

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold">
            Integrações Associadas
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Configure as integrações para otimizar seus resultados
          </CardDescription>
        </div>

        <Button size="sm" onClick={() => setAssociateModalOpen(true)}>
          <HiPlus className="h-4 w-4 mr-2" />
          Associar Integração
        </Button>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tracking">Traqueamento</TabsTrigger>
            <TabsTrigger value="webhook">Webhook</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between"></div>

              <IntegrationsTable
                integrations={trackingIntegrations}
                onRemove={handleRemoveIntegration}
                loading={loading}
                isRemoving={isRemoving}
              />
            </div>
          </TabsContent>

          <TabsContent value="webhook" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between"></div>

              <IntegrationsTable
                integrations={webhookIntegrations}
                onRemove={handleRemoveIntegration}
                loading={loading}
                isRemoving={isRemoving}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <AssociateIntegrationModal
        open={associateModalOpen}
        onOpenChange={setAssociateModalOpen}
        product={product}
        onSuccess={handleAssociateSuccess}
      />
    </Card>
  );
}
