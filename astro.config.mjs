// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.ceriaharikita.com",

  integrations: [
    react(),
    // Add sitemap integration
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => page.startsWith("https://www.ceriaharikita.com"),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
  // output: "static",
  adapter: vercel(),
});
