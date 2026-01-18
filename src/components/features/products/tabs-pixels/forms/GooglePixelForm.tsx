import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateGooglePixel, useUpdateGooglePixel } from "@/hooks/usePixels";
import type {
  CreateGooglePixelData,
  UpdatePixelData,
  GooglePixel,
} from "@/types/pixel";

const googlePixelSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  idPixel: z
    .string()
    .min(1, "ID do Pixel é obrigatório")
    .max(50, "ID do Pixel deve ter no máximo 50 caracteres"),
  labelConversion: z
    .string()
    .min(1, "Label de Conversão é obrigatório")
    .max(500, "Label de Conversão deve ter no máximo 500 caracteres"),
  ambientAction: z.object({
    initiateCheckout: z.boolean(),
    purchase: z.boolean(),
  }),
  conditionalAction: z.object({
    pixGenerate: z.boolean(),
    purchase: z.boolean(),
  }),
});

type GooglePixelFormData = z.infer<typeof googlePixelSchema>;

interface GooglePixelFormProps {
  productId: string;
  pixel?: GooglePixel;
  onSuccess?: () => void;
}

export function GooglePixelForm({
  productId,
  pixel,
  onSuccess,
}: GooglePixelFormProps) {
  const isEditing = !!pixel;

  const createMutation = useCreateGooglePixel(productId);
  const updateMutation = useUpdateGooglePixel(productId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GooglePixelFormData>({
    resolver: zodResolver(googlePixelSchema),
    defaultValues: pixel
      ? {
          name: pixel.name,
          idPixel: pixel.idPixel,
          labelConversion: pixel.labelConversion,
          ambientAction: pixel.ambientAction,
          conditionalAction: pixel.conditionalAction,
        }
      : {
          name: "",
          idPixel: "",
          labelConversion: "",
          ambientAction: {
            initiateCheckout: false,
            purchase: false,
          },
          conditionalAction: {
            pixGenerate: false,
            purchase: false,
          },
        },
  });

  const ambientAction = watch("ambientAction");
  const conditionalAction = watch("conditionalAction");

  const onSubmit = async (data: GooglePixelFormData) => {
    try {
      if (isEditing && pixel) {
        await updateMutation.mutateAsync({
          pixelId: pixel.id,
          data: data as UpdatePixelData,
        });
      } else {
        await createMutation.mutateAsync(data as CreateGooglePixelData);
      }
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Pixel</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Ex: Pixel Principal"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="idPixel">ID do Pixel</Label>
        <Input
          id="idPixel"
          {...register("idPixel")}
          placeholder="Ex: 123456789"
        />
        {errors.idPixel && (
          <p className="text-sm text-red-500">{errors.idPixel.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="labelConversion">Label de Conversão</Label>
        <Input
          id="labelConversion"
          {...register("labelConversion")}
          placeholder="Ex: purchase_label"
        />
        {errors.labelConversion && (
          <p className="text-sm text-red-500">
            {errors.labelConversion.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Ações do Ambiente</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="initiateCheckout"
                checked={ambientAction.initiateCheckout}
                onCheckedChange={(checked) =>
                  setValue("ambientAction.initiateCheckout", !!checked)
                }
              />
              <Label htmlFor="initiateCheckout" className="text-sm">
                Iniciar Checkout
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="purchase"
                checked={ambientAction.purchase}
                onCheckedChange={(checked) =>
                  setValue("ambientAction.purchase", !!checked)
                }
              />
              <Label htmlFor="purchase" className="text-sm">
                Compra
              </Label>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">Ações Condicionais</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pixGenerate"
                checked={conditionalAction.pixGenerate}
                onCheckedChange={(checked) =>
                  setValue("conditionalAction.pixGenerate", !!checked)
                }
              />
              <Label htmlFor="pixGenerate" className="text-sm">
                Gerar PIX
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="conditionalPurchase"
                checked={conditionalAction.purchase}
                onCheckedChange={(checked) =>
                  setValue("conditionalAction.purchase", !!checked)
                }
              />
              <Label htmlFor="conditionalPurchase" className="text-sm">
                Compra
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="submit"
          disabled={
            isSubmitting || createMutation.isPending || updateMutation.isPending
          }
        >
          {isSubmitting || createMutation.isPending || updateMutation.isPending
            ? "Salvando..."
            : isEditing
              ? "Atualizar Pixel"
              : "Criar Pixel"}
        </Button>
      </div>
    </form>
  );
}
