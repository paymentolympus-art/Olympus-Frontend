import { motion, AnimatePresence } from "framer-motion";
import { DomainCard } from "./DomainCard";
import { DomainCardSkeleton } from "./DomainCardSkeleton";
import { DomainFilters } from "./DomainFilters";
import { DomainForm } from "./DomainForm";
import { DomainVerificationModal } from "./DomainVerificationModal";
import { PaginationWidget } from "@/components/widgets/Pagination";
import Modal from "@/components/widgets/modal";
import { Fragment, useState, useEffect } from "react";
import type {
  Domain,
  DomainFilters as DomainFiltersType,
} from "@/types/domain";
import { Globe } from "lucide-react";

import {
  useDomains,
  useCreateDomain,
  useVerifyDomain,
  useDeleteDomain,
} from "@/hooks/useDomains";
import { Button } from "@/components/ui/button";
import { EditDomainForm } from "@/components/features/domains/EditDomainForm";
import { toast } from "sonner";
import { AlertDialogDeleteDomain } from "@/components/features/domains/AlertDialogDeleteDomain";

export function DomainList({
  showCreate,
  onCloseCreate,
}: {
  showCreate: boolean;
  onCloseCreate?: () => void;
}) {
  const [showCreateModal, setShowCreateModal] = useState(showCreate);

  // Sincroniza a prop showCreate com o estado interno
  useEffect(() => {
    setShowCreateModal(showCreate);
  }, [showCreate]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [filters, setFilters] = useState<DomainFiltersType>({});
  const { data, isLoading, error, refetch } = useDomains(filters);

  const createDomainMutation = useCreateDomain();
  const verifyDomainMutation = useVerifyDomain();
  const deleteDomainMutation = useDeleteDomain();

  const handleEdit = (domain: Domain) => {
    setSelectedDomain(domain);
    setShowEditModal(true);
  };

  const handleVerify = (domain: Domain) => {
    setSelectedDomain(domain);
    setShowVerificationModal(true);
  };

  const handleDNS = (domain: Domain) => {
    verifyDomainMutation.mutate(domain.id, {
      onSuccess: () => {
        toast.success("O DNS foi liberado com sucesso");
      },
    });
  };

  const handleFiltersChange = (newFilters: Partial<DomainFiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleManageProducts = (domain: Domain) => {
    console.log(domain);
    // Implementar navegação para gestão de produtos
  };

  const handleDeleteDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDomain) return;

    try {
      await deleteDomainMutation.mutateAsync(selectedDomain.id);
      setShowDeleteDialog(false);
      setSelectedDomain(null);
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  const renderDomains = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[400px] bg-yellow-400/5">
          <div className="text-center">
            <p className="text-red-500/60 font-bold mb-4">
              Erro ao carregar domínios
            </p>
            <Button onClick={() => refetch()}>Tentar Novamente</Button>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="space-y-6">
          {/* Skeleton Loading */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <DomainCardSkeleton key={index} />
            ))}
          </div>
        </div>
      );
    }

    if (data?.domains.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-yellow-400/5"
        >
          <div className="max-w-md mx-auto">
            <Globe className="h-12 w-12 mx-auto text-gray-100 mb-4" />
            <h3 className="text-lg font-medium text-gray-100 mb-2">
              Nenhum domínio encontrado
            </h3>
            <p className="text-gray-400 mb-6">
              Comece criando seu primeiro domínio personalizado para seus
              produtos.
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <Fragment>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {data?.domains.map((domain, index) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <DomainCard
                  domain={domain}
                  onEdit={handleEdit}
                  onDNS={handleDNS}
                  onDelete={handleDeleteDomain}
                  onVerify={handleVerify}
                  onManageProducts={handleManageProducts}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Paginação */}
        {data?.pagination && data?.pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <PaginationWidget
              currentPage={data?.pagination.page}
              totalPages={data?.pagination.totalPages}
              onPageChange={handlePageChange}
              maxVisiblePages={6}
              showBoundaries={true}
            />
          </motion.div>
        )}
      </Fragment>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <DomainFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Grid de Domínios */}
      {renderDomains()}
      {/* Modais */}

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          onCloseCreate?.();
        }}
        title="Criar Novo Domínio"
        description="Adicione um novo domínio personalizado"
        size="lg"
      >
        <DomainForm
          onSubmit={(data) => {
            createDomainMutation.mutate(data, {
              onSuccess: () => {
                toast.success("Domínio criado com sucesso");
                setShowCreateModal(false);
                onCloseCreate?.();
              },
            });
          }}
          onCancel={() => {
            setShowCreateModal(false);
            onCloseCreate?.();
          }}
          isLoading={false}
        />
      </Modal>

      {showEditModal && selectedDomain && (
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedDomain(null);
          }}
          title="Editar Domínio"
          description="Modifique as configurações do domínio"
          size="xl"
        >
          <EditDomainForm
            initialData={{
              name: selectedDomain.name,
            }}
            onSubmit={async () => {
              setShowEditModal(false);
              setSelectedDomain(null);
            }}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedDomain(null);
            }}
            isLoading={false}
          />
        </Modal>
      )}

      {showVerificationModal && selectedDomain && (
        <DomainVerificationModal
          domain={selectedDomain}
          isOpen={showVerificationModal}
          onClose={() => {
            setShowVerificationModal(false);
            setSelectedDomain(null);
          }}
          onConfirm={() => {
            // Implementar verificação
            verifyDomainMutation.mutate(selectedDomain.id, {
              onSuccess: () => {
                toast.success("Domínio verificado com sucesso");
                setShowVerificationModal(false);
                setSelectedDomain(null);
              },
            });
          }}
          isVerifying={false}
        />
      )}

      {selectedDomain && showDeleteDialog && (
        <AlertDialogDeleteDomain
          domain={selectedDomain}
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowVerificationModal(false);
            setSelectedDomain(null);
          }}
          onConfirmDelete={handleConfirmDelete}
          isDeleting={deleteDomainMutation.isPending}
        />
      )}
    </div>
  );
}
