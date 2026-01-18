import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

type ValueNotificationType =
  | "waiting_payment"
  | "paid"
  | "expired"
  | "cancelled"
  | "refunded";

type NotificationType = {
  name: string;
  value: ValueNotificationType;
};

// Opções de notificações disponíveis
const notificationOptions: NotificationType[] = [
  { name: "Transação criada", value: "waiting_payment" },
  { name: "Transação paga", value: "paid" },
  { name: "Transação expirou", value: "expired" },
  { name: "Transação cancelada", value: "cancelled" },
  { name: "Transação estornada", value: "refunded" },
];

// Schema de validação para edição Webhook
const webhookEditSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .optional(),
  url: z
    .union([z.string().url("URL deve ser válida"), z.literal("")])
    .optional(),
  key: z.string().optional(),
  secret: z.string().optional(),
  notifications: z.array(z.string()).optional(),
  active: z.boolean().optional(),
});

type WebhookEditFormData = z.infer<typeof webhookEditSchema>;

type WebhookEditFormProps = {
  integration: Integration;
  onSubmit: (data: WebhookEditFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

export function WebhookEditForm({
  integration,
  onSubmit,
  onCancel,
  loading = false,
}: WebhookEditFormProps) {
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  // Extrair dados do webhook
  const webhookData = integration.data as {
    url?: string;
    notifications?: string[];
  } | null;

  const form = useForm<WebhookEditFormData>({
    resolver: zodResolver(webhookEditSchema),
    defaultValues: {
      name: integration.name || "",
      url: webhookData?.url || "",
      key: integration.key || "",
      secret: integration.secret || "",
      notifications: webhookData?.notifications || [],
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
                <Input placeholder="Ex: Webhook Principal" {...field} />
              </FormControl>
              <FormDescription>
                Nome descritivo para identificar esta integração Webhook
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* URL do Webhook */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Webhook</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://seu-servidor.com/webhook"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                URL onde as notificações serão enviadas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Chave (Opcional) */}
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chave (Opcional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showKey ? "text" : "password"}
                    placeholder="Chave para validar as requisições"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 bg-transparent hover:bg-transparent"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Chave opcional para validar a autenticidade das requisições
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Secret (Opcional) */}
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret (Opcional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showSecret ? "text" : "password"}
                    placeholder="Secret para autenticação"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 bg-transparent hover:bg-transparent"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground hover:text-primary/80" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-primary/80" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Secret opcional para autenticação adicional
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notificações */}
        <FormField
          control={form.control}
          name="notifications"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Notificações</FormLabel>
                <FormDescription>
                  Selecione quais eventos você deseja receber
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {notificationOptions.map((notification) => (
                  <FormField
                    key={notification.value}
                    control={form.control}
                    name="notifications"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={notification.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(
                                notification.value
                              )}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      notification.value,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== notification.value
                                      ) || []
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {notification.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
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
        <div
          className="p-4 border rounded-lg"
          style={{
            backgroundColor: "rgba(0, 201, 81, 0.1)",
            borderColor: "rgba(0, 201, 81, 0.2)",
          }}
        >
          <h4 className="font-medium text-green-500 mb-2">Como funciona?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• As notificações serão enviadas via POST para sua URL</li>
            <li>• Cada notificação incluirá dados detalhados do evento</li>
            <li>• A autenticação será enviada no header Authorization</li>
            <li>
              • Seu servidor deve retornar status 200 para confirmar recebimento
            </li>
          </ul>
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
