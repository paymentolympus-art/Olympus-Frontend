import { motion } from "framer-motion";
import { PageContainer } from "@/components/widgets/PageContainer";
import { IntegrationList } from "@/components/features/integrations/IntegrationList";

export function IntegrationsPage() {
  return (
    <PageContainer title="Integrações" className="py-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <IntegrationList />
      </motion.div>
    </PageContainer>
  );
}
