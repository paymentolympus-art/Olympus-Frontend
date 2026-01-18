import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateTikTokPixel, useUpdateTikTokPixel } from "@/hooks/usePixels";
import type {
  CreateTikTokPixelData,
  UpdatePixelData,
  TikTokPixel,
} from "@/types/pixel";

const tiktokPixelSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  idPixel: z
    .string()
    .min(1, "ID do Pixel é obrigatório")
    .max(50, "ID do Pixel deve ter no máximo 50 caracteres"),
  tokenConversion: z
    .string()
    .min(1, "Token de Conversão é obrigatório")
    .max(500, "Token de Conversão deve ter no máximo 500 caracteres"),
  ambientAction: z.object({
    initiateCheckout: z.boolean(),
    purchase: z.boolean(),
  }),
  conditionalAction: z.object({
    pixGenerate: z.boolean(),
    purchase: z.boolean(),
  }),
});

type TikTokPixelFormData = z.infer<typeof tiktokPixelSchema>;

interface TikTokPixelFormProps {
  productId: string;
  pixel?: TikTokPixel;
  onSuccess?: () => void;
}

export function TikTokPixelForm({
  productId,
  pixel,
  onSuccess,
}: TikTokPixelFormProps) {
  const isEditing = !!pixel;

  const createMutation = useCreateTikTokPixel(productId);
  const updateMutation = useUpdateTikTokPixel(productId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TikTokPixelFormData>({
    resolver: zodResolver(tiktokPixelSchema),
    defaultValues: pixel
      ? {
          name: pixel.name,
          idPixel: pixel.idPixel,
          tokenConversion: pixel.tokenConversion,
          ambientAction: pixel.ambientAction,
          conditionalAction: pixel.conditionalAction,
        }
      : {
          name: "",
          idPixel: "",
          tokenConversion: "",
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

  const onSubmit = async (data: TikTokPixelFormData) => {
    try {
      if (isEditing && pixel) {
        await updateMutation.mutateAsync({
          pixelId: pixel.id,
          data: data as UpdatePixelData,
        });
      } else {
        await createMutation.mutateAsync(data as CreateTikTokPixelData);
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
        <Label htmlFor="tokenConversion">Token de Conversão</Label>
        <Input
          id="tokenConversion"
          {...register("tokenConversion")}
          placeholder="Ex: abc123def456"
        />
        {errors.tokenConversion && (
          <p className="text-sm text-red-500">
            {errors.tokenConversion.message}
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
