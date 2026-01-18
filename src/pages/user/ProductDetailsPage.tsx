import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/widgets/PageContainer";
import { ProductDetails } from "@/components/features/products/ProductDetails";

export function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  return (
    <PageContainer title="Produto Detalhado" className="py-5">
      <ProductDetails productId={productId || ""} />
    </PageContainer>
  );
}
