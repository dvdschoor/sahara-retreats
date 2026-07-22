// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.pilatesbylaar.com",
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  integrations: [sitemap()],
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
  vite: { plugins: [tailwindcss()] },
});
