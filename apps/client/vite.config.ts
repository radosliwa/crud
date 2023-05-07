import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      exclude: ["**/node_modules/**", "**/dist/**"],
    },
    // @TODO - make it work with vuetify 3
    // deps: {
    //   inline: ["vuetify"],
    // },
    exclude: ["node_modules", "**/node_modules/**", "**/dist/**"],
  },
});
