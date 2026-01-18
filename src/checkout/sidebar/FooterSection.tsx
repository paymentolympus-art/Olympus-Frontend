import React from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { Label } from "@checkout/ui/label";
import { Switch } from "@checkout/ui/switch";
import { Input } from "@checkout/ui/input";

export const FooterSection: React.FC = () => {
  const { theme, setTheme } = useCheckout();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-foreground">Texto</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.footerText}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  footerText: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.footerText}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  footerText: e.target.value,
                },
              })
            }
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Fundo do rodapé</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={theme.defaultColors.footerBackground}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  footerBackground: e.target.value,
                },
              })
            }
            className="w-12 h-8 p-1 border rounded cursor-pointer"
          />
          <Input
            value={theme.defaultColors.footerBackground}
            onChange={(e) =>
              setTheme({
                ...theme,
                defaultColors: {
                  ...theme.defaultColors,
                  footerBackground: e.target.value,
                },
              })
            }
            placeholder="f2f2f2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Input
          value={theme.defaultTexts.copyRightText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                copyRightText: e.target.value,
              },
            })
          }
          placeholder="© 2025 Loja. Todos os direitos reservados."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-copyright"
          checked={theme.defaultSnippets.isCopyRight}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isCopyRight: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-copyright">
          Exibir copyright
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-seguranca"
          checked={theme.defaultSnippets.isSecurity}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isSecurity: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-seguranca">
          Selo de segurança no rodapé
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-formas-de-pagamento"
          checked={theme.defaultSnippets.isPayment}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isPayment: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-formas-de-pagamento">
          Exibir formas de pagamento
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-nome-da-loja"
          checked={!!theme.defaultTexts.shopNameText}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                shopNameText: checked ? "Nome da Loja" : "",
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-nome-da-loja">
          Exibir nome da loja
        </Label>
      </div>

      <div className="space-y-2">
        <Input
          value={theme.defaultTexts.shopNameText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                shopNameText: e.target.value,
              },
            })
          }
          placeholder="Nome da Loja"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-cnpj-cpf"
          checked={theme.defaultSnippets.isCNPJ}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isCNPJ: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-cnpj-cpf">
          Exibir CNPJ
        </Label>
      </div>

      <div className="space-y-2">
        <Input
          value={theme.defaultTexts.idText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                idText: e.target.value,
              },
            })
          }
          placeholder="21.999.999/9923131"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-e-mail-de-contato"
          checked={theme.defaultSnippets.isEmail}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isEmail: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-e-mail-de-contato">
          Exibir e-mail de contato
        </Label>
      </div>

      <div className="space-y-2">
        <Input
          value={theme.defaultTexts.emailText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                emailText: e.target.value,
              },
            })
          }
          placeholder="exemple@gmail.com"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-whatsapp"
          checked={theme.defaultSnippets.isWhatsApp}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isWhatsApp: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-whatsapp">
          Exibir whatsapp
        </Label>
      </div>

      <div className="space-y-2">
        <Input
          value={theme.defaultTexts.whatsappText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                whatsappText: e.target.value,
              },
            })
          }
          placeholder="(11) 99999-9999"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-endereco"
          checked={theme.defaultSnippets.isAddress}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isAddress: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-endereco">
          Exibir endereço
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-termos-de-uso"
          checked={theme.defaultSnippets.isTerms}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isTerms: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-termos-de-uso">
          Exibir termos de uso
        </Label>
      </div>

      <div className="space-y-2">
        <Input
          value={theme.defaultTexts.termsText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                termsText: e.target.value,
              },
            })
          }
          placeholder="3123213"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-politica-de-privacidade"
          checked={theme.defaultSnippets.isPrivacyPolicy}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isPrivacyPolicy: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label
          className="text-foreground"
          htmlFor="exibir-politica-de-privacidade"
        >
          Exibir política de privacidade
        </Label>
      </div>

      <div className="space-y-2">
        <Input
          value={theme.defaultTexts.privacyPolicyText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                privacyPolicyText: e.target.value,
              },
            })
          }
          placeholder="DAWE23313"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="exibir-trocas-e-devolucoes"
          checked={theme.defaultSnippets.isExchangePolicy}
          onCheckedChange={(checked) =>
            setTheme({
              ...theme,
              defaultSnippets: {
                ...theme.defaultSnippets,
                isExchangePolicy: checked,
              },
            })
          }
          className="border border-border"
        />
        <Label className="text-foreground" htmlFor="exibir-trocas-e-devolucoes">
          Exibir trocas e devoluções
        </Label>
      </div>

      <div className="space-y-2">
        <Input
          value={theme.defaultTexts.exchangePolicyText}
          onChange={(e) =>
            setTheme({
              ...theme,
              defaultTexts: {
                ...theme.defaultTexts,
                exchangePolicyText: e.target.value,
              },
            })
          }
          placeholder="31231313"
        />
      </div>
    </div>
  );
};
