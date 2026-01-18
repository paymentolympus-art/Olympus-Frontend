import Section from "@/components/widgets/wrappers/section";
import Container from "@/components/widgets/wrappers/container";
import { SlideUp } from "@/components/animations/slide-up";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { PlaneIcon } from "lucide-react";
import {
  FaBuilding,
  FaUmbrellaBeach,
  FaUtensils,
  FaWater,
} from "react-icons/fa6";

export function Trip() {
  return (
    <Container
      className="w-full pb-20 pt-20 sm:pb-32  sm:pt-20 z-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #f3f4f6, #ffffff, #f9fafb)",
      }}
    >
      <Section className="flex flex-col items-center justify-center gap-8 sm:gap-12 relative z-10">
        {/* Header */}
        <SlideUp className="w-full flex flex-col items-start justify-end gap-1">
          <div className="flex flex-row items-center gap-2">
            <Badge
              variant="neon"
              className="from-[#530462] to-[#D50491] border-white"
            >
              <PlaneIcon className="w-5 h-5 p-0.5" />
            </Badge>
            <Badge className="text-gray-600 border-gray-600">
              Premiação Especial
            </Badge>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#040106] leading-tight">
            Uma Viagem Inesquecível para{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cancún
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
            Premiação exclusiva: você + acompanhante
          </p>
        </SlideUp>

        {/* Content Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <SlideUp delay={0.2} className="w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className=" relative">
                <img
                  src="/trip.png"
                  alt="Viagem para Cancún"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 " />
              </div>
            </motion.div>
          </SlideUp>

          {/* Description Section */}
          <SlideUp delay={0.4} className="w-full flex flex-col gap-6">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#040106]">
                Descubra o Paraíso do Caribe Mexicano
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Imagine acordar com o som suave das ondas do Mar do Caribe,
                sentir a brisa tropical acariciando seu rosto e contemplar águas
                em tons de azul turquesa que parecem sair de um sonho. Cancún
                não é apenas um destino, é uma experiência que transforma a
                alma.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Durante sua estadia, você e seu acompanhante viverão momentos
                únicos: praias de areia branca e fina, mergulhos em cenotes
                sagrados, ruínas maias milenares e uma gastronomia que celebra
                os sabores do México. Cada pôr do sol será uma obra-prima
                pintada no céu, e cada noite, uma celebração da vida.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-semibold">
                Esta é mais que uma viagem. É a recompensa por seus resultados
                extraordinários. É o momento de criar memórias que durarão para
                sempre.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                {
                  icon: <FaUmbrellaBeach className="w-5 h-5 text-[#040106] " />,
                  text: "Praias Paradisíacas",
                },
                {
                  icon: <FaWater className="w-5 h-5 text-[#040106] " />,
                  text: "Mar Caribe",
                },
                {
                  icon: <FaBuilding className="w-5 h-5 text-[#040106]" />,
                  text: "Cultura Maia",
                },
                {
                  icon: <FaUtensils className="w-5 h-5 text-[#040106]" />,
                  text: "Gastronomia",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-sm font-semibold text-gray-700">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </SlideUp>
        </div>
      </Section>
    </Container>
  );
}
