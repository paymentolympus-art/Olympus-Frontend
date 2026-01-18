import { motion } from "framer-motion";
import { Webhook, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
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
import { toast } from "sonner";
import { useIntegrations } from "@/hooks/useIntegrations";

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

// Schema de validação para o formulário Webhook
const webhookFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  url: z.string().min(1, "URL é obrigatória").url("URL deve ser válida"),
  key: z.string().optional(),
  secret: z.string().optional(),
  notifications: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma notificação"),
});

type WebhookFormData = z.infer<typeof webhookFormSchema>;

type WebhookIntegrationProps = {
  selected?: boolean;
  integrationsCount?: number;
};

export function WebhookIntegration({
  integrationsCount = 0,
  selected,
}: WebhookIntegrationProps) {
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const { createWebhookIntegration, loading } = useIntegrations();

  const form = useForm<WebhookFormData>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: {
      name: "",
      url: "",
      key: "",
      secret: "",
      notifications: [],
    },
  });

  const onSubmit = async (data: WebhookFormData) => {
    try {
      const integrationData = {
        name: data.name,
        type: "WEBHOOK" as const,
        key: data.key || "",
        secret: data.secret || "",
        data: {
          url: data.url,
          notifications: data.notifications,
        },
      };

      await createWebhookIntegration(integrationData);
      setShowAddSheet(false);
      form.reset();
      toast.success("Integração Webhook criada com sucesso!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao criar integração Webhook.";
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(!selected && "hidden")}
    >
      <Card
        className={cn(
          "h-min group hover:shadow-lg transition-all duration-300 hover:border-border"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-background border">
              <Webhook className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Webhook</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Receba notificações em tempo real sobre transações e
                transferências
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  variant="outline"
                  className={
                    "bg-green-500/10 text-green-500 border-green-500/20"
                  }
                >
                  WEBHOOK
                </Badge>
                <Badge variant="secondary">notificações</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Integrações: {integrationsCount}
            </span>

            <Sheet open={showAddSheet} onOpenChange={setShowAddSheet}>
              <SheetTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  ADICIONAR
                </Button>
              </SheetTrigger>
              <SheetContent className="pb-4 max-w-2xl max-h-[100vh] overflow-y-auto scrollbar-thin scrollbar-corner-amber-200 scrollbar-thumb-pink-500 scrollbar-track-pink-300">
                <SheetHeader>
                  <SheetTitle>Adicionar Webhook</SheetTitle>
                  <SheetDescription>
                    Configure a integração Webhook para receber notificações em
                    tempo real
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 px-4">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Nome da Integração */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Integração</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: Webhook Principal"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Nome descritivo para identificar esta integração
                              Webhook
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
                                  className="absolute right-0 top-0 h-full px-3 py-2 !bg-transparent hover:bg-transparent"
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
                              Chave opcional para validar a autenticidade das
                              requisições
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
                                  className="absolute right-0 top-0 h-full px-3 py-2 !bg-transparent hover:bg-transparent"
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
                              <FormLabel className="text-base">
                                Notificações
                              </FormLabel>
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
                                                    ...field.value,
                                                    notification.value,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !==
                                                        notification.value
                                                    )
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

                      {/* Informações Adicionais */}
                      <div
                        className="p-4 border rounded-lg"
                        style={{
                          backgroundColor: "rgba(0, 201, 81, 0.1)",
                          borderColor: "rgba(0, 201, 81, 0.2)",
                        }}
                      >
                        <h4 className="font-medium text-green-500 mb-2">
                          Como funciona?
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>
                            • As notificações serão enviadas via POST para sua
                            URL
                          </li>
                          <li>
                            • Cada notificação incluirá dados detalhados do
                            evento
                          </li>
                          <li>
                            • A autenticação será enviada no header
                            Authorization
                          </li>
                          <li>
                            • Seu servidor deve retornar status 200 para
                            confirmar recebimento
                          </li>
                        </ul>
                      </div>

                      {/* Botões */}
                      <div className="flex items-center justify-end space-x-2 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddSheet(false)}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? "Criando..." : "Criar Integração"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
