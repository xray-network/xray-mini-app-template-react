import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import wasm from "vite-plugin-wasm"
import svgr from "vite-plugin-svgr"
import packageInfo from "./package.json"
import { fileURLToPath } from "node:url"

export default defineConfig({
  plugins: [wasm(), tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
  define: {
    __APP_VERSION__: JSON.stringify(packageInfo.version),
  },
  // CSS imports are not resolved by vite-tsconfig-paths, so keep the alias for stylesheets.
  resolve: {
    alias: { "@": fileURLToPath(new URL("./app", import.meta.url)) },
  },
  ssr: {
    // The SDK's ESM dist uses extensionless relative imports, so it must be
    // bundled rather than left external to Node's ESM resolver
    noExternal: ["@xray-network/mini-app-sdk"],
  },
})
