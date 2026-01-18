import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

import { Trash2 } from "lucide-react";
import type { Orderbump } from "@/types/orderbump";
import { MdAddShoppingCart } from "react-icons/md";
import { formatCurrency } from "@/lib/format";
import { EditOrderbumpForm, OrderbumpImageForm } from "./forms";
import type { UpdateOrderbumpFormData } from "@/validators/orderbump";

interface OrderbumpListProps {
  loading: boolean;
  orderbumps: Orderbump[];
  isToggling: boolean;
  onToggleActive: (id: string, status: string) => void;
  isDeleting: boolean;
  onDelete: (id: string) => void;
  onUpdateOrderbump: (
    data: UpdateOrderbumpFormData,
    orderbumpId: string
  ) => Promise<any>;
  onUpdateImage?: (orderbumpId: string, file: File) => Promise<any>;
  onRemoveImage?: (orderbumpId: string) => Promise<any>;
}

export function OrderbumpList({
  orderbumps,
  loading,
  isToggling,
  onToggleActive,
  isDeleting,
  onDelete,
  onUpdateOrderbump,
  onUpdateImage,
  onRemoveImage,
}: OrderbumpListProps) {
  const handleToggleActive = async (orderbump: Orderbump) => {
    try {
      onToggleActive(orderbump.id, orderbump.status);
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  const handleDelete = async (orderbumpId: string) => {
    try {
      onDelete(orderbumpId);
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!orderbumps || orderbumps.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground mb-4">
          <MdAddShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Nenhum orderbump criado ainda</p>
          <p className="text-sm">Crie seu primeiro orderbump para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orderbumps.map((orderbump) => (
        <Card key={orderbump.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  {orderbump.name}
                  <Badge variant={orderbump.status ? "default" : "secondary"}>
                    {orderbump.status ? "Ativo" : "Inativo"}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Criado em{" "}
                  {new Date(orderbump.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  className="cursor-pointer"
                  checked={orderbump.status === "ACTIVE"}
                  onCheckedChange={() => handleToggleActive(orderbump)}
                  disabled={isToggling}
                />
                <EditOrderbumpForm
                  orderbump={orderbump}
                  onUpdateOrderbump={onUpdateOrderbump}
                />
                {onUpdateImage && (
                  <OrderbumpImageForm
                    orderbump={orderbump}
                    onUpdateImage={onUpdateImage}
                    onRemoveImage={onRemoveImage}
                  />
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir este orderbump? Esta ação
                        não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(orderbump.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isDeleting}
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-row justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">
                  Chamada para Ação:
                </h4>
                <p className="text-sm">{orderbump.callToAction}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">
                  Descrição:
                </h4>
                <p className="text-sm">{orderbump.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              {orderbump.image && (
                <div className="flex-shrink-0">
                  <img
                    src={orderbump.image}
                    alt={orderbump.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <div className="flex items-center">
              <p className="text-lg line-through font-bold text-gray-300">
                {formatCurrency(orderbump.priceFake || 0)}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-xl font-bold text-gray-50">
                {formatCurrency(orderbump.price)}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
