import Section from "@/components/widgets/wrappers/section";
import Container from "@/components/widgets/wrappers/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { GiMetalPlate } from "react-icons/gi";
import { Badge } from "@/components/ui/badge";
import { SlideUp } from "@/components/animations/slide-up";

const awards = [
  {
    id: 1,
    name: "OlympusPay Bronze",
    achievement: "10K",
    image: "/plates/10k.png",
    description: "Parabéns por conquistar 10K",
    className: "border border-black",
  },
  {
    id: 2,
    name: "OlympusPay Silver",
    achievement: "50K",
    image: "/plates/50k.png",
    description: "Parabéns por conquistar 50K",
    className: "border border-black",
  },
  {
    id: 3,
    name: "OlympusPay Gold",
    achievement: "100K",
    image: "/plates/100k.png",
    description: "Parabéns por conquistar 100K",
    className: "border border-black",
  },
  {
    id: 4,
    name: "OlympusPay Legendary",
    achievement: "300K",
    image: "/plates/300k.png",
    description: "Parabéns por conquistar 300K",
    className: "border border-black",
  },
  {
    id: 5,
    name: "OlympusPay Master",
    achievement: "500K",
    image: "/plates/500k.png",
    description: "Parabéns por conquistar 500K",
    className: "border border-black",
  },
  {
    id: 6,
    name: "OlympusPay Olympus",
    achievement: "1 MILHÃO",
    image: "/plates/1m.png",
    description: "Parabéns por conquistar 1 MILHÃO",
    className: "border border-black",
  },
];

export function Awards() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Função para avançar automaticamente
  const scrollNext = useCallback(() => {
    if (api && isPlaying) {
      api.scrollNext();
    }
  }, [api, isPlaying]);

  // Autoplay
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Pausar autoplay quando o usuário interage
    const handleInteraction = () => {
      setIsPlaying(false);
      // Retomar autoplay após 3 segundos de inatividade
      setTimeout(() => setIsPlaying(true), 3000);
    };

    api.on("pointerDown", handleInteraction);

    return () => {
      api.off("pointerDown", handleInteraction);
    };
  }, [api]);

  // Timer para autoplay
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [scrollNext, isPlaying]);

  return (
    <Container className="flex flex-col h-auto w-screen relative bg-[#040106] py-10 sm:py-20 z-20">
      <Section className="relative">
        <SlideUp className="flex flex-col gap-2 items-start justify-start pb-6 sm:pb-10">
          <div className="flex flex-row items-center gap-2">
            <Badge variant="neon" className="py-0.5">
              <GiMetalPlate className="w-6 h-6 p-1" />
            </Badge>
            <Badge>Placas de Premiação</Badge>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              Nossas Premiações
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Conquiste suas metas e receba reconhecimento especial.
            </p>
          </div>
        </SlideUp>

        <SlideUp className="flex flex-col items-center justify-center sm:pb-30">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-6xl border-none"
          >
            <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4 border-none">
              {awards.map((award) => (
                <CarouselItem
                  key={award.id}
                  className="pl-1 sm:pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 border-none cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="relative group px-2 sm:px-0"
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => setIsPlaying(true)}
                  >
                    <div
                      className={`relative  rounded-lg ${award.className}  shadow-lg`}
                    >
                      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
                        <img
                          src={award.image}
                          alt={award.name}
                          className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>

                      {/* Overlay com informações */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent"></div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navegação adaptada para mobile */}
            <CarouselPrevious
              className="cursor-pointer hidden sm:flex bg-purple-600 border-purple-600 text-white hover:bg-purple-700 hover:border-purple-700"
              onClick={() => setIsPlaying(false)}
            />
            <CarouselNext
              className="cursor-pointer hidden sm:flex bg-purple-600 border-purple-600 text-white hover:bg-purple-700 hover:border-purple-700"
              onClick={() => setIsPlaying(false)}
            />

            {/* Indicadores para mobile */}
            <div className="flex justify-center mt-4 sm:hidden">
              <div className="flex gap-2">
                {awards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      api?.scrollTo(index);
                      setIsPlaying(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      current === index + 1
                        ? "bg-gradient-1 w-6"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Carousel>
        </SlideUp>
      </Section>
    </Container>
  );
}
