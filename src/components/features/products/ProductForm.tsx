import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { CreateProductData } from "@/types/product";

// Schema para criação de produto
const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z.string().optional(),
  type: z.enum(["DIGITAL", "PHYSICAL"]).default("DIGITAL"),
  paymentFormat: z.enum(["ONE_TIME", "RECURRING"]).default("ONE_TIME"),
  price: z
    .string()
    .min(1, "Preço é obrigatório")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Preço deve ser um número válido"
    ),
});

interface ProductFormProps {
  onSubmit: (data: CreateProductData) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export function ProductForm({
  onSubmit,
  onCancel,
  loading = false,
}: ProductFormProps) {
  const form = useForm<any>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "DIGITAL",
      paymentFormat: "ONE_TIME",
      price: "",
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      form.reset();
      toast.success("Produto criado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar produto");
    }
  };

  const productTypeOptions = [
    {
      value: "DIGITAL",
      label: "Produto digital",
      description: "Produto digital (e-book, curso, etc.)",
    },
    {
      value: "PHYSICAL",
      label: "Produto fisico",
      description: "Produto físico com entrega",
    },
  ];

  const paymentFormatOptions = [
    {
      value: "ONE_TIME",
      label: "Pagamento Único",
      description: "Cobrança única",
    },
    {
      value: "RECURRING",
      label: "Recorrente",
      description: "Cobrança recorrente personalizada",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Curso de React" {...field} />
              </FormControl>
              <FormDescription>
                Nome descritivo do produto (3-100 caracteres)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o produto..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Descrição detalhada do produto (opcional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 w-full">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo do Produto</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Categoria do produto</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Formato de Pagamento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentFormatOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Como o cliente irá pagar por este produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormDescription>Preço em reais (R$)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end space-x-2 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar Produto"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
