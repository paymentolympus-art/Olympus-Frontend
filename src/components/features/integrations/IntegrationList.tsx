import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Plus, Settings, AlertCircle, RefreshCw } from "lucide-react";
import { IntegrationCard } from "./IntegrationCard";
import { IntegrationFilters } from "./IntegrationFilters";
import { useIntegrations } from "@/hooks/useIntegrations";
import { toast } from "sonner";
import type { Integration } from "@/types/integration";
import { IntegrationService } from "@/api/integration";
import { cn } from "@/lib/utils";
import { UtmifyIntegration } from "@/components/features/integrations/models/UtmifyIntegragion";
import { WebhookIntegration } from "@/components/features/integrations/models/WebhookIntegration";
import { UtmifyEditForm } from "@/components/features/integrations/models/UtmifyEditForm";
import { WebhookEditForm } from "@/components/features/integrations/models/WebhookEditForm";
import { HiCursorArrowRipple, HiMiniSignal } from "react-icons/hi2";
import type {
  UpdateUtmifyIntegrationData,
  UpdateWebhookIntegrationData,
} from "@/types/integration";

type TabType = "available" | "my-integrations";
type SubTabType = "tracking" | "webhook";

export function IntegrationList() {
  const [activeTab, setActiveTab] = useState<TabType>("available");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("tracking");
  const [, setShowCreateDialog] = useState(false);
  const [editingIntegration, setEditingIntegration] =
    useState<Integration | null>(null);
  const [deletingIntegration, setDeletingIntegration] =
    useState<Integration | null>(null);

  const {
    integrations,
    loading,
    error,
    filters,
    pagination,
    deleteIntegration,
    verifyIntegration,
    updateFilters,
    goToPage,
    refetch,
  } = useIntegrations();

  const handleUpdateUtmify = async (data: UpdateUtmifyIntegrationData) => {
    if (!editingIntegration || editingIntegration.type !== "UTMIFY") return;

    try {
      await IntegrationService.updateUtmifyIntegration(
        editingIntegration.id,
        data
      );
      await refetch();
      setEditingIntegration(null);
      toast.success("Integração UTMify atualizada com sucesso.");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao atualizar integração UTMify.";
      toast.error(errorMessage);
    }
  };

  const handleUpdateWebhook = async (data: {
    name?: string;
    url?: string;
    key?: string;
    secret?: string;
    notifications?: string[];
    active?: boolean;
  }) => {
    if (!editingIntegration || editingIntegration.type !== "WEBHOOK") return;

    try {
      // Construir o objeto de dados no formato esperado pela API
      const webhookData: UpdateWebhookIntegrationData = {};

      // Apenas incluir campos que foram alterados (não vazios)
      if (data.name !== undefined && data.name !== "") {
        webhookData.name = data.name;
      }
      if (data.key !== undefined) {
        webhookData.key = data.key;
      }
      if (data.secret !== undefined) {
        webhookData.secret = data.secret;
      }
      if (data.active !== undefined) {
        webhookData.active = data.active;
      }

      // Se URL ou notifications foram fornecidos, incluir o objeto data
      if (data.url !== undefined || data.notifications !== undefined) {
        const currentData = editingIntegration.data as {
          url?: string;
          notifications?: string[];
        } | null;

        webhookData.data = {
          url:
            data.url !== undefined && data.url !== ""
              ? data.url
              : currentData?.url || "",
          notifications:
            data.notifications && data.notifications.length > 0
              ? data.notifications
              : currentData?.notifications || [],
        };
      }

      await IntegrationService.updateWebhookIntegration(
        editingIntegration.id,
        webhookData
      );
      await refetch();
      setEditingIntegration(null);
      toast.success("Integração Webhook atualizada com sucesso.");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao atualizar integração Webhook.";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (!deletingIntegration) return;

    try {
      await deleteIntegration(deletingIntegration.id);
      setDeletingIntegration(null);
      toast.success("Integração deletada com sucesso.");
    } catch (error: any) {
      toast.error(error.message || "Erro ao deletar integração.");
    }
  };

  const handleToggleActive = async (id: string, active: boolean) => {
    try {
      const integration = integrations.find((int) => int.id === id);
      if (!integration) {
        toast.error("Integração não encontrada.");
        return;
      }

      // Usar rotas específicas para UTMify e Webhook
      if (integration.type === "UTMIFY") {
        await IntegrationService.updateUtmifyIntegration(id, { active });
      } else if (integration.type === "WEBHOOK") {
        await IntegrationService.updateWebhookIntegration(id, { active });
      } else {
        // Para outros tipos, usar a rota genérica
        await IntegrationService.updateIntegration(id, { active });
      }
      await refetch();
      toast.success(
        `Integração ${active ? "ativada" : "desativada"} com sucesso.`
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao alterar status da integração.";
      toast.error(errorMessage);
    }
  };

  const handleVerify = async (id: string) => {
    try {
      const result = await verifyIntegration(id);
      if (result.verified) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao verificar integração.");
    }
  };

  const handleClearFilters = () => {
    updateFilters({
      search: "",
      type: undefined,
      active: undefined,
    });
  };

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>Erro ao carregar integrações: {error}</span>
          </div>
          <Button variant="outline" onClick={refetch} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs Principais */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available" className="font-semibold text-base">
            Integrações Disponíveis
          </TabsTrigger>
          <TabsTrigger
            value="my-integrations"
            className="font-semibold text-base"
          >
            Minhas Integrações
          </TabsTrigger>
        </TabsList>

        {/* Tab: Disponíveis */}
        <TabsContent value="available" className="space-y-6">
          <div className="flex flex-col gap-2">
            {/* Sub-navegação */}
            <aside className=" w-full h-[50px]">
              <div className="sm:w-min flex justify-center items-center sm:h-min-[60vh] bg-primary/40 rounded-md">
                <button
                  className={cn(
                    "flex justify-center items-center gap-2 w-min py-2.5 h-auto cursor-pointer px-4 font-medium",
                    activeSubTab === "tracking" &&
                      "bg-primary/90 text-white rounded-sm"
                  )}
                  onClick={() => setActiveSubTab("tracking")}
                >
                  <HiCursorArrowRipple className="h-5 w-5" />
                  Traqueamento
                </button>
                <button
                  className={cn(
                    "flex justify-center items-center gap-2 w-min py-2.5 h-auto cursor-pointer px-4 font-medium",
                    activeSubTab === "webhook" &&
                      "bg-primary/90 text-white rounded-sm"
                  )}
                  onClick={() => setActiveSubTab("webhook")}
                >
                  <HiMiniSignal className="h-5 w-5" />
                  Webhook
                </button>
              </div>
            </aside>

            {/* Conteúdo das integrações disponíveis */}
            <div className="flex-1">
              <div className="rounded-md grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 py-2 overflow-y-scroll sm:h-[73vh] scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-yellow-300">
                <AnimatePresence>
                  <UtmifyIntegration
                    key="utmify-integration"
                    integrationsCount={0}
                    selected={activeSubTab === "tracking"}
                  />

                  <WebhookIntegration
                    key="webhook-integration"
                    integrationsCount={0}
                    selected={activeSubTab === "webhook"}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Minhas Integrações */}
        <TabsContent value="my-integrations" className="space-y-3">
          {/* Filtros */}
          <IntegrationFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Lista de integrações */}
          <div className="space-y-4 py-3 rounded-md overflow-y-scroll sm:h-[70vh] scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-yellow-300">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse ">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : integrations.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Nenhuma integração encontrada
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {filters.search ||
                      filters.type ||
                      filters.active !== undefined
                        ? "Tente ajustar os filtros de busca."
                        : "Crie sua primeira integração para começar."}
                    </p>
                    {!filters.search &&
                      !filters.type &&
                      filters.active === undefined && (
                        <Button onClick={() => setShowCreateDialog(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Criar Integração
                        </Button>
                      )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {integrations.map((integration) => (
                      <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        onEdit={setEditingIntegration}
                        onDelete={(id) => {
                          const integration = integrations.find(
                            (i) => i.id === id
                          );
                          if (integration) setDeletingIntegration(integration);
                        }}
                        onToggleActive={handleToggleActive}
                        onVerify={handleVerify}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Paginação */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 pt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                    >
                      Anterior
                    </Button>

                    <span className="text-sm text-muted-foreground">
                      Página {pagination.page} de {pagination.totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                    >
                      Próxima
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de Edição - UTMify */}
      <Dialog
        open={!!editingIntegration && editingIntegration.type === "UTMIFY"}
        onOpenChange={() => setEditingIntegration(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Integração UTMify</DialogTitle>
          </DialogHeader>
          {editingIntegration && editingIntegration.type === "UTMIFY" && (
            <UtmifyEditForm
              integration={editingIntegration}
              onSubmit={handleUpdateUtmify}
              onCancel={() => setEditingIntegration(null)}
              loading={loading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição - Webhook */}
      <Dialog
        open={!!editingIntegration && editingIntegration.type === "WEBHOOK"}
        onOpenChange={() => setEditingIntegration(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Integração Webhook</DialogTitle>
          </DialogHeader>
          {editingIntegration && editingIntegration.type === "WEBHOOK" && (
            <WebhookEditForm
              integration={editingIntegration}
              onSubmit={handleUpdateWebhook}
              onCancel={() => setEditingIntegration(null)}
              loading={loading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog
        open={!!deletingIntegration}
        onOpenChange={() => setDeletingIntegration(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar a integração "
              {deletingIntegration?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
