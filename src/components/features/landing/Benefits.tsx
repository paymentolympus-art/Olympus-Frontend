import Container from "@/components/widgets/wrappers/container";
import Section from "@/components/widgets/wrappers/section";
import { SlideUp } from "@/components/animations/slide-up";
import { motion } from "framer-motion";
import { FaMoneyBill, FaShieldAlt, FaSync, FaRedo } from "react-icons/fa";
import { MdOutlinePix, MdOutlineSupportAgent } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { AiFillThunderbolt } from "react-icons/ai";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: FaSync,
    title: "Multi Adquirente",
    description:
      "(ALTÍSSIMA TAXA DE APROVAÇÃO) Nosso sistema escolhe automaticamente a melhor adquirente, garantindo máxima aprovação e menos recusas.",
  },
  {
    icon: MdOutlineSupportAgent,
    title: "Ouvimos você",
    description:
      "Conte com um time de especialistas pronto para atender sua empresa a qualquer momento.",
  },
  {
    icon: FaRedo,
    title: "Recorrências E Assinaturas",
    description:
      "Automatize pagamentos recorrentes e maximize sua previsibilidade financeira.",
  },
  {
    icon: FaShieldAlt,
    title: "Sistema Pré-Chargeback",
    description:
      "Reduza drasticamente seus chargebacks com nosso sistema avançado de prevenção.",
  },
  {
    icon: MdOutlinePix,
    title: "Api Pix",
    description:
      "Tenha uma API robusta e flexível para integrar pagamentos via Pix de forma eficiente e segura.",
  },
  {
    icon: FaMoneyBill,
    title: "Antecipação D+2",
    description:
      "Receba seu dinheiro em apenas 2 dias! E, no cartão, possibilidade de DO. No Pix, o recebimento é instantâneo.",
    arrow: true,
  },
];

export function Benefits() {
  return (
    <Container
      className="w-full pb-20 pt-20 sm:pb-32 sm:pt-0 z-20"
      style={{
        background: "linear-gradient(to bottom,#f9fafb, #f3f4f6)",
      }}
    >
      <Section className="flex flex-col items-center justify-center gap-8">
        {/* Header */}
        <SlideUp className="w-full flex flex-col items-center justify-center gap-1">
          <div className="flex flex-row items-center gap-2">
            <Badge variant="neon" className=" border-white">
              <AiFillThunderbolt className="w-5 h-5 p-0.5" />
            </Badge>
            <Badge className="text-gray-600 border-gray-600">Ao vivo</Badge>
          </div>
          <h2 className="text-4xl sm:text-4xl font-bold text-[#040106]">
            Benefícios Exclusivos
          </h2>
        </SlideUp>

        {/* Grid de Benefícios */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <SlideUp key={index} className="w-full">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={{
                    rest: {
                      scale: 1,
                    },
                    hover: {
                      scale: 1.02,
                    },
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="bg-gradient-2 backdrop-blur-md rounded-xl p-6 h-full shadow-xl hover:cursor-pointer flex flex-col"
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="bg-gradient-1 p-3 rounded-lg w-fit relative">
                      <Icon
                        className={cn(
                          "w-5 h-5 text-white",
                          benefit.title !== "Suporte 24h" ? "p-0.5" : ""
                        )}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white text-sm sm:text-base leading-relaxed flex-1">
                    {benefit.description}
                  </p>
                </motion.div>
              </SlideUp>
            );
          })}
        </div>
      </Section>
    </Container>
  );
}
