import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Key,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
  ShieldAlert,
  Globe,
  Server,
} from "lucide-react";
import { format } from "@/lib/format";
import { toast } from "sonner";
import type { ApiKey, ApiKeyStatus } from "@/types/api-key";

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
  index: number;
}

const statusConfig: Record<
  ApiKeyStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  PENDING: {
    label: "Pendente",
    icon: <Clock className="h-3 w-3" />,
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  ACTIVE: {
    label: "Ativa",
    icon: <CheckCircle className="h-3 w-3" />,
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  INACTIVE: {
    label: "Inativa",
    icon: <XCircle className="h-3 w-3" />,
    className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  },
  BLOCKED: {
    label: "Bloqueada",
    icon: <ShieldAlert className="h-3 w-3" />,
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

export function ApiKeyCard({ apiKey, onEdit, onDelete, index }: ApiKeyCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey.key);
      setCopied(true);
      toast.success("Chave copiada!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Erro ao copiar chave");
    }
  };

  const maskKey = (key: string) => {
    if (key.length <= 12) return key;
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  };

  const status = statusConfig[apiKey.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
                <Key className="h-4 w-4 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold truncate text-white">
                  {apiKey.name}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className={status.className}>
                    <span className="flex items-center gap-1">
                      {status.icon}
                      {status.label}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(apiKey)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-400">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Deletar
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja deletar a API Key "
                        {apiKey.name}"? Esta ação não pode ser desfeita e qualquer integração
                        usando esta chave deixará de funcionar.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(apiKey.id)}
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
          <div className="space-y-4">
            {/* Chave Pública */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs text-muted-foreground font-medium">KEY:</span>
                <code className="text-sm text-white font-mono truncate">
                  {maskKey(apiKey.key)}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyKey}
                className="ml-2 shrink-0"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* IPs e Domínios */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">IPs</span>
                  <span className="text-sm text-white">
                    {apiKey.ips.length > 0 ? apiKey.ips.length : "Todos"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Domínios</span>
                  <span className="text-sm text-white">
                    {apiKey.domains.length > 0 ? apiKey.domains.length : "Todos"}
                  </span>
                </div>
              </div>
            </div>

            {/* Data de criação */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">Criada em</span>
              <span className="text-xs text-white">
                {format.date(apiKey.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

