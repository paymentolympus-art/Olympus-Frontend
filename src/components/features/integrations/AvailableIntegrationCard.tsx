import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IntegrationForm } from "./IntegrationForm";
import { useState } from "react";
import { toast } from "sonner";
import { useIntegrations } from "@/hooks/useIntegrations";

interface AvailableIntegration {
  id: string;
  name: string;
  description: string;
  type: "UTMIFY" | "META";
  icon: React.ComponentType<{ className?: string }>;
  integrationsCount: number;
  category: "tracking" | "webhook";
}

interface AvailableIntegrationCardProps {
  integration: AvailableIntegration;
}

export function AvailableIntegrationCard({
  integration,
}: AvailableIntegrationCardProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { createUtmifyIntegration, createWebhookIntegration, loading } =
    useIntegrations();

  const handleAddIntegration = async (data: any) => {
    try {
      if (integration.type === "UTMIFY") {
        await createUtmifyIntegration({
          name: data.name || integration.name,
          token: data.token,
        });
      } else if (integration.type === "META") {
        // META pode ser tratado como WEBHOOK ou ter sua própria lógica
        // Por enquanto, assumindo que precisa ser convertido para WEBHOOK
        await createWebhookIntegration({
          name: data.name || integration.name,
          type: "WEBHOOK",
          key: data.key,
          secret: data.secret,
          data: {
            url: data.url || data.data?.url || "",
            notifications: data.notifications || data.data?.notifications || [],
          },
        });
      } else {
        throw new Error(
          `Tipo de integração não suportado: ${integration.type}`
        );
      }
      setShowAddDialog(false);
      toast.success(`${integration.name} adicionado com sucesso!`);
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar integração.");
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "UTMIFY":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "META":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-background border">
            <integration.icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{integration.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {integration.description}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge
                variant="outline"
                className={getTypeColor(integration.type)}
              >
                {integration.type}
              </Badge>
              <Badge variant="secondary">{integration.category}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Integrações: {integration.integrationsCount}
          </span>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                ADICIONAR
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar {integration.name}</DialogTitle>
                <DialogDescription>
                  Configure a integração {integration.name} para começar a usar
                </DialogDescription>
              </DialogHeader>
              <IntegrationForm
                onSubmit={handleAddIntegration}
                onCancel={() => setShowAddDialog(false)}
                loading={loading}
                defaultType={integration.type as "UTMIFY" | "WEBHOOK"}
                defaultName={integration.name}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
