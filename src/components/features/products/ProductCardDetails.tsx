import { useState } from "react";
import type { ProductDetails } from "@/types/product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, ImageIcon, Trash2, Pencil } from "lucide-react";
import {
  getStatusColor,
  getProductStatus,
} from "@/components/features/products/format";
import { Link } from "react-router-dom";
import { useProductImage } from "@/hooks/useProductImage";
import { ProductImageModal } from "./ProductImageModal";
import { ProductEditModal } from "./ProductEditModal";

type ProductCardDetailsProps = {
  product: ProductDetails;
  refetchProduct: () => void;
};

export function ProductCardDetails({ product }: ProductCardDetailsProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { removeImage, isRemoving } = useProductImage(product.id);

  const handleRemoveImage = async () => {
    if (confirm("Tem certeza que deseja remover a imagem deste produto?")) {
      try {
        await removeImage();
      } catch (error) {
        // Error handling is done in the mutation
      }
    }
  };

  return (
    <Card className="sm:w-2/4 w-full sm:max-w-[300px] h-full rounded-sm py-0">
      <CardContent className="p-6 flex flex-col gap-6">
        {/* Imagem do Produto */}
        <div className="relative">
          <Avatar className="w-full h-50 rounded-sm">
            <AvatarImage
              src={product.image || ""}
              alt={product.name}
              className="object-cover object-center rounded-sm"
            />
            <AvatarFallback className="text-2xl font-bold rounded-sm">
              {product.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Título do Produto */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                disabled={isRemoving}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Editar Produto
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsImageModalOpen(true)}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Atualizar Imagem
              </DropdownMenuItem>
              {product.image && (
                <DropdownMenuItem
                  onClick={handleRemoveImage}
                  className="text-red-400  hover:!bg-red-400/30"
                >
                  <Trash2 className="text-red-400 h-4 w-4 mr-2" />
                  Remover Imagem
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Detalhes do Produto */}
        <div className="space-y-2 overflow-y-auto max-h-[500px]">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex flex-col gap-1">
              <Badge
                variant="outline"
                className={getStatusColor(product.status)}
              >
                {getProductStatus(product.status)}
              </Badge>
            </div>

            <div className="flex flex-col gap-1 border-t pt-2">
              <Label className="text-xs font-bold">
                Identificador do produto
              </Label>
              <p className="text-sm font-sans">{product.id}</p>
            </div>

            <div className="flex flex-col gap-1 border-t pt-2">
              <Label className="text-xs font-bold">Categoria</Label>
              <p className="text-sm font-sans">
                {product.type === "DIGITAL"
                  ? "Produto Digital"
                  : "Produto Físico"}
              </p>
            </div>

            <div className="flex flex-col gap-1 border-t pt-2">
              <Label className="text-xs font-bold">Faixa de Preço</Label>
              <p className="text-sm font-sans">
                R$ {Number(product.price).toFixed(2)}
              </p>
            </div>

            {product.urlBack && (
              <div className="flex flex-col gap-1 border-t pt-2">
                <Label className="text-xs font-bold">URL de retorno</Label>
                <Link to={product.urlBack} target="_blank" className="text-sm">
                  {product.urlBack}
                </Link>
              </div>
            )}

            {product.urlRedirect && (
              <div className="flex flex-col gap-1 border-t pt-2">
                <Label className="text-xs font-bold">
                  URL de redirecionamento
                </Label>
                <Link
                  to={product.urlRedirect}
                  target="_blank"
                  className="text-sm"
                >
                  {product.urlRedirect}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Botão para ir ao checkout */}
        <div className="pt-4 border-t">
          <Button asChild className="w-full" size="lg">
            <Link to={`/user/checkout/${product.id}`}>Ir para Checkout</Link>
          </Button>
        </div>
      </CardContent>

      {/* Modal para atualizar imagem */}
      <ProductImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        productId={product.id}
        productName={product.name}
      />

      {/* Modal para editar produto */}
      <ProductEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={product}
      />
    </Card>
  );
}
