import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  TermsSidebar,
  TermsContent,
  type TermsDocument,
} from "@/components/features/terms";
import {
  HiArrowLeft,
  HiRectangleStack,
  HiXMark,
  HiBars3,
} from "react-icons/hi2";
import { cn } from "@/lib/utils";

const validDocuments: TermsDocument[] = [
  "privacy-buyers",
  "privacy-site",
  "privacy-sellers",
  "ethics",
  "antifraud",
  "cookies",
  "aml",
  "security",
  "general-terms",
  "terms-consumers",
];

export function TermsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const documentParam = searchParams.get("doc") as TermsDocument | null;
  const activeDocument: TermsDocument =
    documentParam && validDocuments.includes(documentParam)
      ? documentParam
      : "general-terms";

  const handleDocumentChange = (doc: TermsDocument) => {
    setSearchParams({ doc });
    setIsMobileMenuOpen(false);
  };

  // Scroll to top when document changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeDocument]);

  return (
    <div className="min-h-screen bg-[#040106] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#040106]/80 backdrop-blur-xl border-b-[0.1px] border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop: Logo on Left */}
            <Link to="/" className="hidden sm:flex items-center">
              <img src="/icons/logo.png" alt="OlympusPay Logo" className="h-8" />
            </Link>

            {/* Mobile: Menu Button on Left */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="sm:hidden flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all"
            >
              <HiBars3 className="w-6 h-6" />
              <span className="text-sm font-medium">Menu</span>
            </button>

            {/* Mobile: Logo (Centered) */}
            <Link
              to="/"
              className="sm:hidden absolute left-1/2 -translate-x-1/2"
            >
              <img
                src="/icons/logo.png"
                alt="OlympusPay Logo"
                className="hidden sm:block h-7"
              />
              <img
                src="/icons/logo-icon.png"
                alt="OlympusPay Logo"
                className="block sm:hidden h-12"
              />
            </Link>

            {/* Mobile: Back Button */}
            <Link
              to="/"
              className="sm:hidden flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all"
            >
              <HiArrowLeft className="w-5 h-5" />
            </Link>

            {/* Desktop: Back Button on Right */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span>Voltar ao início</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-[min(85vw,350px)] bg-background border-r border overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Menu Mobile */}
              <div className="sticky top-0 bg-background backdrop-blur-xl border-b border-purple-500/10 px-6 py-5 z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <HiRectangleStack className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold text-white">
                      Portal Transparência
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all"
                    aria-label="Fechar menu"
                  >
                    <HiXMark className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  Selecione um documento para visualizar
                </p>
              </div>

              {/* Conteúdo do Menu */}
              <div className="px-4 py-6">
                <TermsSidebar
                  activeDocument={activeDocument}
                  onDocumentChange={handleDocumentChange}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <TermsSidebar
                activeDocument={activeDocument}
                onDocumentChange={handleDocumentChange}
              />
            </div>
          </div>

          {/* Document Content */}
          <TermsContent activeDocument={activeDocument} />
        </div>
      </main>

      {/* Footer */}
      <footer
        className={cn(
          "relative z-10 mt-16 border-[0.1px] border-gray-800/40 py-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/icons/logo-icon.png"
                alt="OlympusPay"
                className="w-8 h-8"
              />
              <span className="text-gray-500 text-sm">
                © 2026 OlympusPay - Todos os direitos reservados
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="mailto:contato@olympuspay.com.br"
                className="text-gray-500 text-sm transition-colors"
              >
                contato@olympuspay.com.br
              </a>
              <a
                href="mailto:suporte@olympuspay.com.br"
                className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
              >
                Suporte
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
