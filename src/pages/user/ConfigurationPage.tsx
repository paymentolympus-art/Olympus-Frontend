import { PageContainer } from "@/components/widgets/PageContainer";
import {
  TwoFactorAuthCard,
  ChangePasswordCard,
} from "@/components/features/configuration";
import { Settings } from "lucide-react";

export function ConfigurationPage() {
  return (
    <PageContainer title="Configurações">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações de segurança da sua conta
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TwoFactorAuthCard />
        <ChangePasswordCard />
      </div>
    </PageContainer>
  );
}
