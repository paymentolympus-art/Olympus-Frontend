import { useOrderbumps } from "@/hooks/useOrderbumps";
import { OrderbumpForm } from "./forms/OrderbumpForm";
import { OrderbumpList } from "./OrderbumpList";
import type { ProductDetails } from "@/types/product";

interface TabOrderbumpContentProps {
  product: ProductDetails;
}

export function TabOrderbumpContent({ product }: TabOrderbumpContentProps) {
  const {
    orderbumps,
    loading,
    createOrderbump,
    updateOrderbump,
    toggleOrderbump,
    isToggling,
    deleteOrderbump,
    isDeleting,
    updateOrderbumpImage,
    removeOrderbumpImage,
  } = useOrderbumps({
    productId: product?.id || "",
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Orderbumps</h3>
          <p className="text-sm text-muted-foreground">
            Configure ofertas cruzadas para aumentar o ticket médio
          </p>
        </div>
        <OrderbumpForm
          productId={product?.id || ""}
          onCreateOrderbump={createOrderbump}
        />
      </div>
      <OrderbumpList
        orderbumps={orderbumps}
        loading={loading}
        onToggleActive={toggleOrderbump}
        isToggling={isToggling}
        isDeleting={isDeleting}
        onDelete={deleteOrderbump}
        onUpdateOrderbump={updateOrderbump}
        onUpdateImage={updateOrderbumpImage}
        onRemoveImage={removeOrderbumpImage}
      />
    </div>
  );
}
