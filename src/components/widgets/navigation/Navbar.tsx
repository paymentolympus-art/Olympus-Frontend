import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MobileMenu } from "./MobileMenu";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { ROUTES_PUBLIC } from "@/constants/routes";
import { MdLogin } from "react-icons/md";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { isMobileOs } from "@/hooks/useMobile";

export function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 10;
  const isMobileOS = isMobileOs();
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        isScrolled
          ? "backdrop-blur-md border-b-[1px] border-gray-800"
          : "backdrop-blur-sm sm:backdrop-blur-none sm:bg-transparent border-b border-gray-100/10 sm:border-none"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: isMobileOS
          ? "rgba(4, 1, 6, 0.8)"
          : isScrolled
            ? "rgba(4, 1, 6, 0.8)"
            : "transparent",
        // regra da cor de borda do navbar
        borderColor: isScrolled
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="max-w-[76rem] mx-auto px-4 py-4 ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 sm:pr-28"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Ícone do pássaro estilizado */}
            <div className="relative">
              <div className="w-full h-10 bg-transparent rounded-lg flex items-center justify-center">
                <img
                  src="/icons/logo.png"
                  alt="Logo"
                  className="w-full h-12"
                  style={{ width: isMobileOS ? "170px" : "100%" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Menu de navegação desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Quem Somos
            </motion.a>
            <motion.p className="text-gray-300 text-2xl">·</motion.p>
            <motion.a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Diferenciais
            </motion.a>
            <motion.p className="text-gray-300 text-2xl">·</motion.p>
            <motion.a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Premiações
            </motion.a>
            <motion.p className="text-gray-300 text-2xl">·</motion.p>
            <motion.a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Dúvidas
            </motion.a>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center gap-4">
            {/* Botões desktop */}
            <div className="hidden md:flex items-center gap-4">
              {/* Botão Login */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className={`transition-all rounded-full duration-300 cursor-pointer has-[>svg]:px-5 ${
                    isScrolled
                      ? "border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
                      : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                  }`}
                  onClick={() => {
                    window.location.href = ROUTES_PUBLIC.LOGIN;
                  }}
                >
                  <MdLogin className="w-6 h-6 cursor-pointer text-white" />
                  Fazer login
                </Button>
              </motion.div>

              {/* Botão Criar Conta */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 has-[>svg]:px-5"
                  onClick={() => {
                    window.location.href = ROUTES_PUBLIC.REGISTER;
                  }}
                >
                  Seja Insane
                  <BsArrowRightCircleFill className="w-6 h-6 cursor-pointer text-white/70" />
                </Button>
              </motion.div>
            </div>

            {/* Menu mobile */}
            <MobileMenu isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
