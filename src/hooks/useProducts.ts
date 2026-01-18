import { useState, useEffect, useCallback } from "react";
import { ProductService } from "@/api/product";
import { toast } from "sonner";
import type {
  Product,
  CreateProductData,
  UpdateProductData,
  ProductFilters,
  ProductListResponse,
} from "@/types/product";

export const useProducts = (initialFilters: ProductFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchProducts = useCallback(async (currentFilters: ProductFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response: ProductListResponse =
        await ProductService.getProducts(currentFilters);
      setProducts(response.products);
      setPagination({
        total: response.pagination.total,
        page: response.pagination.page,
        limit: response.pagination.limit,
        totalPages: response.pagination.totalPages,
      });
    } catch (err: any) {
      setError(err.message || "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (data: CreateProductData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await ProductService.createProduct(data);
        await fetchProducts(filters);
        toast.success("Produto criado com sucesso!");
        return result;
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao criar produto";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchProducts, filters]
  );

  const updateProduct = useCallback(
    async (id: string, data: UpdateProductData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await ProductService.updateProduct(id, data);
        await fetchProducts(filters);
        toast.success("Produto atualizado com sucesso!");
        return result;
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao atualizar produto";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchProducts, filters]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        await ProductService.deleteProduct(id);
        await fetchProducts(filters);
        toast.success("Produto deletado com sucesso!");
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao deletar produto";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchProducts, filters]
  );

  const uploadProductImage = useCallback(
    async (id: string, file: File) => {
      setLoading(true);
      setError(null);
      try {
        const result = await ProductService.uploadProductImage(id, file);
        await fetchProducts(filters);
        toast.success("Imagem do produto atualizada com sucesso!");
        return result;
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao fazer upload da imagem";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchProducts, filters]
  );

  const removeProductImage = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        await ProductService.removeProductImage(id);
        await fetchProducts(filters);
        toast.success("Imagem do produto removida com sucesso!");
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao remover imagem do produto";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchProducts, filters]
  );

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const refetch = useCallback(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  return {
    products,
    loading,
    error,
    filters,
    pagination,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    removeProductImage,
    updateFilters,
    goToPage,
    refetch,
  };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const result = await ProductService.getProductById(id);
      setProduct(result);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar produto");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};
