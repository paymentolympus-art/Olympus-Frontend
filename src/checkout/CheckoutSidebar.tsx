import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { ThemesSection } from "./sidebar/all/ThemesSection";
import { ShopSection } from "./sidebar/shop/ShopSection";
import { HeaderSection } from "./sidebar/HeaderSection";
import { NoticeBarSection } from "./sidebar/NoticeBarSection";
import { BannersSection } from "./sidebar/BannersSection";
import { CartSection } from "./sidebar/CartSection";
import { ContentSection } from "./sidebar/ContentSection";
import { FooterSection } from "./sidebar/FooterSection";

import { SocialProofSection } from "./sidebar/SocialProofSection";
import { OrderBumpSection } from "./sidebar/OrderBumpSection";
import { type CheckoutThemeType } from "@checkout/layout/types/checkout";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-tertiary border-b border-border">
        <span className="font-semibold text-sm text-foreground uppercase font-sans">
          {title}
        </span>

        <ChevronRight
          className={cn(
            "w-4 h-4 text-description transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-4 border-b border-border bg-tertiary/50">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

type CheckoutSidebarProps = {
  theme: CheckoutThemeType;
};

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({ theme }) => {
  return (
    <aside className="w-80 bg-sidebar border-r border-border">
      <ScrollArea className="h-[calc(100vh-64px)] bg-sidebar">
        <div className="space-y-0">
          <SidebarSection title="Tema">
            <ThemesSection />
          </SidebarSection>

          {theme.theme === "SHOP" && (
            <SidebarSection title="Shop">
              <ShopSection />
            </SidebarSection>
          )}

          {theme.theme === "SIMPLE" && (
            <SidebarSection title="Cabeçalho">
              <HeaderSection />
            </SidebarSection>
          )}

          {theme.theme === "SIMPLE" && (
            <SidebarSection title="Banners">
              <BannersSection />
            </SidebarSection>
          )}

          {theme.theme === "SIMPLE" && (
            <SidebarSection title="Barra de avisos">
              <NoticeBarSection />
            </SidebarSection>
          )}

          {theme.theme === "SIMPLE" && (
            <SidebarSection title="Conteúdo">
              <ContentSection />
            </SidebarSection>
          )}

          {theme.theme === "SIMPLE" && (
            <SidebarSection title="Carrinho">
              <CartSection />
            </SidebarSection>
          )}

          {theme.theme === "SIMPLE" && (
            <SidebarSection title="Order Bump">
              <OrderBumpSection />
            </SidebarSection>
          )}

          {theme.theme === "SIMPLE" && (
            <SidebarSection title="Provas sociais">
              <SocialProofSection />
            </SidebarSection>
          )}

          <SidebarSection title="Rodapé">
            <FooterSection />
          </SidebarSection>
        </div>
      </ScrollArea>
    </aside>
  );
};
