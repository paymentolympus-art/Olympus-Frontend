import { Link } from "react-router-dom";
import { HiHome, HiArrowLeft } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { ROUTES_PUBLIC, ROUTES_PRIVATE } from "@/constants/routes";

export function NotFoundPage() {
  return (
    <main className="flex flex-col w-screen min-h-screen h-full overflow-y-auto bg-[#040106] justify-center items-center px-4">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-2xl">
        {/* 404 Number with gradient */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-b from-purple-500 via-[#D50491] to-[#EBDBFB] text-transparent bg-clip-text leading-none">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-purple-500/20 blur-2xl">
            404
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Página não encontrada
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Oops! A página que você está procurando não existe ou foi movida.
            Vamos te ajudar a encontrar o que você precisa.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            asChild
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Link
              to={ROUTES_PUBLIC.LANDING}
              className="flex items-center gap-2"
            >
              <HiHome className="w-5 h-5" />
              Voltar ao Início
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            <Link
              to={ROUTES_PRIVATE.DASHBOARD}
              className="flex items-center gap-2"
            >
              <HiArrowLeft className="w-5 h-5" />
              Ir para Dashboard
            </Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
    </main>
  );
}
