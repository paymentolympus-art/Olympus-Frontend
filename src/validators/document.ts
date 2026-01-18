import { z } from "zod";
import type { DocumentType } from "@/types/document";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ACCEPTED_FILE_TYPES = [...ACCEPTED_IMAGE_TYPES, "application/pdf"];

export const documentUploadSchema = z.object({
  type: z.custom<DocumentType>(),
  file: z
    .instanceof(File, { message: "Arquivo obrigatório" })
    .refine((file) => file.size > 0, "Arquivo obrigatório")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Máx. 5MB")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Apenas imagens JPG, PNG, WEBP ou PDF"
    ),
});

export type DocumentUploadInput = z.infer<typeof documentUploadSchema>;
