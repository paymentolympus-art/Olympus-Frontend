import React from "react";
import { CheckoutSidebar } from "./CheckoutSidebar";
import { CheckoutPreview } from "./CheckoutPreview";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smartphone, Monitor, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";

export const CheckoutBuilder: React.FC = () => {
  const { theme, saveTheme } = useCheckout();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [previewMode, setPreviewMode] = React.useState<"desktop" | "mobile">(
    "mobile"
  );

  const handleBackToProduct = () => {
    navigate(`/user/products/${productId}/details`);
  };

  return (
    <div className="min-h-screen bg-checkout-sidebar">
      {/* Header */}
      <header className="bg-sidebar border-b border-checkout-sidebar-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBackToProduct}>
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className={cn(
                "rounded-sm hover:bg-purple-500 hover:text-white",
                previewMode === "mobile"
                  ? "bg-purple-500 text-white"
                  : "bg-transparent text-gray-900"
              )}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              className={cn(
                "rounded-sm hover:bg-purple-500 hover:text-white",
                previewMode === "desktop"
                  ? "bg-purple-500 text-white"
                  : "bg-transparent text-gray-900"
              )}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={saveTheme}
              className="text-white bg-purple-500 hover:bg-purple-500/90"
            >
              <Save className="w-4 h-4" />
              Salvar
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <CheckoutSidebar theme={theme} />

        {/* Main Content */}
        <main className="flex-1 bg-background overflow-y-auto h-[calc(100vh-64px)]">
          <CheckoutPreview mode={previewMode} />
        </main>
      </div>
    </div>
  );
};
