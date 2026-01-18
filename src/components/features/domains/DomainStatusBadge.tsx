import { Badge } from "@/components/ui/badge";
import type { DomainStatus } from "@/types/domain";

interface DomainStatusBadgeProps {
  status: DomainStatus;
}

export function DomainStatusBadge({ status }: DomainStatusBadgeProps) {
  const getStatusConfig = (status: DomainStatus) => {
    switch (status) {
      case "VERIFIED":
        return {
          variant: "default" as const,
          className:
            "bg-success/20 text-success hover:bg-success/40 border border-success/40",
          text: "Verificado",
        };
      case "PENDING":
        return {
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          text: "Pendente",
        };
      case "ERROR":
        return {
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 hover:bg-red-100",
          text: "Erro",
        };
      default:
        return {
          variant: "outline" as const,
          className: "",
          text: "Desconhecido",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.text}
    </Badge>
  );
}
