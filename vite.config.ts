import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    sourcemap: false,
  },
});
