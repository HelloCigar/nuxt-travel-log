import tailwindcss from "@tailwindcss/vite";
import "./lib/env";
import env from "./lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true, componentInspector: false },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-csurf",
    "nuxt-maplibre",
  ],
  colorMode: {
    dataValue: "theme",
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  runtimeConfig: {
    public: {
      s3BucketUrl: env.S3_BUCKET_URL
    }
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["maplibre-gl"],
    },
    server: {
      watch: {
        ignored: ["./docker-data/*"]
      }
    }
  },
  icon: {
    serverBundle: "local",
  },
  build: {
    transpile: ["zod"],
  },
});
