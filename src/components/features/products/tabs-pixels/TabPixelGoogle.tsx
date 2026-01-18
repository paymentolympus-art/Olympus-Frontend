import { Fragment, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HiPlus, HiTrash, HiPencil } from "react-icons/hi2";
import { format } from "@/lib/format";
import { usePixels, useDeletePixel } from "@/hooks/usePixels";
import { GooglePixelForm } from "./forms";
import type { GooglePixel } from "@/types/pixel";
import Modal from "@/components/widgets/modal";
import { cn } from "@/lib/utils";

interface TabPixelGoogleProps {
  productId: string;
}

export function TabPixelGoogle({ productId }: TabPixelGoogleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedPixel, setSelectedPixel] = useState<GooglePixel | null>(null);

  const { data: pixelsData, isLoading } = usePixels(productId);
  const deletePixelMutation = useDeletePixel(productId);

  const pixels = pixelsData?.pixels.GOOGLE_ADS || [];

  const handleEdit = (pixel: GooglePixel) => {
    setSelectedPixel(pixel);
    setIsOpenEdit(true);
  };

  const handleDelete = async (pixelId: string) => {
    if (confirm("Tem certeza que deseja deletar este pixel?")) {
      await deletePixelMutation.mutateAsync(pixelId);
    }
  };

  const handleCloseModals = () => {
    setIsOpen(false);
    setIsOpenEdit(false);
    setSelectedPixel(null);
  };

  const handleSuccess = () => {
    handleCloseModals();
  };

  const renderCard = (pixels: GooglePixel[]) => {
    return (
      <div className="grid gap-4">
        {pixels.map((pixel) => (
          <Card key={pixel.id} className="relative">
            <CardHeader className="">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base font-medium truncate">
                  {pixel.name}
                </CardTitle>
                <div className="flex gap-1 ml-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(pixel)}
                    className="h-8 w-8 p-0"
                  >
                    <HiPencil className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(pixel.id)}
                    disabled={deletePixelMutation.isPending}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <HiTrash className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  ID do Pixel
                </label>
                <code className="block text-sm bg-muted px-2 py-1 rounded mt-1 break-all">
                  {pixel.idPixel}
                </code>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Label de Conversão
                </label>
                <code className="block text-sm bg-muted px-2 py-1 rounded mt-1 break-all">
                  {pixel.labelConversion}
                </code>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Ações do Ambiente
                </label>
                <div className="flex flex-wrap gap-1">
                  {pixel.ambientAction?.initiateCheckout && (
                    <Badge variant="secondary" className="text-xs">
                      Iniciar Checkout
                    </Badge>
                  )}
                  {pixel.ambientAction?.purchase && (
                    <Badge variant="secondary" className="text-xs">
                      Compra
                    </Badge>
                  )}
                  {!pixel.ambientAction?.initiateCheckout &&
                    !pixel.ambientAction?.purchase && (
                      <span className="text-xs text-muted-foreground">
                        Nenhuma ação
                      </span>
                    )}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Ações Condicionais
                </label>
                <div className="flex flex-wrap gap-1">
                  {pixel.conditionalAction?.pixGenerate && (
                    <Badge variant="outline" className="text-xs">
                      Gerar PIX
                    </Badge>
                  )}
                  {pixel.conditionalAction?.purchase && (
                    <Badge variant="outline" className="text-xs">
                      Compra
                    </Badge>
                  )}
                  {!pixel.conditionalAction?.pixGenerate &&
                    !pixel.conditionalAction?.purchase && (
                      <span className="text-xs text-muted-foreground">
                        Nenhuma ação
                      </span>
                    )}
                </div>
              </div>

              <div className="pt-2 border-t">
                <span className="text-xs text-muted-foreground">
                  Criado em {format.date(pixel.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Fragment>
      <div className="flex flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Pixels do Google</h3>

        <Button
          onClick={() => setIsOpen(true)}
          className={cn(pixels.length > 0 && "hidden")}
        >
          <HiPlus className="h-4 w-4" />
          Adicionar pixel
        </Button>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="text-center py-8">Carregando pixels...</div>
        ) : pixels.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum pixel do Google encontrado
          </div>
        ) : (
          renderCard(pixels)
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModals}
        title="Adicionar Pixel do Google"
        description="Adicione seu pixel do Google"
      >
        <GooglePixelForm productId={productId} onSuccess={handleSuccess} />
      </Modal>

      <Modal
        isOpen={isOpenEdit}
        onClose={handleCloseModals}
        title="Editar Pixel do Google"
        description="Edite seu pixel do Google"
      >
        {selectedPixel && (
          <GooglePixelForm
            productId={productId}
            pixel={selectedPixel}
            onSuccess={handleSuccess}
          />
        )}
      </Modal>
    </Fragment>
  );
}
