import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/sprites': {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
      },
      '/graphql': {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: 'index.html',
        },
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          // Add more custom chunks as needed
        },
      },
    },
    chunkSizeWarningLimit: 2000, // Adjust the limit to a higher value (in kB)
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
});