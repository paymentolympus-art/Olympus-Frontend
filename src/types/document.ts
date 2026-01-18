export type DocumentType =
  | "FRONT_RG"
  | "BACK_RG"
  | "SELFIE"
  | "SOCIAL_CONTRACT";

export type DocumentStatus = "PENDING" | "REJECTED" | "APPROVED" | "NOT_SEND";

export interface UserDocument {
  id: string;
  type: DocumentType;
  status: DocumentStatus;
  updatedAt: string;
  fileUrl: string | null;
}

export interface DocumentsSummary {
  totalDocuments: number;
  pendingDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
  verificationStatus: string;
  missingRequiredDocuments: string[];
}

export interface DocumentsResponse {
  documents: UserDocument[];
  summary: DocumentsSummary;
}

export interface SaveDocumentParams {
  file: File;
  type: DocumentType;
  status?: DocumentStatus;
  customFileName?: string;
}

export interface SaveDocumentResponse {
  message: string;
  documentId: string;
  fileName: string;
  type: DocumentType;
  status: DocumentStatus;
  fileUrl: string;
  fileKey: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}
