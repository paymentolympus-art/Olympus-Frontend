import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductDetails } from "@/types/product";
import { FaFacebook, FaGoogle, FaTiktok } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {
  TabPixelFacebook,
  TabPixelGoogle,
  TabPixelTiktok,
} from "../tabs-pixels";

interface TabPixelsContentProps {
  product: ProductDetails;
}
export function TabPixelsContent({ product }: TabPixelsContentProps) {
  const [activeTab, setActiveTab] = useState("facebook");

  const pixels = [
    {
      icon: <FaFacebook />,
      name: "Facebook ADS",
      value: "facebook",
      content: <TabPixelFacebook productId={product.id} />,
    },
    {
      icon: <FaGoogle />,
      name: "Google ADS",
      value: "google",
      content: <TabPixelGoogle productId={product.id} />,
    },
    {
      icon: <FaTiktok />,
      name: "Tiktok ADS",
      value: "linkedin",
      content: <TabPixelTiktok productId={product.id} />,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold">
            Pixels de conversão
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Configure os pixels de conversão para otimizar suas campanhas
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="w-full overflow-x-auto">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-row w-full gap-5"
        >
          <TabsList className="flex flex-col gap-2 w-auto h-[140px] bg-indigo-800/10">
            {pixels.map((pixel) => (
              <TabsTrigger
                className={cn(
                  "w-auto uppercase py-2 data-[state=active]:!bg-primary/20 !font-bold data-[state=active]:!text-yellow-400 !border-t-0 !border-x-0 !border-b-0 !border-l-3 !border-transparent data-[state=active]:!border-primary transition-all duration-300",
                  "rounded-[0_0_0_0]",
                  "flex justify-start gap-3 px-5"
                )}
                key={pixel.value}
                value={pixel.value}
              >
                {pixel.icon} {pixel.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {pixels.map((pixel) => (
            <TabsContent
              key={pixel.value}
              value={pixel.value}
              className="w-auto border-l border-indigo-100/10 px-4"
            >
              {pixel.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
