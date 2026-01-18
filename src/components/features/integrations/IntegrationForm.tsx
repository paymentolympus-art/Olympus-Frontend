import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Settings, Eye, EyeOff, Plus, Trash2, Code } from "lucide-react";
import {
  createIntegrationSchema,
  updateIntegrationSchema,
  type CreateIntegrationFormData,
  type UpdateIntegrationFormData,
} from "@/validators/integration";
import type { Integration } from "@/types/integration";

interface IntegrationFormProps {
  integration?: Integration;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  defaultType?: "UTMIFY" | "WEBHOOK";
  defaultName?: string;
}

export function IntegrationForm({
  integration,
  onSubmit,
  onCancel,
  loading = false,
  defaultType,
  defaultName,
}: IntegrationFormProps) {
  const [showSecrets, setShowSecrets] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customData, setCustomData] = useState<Record<string, any>>(
    integration?.data || {}
  );

  const schema = integration
    ? updateIntegrationSchema
    : createIntegrationSchema;

  const form = useForm<CreateIntegrationFormData | UpdateIntegrationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: integration?.name || defaultName || "",
      key: integration?.key || "",
      secret: integration?.secret || "",
      token: integration?.token || "",
      type: integration?.type || defaultType || "UTMIFY",
      active: integration?.active ?? true,
      data: integration?.data || {},
    },
  });

  const handleSubmit = async (
    data: CreateIntegrationFormData | UpdateIntegrationFormData
  ) => {
    const formData = {
      ...data,
      data: customData,
    };
    await onSubmit(formData);
  };

  const addCustomField = () => {
    const key = `field_${Object.keys(customData).length + 1}`;
    setCustomData((prev) => ({ ...prev, [key]: "" }));
  };

  const removeCustomField = (key: string) => {
    setCustomData((prev) => {
      const newData = { ...prev };
      delete newData[key];
      return newData;
    });
  };

  const updateCustomField = (key: string, value: string) => {
    setCustomData((prev) => ({ ...prev, [key]: value }));
  };

  const getTypeDescription = (type: string) => {
    switch (type) {
      case "UTMIFY":
        return "Integração com UTMify para rastreamento de campanhas";
      case "WEBHOOK":
        return "Integração com Meta Ads para publicidade";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>{integration ? "Editar Integração" : "Nova Integração"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informações Básicas</h3>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Integração</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Integração UTMify" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome descritivo para identificar esta integração
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Integração</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "UTMIFY"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="UTMIFY">UTMify</SelectItem>
                        <SelectItem value="WEBHOOK">Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {getTypeDescription(field.value || "UTMIFY")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {integration && (
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Status Ativo
                        </FormLabel>
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
              )}
            </div>

            <Separator />

            {/* Credenciais */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Credenciais</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSecrets(!showSecrets)}
                >
                  {showSecrets ? (
                    <EyeOff className="h-4 w-4 mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  {showSecrets ? "Ocultar" : "Mostrar"}
                </Button>
              </div>

              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chave da API</FormLabel>
                    <FormControl>
                      <Input
                        type={showSecrets ? "text" : "password"}
                        placeholder="Sua chave da API"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Chave de acesso fornecida pela plataforma
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segredo da API</FormLabel>
                    <FormControl>
                      <Input
                        type={showSecrets ? "text" : "password"}
                        placeholder="Seu segredo da API"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Segredo de acesso fornecida pela plataforma
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token de Acesso</FormLabel>
                    <FormControl>
                      <Input
                        type={showSecrets ? "text" : "password"}
                        placeholder="Seu token de acesso"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Token de autenticação (opcional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Configurações Avançadas */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Configurações Avançadas</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <Code className="h-4 w-4 mr-2" />
                  {showAdvanced ? "Ocultar" : "Mostrar"}
                </Button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <Label>Dados Customizados</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addCustomField}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Campo
                    </Button>
                  </div>

                  {Object.entries(customData).length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Nenhum campo customizado adicionado
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(customData).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Input
                            placeholder="Nome do campo"
                            value={key}
                            onChange={(e) => {
                              const newKey = e.target.value;
                              const newData = { ...customData };
                              delete newData[key];
                              newData[newKey] = value;
                              setCustomData(newData);
                            }}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Valor"
                            value={value}
                            onChange={(e) =>
                              updateCustomField(key, e.target.value)
                            }
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCustomField(key)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="flex items-center justify-end space-x-2 pt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : integration ? "Atualizar" : "Criar"}{" "}
                Integração
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
