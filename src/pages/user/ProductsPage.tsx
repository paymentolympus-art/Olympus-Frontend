import { motion } from "framer-motion";
import { PageContainer } from "@/components/widgets/PageContainer";
import { ProductList } from "@/components/features/products/ProductList";

export function ProductsPage() {
  return (
    <PageContainer title="Produtos" className="py-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ProductList />
      </motion.div>
    </PageContainer>
  );
}
