import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        packetbreaker: resolve(__dirname, 'packetbreaker.html'),
        kiyoto: resolve(__dirname, 'kiyoto.html'),
      },
    },
  },
});
