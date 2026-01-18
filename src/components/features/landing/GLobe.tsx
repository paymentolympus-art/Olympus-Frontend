import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import Container from "@/components/widgets/wrappers/container";
import Section from "@/components/widgets/wrappers/section";
import { Button } from "@/components/ui/button";
import { ROUTES_PUBLIC } from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import { FaGlobeAmericas } from "react-icons/fa";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { SlideUp } from "@/components/animations/slide-up";

// Função auxiliar para converter hex para RGB normalizado (0-1)
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

export function GLobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    const canvas = canvasRef.current;

    const getCanvasSize = () => {
      if (canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        return {
          width: Math.min(rect.width, 500) * 2,
          height: Math.min(rect.height, 500) * 2,
        };
      }
      return { width: 1000, height: 1000 };
    };

    const initialSize = getCanvasSize();
    canvas.width = initialSize.width;
    canvas.height = initialSize.height;

    // Cores do globo - você pode alterar essas cores facilmente
    const globeBaseColor = "#530462"; // Cor interna/base do globo
    const markerColor = "#D50491"; // Cor dos marcadores
    const glowColor = "#D50491"; // Cor do brilho/glow

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: initialSize.width,
      height: initialSize.height,
      phi: 0,
      theta: 0,
      dark: 1, // 0 = claro, 1 = escuro (ajuste para controlar a escuridão interna)
      diffuse: 1.2, // Difusão da luz (valores maiores = mais brilho interno)
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 6, // Brilho do mapa (valores maiores = mais brilho)
      baseColor: hexToRgb(globeBaseColor), // Cor interna do globo
      markerColor: hexToRgb(markerColor), // Cor dos marcadores
      glowColor: hexToRgb(glowColor), // Cor do brilho
      offset: [0, 0],
      markers: [
        // América do Norte
        {
          location: [37.7749, -122.4194],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // San Francisco
        {
          location: [40.7128, -74.006],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // New York
        // Europa
        {
          location: [51.5074, -0.1278],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // London
        {
          location: [48.8566, 2.3522],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // Paris
        // Ásia
        {
          location: [35.6762, 139.6503],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // Tokyo
        {
          location: [22.3193, 114.1694],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // Hong Kong
        // América do Sul
        {
          location: [-23.5505, -46.6333],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // São Paulo
        {
          location: [-34.6037, -58.3816],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // Buenos Aires
        // África
        {
          location: [-33.9249, 18.4241],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // Cape Town
        // Oceania
        {
          location: [-33.8688, 151.2093],
          size: 0.06,
          color: hexToRgb(markerColor),
        }, // Sydney
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    const handleResize = () => {
      const newSize = getCanvasSize();
      canvas.width = newSize.width;
      canvas.height = newSize.height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      globe.destroy();
    };
  }, []);

  return (
    <Container className="w-full pt-20 sm:pt-32 pb-20 sm:pb-24 bg-[#040106] z-20">
      <Section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Conteúdo de texto à esquerda */}
        <div className="flex-1 flex flex-col gap-0 text-center lg:text-left justify-center items-center sm:items-start">
          <SlideUp className="flex flex-row items-center gap-2">
            <Badge variant="neon">
              <FaGlobeAmericas className="w-5 h-5" />
            </Badge>
            <Badge>Ao vivo</Badge>
          </SlideUp>
          <SlideUp>
            <h2 className="text-2xl sm:text-4xl font-bold text-white pt-2">
              Visualizações em tempo real
            </h2>
          </SlideUp>
          <SlideUp>
            <p className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
              Acompanhe suas vendas em tempo real, em qualquer lugar do mundo.
            </p>
          </SlideUp>
          <div className="flex justify-center lg:justify-start mt-4">
            <Button
              className="rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 has-[>svg]:px-5"
              onClick={() => {
                window.location.href = ROUTES_PUBLIC.REGISTER;
              }}
            >
              <span className="text-white cursor-pointer">Seja Insane</span>
              <BsArrowRightCircleFill className="w-6 h-6 cursor-pointer text-white/70" />
            </Button>
          </div>
        </div>

        {/* Globo à direita */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-[500px] aspect-square">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "500px",
                maxHeight: "500px",
              }}
            />
          </div>
        </div>
      </Section>
    </Container>
  );
}
