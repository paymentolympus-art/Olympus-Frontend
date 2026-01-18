import React from "react";
import { Star } from "lucide-react";
import { type CheckoutThemeType } from "@checkout-layout/types/checkout";
import { useSocialProofs } from "@/hooks/useSocialProofs";

interface SocialProofProps {
  checkoutTheme: CheckoutThemeType;
  productId: string;
}

export const SocialProof: React.FC<SocialProofProps> = ({
  checkoutTheme,
  productId,
}) => {
  const { socialProofs, loading } = useSocialProofs({
    productId: productId || "",
  });

  // Se não está habilitado ou não há productId, não renderizar
  if (!checkoutTheme.defaultSnippets.isSocialProof || !productId) {
    return null;
  }

  // Se está carregando, não renderizar ainda (ou mostrar loading se preferir)
  if (loading) {
    return null;
  }

  // Se não há provas sociais após carregar, não renderizar
  if (!Array.isArray(socialProofs) || socialProofs.length === 0) {
    return null;
  }
  return (
    <div
      className={`p-4 rounded-xl space-y-3 sm:space-y-4 ${checkoutTheme.defaultSnippets.isCardShadow ? "shadow-lg" : "border border-gray-200/60"}`}
      style={{
        backgroundColor: checkoutTheme.defaultColors.cardBackground,
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-4">
        {socialProofs.map((proof, index) => {
          return (
            <div
              key={proof.id}
              className={`py-3 ${index > 0 && "border-t-1 border-t-gray-200/60"}`}
            >
              <div className="flex items-start gap-3">
                {proof.image && (
                  <img
                    src={proof.image}
                    alt={proof.name}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-sm sm:text-base mb-1 line-clamp-1"
                    style={{ color: checkoutTheme.defaultColors.cardText }}
                  >
                    {proof.name}
                  </h4>
                  <p
                    className="text-sm sm:text-sm line-clamp-3"
                    style={{
                      color: checkoutTheme.defaultColors.cardDescription,
                    }}
                  >
                    {proof.text}
                  </p>

                  {proof.rating !== undefined && (
                    <div className="flex items-center gap-0.5 sm:gap-1 mt-2 sm:mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={`${proof.id}-star-${i}`}
                          className={`
                        w-3.5 sm:w-4 h-3.5 sm:h-4 
                        ${i < (proof.rating || 0) ? "fill-current" : "fill-none"}
                      `}
                          style={{
                            color:
                              i < (proof.rating || 0)
                                ? checkoutTheme.defaultColors.socialProofStars
                                : "#d1d5db",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
