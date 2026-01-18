import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HiPlus, HiExclamationTriangle } from "react-icons/hi2";
import { useOffers } from "@/hooks/useOffers";
import { OfferModal } from "@/components/features/products/OfferModal";
import { OfferCard } from "@/components/features/products/OfferCard";
import type { Offer, CreateOfferData, UpdateOfferData } from "@/types/offer";
import type { ProductDetails } from "@/types/product";
import { cn } from "@/lib/utils";

interface TabOffersContentProps {
  product?: ProductDetails;
}

export function TabOffersContent({ product }: TabOffersContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const {
    offers,
    loading,
    error,
    createOffer,
    createDefaultOffer,
    updateOffer,
    setDefaultOffer,
    deleteOffer,
    isCreating,
    isCreatingDefault,
  } = useOffers({ productId: product?.id || "" });

  const handleSubmit = async (
    data: CreateOfferData | UpdateOfferData,
    isEditing: boolean
  ) => {
    try {
      if (isEditing) {
        if (editingOffer) {
          await updateOffer(editingOffer.id, data as UpdateOfferData);
          setEditingOffer(null);
        }
      } else {
        await createOffer(data as CreateOfferData);
      }
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
    setIsModalOpen(true);
  };

  const handleDeleteOffer = async (offerId: string) => {
    if (confirm("Tem certeza que deseja deletar esta oferta?")) {
      try {
        await deleteOffer(offerId);
      } catch (error) {
        // Error handling is done in the mutation
      }
    }
  };

  const handleSetDefaultOffer = async (offerId: string) => {
    try {
      await setDefaultOffer(offerId);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleCreateDefaultOffer = async () => {
    try {
      await createDefaultOffer();
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOffer(null);
  };

  const handleOpenCreateModal = () => {
    setEditingOffer(null);
    setIsModalOpen(true);
  };

  const renderContent = () => {
    if (!product) {
      return <p className="text-muted-foreground">Produto não encontrado</p>;
    }

    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-1/4" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <HiExclamationTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Tentar Novamente
          </Button>
        </div>
      );
    }

    if (offers.length === 0) {
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-lg font-semibold mb-2">
          Nenhuma oferta encontrada
        </h3>
        <p className="text-muted-foreground mb-6">
          Este produto ainda não possui ofertas. Crie uma oferta padrão para
          começar.
        </p>
        <Button
          onClick={handleCreateDefaultOffer}
          size="lg"
          disabled={isCreatingDefault}
        >
          <HiPlus className="h-4 w-4 mr-2" />
          {isCreatingDefault ? "Criando..." : "Criar Oferta Padrão"}
        </Button>
      </div>;
    }

    return (
      <div className="space-y-4">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            domains={product.domains}
            productPrice={product.price}
            onEdit={handleEditOffer}
            onDelete={handleDeleteOffer}
            onSetDefault={handleSetDefaultOffer}
          />
        ))}
      </div>
    );
  };

  return (
    <Card
      className={cn(
        "w-full  overflow-y-auto scrollbar-w-1 scrollbar scrollbar-thumb-primary scrollbar-track-transparent",
        offers.length > 0 ? "h-[calc(100vh-165px)]" : "h-auto"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-xl font-bold">Ofertas</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Faça ofertas para validar preço de venda
          </CardDescription>
        </div>
        <Button onClick={handleOpenCreateModal} size="sm" disabled={isCreating}>
          <HiPlus className="h-4 w-4 mr-2" />
          {isCreating ? "Criando..." : "Nova Oferta"}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">{renderContent()}</CardContent>

      <OfferModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        offer={editingOffer}
        productPrice={product?.price || 0}
        productId={product?.id || ""}
      />
    </Card>
  );
}
