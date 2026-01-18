import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import type { Integration } from "@/types/integration";
import { useState } from "react";

// Schema de validação para edição Utmify
const utmifyEditSchema = z.object({
  name: z
    .string()
    .max(255, "Nome deve ter no máximo 255 caracteres")
    .optional(),
  token: z
    .string()
    .max(255, "Token deve ter no máximo 255 caracteres")
    .optional(),
  active: z.boolean().optional(),
});

type UtmifyEditFormData = z.infer<typeof utmifyEditSchema>;

type UtmifyEditFormProps = {
  integration: Integration;
  onSubmit: (data: UtmifyEditFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

export function UtmifyEditForm({
  integration,
  onSubmit,
  onCancel,
  loading = false,
}: UtmifyEditFormProps) {
  const [showToken, setShowToken] = useState(false);

  const form = useForm<UtmifyEditFormData>({
    resolver: zodResolver(utmifyEditSchema),
    defaultValues: {
      name: integration.name || "",
      token: integration.token || "",
      active: integration.active ?? true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome da Integração */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Integração</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Utmify Principal" {...field} />
              </FormControl>
              <FormDescription>
                Nome descritivo para identificar esta integração Utmify
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Token de API */}
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token de API</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showToken ? "text" : "password"}
                    placeholder="Seu token de API do Utmify"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 bg-transparent hover:bg-transparent"
                    onClick={() => setShowToken(!showToken)}
                  >
                    {showToken ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground hover:text-primary/80" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-primary/80" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Token de autenticação fornecido pelo Utmify
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status Ativo */}
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Status Ativo</FormLabel>
                <FormDescription>
                  Ativar ou desativar esta integração
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Informações Adicionais */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <h4 className="font-medium text-purple-500 mb-2">
            Como obter o Token?
          </h4>
          <ol className="text-sm text-muted-foreground space-y-1">
            <li>1. Acesse sua conta no Utmify</li>
            <li>2. Vá para Configurações → API</li>
            <li>3. Copie o token de autenticação</li>
            <li>4. Cole aqui para atualizar sua integração</li>
          </ol>
        </div>

        {/* Botões */}
        <div className="flex items-center justify-end space-x-2 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar Integração"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
