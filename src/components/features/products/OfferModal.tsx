import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { format } from "@/lib/format";
import type { Offer, CreateOfferData, UpdateOfferData } from "@/types/offer";
import { toast } from "sonner";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateOfferData | UpdateOfferData,
    isEditing: boolean
  ) => Promise<void>;
  offer?: Offer | null;
  productPrice: number | string;
  productId: string;
}

export function OfferModal({
  isOpen,
  onClose,
  onSubmit,
  offer,
  productPrice,
  productId,
}: OfferModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discount: 0 as number,
    priceFake: 0 as number,
  });
  const [loading, setLoading] = useState(false);
  const price =
    typeof productPrice === "string" ? parseFloat(productPrice) : productPrice;
  const [calculatedPrice, setCalculatedPrice] = useState(price);

  const isEditing = !!offer;

  useEffect(() => {
    if (offer) {
      const offerDiscount = offer.discount ? Number(offer.discount) : 0;
      setFormData({
        name: offer.name,
        description: offer.description || "",
        discount: offerDiscount,
        priceFake: offer.priceFake ? Number(offer.priceFake) : 0,
      });
      // Quando está editando, calcular o preço baseado no desconto salvo
      if (offerDiscount === 0) {
        setCalculatedPrice(price); // Se desconto é 0%, usar preço original do produto
      } else {
        const discountAmount = (price * offerDiscount) / 100;
        setCalculatedPrice(price - discountAmount); // Calcular com desconto
      }
    } else {
      setFormData({
        name: "",
        description: "",
        discount: 0 as number,
        priceFake: 0 as number,
      });
      setCalculatedPrice(price); // Nova oferta sem desconto = preço original
    }
  }, [offer, price]);

  useEffect(() => {
    // Se desconto é 0%, usar o preço original do produto (sem desconto)
    if (formData.discount === 0) {
      setCalculatedPrice(price);
    } else {
      // Se tem desconto, calcular o preço com desconto aplicado
      const discountAmount = (price * formData.discount) / 100;
      setCalculatedPrice(price - discountAmount);
    }
  }, [formData.discount, price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Nome da oferta é obrigatório");
      return;
    }

    if (formData.discount < 0 || formData.discount > 100) {
      toast.error("Desconto deve estar entre 0% e 100%");
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        await onSubmit(
          {
            name: formData.name,
            description: formData.description,
            price: calculatedPrice,
            priceFake: formData.priceFake,
            discount: formData.discount,
          } as UpdateOfferData,
          true
        );
      } else {
        await onSubmit(
          {
            name: formData.name,
            description: formData.description,
            price: calculatedPrice,
            priceFake: formData.priceFake,
            discount: formData.discount,
            productId,
          } as CreateOfferData,
          false
        );
      }

      onClose();
      setFormData({
        name: "",
        description: "",
        discount: 0 as number,
        priceFake: 0 as number,
      });
    } catch (error) {
      console.error("Erro ao salvar oferta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setFormData({
        name: "",
        description: "",
        discount: 0 as number,
        priceFake: 0 as number,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Oferta" : "Criar Nova Oferta"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Oferta *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Ex: Oferta de Lançamento"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Descreva os benefícios desta oferta..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceFake">
              Preço Antigo/Comparação (opcional)
            </Label>
            <Input
              id="priceFake"
              type="number"
              min="0"
              step="0.01"
              value={formData.priceFake}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  priceFake: parseFloat(e.target.value) || 0,
                }))
              }
              placeholder="0.00"
            />
            <p className="text-xs text-muted-foreground">
              Preço antigo para mostrar a economia. Deixe vazio se não houver.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Desconto: {formData.discount}%</Label>
              <Slider
                value={[formData.discount]}
                onValueChange={(values) =>
                  setFormData((prev) => ({
                    ...prev,
                    discount: values[0] || 0,
                  }))
                }
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Preço Original:</span>
                <span className="text-lg font-bold text-muted-foreground">
                  {format.numberToReal(price)}
                </span>
              </div>

              {formData.discount > 0 && (
                <>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">Desconto:</span>
                    <Badge variant="destructive">-{formData.discount}%</Badge>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">
                      Valor descontado:
                    </span>
                    <span className="text-sm text-red-400 font-semibold">
                      {format.numberToReal((price * formData.discount) / 100)}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <span className="text-lg font-bold">Preço Final:</span>
                <span className="text-2xl font-bold text-primary">
                  {format.numberToReal(calculatedPrice)}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Salvando..."
                : isEditing
                  ? "Atualizar"
                  : "Criar Oferta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
