import Container from "@/components/widgets/wrappers/container";
import Section from "@/components/widgets/wrappers/section";
import { SlideUp } from "@/components/animations/slide-up";
import { MdOutlinePix } from "react-icons/md";
import { motion } from "framer-motion";
import { FaCalendar, FaMoneyBill } from "react-icons/fa";
import { TbPercentage10 } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import { HiMiniSparkles } from "react-icons/hi2";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { Badge } from "@/components/ui/badge";
import { BsCurrencyExchange } from "react-icons/bs";
export function Taxes() {
  return (
    <Container className="w-full py-20 sm:py-32 sm:pt-44 bg-gray-100 z-20 relative overflow-hidden">
      <Section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Card Checkout Personalizado */}
        <SlideUp className="w-full lg:w-auto">
          <motion.div
            whileHover={{
              scale: 1.02,
              rotate: 10,
              skewX: -2,
              skewY: 0,
              rotateX: 10,
              rotateY: 10,
              rotateZ: 10,
              boxShadow: "0 10px 10px 0.5px rgba(4, 1, 6, 0.3)",
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="bg-gradient-2 backdrop-blur-md rounded-xl p-6 w-full lg:w-[320px] shadow-xl hover:cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
              <div className="bg-gradient-1 p-2 rounded-lg">
                <IoIosColorPalette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold">
                Checkout Personalizado
              </h3>
            </div>

            {/* Content Rows */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white text-base font-semibold">
                  3+ Temas
                </span>
                <HiMiniSparkles className="w-5 h-5 text-[#E9D6F8]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-base font-semibold">
                  100% Customizável
                </span>
                <FaWandMagicSparkles className="w-5 h-5 text-[#E9D6F8]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-base font-semibold">
                  Sem Taxa de Plataforma
                </span>
                <FaMoneyBill className="w-5 h-5 text-[#E9D6F8]" />
              </div>
            </div>
          </motion.div>
        </SlideUp>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Seção Central */}
          <SlideUp className="flex-1 flex flex-col items-center text-center w-full px-4">
            <div className="flex flex-row items-center gap-2">
              <Badge variant="neon" className="border-white">
                <BsCurrencyExchange className="w-5 h-5 p-0.5" />
              </Badge>
              <Badge className="text-gray-600 border-gray-600">Ao vivo</Badge>
            </div>
            <h2 className="text-4xl sm:text-4xl font-bold text-[#040106]">
              Você só paga se vender
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-6">
              Tenha acesso a taxas justas e adaptadas ao seu volume. Sem
              complicações, apenas resultados.
            </p>

            {/* Box Promocional */}
            <motion.div
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
              initial="rest"
              whileHover="hover"
              variants={{
                rest: {
                  rotateX: -15,
                },
                hover: {
                  rotateX: -25,
                  skewX: 0,
                  skewY: 0,
                  rotateY: 0,
                  boxShadow: "0 10px 10px 0.5px rgba(4, 1, 6, 0.5)",
                },
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="transform-gpu bg-gradient-1 rounded-xl p-6 w-full flex flex-col sm:flex-row items-center gap-0 sm:gap-6"
            >
              <div className="flex justify-center items-center  w-[100px]">
                <img
                  src="/icons/bg-logoicon-2.png"
                  alt="Gato"
                  className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white text-lg font-semibold mb-4">
                  Condições especiais para volumes elevados.
                </p>
                <div className="rounded-full sm:w-[80%] sm:self-start">
                  <button
                    className="ring-0 sm:w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6 py-4 font-medium flex items-center gap-2 mx-auto sm:mx-0 hover:border-none has-[>svg]:px-5"
                    onClick={() => {
                      window.open("https://wa.me/5511999999999", "_blank");
                    }}
                  >
                    <span className="text-gray-900">Fale com nossa equipe</span>
                    <GoArrowRight
                      size={16}
                      className="w-6 h-6 text-white bg-gradient-1 rounded-full p-0.5"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </SlideUp>

          {/* Card Pix */}
          <SlideUp className="w-full lg:w-auto">
            <motion.div
              whileHover={{
                scale: 1.02,
                rotate: -10,
                skewX: -2,
                skewY: 0,
                rotateX: -10,
                rotateY: -10,
                rotateZ: -10,
                boxShadow: "0 10px 10px 0.5px rgba(4, 1, 6, 0.3)",
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="bg-gradient-2 backdrop-blur-md rounded-xl p-6 w-full lg:w-[320px] shadow-xl hover:cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                <div className="bg-gradient-1 p-2 rounded-lg flex items-center justify-center">
                  <MdOutlinePix className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-xl font-semibold">Pix</h3>
              </div>

              {/* Content Rows */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white text-base font-bold">D+0</span>
                  <FaCalendar className="w-5 h-5 text-[#E9D6F8]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-base font-bold">5,90%</span>
                  <TbPercentage10 className="w-5 h-5 text-[#E9D6F8]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-base font-bold">
                    +1,99 Fixo
                  </span>
                  <FaMoneyBill className="w-5 h-5 text-[#E9D6F8]" />
                </div>
              </div>
            </motion.div>
          </SlideUp>
        </div>
      </Section>
    </Container>
  );
}
