import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { useUserThemes } from "@/hooks/useUserThemes";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@checkout/ui/select";
import { Input } from "@checkout/ui/input";

export const ThemesSection: React.FC = () => {
  const { theme, setTheme } = useCheckout();
  const { data: userThemes, isLoading: isLoadingThemes } = useUserThemes();

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Label className="text-foreground">Layout</Label>
        <Select
          value={theme.theme}
          onValueChange={(value: string) =>
            setTheme({
              ...theme,
              theme: value as "SELECT" | "SHOP" | "SIMPLE",
            })
          }
          disabled={isLoadingThemes}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                isLoadingThemes ? "Carregando..." : "Selecione um layout"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {userThemes?.map((userTheme) => (
              <SelectItem key={userTheme.value} value={userTheme.value}>
                {userTheme.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Navegação</Label>
        <Select
          value={theme.steps}
          onValueChange={(value: "three" | "single" | "automatic-api") =>
            setTheme({
              ...theme,
              steps: value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="three">3 etapas</SelectItem>
            <SelectItem value="single">1 etapa</SelectItem>
            <SelectItem value="automatic-api">API Automática</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Fonte</Label>
        <Select
          value={theme.font}
          onValueChange={(value: "Rubik" | "Inter" | "Poppins") =>
            setTheme({
              ...theme,
              font: value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rubik">Rubik</SelectItem>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Poppins">Poppins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Cor primária</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.primary}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  primary: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.primary}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  primary: e.target.value,
                },
              })
            }
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};
