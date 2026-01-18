import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Filter, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductForm } from "./ProductForm";
import { useProducts } from "@/hooks/useProducts";
import type { CreateProductData } from "@/types/product";
import { HiMiniInboxStack } from "react-icons/hi2";

export function ProductList() {
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const {
    products,
    loading,
    error,
    pagination,
    createProduct,
    deleteProduct,
    updateFilters,
    goToPage,
  } = useProducts();

  const handleCreate = async (data: CreateProductData) => {
    await createProduct(data);
    setShowCreateSheet(false);
  };

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value || undefined });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    updateFilters({ search: undefined });
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    updateFilters({ status: value === "all" ? undefined : (value as any) });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    updateFilters({ search: undefined, status: undefined });
  };

  const hasActiveFilters = searchTerm || statusFilter !== "all";

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Erro ao carregar produtos</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seus produtos e serviços
          </p>
        </div>
        <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
          <SheetTrigger asChild>
            <Button className="has-[>svg]:px-5">
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full px-4">
            <SheetHeader className="px-0">
              <SheetTitle>Criar Novo Produto</SheetTitle>
              <SheetDescription>
                Preencha as informações para criar um novo produto.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-2">
              <ProductForm
                onSubmit={handleCreate}
                onCancel={() => setShowCreateSheet(false)}
                loading={loading}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="ACTIVE">Ativo</SelectItem>
            <SelectItem value="DISABLED">Desabilitado</SelectItem>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="REJECTED">Rejeitado</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={handleClearFilters}>
            <X className="mr-2 h-4 w-4" />
            Limpar Filtros
          </Button>
        )}
      </div>

      {/* Lista de Produtos */}
      {loading && products.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <HiMiniInboxStack className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-muted-foreground mb-4">
            {hasActiveFilters
              ? "Tente ajustar os filtros ou criar um novo produto."
              : "Comece criando seu primeiro produto."}
          </p>
          {!hasActiveFilters && (
            <Button onClick={() => setShowCreateSheet(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Produto
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                  loading={loading}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Paginação */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando {products.length} de {pagination.total} produtos
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  Anterior
                </Button>
                <Badge variant="outline">
                  Página {pagination.page} de {pagination.totalPages}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                >
                  Próxima
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
