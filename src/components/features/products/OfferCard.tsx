import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { HiStar } from "react-icons/hi";
import { format } from "@/lib/format";
import type { Offer } from "@/types/offer";
import { CopyInput } from "@/components/ui/copy-input";

interface OfferCardProps {
  offer: Omit<Offer, "updatedAt">;
  domains: Array<any>;
  productPrice: number | string;
  onEdit: (offer: Offer) => void;
  onDelete: (offerId: string) => void;
  onSetDefault: (offerId: string) => void;
}

export function OfferCard({
  offer,
  domains,
  productPrice,
  onEdit,
  onDelete,
}: OfferCardProps) {
  const domain = domains[0] || {};
  const domainName = domain?.name || "";
  const domainCnameName = domain?.cnameName || "";

  const offerLink = `https://${domainCnameName}.${domainName}/${offer.slug}`;

  return (
    <Card
      className={`w-full ${offer.isDefault ? "ring-2 ring-primary/20 bg-primary/5" : ""}`}
    >
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {offer.name}
              {offer.isDefault && (
                <Badge variant="secondary" className="text-xs">
                  <HiStar className="h-3 w-3 mr-1" />
                  Padrão
                </Badge>
              )}
            </CardTitle>
            {offer.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {offer.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(offer)}
              className="h-8 w-8 p-0 text-gray-100 hover:text-gray-50"
              title="Editar oferta"
            >
              <HiPencil className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(offer.id)}
              className="h-8 w-8 p-0 text-red-400 hover:text-red-100 hover:!bg-red-400"
              title="Deletar oferta"
              disabled={offer.isDefault}
            >
              <HiTrash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {/* Tô pensando em fazer um condicional relacionado a o dominio da oferta. Se tiver domínio pegar o nome do domínio + slug de oferta e fazer um  um copy-input que temos em components/ui, vamos nessa?*/}

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Link:</span>
              <CopyInput
                isLink={domainName ? true : false}
                className="sm:w-[400px]"
                value={domainName ? offerLink : "Vincule um domínio"}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Preço original:
              </span>
              <span className="text-sm">
                {format.numberToReal(productPrice)}
              </span>
            </div>

            {offer.discount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Desconto:</span>
                <Badge variant="destructive" className="text-xs">
                  -{offer.discount}%
                </Badge>
                <span className="text-sm text-red-400 font-semibold">
                  {format.numberToReal(
                    (Number(productPrice) * offer.discount) / 100
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Preço fake:</span>
              <span className="text-xl line-through text-gray-50 font-bold">
                {format.numberToReal(offer.priceFake || 0)}
              </span>
            </div>

            <div className="text-2xl font-bold text-gray-50">
              {format.numberToReal(offer.price)}
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
          Criada em {new Date(offer.createdAt).toLocaleDateString("pt-BR")}
        </div>
      </CardContent>
    </Card>
  );
}
