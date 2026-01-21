import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  MoreVertical,
  Edit,
  Trash2,
  Settings,
  CheckCircle,
  XCircle,
  Link,
  ExternalLink,
  FlaskConical,
  Loader2,
} from "lucide-react";
import { format } from "@/lib/format";
import { toast } from "sonner";
import { IntegrationService } from "@/api/integration";
import type { Integration, IntegrationTestResponse } from "@/types/integration";

interface IntegrationCardProps {
  integration: Integration;
  onEdit: (integration: Integration) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
  onVerify: (id: string) => void;
}

export function IntegrationCard({
  integration,
  onEdit,
  onDelete,
  onToggleActive,
  onVerify,
}: IntegrationCardProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      await onVerify(integration.id);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleTestIntegration = async () => {
    setIsTesting(true);
    try {
      let response: IntegrationTestResponse;

      switch (integration.type) {
        case "UTMIFY":
          if (!integration.token) {
            toast.error("Token não encontrado para esta integração");
            return;
          }
          response = await IntegrationService.testUtmifyIntegration({
            token: integration.token,
          });
          break;

        case "WEBHOOK":
          if (!integration.data?.url) {
            toast.error("URL não encontrada para esta integração");
            return;
          }
          response = await IntegrationService.testWebhookIntegration({
            url: integration.data.url,
          });
          break;

        default:
          toast.error("Tipo de integração não suportado para teste");
          return;
      }

      if (response.isValid) {
        toast.success(response.message || "Integração testada com sucesso!");
      } else {
        toast.error(response.message || "Falha ao testar integração");
      }
    } finally {
      setIsTesting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "UTMIFY":
        return <Link className="h-4 w-4" />;
      case "WEBHOOK":
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "UTMIFY":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "WEBHOOK":
        return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 hover:border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-background border">
                {getTypeIcon(integration.type)}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold truncate">
                  {integration.name}
                </CardTitle>
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
                    <span>{integration.active ? "Ativa" : "Inativa"}</span>
                  </Badge>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(integration)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleVerify} disabled={isVerifying}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isVerifying ? "Verificando..." : "Verificar"}
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Deletar
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja deletar a integração "
                        {integration.name}"? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(integration.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Deletar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleTestIntegration}
              disabled={isTesting}
            >
              {isTesting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testando...
                </>
              ) : (
                <>
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Testar Integração
                </>
              )}
            </Button>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Switch
                checked={integration.active}
                onCheckedChange={(checked) =>
                  onToggleActive(integration.id, checked)
                }
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Produtos associados
              </span>
              <Badge variant="outline">
                {integration.productIntegration.length}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Criada em</span>
              <span className="text-sm">
                {format.date(integration.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
