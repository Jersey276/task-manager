import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import lightningcss from "vite-plugin-lightningcss";
import { browserslistToTargets, Features } from "lightningcss";
import browserslist from "browserslist";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), lightningcss()],
  css: {
    devSourcemap: true,
    lightningcss: {
      targets: browserslistToTargets(browserslist([">0.25%", "not dead"])),
      include: Features.Nesting,
    },
  },
  build: {
    cssMinify: "lightningcss",
  },
});
