import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DomainStatusBadge } from "./DomainStatusBadge";
import { formatDate } from "@/lib/utils";
import type { Domain } from "@/types/domain";
import { Globe, Settings, Trash2, CheckCircle } from "lucide-react";

interface DomainCardProps {
  domain: Domain;
  onEdit?: (domain: Domain) => void;
  onDelete?: (domain: Domain) => void;
  onVerify?: (domain: Domain) => void;
  onDNS?: (domain: Domain) => void;
  onManageProducts?: (domain: Domain) => void;
}

export function DomainCard({
  domain,
  onEdit,
  onDelete,
  onDNS,
  onVerify,
  onManageProducts,
}: DomainCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex flex-col-reverse gap-2 md:gap-0 md:flex-row items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              {domain.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <DomainStatusBadge status={domain.status} />
              {domain.status === "VERIFIED" && (
                <CheckCircle className="h-4 w-4 text-success" />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {onVerify && domain.cnameValue && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVerify(domain)}
              >
                Verificar
              </Button>
            )}

            {onDNS && domain.status === "PENDING" && !domain.cnameValue && (
              <Button variant="outline" size="sm" onClick={() => onDNS(domain)}>
                Liberar DNS
              </Button>
            )}

            {onManageProducts && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onManageProducts(domain)}
              >
                Produtos
              </Button>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(domain)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(domain)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm text-description space-y-1">
          <p>Criado em: {formatDate(domain.createdAt)}</p>
          {domain.cnameType && (
            <p>
              CNAME: {domain.cnameName} → {domain.cnameValue}
            </p>
          )}
        </div>

        {domain.productDomain.length > 0 && (
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Produtos Associados</span>
              <Badge variant="tertiary">{domain.productDomain.length}</Badge>
            </div>
            <div className="space-y-1">
              {domain.productDomain.slice(0, 3).map((pd) => (
                <div key={pd.id} className="text-xs text-description">
                  • {pd.product.name}
                </div>
              ))}
              {domain.productDomain.length > 3 && (
                <div className="text-xs text-description">
                  +{domain.productDomain.length - 3} mais...
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
