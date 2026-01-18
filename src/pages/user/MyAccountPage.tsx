import { useMemo } from "react";
import { PageContainer } from "@/components/widgets/PageContainer";
import {
  DocumentsGrid,
  DocumentsSummary,
  UserInfoCard,
} from "@/components/features/documents";
import { useDocuments } from "@/hooks/useDocuments";
import { useUserMe } from "@/hooks/useUserMe";
import type { DocumentType } from "@/types/document";
import { Skeleton } from "@/components/ui/skeleton";

export function MyAccountPage() {
  const { documents, loading, uploadDocument, documentsByType } =
    useDocuments();
  const { userData, isLoading: isLoadingUser } = useUserMe();

  const requiredTypes = useMemo(() => {
    const baseTypes: DocumentType[] = ["FRONT_RG", "BACK_RG", "SELFIE"];
    if (userData?.type === "COMPANY") {
      return [...baseTypes, "SOCIAL_CONTRACT"];
    }
    return baseTypes;
  }, [userData?.type]);

  const documentsByTypeMap = useMemo(() => {
    return documentsByType();
  }, [documentsByType]);

  const summaryCounts = useMemo(() => {
    const presentTypes = new Set<DocumentType>(documents.map((d) => d.type));
    const sent = [...presentTypes].filter((t) =>
      requiredTypes.includes(t)
    ).length;
    const approved = documents.filter((d) => d.status === "APPROVED").length;
    const pending = documents.filter((d) => d.status === "PENDING").length;
    const missing = requiredTypes.length - sent;
    return { sent, approved, pending, missing };
  }, [documents, requiredTypes]);

  async function handleSend({
    type,
    file,
  }: {
    type: DocumentType;
    file: File;
  }) {
    await uploadDocument({ type, file });
  }

  if (loading && documents.length === 0) {
    return (
      <PageContainer title="Sua conta">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 " />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Sua conta">
      <UserInfoCard userData={userData} isLoading={isLoadingUser} />
      <DocumentsSummary
        sent={summaryCounts.sent}
        approved={summaryCounts.approved}
        pending={summaryCounts.pending}
        missing={summaryCounts.missing}
      />
      <DocumentsGrid
        documentsByType={documentsByTypeMap}
        onSend={handleSend}
        accountType={userData?.type}
      />
    </PageContainer>
  );
}
