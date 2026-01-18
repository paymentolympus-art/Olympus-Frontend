import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  documentUploadSchema,
  type DocumentUploadInput,
} from "@/validators/document";
import type {
  DocumentStatus,
  DocumentType,
  UserDocument,
} from "@/types/document";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { UploadInput } from "./UploadInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  title: string;
  type: DocumentType;
  document: UserDocument | null;
  onSubmit: (payload: {
    type: DocumentType;
    file: File;
  }) => Promise<void> | void;
};

function getStatusLabel(status: DocumentStatus) {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "REJECTED":
      return "Rejeitado";
    case "APPROVED":
      return "Aprovado";
    case "NOT_SEND":
    default:
      return "Não enviado";
  }
}

function getDocumentType(type: DocumentType) {
  switch (type) {
    case "FRONT_RG":
      return "RG (frente)";
    case "BACK_RG":
      return "RG (verso)";
    case "SELFIE":
      return "Selfie";
    case "SOCIAL_CONTRACT":
      return "Contrato Social";
  }
}

function getStatusVariant(
  status: DocumentStatus
): "default" | "secondary" | "destructive" | "outline" | null {
  switch (status) {
    case "PENDING":
      return "secondary";
    case "REJECTED":
      return "destructive";
    case "APPROVED":
      return "default";
    case "NOT_SEND":
    default:
      return "outline";
  }
}

function isImageFile(fileUrl: string): boolean {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const lowerUrl = fileUrl.toLowerCase();
  // Verifica se a URL contém alguma extensão de imagem
  return imageExtensions.some((ext) => lowerUrl.includes(ext));
}

function isPdfFile(fileUrl: string): boolean {
  const lowerUrl = fileUrl.toLowerCase();
  // Verifica se contém .pdf na URL
  return lowerUrl.includes(".pdf");
}

export function DocumentCard({ title, type, document, onSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const status: DocumentStatus = useMemo(() => {
    return document?.status ?? "NOT_SEND";
  }, [document]);

  const canSend = useMemo(() => {
    if (status === "PENDING") return false;
    if (status === "APPROVED") return false;
    return true;
  }, [status]);

  const canPreview = useMemo(() => {
    return (
      (status === "PENDING" || status === "APPROVED") && !!document?.fileUrl
    );
  }, [status, document]);

  const form = useForm<DocumentUploadInput>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      type,
    } as unknown as DocumentUploadInput,
  });

  async function handleSubmit(values: DocumentUploadInput) {
    try {
      setIsSubmitting(true);
      await onSubmit({ type, file: values.file });
      form.reset({ type } as unknown as DocumentUploadInput);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="bg-[#0b0713] border-[#201533] text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <Badge variant={getStatusVariant(status) ?? "secondary"}>
            {getStatusLabel(status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-[#c7bfe0]">
          {document?.type && (
            <div className="truncate max-w-[200px]">
              Arquivo atual:{" "}
              <span className="text-white">
                {getDocumentType(document.type)}
              </span>
            </div>
          )}
          {document?.updatedAt && (
            <div>
              Atualizado em:{" "}
              {new Date(document.updatedAt).toLocaleString("pt-BR")}
            </div>
          )}
          {!document && <div>Nenhum arquivo enviado ainda.</div>}
        </div>
      </CardContent>
      <CardFooter>
        {canPreview ? (
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogTrigger asChild>
              <Button type="button" className="self-start">
                Visualizar Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              {document?.fileUrl ? (
                <div className="w-full h-full">
                  {isPdfFile(document.fileUrl) ? (
                    <div className="w-full h-[600px] rounded-md overflow-hidden border border-[#201533]">
                      <iframe
                        src={document.fileUrl}
                        className="w-full h-full"
                        title={title}
                        style={{ border: "none" }}
                      />
                    </div>
                  ) : isImageFile(document.fileUrl) ? (
                    <img
                      src={document.fileUrl}
                      className="w-auto h-auto rounded-md object-cover"
                      alt={document.id ?? "documento"}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 space-y-4">
                      <p className="text-white/70">
                        Visualização não disponível para este tipo de arquivo.
                      </p>
                      <a
                        href={document.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Abrir em nova aba
                      </a>
                    </div>
                  )}
                </div>
              ) : null}
            </DialogContent>
          </Dialog>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadInput
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        disabled={!canSend || isSubmitting}
                        title="Enviar documento"
                        subtitle="Tamanho máx. 5MB"
                        value={field.value as File | null}
                        onSelected={(file) => {
                          form.setValue("file", file as File, {
                            shouldValidate: true,
                          });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={!canSend || isSubmitting}
                className="self-start"
              >
                {status === "REJECTED" ? "Reenviar" : "Enviar"}
              </Button>
            </form>
          </Form>
        )}
      </CardFooter>
    </Card>
  );
}
