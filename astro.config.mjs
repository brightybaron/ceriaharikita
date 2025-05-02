// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap, {
  ChangeFreqEnum as EnumChangeFrequency,
} from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.ceriaharikita.com",

  integrations: [
    react(),
    // Sitemap integration with homepage priority
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => page.startsWith("https://www.ceriaharikita.com"),
      serialize(item) {
        // Check if this is the homepage
        const isHomepage =
          item.url === "https://www.ceriaharikita.com/" ||
          item.url === "https://www.ceriaharikita.com";

        // Set higher priority for homepage
        if (isHomepage) {
          return {
            ...item,
            priority: 1.0,
            changefreq: EnumChangeFrequency.MONTHLY, // Homepage updates more frequently
          };
        }

        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
  // output: "static",
  adapter: vercel(),
});
