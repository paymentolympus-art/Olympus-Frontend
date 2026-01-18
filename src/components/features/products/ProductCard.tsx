import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  CreditCard,
  MoreVertical,
  Trash2,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { ProductStatus } from "@/types/product";
import { format } from "@/lib/format";
import {
  productPaymentFormat,
  productType,
} from "@/components/features/products/format";

interface ProductCardProps {
  product: Product;
  onDelete: (productId: string) => Promise<void>;
  loading?: boolean;
}

export function ProductCard({ product, onDelete, loading }: ProductCardProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const typeIcons = {
    DIGITAL: Package,
    PHYSICAL: Package,
  };

  const paymentFormatIcons = {
    ONE_TIME: CreditCard,
    RECURRING: Clock,
  };

  const statusIcons = {
    [ProductStatus.ACTIVE]: CheckCircle,
    [ProductStatus.DISABLED]: XCircle,
    [ProductStatus.PENDING]: AlertCircle,
    [ProductStatus.REJECTED]: XCircle,
  };

  const statusColors = {
    [ProductStatus.ACTIVE]:
      "bg-green-500/10 text-green-500 border-green-500/20",
    [ProductStatus.DISABLED]: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    [ProductStatus.PENDING]:
      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    [ProductStatus.REJECTED]: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const statusLabels = {
    [ProductStatus.ACTIVE]: "Ativo",
    [ProductStatus.DISABLED]: "Desabilitado",
    [ProductStatus.PENDING]: "Pendente",
    [ProductStatus.REJECTED]: "Rejeitado",
  };

  const TypeIcon = typeIcons[product.type] || Package;
  const PaymentFormatIcon =
    paymentFormatIcons[product.paymentFormat] || CreditCard;
  const StatusIcon = statusIcons[product.status] || CheckCircle;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(product.id);
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir produto");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/user/products/${product.id}/details`);
  };

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={product.imageUrl}
                alt={product.name}
                className="object-cover"
              />
              <AvatarFallback className="text-xs">
                <TypeIcon className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {productType[product.type]}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Produto</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir o produto "{product.name}"?
                      Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? "Excluindo..." : "Excluir"}
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
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PaymentFormatIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {productPaymentFormat[product.paymentFormat]}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-sm">
                {format.numberToReal(Number(product.price))}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className={statusColors[product.status]}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {statusLabels[product.status]}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
