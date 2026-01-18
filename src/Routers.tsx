import {
  ROUTES_PUBLIC,
  ROUTES_LAYOUT,
  ROUTES_PRIVATE,
} from "./constants/routes";
import { Route, Routes } from "react-router-dom";

// Layouts
import { DefaultLayout } from "./layouts/DefaultLayout";
import { AccessLayout } from "./layouts/AccessLayout";
import { UserLayout } from "./layouts/UserLayout";
import { CheckoutLayout } from "./layouts/CheckoutLayout";
// Pages
import { LandingPage } from "./pages/LandingPage";
import { TermsPage } from "./pages/TermsPage";
import { LoginPage } from "./pages/access/LoginPage";
import { RegisterPage } from "./pages/access/RegisterPage";
import { DashboardPage } from "./pages/user/DashboardPage";
import { ProductsPage } from "./pages/user/ProductsPage";
import { ProductDetailsPage } from "./pages/user/ProductDetailsPage";
import { SalesPage } from "./pages/user/SalesPage";
import { FinancePage } from "./pages/user/FinancePage";
import { IntegrationsPage } from "./pages/user/IntegrationsPage";
import { LiveViewPage } from "./pages/user/LiveViewPage";
import { ShippingPage } from "./pages/user/ShippingPage";
import { DomainsPage } from "./pages/user/DomainsPage";
import { CheckoutPage } from "./pages/user/CheckoutPage";
import { MyAccountPage } from "./pages/user/MyAccountPage";
import { ConfigurationPage } from "./pages/user/ConfigurationPage";
import { AwardsPage } from "./pages/user/AwardsPage";
import { ApiKeyPage } from "./pages/user/ApiKeyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function Routers() {
  return (
    <Routes>
      <Route path={ROUTES_LAYOUT.DEFAULT} element={<DefaultLayout />}>
        <Route path={ROUTES_PUBLIC.LANDING} element={<LandingPage />} />
        <Route path={ROUTES_PUBLIC.TERMS} element={<TermsPage />} />
      </Route>
      <Route path={ROUTES_LAYOUT.ACCESS} element={<AccessLayout />}>
        <Route path={ROUTES_PUBLIC.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES_PUBLIC.REGISTER} element={<RegisterPage />} />
      </Route>
      <Route path={ROUTES_LAYOUT.USER} element={<UserLayout />}>
        <Route path={ROUTES_PRIVATE.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES_PRIVATE.PRODUCTS} element={<ProductsPage />} />
        <Route
          path="/user/products/:productId/details"
          element={<ProductDetailsPage />}
        />
        <Route path={ROUTES_PRIVATE.SALES} element={<SalesPage />} />
        <Route path={ROUTES_PRIVATE.FINANCE} element={<FinancePage />} />
        <Route
          path={ROUTES_PRIVATE.INTEGRATIONS}
          element={<IntegrationsPage />}
        />
        <Route path={ROUTES_PRIVATE.DOMAINS} element={<DomainsPage />} />
        <Route path={ROUTES_PRIVATE.LIVE_VIEW} element={<LiveViewPage />} />
        <Route path={ROUTES_PRIVATE.SHIPPING} element={<ShippingPage />} />
        <Route path={ROUTES_PRIVATE.MY_ACCOUNT} element={<MyAccountPage />} />
        <Route
          path={ROUTES_PRIVATE.CONFIGURATION}
          element={<ConfigurationPage />}
        />
        <Route path={ROUTES_PRIVATE.AWARDS} element={<AwardsPage />} />
        <Route path={ROUTES_PRIVATE.API_KEYS} element={<ApiKeyPage />} />
      </Route>
      <Route path={ROUTES_LAYOUT.USER} element={<CheckoutLayout />}>
        <Route path={ROUTES_PRIVATE.CHECKOUT} element={<CheckoutPage />} />
        <Route
          path={ROUTES_PRIVATE.CHECKOUT + "/:productId"}
          element={<CheckoutPage />}
        />
      </Route>

      {/* NOT FOUND */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
