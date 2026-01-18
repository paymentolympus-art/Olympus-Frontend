import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type TermsDocument =
  | "privacy-buyers"
  | "privacy-site"
  | "privacy-sellers"
  | "ethics"
  | "antifraud"
  | "cookies"
  | "aml"
  | "security"
  | "general-terms"
  | "terms-consumers";

interface TermsSidebarProps {
  activeDocument: TermsDocument;
  onDocumentChange: (document: TermsDocument) => void;
}

const documents: { id: TermsDocument; name: string }[] = [
  { id: "privacy-buyers", name: "Aviso de Privacidade (Compradores)" },
  { id: "privacy-site", name: "Aviso de Privacidade (Site)" },
  { id: "privacy-sellers", name: "Aviso de Privacidade (Vendedores)" },
  { id: "ethics", name: "Código de Ética" },
  { id: "antifraud", name: "Política Antifraude" },
  { id: "cookies", name: "Política de Cookies" },
  { id: "aml", name: "Prevenção à Lavagem de Dinheiro" },
  { id: "security", name: "Política de Segurança" },
  { id: "general-terms", name: "Termos Gerais" },
  { id: "terms-consumers", name: "Termos de Uso (Consumidores)" },
];

export function TermsSidebar({
  activeDocument,
  onDocumentChange,
}: TermsSidebarProps) {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <nav>
        <ul className="space-y-1">
          {documents.map((doc) => (
            <li key={doc.id}>
              <motion.button
                onClick={() => onDocumentChange(doc.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-sm text-sm transition-all duration-200",
                  "hover:bg-purple-500/10 hover:text-white",
                  activeDocument === doc.id
                    ? "bg-gradient-to-r from-purple-600/30 to-primary/30 text-white font-medium hover:text-white"
                    : "text-gray-400"
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {doc.name}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
