import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { enable2FA, get2FAStatus } from "@/api/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { Disable2FAModal } from "./Disable2FAModal";

export function TwoFactorAuthCard() {
  const queryClient = useQueryClient();
  const [isToggling, setIsToggling] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);

  // Buscar status do 2FA
  const { data: twoFactorStatus, isLoading } = useQuery({
    queryKey: ["2fa-status"],
    queryFn: async () => {
      try {
        return await get2FAStatus();
      } catch (err: any) {
        toast.error(err.message || "Erro ao verificar status do 2FA");
        throw err;
      }
    },
  });

  const isEnabled = twoFactorStatus?.enabled ?? false;

  // Mutation para ativar 2FA
  const enableMutation = useMutation({
    mutationFn: enable2FA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["2fa-status"] });
      toast.success("Autenticação de dois fatores ativada com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao ativar autenticação de dois fatores");
    },
  });

  const handleToggle = async (checked: boolean) => {
    setIsToggling(true);
    try {
      if (checked) {
        await enableMutation.mutateAsync();
      } else {
        // Abrir modal para desativar 2FA
        setIsDisableModalOpen(true);
      }
    } finally {
      setIsToggling(false);
    }
  };

  const handleDisableSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["2fa-status"] });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {isEnabled ? (
            <ShieldCheck className="h-5 w-5 text-green-500" />
          ) : (
            <ShieldOff className="h-5 w-5 text-gray-400" />
          )}
          <CardTitle>Autenticação de Dois Fatores</CardTitle>
        </div>
        <CardDescription>
          Adicione uma camada extra de segurança à sua conta. Quando ativado,
          você precisará fornecer um código de verificação além da sua senha
          para fazer login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="2fa-toggle" className="text-base">
              {isEnabled ? "2FA Ativado" : "2FA Desativado"}
            </Label>
            <p className="text-sm text-muted-foreground">
              {isEnabled
                ? "Sua conta está protegida com autenticação de dois fatores"
                : "Ative para proteger sua conta"}
            </p>
          </div>
          <Switch
            id="2fa-toggle"
            checked={isEnabled}
            onCheckedChange={handleToggle}
            disabled={isToggling || enableMutation.isPending}
          />
        </div>
      </CardContent>

      <Disable2FAModal
        isOpen={isDisableModalOpen}
        onClose={() => setIsDisableModalOpen(false)}
        onSuccess={handleDisableSuccess}
      />
    </Card>
  );
}
