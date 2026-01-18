import { useEffect, useRef } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

interface BackgroundVideoProps {
  className?: string;
}

export function BackgroundVideo({ className = "" }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY < 400;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Detecta se é iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    // Função para tentar reproduzir o vídeo
    const attemptPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch (error) {
        // Ignora erros silenciosamente
      }
    };

    // Tenta reproduzir quando o vídeo estiver carregado
    const handleCanPlay = () => {
      attemptPlay();
    };

    // Tenta reproduzir quando houver dados suficientes
    const handleLoadedData = () => {
      attemptPlay();
    };

    // Para iOS, tenta múltiplas vezes
    if (isIOS) {
      // Tenta imediatamente
      attemptPlay();

      // Tenta quando o vídeo estiver pronto
      video.addEventListener("canplay", handleCanPlay, { once: true });
      video.addEventListener("loadeddata", handleLoadedData, { once: true });

      // Tenta após interação do usuário (fallback)
      const handleUserInteraction = () => {
        attemptPlay();
      };

      document.addEventListener("touchstart", handleUserInteraction, {
        once: true,
      });
      document.addEventListener("click", handleUserInteraction, { once: true });
    } else {
      // Para outros dispositivos, tenta normalmente
      attemptPlay();
    }

    // Garante que o vídeo continue em loop
    const handleEnded = () => {
      video.currentTime = 0;
      attemptPlay();
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden z-0 ${className} ${isScrolled ? "block" : "hidden"}`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        {/* MOV para iOS (prioridade para compatibilidade) */}
        <source src="/ai-hero.mov" type="video/quicktime" />
        {/* WebM para navegadores modernos */}
        <source src="/ai-hero.webm" type="video/webm" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Overlay opcional para melhorar legibilidade do conteúdo */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4, 1, 6, 0.4), rgba(4, 1, 6, 0.4))",
        }}
      />
    </div>
  );
}
