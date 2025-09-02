// vite.config.ts / vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const allowed = ["pmechat.memt.com.br", "localhost", "127.0.0.1"];

export default defineConfig(({ mode }) => ({
  server: {
    host: true,                         // 0.0.0.0
    port: Number(process.env.PORT) || 8080,
    strictPort: true,
    allowedHosts: allowed,              // << autoriza seu domínio
    // se estiver acessando via HTTPS no NPM, isso ajuda o HMR em dev:
    hmr: mode === "development" ? {
      host: "pmechat.memt.com.br",
      protocol: "wss",
      clientPort: 443
    } : undefined
  },
  // se você usar `npm run preview` em produção:
  preview: {
    host: true,
    port: Number(process.env.PORT) || 8080,
    strictPort: true
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  }
}));
