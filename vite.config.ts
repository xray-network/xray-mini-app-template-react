import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import wasm from "vite-plugin-wasm"
import svgr from "vite-plugin-svgr"
import path from "path"

export default defineConfig({
  plugins: [wasm(), tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
  ssr: {
    // The SDK's ESM dist uses extensionless relative imports, so it must be
    // bundled rather than left external to Node's ESM resolver
    noExternal: ["@xray-network/mini-app-sdk"],
  },
})
