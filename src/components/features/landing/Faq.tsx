import Section from "@/components/widgets/wrappers/section";
import Container from "@/components/widgets/wrappers/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { FaQuoteLeft } from "react-icons/fa";
import { SlideUp } from "@/components/animations/slide-up";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question:
      "Quanto tempo demora para o meu cadastro ser aprovado na plataforma?",
    answer:
      "Após finalizar o cadastro e salvar as informações, nossa equipe fará uma análise detalhada para confirmar a veracidade dos dados e documentos enviados. O prazo para essa análise é de até 24 horas úteis.",
  },
  {
    question: "Quanto tempo demora para aprovar meu produto?",
    answer:
      "Na InsanePay, a aprovação de produtos é rápida e sem complicações. Em até 24 horas úteis, tudo pode estar pronto para você começar a vender.",
  },
  {
    question: "A InsanePay oferece suporte técnico?",
    answer:
      "Sim, oferecemos suporte técnico 24/7. Nossa equipe está sempre disponível para ajudar com qualquer dúvida ou problema que você possa ter. Entre em contato conosco através do chat, email ou telefone.",
  },
  {
    question: "Quais são os métodos de pagamento aceitos?",
    answer:
      "Aceitamos todos os principais métodos de pagamento: cartões de crédito e débito, PIX, boleto bancário e transferências. Nossa plataforma é compatível com as principais bandeiras do mercado.",
  },
  {
    question: "Como funciona a segurança dos dados?",
    answer:
      "Utilizamos as mais avançadas tecnologias de criptografia e segurança para proteger seus dados. Somos certificados pelos principais padrões de segurança do mercado e seguimos rigorosamente as diretrizes do Banco Central.",
  },
];

export function Faq() {
  return (
    <Container className="flex flex-col h-auto w-screen relative bg-[#040106] py-10 sm:py-20 z-20">
      <Section className="py-20 flex flex-col sm:flex-row">
        <SlideUp className="flex flex-col gap-2 items-start justify-start pb-10 flex-1">
          <div className="flex flex-row items-center gap-2">
            <Badge variant="neon">
              <FaQuoteLeft className="w-5 h-5 p-1" />
            </Badge>
            <Badge>Dúvidas Frequentes</Badge>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h1
              className={cn(
                "text-2xl md:text-4xl font-extrabold mb-1 sm:mb-2",
                "bg-linear-to-r from-white via-white to-white bg-clip-text text-transparent"
              )}
            >
              Perguntas Frequentes
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Tire suas dúvidas sobre nossos serviços e funcionalidades.
            </p>
          </div>
        </SlideUp>

        <SlideUp className="max-w-4xl mx-auto flex-1">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className={cn(
                    "cursor-pointer backdrop-blur-md border border-neutral-900 rounded-lg px-6 py-4 transition-all duration-300",
                    "data-[state=open]:bg-gradient-to-r data-[state=open]:to-[#D50491] data-[state=open]:from-[#8c0fa9]   data-[state=open]:border-primary/30"
                  )}
                >
                  <AccordionTrigger className=" text-left text-white font-semibold text-lg hover:text-[#EBDBFB] hover:no-underline transition-colors [&[data-state=open]]:text-[#EBDBFB]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-base leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </SlideUp>
      </Section>
    </Container>
  );
}
