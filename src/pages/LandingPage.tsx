import { Hero } from "@landing/Hero";
import { About } from "@landing/About";
import { Awards } from "@landing/Awards";
import { Faq } from "@landing/Faq";
import { Footer } from "@landing/Footer";
import { Taxes } from "@landing/Taxes";
import { GLobe } from "@landing/GLobe";
import { Benefits } from "@landing/Benefits";
import { Trip } from "@landing/Trip";
export function LandingPage() {
  return (
    <main className="flex flex-col w-screen h-auto bg-[#040106] scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-200">
      <Hero />
      <About />
      <Awards />
      <Taxes />
      <Trip />
      <Benefits />
      <GLobe />
      <Faq />
      <Footer />
      <style>{`  

*::-webkit-scrollbar { width: 5px;  height: 0px;  }
*::-webkit-scrollbar-track { background: var(--track); }
*::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--thumb-start), var(--thumb-end));
  border-radius: 8px;
}
*::-webkit-scrollbar-thumb:hover { background: var(--thumb-hover); }
      `}</style>
    </main>
  );
}
