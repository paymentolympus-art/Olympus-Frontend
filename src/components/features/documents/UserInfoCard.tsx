import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumberToReal } from "@/lib/format";
import type { UserMeCompany, UserMeData, UserMePerson } from "@/types/user";

interface UserInfoCardProps {
  userData: UserMeData | undefined;
  isLoading: boolean;
}

const formatCPF = (cpf?: string) => {
  if (!cpf) return "-";
  const numbers = cpf.replace(/\D/g, "");
  if (cpf.includes(".") || cpf.includes("-")) {
    return cpf;
  }
  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return cpf;
};

const formatCNPJ = (cnpj?: string) => {
  if (!cnpj) return "-";
  const numbers = cnpj.replace(/\D/g, "");
  if (cnpj.includes(".") || cnpj.includes("-") || cnpj.includes("/")) {
    return cnpj;
  }
  if (numbers.length === 14) {
    return numbers.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
  return cnpj;
};

const isPersonAccount = (user: UserMeData): user is UserMePerson =>
  user.type === "PERSON";

const isCompanyAccount = (user: UserMeData): user is UserMeCompany =>
  user.type === "COMPANY";

const getStatusConfig = (status: string) => {
  switch (status.toUpperCase()) {
    case "APPROVED":
      return {
        variant: "default" as const,
        className: "bg-green-500/10 text-green-500 border-green-500/20",
        text: "Aprovado",
      };
    case "PENDING":
      return {
        variant: "secondary" as const,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        text: "Pendente",
      };
    case "REJECTED":
      return {
        variant: "destructive" as const,
        className: "bg-red-500/10 text-red-500 border-red-500/20",
        text: "Rejeitado",
      };
    case "NOT_SENT":
      return {
        variant: "outline" as const,
        className: "bg-zinc-900 text-zinc-500 border-zinc-500",
        text: "Não Enviado",
      };
    default:
      return {
        variant: "outline" as const,
        className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
        text: status,
      };
  }
};

export function UserInfoCard({ userData, isLoading }: UserInfoCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userData) {
    return null;
  }

  const statusConfig = getStatusConfig(userData.status);
  const personData = isPersonAccount(userData) ? userData : undefined;
  const companyData = isCompanyAccount(userData) ? userData : undefined;
  const nameLabel = personData ? "Nome" : "Razão Social";
  const nameValue = personData
    ? personData.name
    : (companyData?.companyName ?? "-");
  const documentLabel = personData ? "CPF" : "CNPJ";
  const documentValue = personData
    ? formatCPF(personData.cpf)
    : formatCNPJ(companyData?.cnpj);
  const accountTypeLabel = personData ? "Pessoa Física" : "Pessoa Jurídica";

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Informações da Conta</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{nameLabel}</p>
            <p className="text-base font-medium">{nameValue}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-base font-medium">{userData.email}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{documentLabel}</p>
            <p className="text-base font-medium">{documentValue}</p>
          </div>

          {userData.type === "COMPANY" && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nome Fantasia</p>
              <p className="text-base font-medium">{userData.tradeName}</p>
            </div>
          )}

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Tipo de Conta</p>
            <div className="text-sm font-medium bg-gradient-1 w-fit px-3 py-0.5 rounded-full border-primary border-[1px]">
              {accountTypeLabel}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Status</p>
            {
              <Badge
                variant={statusConfig.variant}
                className={statusConfig.className}
              >
                {statusConfig.text}
              </Badge>
            }
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Taxa Fixa</p>
            <p className="text-base font-medium">
              {formatNumberToReal(userData.fixTax)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Taxa Percentual</p>
            <p className="text-base font-medium">
              {userData.percentTax.toFixed(2)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
