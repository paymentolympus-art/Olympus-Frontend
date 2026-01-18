import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductUpdate } from "@/hooks/useProductUpdate";
import { updateProductSchema } from "@/validators/product";
import type { UpdateProductFormData } from "@/validators/product";
import type { ProductDetails } from "@/types/product";
import { Pencil } from "lucide-react";

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetails;
}

export function ProductEditModal({
  isOpen,
  onClose,
  product,
}: ProductEditModalProps) {
  const { updateProduct, isUpdating } = useProductUpdate(product.id);

  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      price: product.price,
      type: product.type,
      urlBack: product.urlBack || "",
      urlRedirect: product.urlRedirect || "",
    },
  });

  // Reset form when product changes or modal opens
  useEffect(() => {
    if (isOpen) {
      form.reset({
        price: product.price,
        type: product.type,
        urlBack: product.urlBack || "",
        urlRedirect: product.urlRedirect || "",
      });
    }
  }, [product, isOpen, form]);

  const handleSubmit = async (data: UpdateProductFormData) => {
    try {
      // Remove campos vazios antes de enviar
      const updateData: UpdateProductFormData = {};
      if (data.price !== undefined && data.price !== "") {
        updateData.price = data.price;
      }
      if (data.type !== undefined) {
        updateData.type = data.type;
      }
      if (data.urlBack !== undefined && data.urlBack !== "") {
        updateData.urlBack = data.urlBack;
      }
      if (data.urlRedirect !== undefined && data.urlRedirect !== "") {
        updateData.urlRedirect = data.urlRedirect;
      }

      await updateProduct(updateData);
      handleClose();
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleClose = () => {
    form.reset({
      price: product.price,
      type: product.type,
      urlBack: product.urlBack || "",
      urlRedirect: product.urlRedirect || "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Atualize as informações do produto "{product.name}"
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Preço */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
                      disabled={isUpdating}
                    />
                  </FormControl>
                  <FormDescription>
                    Preço do produto em reais (R$)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categoria */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria do Produto</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isUpdating}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DIGITAL">Produto Digital</SelectItem>
                      <SelectItem value="PHYSICAL">Produto Físico</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Tipo de produto: Digital ou Físico
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL de Retorno */}
            <FormField
              control={form.control}
              name="urlBack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Retorno</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://exemplo.com/retorno"
                      {...field}
                      disabled={isUpdating}
                    />
                  </FormControl>
                  <FormDescription>
                    URL para onde o usuário será redirecionado após o pagamento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL de Redirecionamento */}
            <FormField
              control={form.control}
              name="urlRedirect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Redirecionamento</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://exemplo.com/redirecionamento"
                      {...field}
                      disabled={isUpdating}
                    />
                  </FormControl>
                  <FormDescription>
                    URL alternativa de redirecionamento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botões de ação */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isUpdating}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Atualizar
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
