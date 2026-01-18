import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DomainStatusBadge } from "./DomainStatusBadge";
import type { Domain } from "@/types/domain";
import { Globe, CheckCircle, AlertCircle } from "lucide-react";
import { CopyInput } from "@/components/ui/copy-input";

interface DomainVerificationModalProps {
  domain: Domain;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isVerifying?: boolean;
}

export function DomainVerificationModal({
  domain,

  onClose,
  onConfirm,
  isVerifying = false,
}: DomainVerificationModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Verificar Domínio
          </DialogTitle>
          <DialogDescription>
            Verificar se o domínio <strong>{domain.name}</strong> está
            configurado corretamente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Status Atual</span>
            <DomainStatusBadge status={domain.status} />
          </div>

          {domain.status === "VERIFIED" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-800">
                Este domínio já está verificado e funcionando corretamente.
              </span>
            </div>
          )}

          {domain.status === "PENDING" && domain.cnameValue && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Configure o DNS do seu domínio para continuar.
              </span>
            </div>
          )}

          {domain.status === "PENDING" && domain.cnameValue && (
            <div className="flex w-full items-start gap-2 p-3  rounded-lg">
              <CopyInput className="w-1/3" value={"pay"} />
              <CopyInput className="w-2/3" value={domain.cnameValue || ""} />
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              Para verificar o domínio, certifique-se de que:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>O CNAME está configurado corretamente</li>
              <li>As configurações DNS foram propagadas</li>
              <li>O domínio está ativo e acessível</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isVerifying}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isVerifying || domain.status === "VERIFIED"}
          >
            {isVerifying ? "Verificando..." : "Verificar Agora"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
