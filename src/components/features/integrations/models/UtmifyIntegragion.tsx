import { motion } from "framer-motion";
import { Link, Eye, EyeOff } from "lucide-react";
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

// Schema de validação para o formulário Utmify
const utmifyFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  token: z
    .string()
    .min(1, "Token é obrigatório")
    .max(255, "Token deve ter no máximo 255 caracteres"),
});

type UtmifyFormData = z.infer<typeof utmifyFormSchema>;

type UtmifyIntegrationProps = {
  selected?: boolean;
  integrationsCount?: number;
};

export function UtmifyIntegration({
  integrationsCount = 0,
  selected,
}: UtmifyIntegrationProps) {
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const { createUtmifyIntegration, loading } = useIntegrations();

  const form = useForm<UtmifyFormData>({
    resolver: zodResolver(utmifyFormSchema),
    defaultValues: {
      name: "",
      token: "",
    },
  });

  const onSubmit = async (data: UtmifyFormData) => {
    try {
      const integrationData = {
        name: data.name,
        token: data.token,
      };

      await createUtmifyIntegration(integrationData);
      setShowAddSheet(false);
      form.reset();
      toast.success("Integração Utmify criada com sucesso!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao criar integração Utmify.";
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
              <Link className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Utmify</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Rastreie suas vendas de forma precisa e aumente seu lucro em até
                40%
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  variant="outline"
                  className={"bg-blue-500/10 text-blue-500 border-blue-500/20"}
                >
                  UTMIFY
                </Badge>
                <Badge variant="secondary">tracking</Badge>
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
              <SheetContent className="max-w-2xl max-h-[100vh] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-yellow-300">
                <SheetHeader>
                  <SheetTitle>Adicionar Utmify</SheetTitle>
                  <SheetDescription>
                    Configure a integração Utmify para começar a rastrear suas
                    vendas
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6  px-4">
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
                                placeholder="Ex: Utmify Principal"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Nome descritivo para identificar esta integração
                              Utmify
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
                                  className="absolute right-0 top-0 h-full px-3 py-2 !bg-transparent hover:bg-transparent"
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

                      {/* Informações Adicionais */}
                      <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                        <h4 className="font-medium text-pink-500 mb-2">
                          Como obter o Token?
                        </h4>
                        <ol className="text-sm text-muted-foreground space-y-1">
                          <li>1. Acesse sua conta no Utmify</li>
                          <li>2. Vá para Configurações → API</li>
                          <li>3. Copie o token de autenticação</li>
                          <li>4. Cole aqui para conectar sua integração</li>
                        </ol>
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
