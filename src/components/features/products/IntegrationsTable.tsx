import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HiTrash } from "react-icons/hi2";
import { format } from "@/lib/format";
import type { Integration } from "@/types/integration";

interface IntegrationsTableProps {
  integrations: Integration[];
  onRemove: (integrationId: string) => void;
  loading?: boolean;
  isRemoving?: boolean;
}

export function IntegrationsTable({
  integrations,
  onRemove,
  loading,
  isRemoving,
}: IntegrationsTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (integrations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhuma integração encontrada para esse produto
        </p>
      </div>
    );
  }

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Associado em</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {integrations.map((integration) => (
          <TableRow key={integration.id}>
            <TableCell className="font-medium">{integration.name}</TableCell>
            <TableCell>
              <Badge
                variant={getTypeBadgeVariant(integration.type)}
                className="text-white"
              >
                {`${integration.type} - ${getTypeLabel(integration.type)}`}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={integration.active ? "default" : "secondary"}
                className="text-white"
              >
                {integration.active ? "Ativo" : "Inativo"}
              </Badge>
            </TableCell>
            <TableCell>{format.date(integration.createdAt)}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(integration.id)}
                disabled={isRemoving}
                className="h-8 w-8 p-0 text-red-400 hover:text-red-200 hover:!bg-red-400"
                title="Remover integração"
              >
                <HiTrash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
