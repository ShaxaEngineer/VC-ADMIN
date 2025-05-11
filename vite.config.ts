import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  envPrefix: 'VITE_',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [react(), svgr({ include: '**/*.svg?react' })],
});
