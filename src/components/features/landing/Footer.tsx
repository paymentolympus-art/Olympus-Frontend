import Container from "@/components/widgets/wrappers/container";
import Section from "@/components/widgets/wrappers/section";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { isMobileOs } from "@/hooks/useMobile";

const footerLinks = {
  menu: [
    { name: "Quem Somos", href: "#" },
    { name: "Diferenciais", href: "#" },
    { name: "Premiações", href: "#" },
  ],
  policies: [
    { name: "Nossos Termos", href: "/termos?doc=general-terms" },
    { name: "Política de Privacidade", href: "/termos?doc=privacy-site" },
  ],
  contact: [{ name: "Central de Ajuda", href: "#" }],
};

export function Footer() {
  const isMobileOS = isMobileOs();
  return (
    <Container
      className={cn(
        "md:rounded-t-6xl relative w-full bg-[#040106] mx-auto flex flex-col items-center justify-center px-6 py-12 lg:py-16 border-t border-neutral-900",
        "bg-[radial-gradient(35%_128px_at_50%_100%,#530462_0%,rgba(213,4,145,0.4)_40%,rgba(213,4,145,0.15)_80%,transparent_100%)]"
      )}
    >
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />
      <Section className="py-12 sm:py-16 px-6 sm:px-0">
        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Coluna 1 - Logo e Descrição */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative">
                <div className="w-full h-10 bg-transparent rounded-lg flex items-center justify-center">
                  <img
                    src="/icons/logo.png"
                    alt="InsanePay Logo"
                    className="w-full h-10"
                    style={{ width: isMobileOS ? "140px" : "100%" }}
                  />
                </div>
              </div>
            </motion.div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Uma plataforma completa para maximizar conversões e simplificar
              sua operação de pagamentos.
            </p>
          </div>

          <div className="flex col-span-3 flex-col sm:flex-row gap-10 justify-end">
            {/* Coluna 2 - Menu */}
            <div className="lg:col-span-1">
              <h3 className="text-gray-400 font-light text-sm mb-4">
                Navegação
              </h3>
              <ul className="space-y-3">
                {footerLinks.menu.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-white hover:text-white transition-colors duration-200 text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3 - Políticas e Termos */}
            <div className="lg:col-span-1">
              <h3 className="text-gray-400 font-light text-sm mb-4">
                Transparência
              </h3>
              <ul className="space-y-3">
                {footerLinks.policies.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-white hover:text-white transition-colors duration-200 text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 4 - Fale Conosco */}
            <div className="lg:col-span-1">
              <h3 className="text-gray-400 font-light text-sm mb-4">
                Fale Conosco
              </h3>
              <ul className="space-y-3">
                {footerLinks.contact.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-white hover:text-white transition-colors duration-200 text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-neutral-900 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 - InsanePay - Todos os direitos reservados
            </div>

            {/* Desenvolvido por */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Desenvolvido por</span>
              <motion.div
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="/icons/logo-icon.png"
                  alt="InsanePay Logo"
                  className="w-10 h-10 text-purple-100"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
