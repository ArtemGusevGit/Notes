import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { createVuePlugin as vue2 } from "vite-plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/NotesApp/',
  plugins: [
    vue2({
      jsx: true,
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      vue: "vue/dist/vue.esm.js",
    },
  },
  build: {
    brotliSize: false, // unsupported in StackBlitz
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss"; @import "@/assets/styles/mixins.scss";`,
      },
    },
  },
});
