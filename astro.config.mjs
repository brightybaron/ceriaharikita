// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://ceriaharikita.com",

  integrations: [
    react(),
    // Add sitemap integration
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
    // Add robots.txt integration
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin/", "/*.json"],
        },
      ],
      sitemap: true,
      host: "https://ceriaharikita.com",
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
  // output: "static",
  adapter: vercel(),
});
