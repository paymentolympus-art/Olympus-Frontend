import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Domain } from "@/types/domain";

interface AlertDialogDeleteDomainProps {
  domain: Domain;
  isOpen: boolean;
  onConfirmDelete: () => void;
  onClose: () => void;
  isDeleting: boolean;
}

export function AlertDialogDeleteDomain({
  isOpen,
  onClose,
  domain,
  onConfirmDelete,
  isDeleting,
}: AlertDialogDeleteDomainProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar o domínio{" "}
            <strong>"{domain?.name}"</strong>? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmDelete}
            className="bg-red-500/80 hover:bg-red-500/90"
            disabled={isDeleting}
          >
            {isDeleting ? "Deletando..." : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
