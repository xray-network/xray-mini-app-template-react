import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import wasm from "vite-plugin-wasm"
import svgr from "vite-plugin-svgr"
import { fileURLToPath } from "node:url"

export default defineConfig({
  plugins: [wasm(), tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
  // CSS imports are not resolved by vite-tsconfig-paths, so keep the alias for stylesheets.
  resolve: {
    alias: { "@": fileURLToPath(new URL("./app", import.meta.url)) },
  },
  ssr: {
    // Bundle the locally linked XRAY runtime for React Router's Node renderer.
    noExternal: [/^@xray-network\/xray-js(?:\/|$)/],
  },
})
