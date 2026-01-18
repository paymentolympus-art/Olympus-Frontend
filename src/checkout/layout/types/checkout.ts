import { type ProductOrderType } from "@checkout-layout/types/product-order";

type OfferType = {
  id: string;
  name: string;
  description: string;
  slug: string;
  priceFake: number;
  price: number;
};

type OrderBumpType = {
  id: string;
  name: string;
  description: string;
  image: string;
  callToAction: string;
  price: number;
  priceFake: number;
};

type ShippingOptionType = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type SocialProofType = {
  id: string;
  image: string;
  rating: number;
  name: string;
  text: string;
};

export type CheckoutItemsType = {
  id: string;
  name: string;
  type: "DIGITAL" | "PHYSICAL";
  paymentFormat: "ONE_TIME" | "RECURRING";
  description: string;
  image: string;
  urlBack: string;
  urlRedirect: string;
  offer: OfferType;
  orderBumps: OrderBumpType[];
  shippingOptions: ShippingOptionType[];
};

export type CheckoutThemeType = {
  theme: "SIMPLE" | "SHOP" | "SELECT";
  steps: "three" | "single" | "automatic-api";
  font: "Rubik" | "Inter" | "Poppins";
  radius: "square" | "rounded";
  cartVisible: boolean;
  socialProofs: SocialProofType[];
  defaultImages: {
    favicon: string;
    logo: string;
    logoPosition: "left" | "center" | "right";
    bannerDesktop: string;
    bannerMobile: string;
  };
  defaultTexts: {
    titlePageText: string;
    buttonText: string;
    idText: string;
    noticeBarText: string;
    shopNameText: string;
    productTitleText: string;
    emailText: string;
    addressText: string;
    whatsappText: string;
    termsText: string;
    privacyPolicyText: string;
    exchangePolicyText: string;
    copyRightText: string;
  };
  defaultSnippets: {
    isLogo: boolean;
    isMenuFixedTop: boolean;
    isNoticeBar: boolean;
    isBanner: boolean;
    isSocialProof: boolean;
    isPayment: boolean;
    isSecurity: boolean;
    isCopyRight: boolean;
    isCountdown: boolean;
    isTerms: boolean;
    isPrivacyPolicy: boolean;
    isExchangePolicy: boolean;
    isWhatsApp: boolean;
    isEmail: boolean;
    isAddress: boolean;
    isCNPJ: boolean;
    isCardShadow: boolean;
    isButtonShadow: boolean;
    isButtonPulse: boolean;
    isFinishButtonShadow: boolean;
    isFinishButtonPulse: boolean;
    isCartDiscount: boolean;
    isSealSecurity: boolean;
    isCountProduct: boolean;
    isCountBump: boolean;
  };
  defaultColors: {
    headerBackground: string;
    cardBackground: string;
    cardText: string;
    cardDescription: string;
    cardPriceTotal: string;
    textDiscount: string;
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    noticeBar: string;
    socialProofStars: string;
    buttonColor: string;
    buttonTextColor: string;
    finishButtonColor: string;
    finishButtonTextColor: string;
    stepCircle: string;
    stepText: string;
    footerText: string;
    footerBackground: string;
    orderBumpText: string;
    orderBumpBackground: string;
    orderBumpBorder: string;
    orderBumpButton: string;
    orderBumpButtonText: string;
    orderBumpPrice: string;
    sealSecurityColor: string;
  };
  defaultMargins: {
    marginNoticeBar: "2" | "4" | "5" | "6";
  };
  defaultSizes: {
    sizeNoticeBar: "base" | "3xl" | "2xl" | "xl" | "lg" | "sm";
  };
};

export type LayoutFactoryType = {
  order: ProductOrderType;
  checkoutItems: CheckoutItemsType;
  checkoutTheme: CheckoutThemeType;
};

export type ThemeComponentType = {
  checkoutItems: CheckoutItemsType;
  checkoutTheme: CheckoutThemeType;
};

export interface CheckoutApiResponse {
  product: CheckoutItemsType;
  theme: CheckoutThemeType;
}
