import type { ProductDetails } from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  HiMiniLink,
  HiOutlineSignal,
  HiCursorArrowRipple,
  HiMiniGlobeAmericas,
} from "react-icons/hi2";
import { HiOutlineLightningBolt } from "react-icons/hi";
import {
  TabOffersContent,
  TabIntegrationsContent,
  TabPixelsContent,
  TabBumpsContent,
  TabDomainContent,
} from "./tabs-details";

type ProductDetailsContentProps = {
  product: ProductDetails;
};

export function ProductDetailsContent({ product }: ProductDetailsContentProps) {
  const tabs = [
    {
      label: "Ofertas",
      value: "offers",
      icon: <HiMiniLink className="h-4 w-4" />,
      content: <TabOffersContent product={product} />,
    },
    {
      label: "Integrações",
      value: "integrations",
      icon: <HiCursorArrowRipple className="h-4 w-4" />,
      content: <TabIntegrationsContent product={product} />,
    },
    {
      label: "Pixels",
      value: "pixels",
      icon: <HiOutlineSignal className="h-4 w-4" />,
      content: <TabPixelsContent product={product} />,
    },
    {
      label: "Bumps & Upsells",
      value: "bumps",
      icon: <HiOutlineLightningBolt className="h-4 w-4" />,
      content: <TabBumpsContent product={product} />,
    },
    {
      label: "Domínio",
      value: "domain",
      icon: <HiMiniGlobeAmericas className="h-4 w-4" />,
      content: <TabDomainContent productId={product.id} />,
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <Tabs defaultValue="offers" className="w-full">
        <TabsList className="w-full flex flex-row h-auto bg-card rounded-sm p-0 !overflow-x-auto scrollbar-h-1 scrollbar scrollbar-thumb-primary scrollbar-track-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="uppercase py-2 data-[state=active]:!bg-primary/20 !font-bold data-[state=active]:!text-yellow-400 rounded-none rounded-t-sm !border-t-0 !border-x-0 !border-b-3 !border-transparent data-[state=active]:!border-primary transition-all duration-300"
            >
              {tab.icon} {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex flex-col overflow-y-auto">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-2">
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
