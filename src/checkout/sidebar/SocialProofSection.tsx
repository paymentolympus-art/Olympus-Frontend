import React, { useState } from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { Label } from "@checkout/ui/label";
import { Switch } from "@checkout/ui/switch";
import { Input } from "@checkout/ui/input";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { SocialProofModal } from "@checkout/modals/SocialProofModal";

export const SocialProofSection: React.FC = () => {
  const { theme, setTheme } = useCheckout();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-provas-sociais"
          checked={theme.defaultSnippets.isSocialProof}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isSocialProof: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-provas-sociais">
          Exibir provas sociais
        </Label>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Cor das estrelas</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.socialProofStars}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  socialProofStars: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />

          <Input
            value={theme.defaultColors.socialProofStars}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  socialProofStars: e.target.value,
                },
              })
            }
            placeholder="#ffd500"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-6 h-6 fill-current stroke-black/20"
              style={{ color: theme.defaultColors.socialProofStars }}
            />
          ))}
        </div>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => setIsModalOpen(true)}
      >
        Abrir provas sociais
      </Button>

      <SocialProofModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
