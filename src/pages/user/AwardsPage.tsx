import { motion } from "framer-motion";
import { PageContainer } from "@/components/widgets/PageContainer";
import { AwardList } from "@/components/features/awards";

export function AwardsPage() {
  return (
    <PageContainer title="Premiações" className="py-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AwardList />
      </motion.div>
    </PageContainer>
  );
}
