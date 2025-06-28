import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
   plugins: [react()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      include: ['src/**/*.test.{ts,tsx}'],
      exclude: [
         '**/node_modules/**',
         '**/dist/**',
         '**/*.stories.*',
         '**/example/**',
         '**/storybook-static/**',
      ],
      coverage: {
         exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/*.stories.*',
            '**/example/**',
            '**/storybook-static/**',
         ],
      },
   },
});
