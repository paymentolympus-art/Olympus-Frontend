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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  updateOrderbumpSchema,
  type UpdateOrderbumpFormData,
} from "@/validators/orderbump";
import type { Orderbump } from "@/types/orderbump";
import { Loader2, Edit } from "lucide-react";

interface EditOrderbumpFormProps {
  orderbump: Orderbump;
  onSuccess?: () => void;
  onUpdateOrderbump: (
    data: UpdateOrderbumpFormData,
    orderbumpId: string
  ) => Promise<any>;
}

export function EditOrderbumpForm({
  orderbump,
  onSuccess,
  onUpdateOrderbump,
}: EditOrderbumpFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateOrderbumpFormData>({
    resolver: zodResolver(updateOrderbumpSchema),
    defaultValues: {
      name: orderbump.name,
      callToAction: orderbump.callToAction,
      description: orderbump.description,
      price: orderbump.price,
      priceFake: orderbump.priceFake,
      status: orderbump.status,
    },
  });
  const { watch } = form;

  const onSubmit = async (data: UpdateOrderbumpFormData) => {
    try {
      data.status = data.status === "ACTIVE" ? "ACTIVE" : "DISABLED";
      await onUpdateOrderbump(data, orderbump.id);
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  const handleStatusChange = (value: boolean) => {
    form.setValue("status", value ? "ACTIVE" : "DISABLED");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-gray-50 cursor-pointer">
              <Edit className="h-4 w-4" />
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar Orderbump</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Orderbump</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Preço */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preço Falso */}
            <FormField
              control={form.control}
              name="priceFake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Fake (Riscado)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Ativo/Inativo */}
            <FormField
              control={form.control}
              name="status"
              render={() => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Orderbump Ativo</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Ative ou desative este orderbump
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={watch("status") === "ACTIVE"}
                      onCheckedChange={handleStatusChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
