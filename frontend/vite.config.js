import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
          targets: [
            { src: '_redirects', dest: '' }
          ]
        })
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000",
            },
        },
    },
});
