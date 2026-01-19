import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiMenu, HiX } from "react-icons/hi";
import { ROUTES_PUBLIC } from "@/constants/routes";
import { isMobileOs } from "@/hooks/useMobile";

interface MobileMenuProps {
  isScrolled: boolean;
}

export function MobileMenu({ isScrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobileOS = isMobileOs();

  const menuItems = [
    { href: "#features", label: "Quem Somos" },
    { href: "#pricing", label: "Diferenciais" },
    { href: "#about", label: "Premiações" },
    { href: "#about", label: "Dúvidas" },
  ];

  return (
    <div className="md:hidden">
      {/* Botão do menu */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 text-white rounded-lg transition-colors ${
          isScrolled ? "hover:bg-gray-700/50" : "hover:bg-white/10"
        }`}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </motion.button>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={`transition-all duration-300 absolute top-full left-0 right-0 border-b backdrop-blur-md sm:backdrop-blur-none`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              background: isMobileOS
                ? "rgba(4, 1, 6, 0.8)"
                : "rgba(4, 1, 6, 0.8)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="px-6 py-4 space-y-4">
              {/* Links do menu */}
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Divisor */}
              <div
                className="border-t border-gray-700/50 my-4"
                style={{
                  borderColor: isScrolled
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.05)",
                }}
              />

              {/* Botões de ação mobile */}
              <div className="flex flex-col gap-3 pt-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="outline"
                    className={`w-full transition-all rounded-full duration-300`}
                    onClick={() => {
                      window.location.href = ROUTES_PUBLIC.LOGIN;
                    }}
                  >
                    Login
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    className="w-full rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      window.location.href = ROUTES_PUBLIC.REGISTER;
                    }}
                  >
                    Seja Olympus
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
