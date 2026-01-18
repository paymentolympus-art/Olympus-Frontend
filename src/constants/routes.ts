import {
  HiComputerDesktop,
  HiMiniInboxStack,
  HiMiniShoppingCart,
  HiPresentationChartBar,
  HiMiniLink,
  HiGlobeAlt,
  HiTruck,
  HiMiniGlobeAmericas,
} from "react-icons/hi2";

export const ROUTES_LAYOUT = {
  DEFAULT: "/",
  ACCESS: "/",
  USER: "/user",
};

export const ROUTES_PUBLIC = {
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TERMS: "/termos",
};

export const ROUTES_PRIVATE = {
  DASHBOARD: "/user/dashboard",
  PRODUCTS: "/user/products",
  SALES: "/user/sales",
  FINANCE: "/user/finance",
  SHIPPING: "/user/shipping",
  INTEGRATIONS: "/user/integrations",
  DOMAINS: "/user/domains",
  LIVE_VIEW: "/user/live-view",
  CHECKOUT: "/user/checkout",
  MY_ACCOUNT: "/user/my-account",
  CONFIGURATION: "/user/configuration",
  AWARDS: "/user/awards",
  API_KEYS: "/user/api-keys",
};

export const routesDashboard = [
  {
    title: "Resumo",
    url: "/user/dashboard",
    icon: HiComputerDesktop,
  },
  {
    title: "Produtos",
    url: "/user/products",
    icon: HiMiniInboxStack,
  },
  {
    title: "Vendas",
    url: "/user/sales",
    icon: HiMiniShoppingCart,
  },
  {
    title: "Financeiro",
    url: "/user/finance",
    icon: HiPresentationChartBar,
  },
  {
    title: "Integrações",
    url: "/user/integrations",
    icon: HiMiniLink,
  },
  {
    title: "Fretes",
    url: "/user/shipping",
    icon: HiTruck,
  },
  {
    title: "Domínios",
    url: "/user/domains",
    icon: HiGlobeAlt,
  },
  {
    title: "Live View",
    url: "/user/live-view",
    icon: HiMiniGlobeAmericas,
  },
];
