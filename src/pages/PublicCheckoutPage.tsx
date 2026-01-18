import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { CheckoutProvider } from "@checkout/CheckoutProvider";
import {
  adaptCheckoutTheme,
  initialLayoutData,
  initialLayoutTheme,
} from "@checkout/defaultConstructor";
import LayoutFactory from "@checkout-layout/factory";
import { usePublicCheckout } from "@/hooks/usePublicCheckout";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { CheckoutFrame } from "@checkout/CheckoutFrame";

// Rotas conhecidas que NÃO devem ser tratadas como checkout público
const KNOWN_ROUTES = [
  "login",
  "register",
  "termos",
  "user",
  "api",
  "webhooks",
  "theme",
  "checkout",
  "auth",
  "health",
  "uploads",
];

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-foreground">
            Carregando checkout...
          </p>
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-2xl p-6">
        <div className="relative">
          <h1 className="text-6xl md:text-[8rem] font-bold bg-gradient-to-b from-purple-500 via-[#D50491] to-[#EBDBFB] text-transparent bg-clip-text leading-none">
            Erro
          </h1>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {error}
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Não foi possível carregar o checkout. Verifique se o link está correto.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente que renderiza apenas o checkout visual (sem sidebar)
 */
function PublicCheckoutView() {
  const { data, theme, productOrder } = useCheckout();

  return (
    <div className="min-h-screen w-full">
      <CheckoutFrame mode="desktop">
        <LayoutFactory
          checkoutItems={data}
          checkoutTheme={theme}
          order={productOrder}
        />
      </CheckoutFrame>
    </div>
  );
}

/**
 * Página pública de checkout
 * Acessada via: pay.seudominio.com.br/slug-da-oferta
 */
export function PublicCheckoutPage() {
  // Pegar slug da URL diretamente se não vier do params
  const { slug: slugFromParams } = useParams<{ slug: string }>();
  const slug = slugFromParams || window.location.pathname.replace(/^\//, "") || "";
  
  // Verificar se é uma rota conhecida do gateway
  useEffect(() => {
    if (slug && KNOWN_ROUTES.includes(slug.toLowerCase())) {
      // Se for uma rota conhecida, mostrar erro
      console.warn(`Rota conhecida acessada em domínio de checkout: ${slug}`);
    }
  }, [slug]);
  
  // Se for rota conhecida, não tentar carregar como checkout
  const shouldLoadCheckout = slug && !KNOWN_ROUTES.includes(slug.toLowerCase());
  
  const { checkoutData, loading, error, hasData } = usePublicCheckout(
    shouldLoadCheckout ? slug : ""
  );

  // Se for rota conhecida, mostrar erro específico
  if (!shouldLoadCheckout) {
    return <ErrorMessage error="Página não disponível neste domínio" />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !hasData) {
    return <ErrorMessage error={error || "Checkout não encontrado"} />;
  }

  return (
    <CheckoutProvider
      data={checkoutData?.product || initialLayoutData}
      theme={adaptCheckoutTheme(checkoutData?.theme || initialLayoutTheme)}
    >
      <PublicCheckoutView />
    </CheckoutProvider>
  );
}

