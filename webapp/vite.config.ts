import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: [
      '@trpc/server', // Исключаем серверную зависимость, чтобы она не попадала в клиентскую сборку
      '@trpc/server/observable',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        '@trpc/server', // Также можно исключить из финальной сборки
        '@trpc/server/observable',
      ],
    },
  },
  ssr: {
    noExternal: ['@trpc/client', '@trpc/react-query'], // важно для SSR, если используется
  },
});
