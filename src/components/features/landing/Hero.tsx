import Container from "@/components/widgets/wrappers/container";
import Section from "@/components/widgets/wrappers/section";
import { BackgroundVideo } from "@/components/animations/background-video";
import { Button } from "@/components/ui/button";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Navbar } from "@/components/widgets/navigation/Navbar";
import { ContainerScroll } from "@/components/animations/container-scroll-animation";
import { motion } from "framer-motion";
import { ROUTES_PUBLIC } from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import { SlideUp } from "@/components/animations/slide-up";

export function Hero() {
  return (
    <Container className="flex flex-col h-[80vh] sm:h-screen w-screen relative bg-[#040106]">
      {/* Vídeo de fundo */}
      <BackgroundVideo className="z-0" />

      {/* Navbar fixo */}
      <Navbar />

      {/* Conteúdo principal */}
      <Section className="absolute top-30 sm:top-20 left-0 right-0 z-13 flex-1 flex flex-col justify-center items-center select-none">
        <SlideUp className="text-center mb-8 pt-8 sm:py-12 sm:px-20 rounded-lg">
          <Badge>Personalizado com alta conversão.</Badge>
          <p className="text-3xl md:text-5xl font-bold text-purple-50 mb-4 mt-6">
            Personalizado e seguro para <br className="hidden md:block" />
            construir seu negócio online.
          </p>

          <p className="text-base md:text-xl text-gray-400 mx-auto w-full">
            Revolucionando o futuro dos pagamentos com tecnologia de ponta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-5 sm:mt-5">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 has-[>svg]:px-5"
                onClick={() => {
                  window.location.href = ROUTES_PUBLIC.REGISTER;
                }}
              >
                <span className="text-white cursor-pointer">
                  Criar uma conta
                </span>
                <BsArrowRightCircleFill className="w-6 h-6 cursor-pointer text-white/70" />
              </Button>
            </motion.div>
          </div>
        </SlideUp>
      </Section>

      <SlideUp className="hidden sm:block z-10 absolute sm:top-0 left-0 right-0 bottom-1 w-full h-[85vh] sm:h-full">
        <ContainerScroll titleComponent={<></>}>
          <img
            src={`/dashboard.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </SlideUp>

      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-12"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(4, 1, 6, 0.3), rgba(4, 1, 6, 1))",
        }}
      ></div>
    </Container>
  );
}
