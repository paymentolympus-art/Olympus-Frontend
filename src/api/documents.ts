import api from "@/lib/axios";
import { getLocalSessionToken } from "@/lib/local-storage";
import type {
  DocumentsResponse,
  SaveDocumentParams,
  SaveDocumentResponse,
} from "@/types/document";

api.interceptors.request.use((config) => {
  const token = getLocalSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function saveDocument(
  data: SaveDocumentParams
): Promise<SaveDocumentResponse> {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("type", data.type);

  const response = await api.post("/user/me/document-save", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
}

export async function getDocuments(): Promise<DocumentsResponse> {
  const response = await api.get("/user/me/documents");
  return response.data.data;
}
