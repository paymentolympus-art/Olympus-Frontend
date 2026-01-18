import { CheckoutProvider } from "@checkout/CheckoutProvider";
import {
  adaptCheckoutTheme,
  initialLayoutData,
  initialLayoutTheme,
} from "@checkout/defaultConstructor";
import { CheckoutBuilder } from "@checkout/CheckoutBuilder";
import { useParams } from "react-router-dom";
import { useCheckoutSetting } from "@/hooks/useCheckoutSetting";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES_PRIVATE } from "@/constants/routes";
import { HiArrowLeft } from "react-icons/hi2";

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

function ErrorMessage({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-2xl">
        <div className="relative">
          <h1 className="text-6xl md:text-[12rem] font-bold bg-gradient-to-b from-purple-500 via-[#D50491] to-[#EBDBFB] text-transparent bg-clip-text leading-none">
            AVISO
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-purple-500/20 blur-2xl">
            AVISO
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{error}</h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Oops! verifique se o seu domínio está ativo e relacionado ao
            produto.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            asChild
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Link
              to={ROUTES_PRIVATE.PRODUCTS}
              className="flex items-center gap-2"
            >
              <HiArrowLeft className="w-5 h-5" />
              Voltar para Produtos
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onRetry}
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            <p className="flex items-center gap-2">
              <HiOutlineExclamationCircle className="w-4 h-4" />
              Tentar novamente
            </p>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  const { productId } = useParams<{ productId: string }>();

  const { checkoutData, loading, error, refetch, hasData } = useCheckoutSetting(
    productId || ""
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  if (!hasData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold">Produto não encontrado</h2>
          <p className="text-sm text-muted-foreground">
            O produto solicitado não foi encontrado.
          </p>
        </div>
      </div>
    );
  }

  /**
   * Função para recarregar os dados do checkout após atualizações
   * (ex: após upload de assets)
   */
  const handleThemeUpdate = async () => {
    await refetch();
  };

  return (
    <CheckoutProvider
      data={checkoutData?.product || initialLayoutData}
      theme={adaptCheckoutTheme(checkoutData?.theme || initialLayoutTheme)}
      onThemeUpdate={handleThemeUpdate}
    >
      <CheckoutBuilder />
    </CheckoutProvider>
  );
}
