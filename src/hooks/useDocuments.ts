import { useState, useEffect, useCallback } from "react";
import { saveDocument, getDocuments } from "@/api/documents";
import { toast } from "sonner";
import type {
  UserDocument,
  DocumentsResponse,
  DocumentsSummary,
  SaveDocumentParams,
  DocumentType,
} from "@/types/document";

export const useDocuments = () => {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [summary, setSummary] = useState<DocumentsSummary>({
    totalDocuments: 0,
    pendingDocuments: 0,
    approvedDocuments: 0,
    rejectedDocuments: 0,
    verificationStatus: "",
    missingRequiredDocuments: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: DocumentsResponse = await getDocuments();
      setDocuments(response.documents);
      setSummary(response.summary);
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao carregar documentos";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(
    async (data: SaveDocumentParams) => {
      setLoading(true);
      setError(null);
      try {
        const result = await saveDocument(data);
        await fetchDocuments();
        toast.success("Documento enviado com sucesso!");
        return result;
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao enviar documento";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchDocuments]
  );

  const getDocumentByType = useCallback(
    (type: DocumentType): UserDocument | null => {
      return documents.find((doc) => doc.type === type) || null;
    },
    [documents]
  );

  const documentsByType = useCallback(() => {
    const map: Record<DocumentType, UserDocument | null> = {
      FRONT_RG: null,
      BACK_RG: null,
      SELFIE: null,
      SOCIAL_CONTRACT: null,
    };

    for (const doc of documents) {
      if (doc.type in map) {
        map[doc.type] = doc;
      }
    }
    return map;
  }, [documents]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    summary,
    loading,
    error,
    uploadDocument,
    getDocumentByType,
    documentsByType,
    refetch: fetchDocuments,
  };
};
