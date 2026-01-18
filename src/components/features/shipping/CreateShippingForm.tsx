import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createShippingOption } from "@/api/shipping";
import {
  CreateShippingDataSchema,
  type CreateShippingData,
} from "@/validators/shipping";
import { toast } from "sonner";
import { compressImage } from "@/lib/utils";

interface CreateShippingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateShippingForm({
  onSuccess,
  onCancel,
}: CreateShippingFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CreateShippingData>({
    resolver: zodResolver(CreateShippingDataSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      productId: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createShippingOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
      toast.success("Opção de frete criada com sucesso!");
      reset();
      setImagePreview(null);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Erro ao criar opção de frete"
      );
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione apenas arquivos de imagem");
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Comprimir imagem
      const compressedFile = await compressImage(file, {
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      });

      setValue("image", compressedFile);

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      toast.error("Erro ao processar imagem");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setValue("image", undefined);
    setImagePreview(null);
  };

  const onSubmit = async (data: CreateShippingData) => {
    try {
      // Transformar string vazia em undefined para productId
      const formData = {
        ...data,
        productId: data.productId === "" ? undefined : data.productId,
      };
      await createMutation.mutateAsync(formData);
    } catch (error) {
      // Erro já tratado no mutation
    }
  };

  const watchedPrice = watch("price");

  return (
    <div className="w-full max-w-2xl mx-auto px-0">
      <CardContent className="px-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Ex: Frete Expresso"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva os detalhes desta opção de frete..."
              {...register("description")}
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Preço */}
          <div className="space-y-2">
            <Label htmlFor="price">Preço (R$) *</Label>
            <div className="relative">
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                {...register("price", { valueAsNumber: true })}
                className={`pr-12 ${errors.price ? "border-red-500" : ""}`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                R$
              </div>
            </div>
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
            {watchedPrice >= 0 && (
              <Badge variant="secondary" className="mt-1">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(watchedPrice)}
              </Badge>
            )}
          </div>

          {/* ID do Produto (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="productId">ID do Produto (opcional)</Label>
            <Input
              id="productId"
              placeholder="UUID do produto associado"
              {...register("productId", { required: false })}
              className={errors.productId ? "border-red-500" : ""}
            />
            {errors.productId && (
              <p className="text-sm text-red-500">{errors.productId.message}</p>
            )}
          </div>

          {/* Upload de Imagem */}
          <div className="space-y-2">
            <Label>Imagem (opcional)</Label>
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeImage}
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {isUploading
                          ? "Processando..."
                          : "Clique para fazer upload"}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG até 5MB</p>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || createMutation.isPending}
              className="flex-1"
            >
              {isSubmitting || createMutation.isPending
                ? "Criando..."
                : "Criar Opção de Frete"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting || createMutation.isPending}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </div>
  );
}
