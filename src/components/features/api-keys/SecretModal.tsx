import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, CheckCircle, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import type { ApiKeyWithSecret } from "@/types/api-key";

interface SecretModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: ApiKeyWithSecret | null;
}

export function SecretModal({ open, onOpenChange, apiKey }: SecretModalProps) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  if (!apiKey) return null;

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey.key);
      setCopiedKey(true);
      toast.success("Chave pública copiada!");
      setTimeout(() => setCopiedKey(false), 2000);
    } catch {
      toast.error("Erro ao copiar");
    }
  };

  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(apiKey.secret);
      setCopiedSecret(true);
      toast.success("Chave secreta copiada!");
      setTimeout(() => setCopiedSecret(false), 2000);
    } catch {
      toast.error("Erro ao copiar");
    }
  };

  const handleClose = () => {
    setCopiedKey(false);
    setCopiedSecret(false);
    setShowSecret(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            API Key Criada com Sucesso!
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-start gap-2 p-3 mt-2 rounded-lg bg-warning/10 border border-warning/30">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div className="text-sm text-warning">
                <strong>Importante:</strong> Guarde a chave secreta (secret) em
                um local seguro. Ela não poderá ser recuperada posteriormente.
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nome da API Key */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Nome</Label>
            <div className="p-3 rounded-lg bg-tertiary/50 border border-border">
              <span className="text-white font-medium">{apiKey.name}</span>
            </div>
          </div>

          {/* Chave Pública */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Chave Pública (Key)</Label>
            <div className="flex items-center gap-2">
              <Input
                value={apiKey.key}
                readOnly
                className="font-mono text-sm bg-secondary/50"
              />
              <Button variant="outline" size="icon" onClick={handleCopyKey}>
                {copiedKey ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use esta chave para identificar suas requisições
            </p>
          </div>

          {/* Chave Secreta */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">
              Chave Secreta (Secret)
            </Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type={showSecret ? "text" : "password"}
                  value={apiKey.secret}
                  readOnly
                  className="font-mono text-sm bg-secondary/50 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button variant="outline" size="icon" onClick={handleCopySecret}>
                {copiedSecret ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-warning flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" /> Esta chave será
              exibida apenas uma vez!
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Entendido, guardei as chaves
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
