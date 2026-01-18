import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { createApiKeySchema, updateApiKeySchema } from "@/validators/api-key";
import type {
  CreateApiKeyFormData,
  UpdateApiKeyFormData,
} from "@/validators/api-key";
import type { ApiKey, ApiKeyStatus } from "@/types/api-key";

interface ApiKeyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    data: CreateApiKeyFormData | UpdateApiKeyFormData
  ) => Promise<void>;
  apiKey?: ApiKey | null;
  isLoading?: boolean;
}

const statusOptions: { value: ApiKeyStatus; label: string }[] = [
  { value: "PENDING", label: "Pendente" },
  { value: "ACTIVE", label: "Ativa" },
  { value: "INACTIVE", label: "Inativa" },
  { value: "BLOCKED", label: "Bloqueada" },
];

export function ApiKeyForm({
  open,
  onOpenChange,
  onSubmit,
  apiKey,
  isLoading,
}: ApiKeyFormProps) {
  const isEditing = !!apiKey;
  const [newIp, setNewIp] = useState("");
  const [newDomain, setNewDomain] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateApiKeyFormData | UpdateApiKeyFormData>({
    resolver: zodResolver(isEditing ? updateApiKeySchema : createApiKeySchema),
    defaultValues: {
      name: apiKey?.name || "",
      status: apiKey?.status,
      ips: apiKey?.ips || [],
      domains: apiKey?.domains || [],
    },
  });

  const ips = watch("ips") || [];
  const domains = watch("domains") || [];
  const status = watch("status");

  const handleAddIp = () => {
    if (newIp.trim()) {
      setValue("ips", [...ips, newIp.trim()]);
      setNewIp("");
    }
  };

  const handleRemoveIp = (index: number) => {
    setValue(
      "ips",
      ips.filter((_, i) => i !== index)
    );
  };

  const handleAddDomain = () => {
    if (newDomain.trim()) {
      setValue("domains", [...domains, newDomain.trim()]);
      setNewDomain("");
    }
  };

  const handleRemoveDomain = (index: number) => {
    setValue(
      "domains",
      domains.filter((_, i) => i !== index)
    );
  };

  const handleFormSubmit = async (
    data: CreateApiKeyFormData | UpdateApiKeyFormData
  ) => {
    await onSubmit(data);
    reset();
    onOpenChange(false);
  };

  const handleClose = () => {
    reset();
    setNewIp("");
    setNewDomain("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Editar API Key" : "Nova API Key"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Ex: Integração E-commerce"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Status (apenas na edição) */}
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setValue("status", value as ApiKeyStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* IPs */}
          <div className="space-y-2">
            <Label>IPs Permitidos</Label>
            <p className="text-xs text-muted-foreground">
              Deixe vazio para permitir qualquer IP
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: 192.168.1.1"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddIp();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddIp}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {ips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {ips.map((ip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 bg-tertiary rounded-md text-sm"
                  >
                    <span className="font-mono">{ip}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIp(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.ips && (
              <p className="text-xs text-red-500">{errors.ips.message}</p>
            )}
          </div>

          {/* Domínios */}
          <div className="space-y-2">
            <Label>Domínios Permitidos</Label>
            <p className="text-xs text-muted-foreground">
              Deixe vazio para permitir qualquer domínio
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: meusite.com"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddDomain();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddDomain}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {domains.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {domains.map((domain, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-sm"
                  >
                    <span className="font-mono">{domain}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDomain(index)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.domains && (
              <p className="text-xs text-red-500">{errors.domains.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : isEditing ? (
                "Salvar Alterações"
              ) : (
                "Criar API Key"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
