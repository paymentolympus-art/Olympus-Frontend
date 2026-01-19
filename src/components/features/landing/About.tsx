import Section from "@/components/widgets/wrappers/section";
import Container from "@/components/widgets/wrappers/container";
// import { Calendar } from "@/components/ui/calendar";
// import { cn } from "@/lib/utils";
import { AnimatedBeamMultipleOutput } from "@/components/ui/animated-beam-multiple-out";
// import { AnimatedListPays } from "@/components/ui/animated-list-pays";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
// import { Marquee } from "@/components/ui/marquee";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { SlideUp } from "@/components/animations/slide-up";

const features = [
  {
    Icon: FileTextIcon,
    name: "Checkouts Personalizados",
    description: "Somos aqueles que fazem checkouts personalizados.",
    href: "/register",
    cta: "Seja Olympus",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-0 top-0 w-full h-full">
        <img
          src="/card-checkout.png"
          alt="Checkout Personalizado"
          className="w-full h-full object-cover object-top"
        />
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "Alta Taxa de Conversão",
    description: "Não perca mais vendas por taxas de checkout.",
    href: "/register",
    cta: "Seja Olympus",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-0 top-0 w-full h-full">
        <img
          src="/card-payment.png"
          alt="Checkout Personalizado"
          className="w-full h-full object-cover object-top"
        />
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Suporte 24h",
    description: "Disponibilidade em multiplos canais.",
    className: "col-span-3 lg:col-span-1",
    href: "/register",
    cta: "Seja Olympus",
    background: (
      <div className="absolute right-0 top-0 w-full h-full">
        <img
          src="/card-support.png"
          alt="Suporte 24h"
          className="w-full h-full object-cover object-top"
        />
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrações Essenciais",
    description: "Integrações essenciais para o seu negócio.",
    href: "/register",
    cta: "Seja Olympus",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutput className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out  group-hover:scale-105" />
    ),
  },
];

export function About() {
  return (
    <Container className="flex flex-col h-auto w-screen relative bg-[#040106] py-20 z-20">
      <Section className=" relative">
        <SlideUp className="flex flex-col gap-2 items-start justify-start pb-10">
          <div className="flex flex-row items-center gap-2">
            <Badge variant="neon">
              <MdOutlineSupportAgent className="w-6 h-6" />
            </Badge>
            <Badge>Ouvimos você</Badge>
          </div>
          <div className="flex sm:flex-row flex-col justify-between items-center w-full">
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Nosso objetivo é te ajudar <br className="hidden md:block" /> a
              vender mais.
            </h1>
            <p className="text-gray-400">
              Sempre estamos ouvindo você para trazer o melhor do mercado.
              <br className="hidden md:block" />
              Fazendo que sua experiência seja sempre nossa prioridade.
            </p>
          </div>
        </SlideUp>
        <div className="flex flex-col items-center justify-center">
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </Section>
    </Container>
  );
}
