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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createOrderbumpSchema,
  type CreateOrderbumpFormData,
} from "@/validators/orderbump";
import { useOrderbumpAvailable } from "@/hooks/useOrderbumps";
import { formatCurrency } from "@/lib/format";
import { Loader2, Plus } from "lucide-react";
import { FaImage } from "react-icons/fa";

interface OrderbumpFormProps {
  productId: string;
  onSuccess?: () => void;
  onCreateOrderbump: (data: CreateOrderbumpFormData) => Promise<any>;
}

export function OrderbumpForm({
  productId,
  onSuccess,
  onCreateOrderbump,
}: OrderbumpFormProps) {
  const [open, setOpen] = useState(false);
  const { data: orderbumpAvailable, isLoading: isLoadingProducts } =
    useOrderbumpAvailable(productId);

  const form = useForm<CreateOrderbumpFormData>({
    resolver: zodResolver(createOrderbumpSchema),
    defaultValues: {
      productId: productId,
      offerId: "",
      name: "",
      callToAction: "Sim, eu aceito essa oferta",
      description: "",
    },
  });

  const onSubmit = async (data: CreateOrderbumpFormData) => {
    try {
      await onCreateOrderbump(data);
      form.reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  if (isLoadingProducts) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Carregando produtos...</span>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Orderbump
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Orderbump</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="offerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione o produto e a oferta</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {orderbumpAvailable?.orderBumps.map((orderbump) => (
                        <SelectItem
                          key={orderbump.idOffer}
                          value={orderbump.idOffer}
                        >
                          <div className="flex items-center gap-2 w-full">
                            {orderbump.image ? (
                              <img
                                src={orderbump.image}
                                alt={orderbump.title}
                                className="w-8 h-8 rounded object-cover"
                              />
                            ) : (
                              <FaImage className="w-8 h-8 rounded object-cover bg-muted" />
                            )}
                            <div className="w-full flex gap-2">
                              <div className="font-medium">
                                {orderbump.title}
                              </div>
                              <div className="text-sm font-medium text-muted-foreground">
                                Preço: {formatCurrency(orderbump.price)}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Título do Orderbump */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Orderbump</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Um título para exibição no orderbump"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Chamada para Ação */}
            <FormField
              control={form.control}
              name="callToAction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chamada para Ação</FormLabel>
                  <FormControl>
                    <Input placeholder="Uma chamada para ação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve descrição"
                      className="min-h-[100px]"
                      {...field}
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
                disabled={form.formState.isSubmitting || form.formState.isValid}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={false}>
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Adicionar Orderbump
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
