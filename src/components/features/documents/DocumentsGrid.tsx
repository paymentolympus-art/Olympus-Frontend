import type { DocumentType, UserDocument } from "@/types/document";
import type { AccountType } from "@/types/user";
import { DocumentCard } from "./DocumentCard";

type Props = {
  documentsByType: Record<DocumentType, UserDocument | null>;
  onSend: (payload: { type: DocumentType; file: File }) => Promise<void> | void;
  accountType?: AccountType;
};

export function DocumentsGrid({ documentsByType, onSend, accountType }: Props) {
  const documentCards = [
    {
      title: "RG Frente",
      type: "FRONT_RG" as DocumentType,
    },
    {
      title: "RG Verso",
      type: "BACK_RG" as DocumentType,
    },
    {
      title: "Selfie",
      type: "SELFIE" as DocumentType,
    },
  ];

  // Adiciona Contrato Social apenas para COMPANY
  if (accountType === "COMPANY") {
    documentCards.push({
      title: "Contrato Social",
      type: "SOCIAL_CONTRACT" as DocumentType,
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documentCards.map((card) => (
        <DocumentCard
          key={card.type}
          title={card.title}
          type={card.type}
          document={documentsByType[card.type] || null}
          onSubmit={onSend}
        />
      ))}
    </div>
  );
}
