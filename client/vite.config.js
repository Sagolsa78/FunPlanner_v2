import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/', // ✅ fine for Vercel or root domain
  plugins: [
    react(),       // ✅ React with SWC
    tailwindcss(), // ✅ Tailwind plugin
    svgr(),        // ✅ SVG import as React components
  ],
});
