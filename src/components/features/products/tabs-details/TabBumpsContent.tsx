import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MdAddShoppingCart } from "react-icons/md";
import { TbUnlink } from "react-icons/tb";
import { TabOrderbumpContent } from "../tabs-bumps/TabOrderbumpContent";
import { TabUpSellContent } from "../tabs-bumps/TabUpSellContent";
import type { ProductDetails } from "@/types/product";

interface TabBumpsContentProps {
  product: ProductDetails;
}

export function TabBumpsContent({ product }: TabBumpsContentProps) {
  const bumps = [
    {
      icon: <MdAddShoppingCart />,
      name: "Orderbumps",
      value: "orderbumps",
      content: <TabOrderbumpContent product={product} />,
    },
    {
      icon: <TbUnlink />,
      name: "Upsells",
      value: "upsells",
      content: <TabUpSellContent />,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold">OrderBumps</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Orderbump é uma estratégia de oferta cruzada que aumentam o ticket
            médio e potencializa os lucros do seu negócio
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs className="flex flex-row w-full gap-5" defaultValue="orderbumps">
          <TabsList className="flex flex-col gap-2 w-1/4 h-min bg-indigo-800/10">
            {bumps.map((bump) => (
              <TabsTrigger
                style={{ height: "10px!important" }}
                className={cn(
                  "w-full uppercase py-3 data-[state=active]:!bg-primary/20 !font-bold data-[state=active]:!text-purple-400 !border-t-0 !border-x-0 !border-b-0 !border-l-3 !border-transparent data-[state=active]:!border-primary transition-all duration-300",
                  "rounded-[0_0_0_0]",
                  "flex justify-start gap-3 px-5"
                )}
                key={bump.value}
                value={bump.value}
              >
                {bump.icon} {bump.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {bumps.map((bump) => (
            <TabsContent
              key={bump.value}
              value={bump.value}
              className="w-3/4 border-l border-indigo-100/10 px-4"
            >
              {bump.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
