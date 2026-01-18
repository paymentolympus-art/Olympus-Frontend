import { PageContainer } from "@/components/widgets/PageContainer";
import { ListShipping } from "@/components/features/shipping/ListShipping";

export function ShippingPage() {
  return (
    <PageContainer title="Fretes" className="pb-10">
      <div className="pb-6">
        <h1 className="text-2xl font-bold">Fretes</h1>
        <p className="text-muted-foreground">Gerencie seus fretes</p>
      </div>
      <ListShipping />
    </PageContainer>
  );
}
