import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { Label } from "@checkout/ui/label";
import { Switch } from "@checkout/ui/switch";
import { Input } from "@checkout/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@checkout/ui/select";
import { InputNoticeMessage } from "@checkout/ui/input-notice-message";

export const NoticeBarSection: React.FC = () => {
  const { theme, setTheme } = useCheckout();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="ativar-barra"
          checked={theme.defaultSnippets.isNoticeBar}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isNoticeBar: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="ativar-barra">
          Ativar
        </Label>
      </div>

      <div className="space-y-2">
        <InputNoticeMessage
          value={theme.defaultTexts.noticeBarText}
          onChange={(html) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                noticeBarText: html,
              },
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label className="text-foreground">Fundo de barra de avisos</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={theme.defaultColors.noticeBar}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    noticeBar: e.target.value,
                  },
                })
              }
              className="w-12 h-8 p-1 border rounded cursor-pointer"
            />

            <Input
              value={theme.defaultColors.noticeBar}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  defaultColors: {
                    ...theme.defaultColors,
                    noticeBar: e.target.value,
                  },
                })
              }
              placeholder="#50b3e8"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Tamanho da mensagem</Label>
        <Select
          value={theme.defaultSizes.sizeNoticeBar}
          onValueChange={(value: "base" | "3xl" | "2xl" | "xl" | "lg" | "sm") =>
            setTheme({
              ...theme,
              defaultSizes: {
                ...theme.defaultSizes,
                sizeNoticeBar: value,
              },
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base" className="text-base">
              Parágrafo
            </SelectItem>
            <SelectItem value="3xl" className="text-3xl">
              Heading 1
            </SelectItem>
            <SelectItem value="2xl" className="text-2xl">
              Heading 2
            </SelectItem>
            <SelectItem value="xl" className="text-xl">
              Heading 3
            </SelectItem>
            <SelectItem value="lg" className="text-lg">
              Heading 4
            </SelectItem>
            <SelectItem value="sm" className="text-sm">
              Heading 5
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Tamanho da margem</Label>
        <Select
          value={theme.defaultMargins.marginNoticeBar}
          onValueChange={(value: "2" | "4" | "5" | "6") =>
            setTheme({
              ...theme,
              defaultMargins: {
                ...theme.defaultMargins,
                marginNoticeBar: value,
              },
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Pequeno</SelectItem>
            <SelectItem value="4">Médio</SelectItem>
            <SelectItem value="5">Grande</SelectItem>
            <SelectItem value="6">Extra</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
