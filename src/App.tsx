import { BrowserRouter } from "react-router-dom";
import { Routers } from "./Routers";
import { ThemeProvider } from "./components/theme-provider";
import { QueryProvider } from "./components/query-provider";
import { Toaster } from "@/components/ui/sonner";

/**
 * Verifica se está em um domínio customizado de checkout
 * (não é o domínio principal do gateway)
 */
function isCheckoutCustomDomain(): boolean {
  const hostname = window.location.hostname;
  
  // Domínios principais do gateway (onde mostra o dashboard completo)
  const mainDomains = [
    "olympuspayment.com.br",
    "www.olympuspayment.com.br",
    "olympus-frontend-swart.vercel.app",
    "localhost",
    "127.0.0.1",
  ];
  
  // Se não está em nenhum domínio principal, é um domínio customizado
  return !mainDomains.some(domain => hostname.includes(domain));
}

function App() {
  // Se estiver em domínio customizado, renderizar apenas checkout
  if (isCheckoutCustomDomain()) {
    return (
      <BrowserRouter>
        <ThemeProvider>
          <QueryProvider>
            <Routers />
            <Toaster theme="dark" position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }

  // Se estiver no domínio principal, renderizar gateway completo
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routers />
        <Toaster theme="dark" position="top-right" />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
