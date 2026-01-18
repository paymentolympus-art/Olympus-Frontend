import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
const port = process.env.PORT || 8080;

// https://vite.dev/config/
export default defineConfig({
  server: {
    // allowedHosts: ["purple-pumas-prove.loca.lt"],
    host: "::",
    port: Number(port),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@features": path.resolve(__dirname, "./src/components/features"),
      "@landing": path.resolve(__dirname, "./src/components/features/landing"),
      "@checkout": path.resolve(__dirname, "./src/checkout"),
      "@checkout-layout": path.resolve(__dirname, "./src/checkout/layout"),
    },
  },
});
