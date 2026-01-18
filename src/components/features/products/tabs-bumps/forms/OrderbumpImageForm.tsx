import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImageInput } from "@/components/ui/image-input";
import { z } from "zod";
import type { Orderbump } from "@/types/orderbump";
import { Loader2, Image as ImageIcon } from "lucide-react";

// Schema para validação da imagem
const orderbumpImageSchema = z.object({
  image: z
    .instanceof(File, {
      message: "Por favor, selecione uma imagem",
    })
    .optional(),
});

type OrderbumpImageFormData = z.infer<typeof orderbumpImageSchema>;

interface OrderbumpImageFormProps {
  orderbump: Orderbump;
  onSuccess?: () => void;
  onUpdateImage: (orderbumpId: string, file: File) => Promise<any>;
  onRemoveImage?: (orderbumpId: string) => Promise<any>;
}

export function OrderbumpImageForm({
  orderbump,
  onSuccess,
  onUpdateImage,
  onRemoveImage,
}: OrderbumpImageFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderbumpImageFormData>({
    resolver: zodResolver(orderbumpImageSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = async () => {
    if (!selectedFile) return;

    setIsSubmitting(true);
    try {
      await onUpdateImage(orderbump.id, selectedFile);
      setOpen(false);
      setSelectedFile(null);
      form.reset();
      onSuccess?.();
    } catch (error) {
      // Erro já tratado no hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!onRemoveImage) return;

    setIsSubmitting(true);
    try {
      await onRemoveImage(orderbump.id);
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      // Erro já tratado no hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-gray-50 cursor-pointer">
              <ImageIcon className="h-4 w-4" />
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Gerenciar Imagem</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerenciar Imagem do Orderbump</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Imagem atual */}
          {orderbump.image && (
            <div className="space-y-3">
              {onRemoveImage && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Remover Imagem
                </Button>
              )}
            </div>
          )}

          {/* Formulário de upload */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      {orderbump.image ? "Nova Imagem" : "Imagem do Orderbump"}
                    </FormLabel>
                    <FormControl>
                      <ImageInput
                        label=""
                        description="Selecione uma imagem para o orderbump"
                        maxSize={5}
                        initialPreview={orderbump.image}
                        onFileSelect={handleFileSelect}
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={!selectedFile || isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {orderbump.image ? "Atualizar Imagem" : "Adicionar Imagem"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
