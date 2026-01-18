import { motion } from "framer-motion";
import { PageContainer } from "@/components/widgets/PageContainer";
import { DomainList } from "@/components/features/domains/DomainList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiMiniPlus } from "react-icons/hi2";

export function DomainsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  return (
    <PageContainer title="Domínios" className="py-5">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Domínios</h1>
          <p className="text-muted-foreground">Gerencie seus domínios.</p>
        </div>
        <Button onClick={handleShowCreateModal} className="has-[>svg]:px-5">
          <HiMiniPlus className="w-4 h-4 mr-2" />
          Novo Domínio
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DomainList
          showCreate={showCreateModal}
          onCloseCreate={() => setShowCreateModal(false)}
        />
      </motion.div>
    </PageContainer>
  );
}
