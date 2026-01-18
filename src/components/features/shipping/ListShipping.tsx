import { useState, useEffect, Fragment } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, Edit, Trash2, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PaginationWidget } from "@/components/widgets/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useDebounce } from "@/hooks/useDebounce";
import { getShippingOptions, deleteShippingOption } from "@/api/shipping";
import { CreateShippingForm } from "./CreateShippingForm";
import { EditShippingForm } from "./EditShippingForm";
import { ShippingProductsManager } from "./ShippingProductsManager";
import Modal from "@/components/widgets/modal";
import type { ShippingOption } from "@/validators/shipping";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function ListShipping() {
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [shippingToDelete, setShippingToDelete] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null);
  const debouncedSearch = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const { pagination, setCurrentPage, setListSize } = usePagination({
    pagination: {
      currentPage: 1,
      itemsPerPage: 5,
      totalPages: 1,
      listSize: 0,
    },
  });

  // Query para buscar opções de frete
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "shipping",
      debouncedSearch,
      pagination.currentPage,
      pagination.itemsPerPage,
    ],
    queryFn: () =>
      getShippingOptions({
        search: debouncedSearch || undefined,
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
      }),
    staleTime: 0, // Sem cache para testar
  });

  // Mutation para deletar
  const deleteMutation = useMutation({
    mutationFn: deleteShippingOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
      toast.success("Opção de frete deletada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao deletar opção de frete");
    },
  });

  // Atualizar tamanho da lista quando dados mudarem
  useEffect(() => {
    if (data) {
      console.log("Setting list size:", data.total);
      setListSize(data.total);
    }
  }, [data, setListSize]);

  // Resetar página quando busca mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, setCurrentPage]);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (shipping: ShippingOption) => {
    setSelectedShipping(shipping);
    setIsEditModalOpen(true);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedShipping(null);
  };

  const handleCreateCancel = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setSelectedShipping(null);
  };

  const handleManageProducts = (shipping: ShippingOption) => {
    setSelectedShipping(shipping);
    setIsProductsModalOpen(true);
  };

  const handleProductsSuccess = () => {
    // A query já será invalidada pelo componente ShippingProductsManager
  };

  const handleDelete = (id: string) => {
    setShippingToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (shippingToDelete) {
      deleteMutation.mutate(shippingToDelete);
    }
    setIsDeleteDialogOpen(false);
    setShippingToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setShippingToDelete(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Erro ao carregar opções de frete
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Fragment>
      <div className="space-y-6">
        {/* Header com busca e botão criar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar opções de frete..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleCreate} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nova Opção de Frete
          </Button>
        </div>

        {/* Lista de opções de frete */}
        <AnimatePresence>
          <div className="grid gap-4">
            {isLoading ? (
              // Skeletons de loading
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : data?.shippingOptions.length === 0 ? (
              // Estado vazio
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">
                    Nenhuma opção de frete encontrada
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {debouncedSearch
                      ? "Tente ajustar os termos de busca"
                      : "Crie sua primeira opção de frete"}
                  </p>
                  {!debouncedSearch && (
                    <Button onClick={handleCreate}>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeira Opção
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              // Lista de opções
              data?.shippingOptions.map((shipping, index) => (
                <motion.div
                  key={shipping.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    key={shipping.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center space-x-4 w-full sm:flex-1">
                          {shipping.image ? (
                            <img
                              src={shipping.image}
                              alt={shipping.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-300 truncate">
                              {shipping.name}
                            </h3>
                            {shipping.description && (
                              <p className="text-sm text-gray-500 truncate">
                                {shipping.description}
                              </p>
                            )}
                            {shipping.product && (
                              <Badge variant="secondary" className="mt-1">
                                {shipping.product.name}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex w-full sm:w-auto items-start justify-between sm:items-center space-x-4">
                          <div className="text-left sm:text-right">
                            <p className="text-lg font-semibold text-gray-300">
                              {formatPrice(shipping.price)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Criado em{" "}
                              {new Date(shipping.createdAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleManageProducts(shipping)}
                              title="Gerenciar produtos"
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(shipping)}
                              title="Editar frete"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(shipping.id)}
                              disabled={deleteMutation.isPending}
                              title="Deletar frete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>
        {/* Paginação */}
        {data && pagination.totalPages > 1 && (
          <div className="flex justify-center">
            <PaginationWidget
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
              maxVisiblePages={5}
              showBoundaries={true}
            />
          </div>
        )}

        {/* Informações da paginação */}
        {data && (
          <div className="text-center text-sm text-gray-500">
            Mostrando{" "}
            {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} a{" "}
            {Math.min(
              pagination.currentPage * pagination.itemsPerPage,
              data.total ?? 0
            )}{" "}
            de {data.total} opções de frete
          </div>
        )}
      </div>

      {/* Modal de Criação */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCreateCancel}
        title="Nova Opção de Frete"
        description="Crie uma nova opção de frete para seus produtos"
        size="lg"
      >
        <CreateShippingForm
          onSuccess={handleCreateSuccess}
          onCancel={handleCreateCancel}
        />
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleEditCancel}
        title="Editar Opção de Frete"
        description="Edite os detalhes da opção de frete selecionada"
        size="lg"
      >
        {selectedShipping && (
          <EditShippingForm
            shipping={selectedShipping}
            onSuccess={handleEditSuccess}
            onCancel={handleEditCancel}
          />
        )}
      </Modal>

      {/* Modal de Gerenciamento de Produtos */}
      {selectedShipping && (
        <ShippingProductsManager
          open={isProductsModalOpen}
          onOpenChange={setIsProductsModalOpen}
          shipping={selectedShipping}
          onSuccess={handleProductsSuccess}
        />
      )}

      {/* Dialog de Confirmação de Deleção */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar opção de frete</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta opção de frete? Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deletando..." : "Deletar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
