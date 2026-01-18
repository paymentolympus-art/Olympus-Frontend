import {
  ProductStatus,
  ProductType,
  ProductPaymentFormat,
} from "@/types/product";

export const productStatus = {
  [ProductStatus.ACTIVE]: "Ativo",
  [ProductStatus.DISABLED]: "Desabilitado",
  [ProductStatus.PENDING]: "Pendente",
  [ProductStatus.REJECTED]: "Rejeitado",
};

export const productType = {
  [ProductType.DIGITAL]: "Produto Digital",
  [ProductType.PHYSICAL]: "Produto Fisico",
};

export const productPaymentFormat = {
  [ProductPaymentFormat.ONE_TIME]: "Pagamento Único",
  [ProductPaymentFormat.RECURRING]: "Recorrente",
};
export const getProductStatus = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "Ativo";
    case ProductStatus.DISABLED:
      return "Inativo";
    case ProductStatus.PENDING:
      return "Pendente";
    case ProductStatus.REJECTED:
      return "Rejeitado";
    default:
      return "Desconhecido";
  }
};

export const getStatusColor = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "bg-green-500/10 text-green-500 border-green-500/20 w-fit";
    case ProductStatus.DISABLED:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20 w-fit";
    case ProductStatus.PENDING:
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 w-fit";
    case ProductStatus.REJECTED:
      return "bg-red-500/10 text-red-500 border-red-500/20 w-fit";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20 w-fit";
  }
};
