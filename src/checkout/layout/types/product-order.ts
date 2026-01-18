export type CustomerType = {
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
};

export type AddressType = {
  cep: string;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
};

export type OrderBumpType = {
  id: string;
  name: string;
  description: string;
  image: string;
  callToAction: string;
  price: number;
  priceFake: number;
  quantity: number;
};

export type ShippingOptionType = {
  id: string;
  name: string;
  price: number;
};

export enum ProductType {
  PHYSICAL = "PHYSICAL",
  DIGITAL = "DIGITAL",
}

export type CartType = {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  priceFake: number;
  type: "DIGITAL" | "PHYSICAL";
  quantity: number;
  total: number;
  orderBumps: OrderBumpType[];
  shippingOption: ShippingOptionType;
};

export type PaymentType = {
  id: string;
  pixQrcode: string;
  pixCode: string;
};

export type ProductOrderType = {
  step: number;
  customer: CustomerType;
  address: AddressType;
  payment: PaymentType;
  cart: CartType;
};
