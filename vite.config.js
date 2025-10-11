import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        card: resolve(__dirname, 'card.html'),
        week: resolve(__dirname, 'week.html'),
        cardView: resolve(__dirname, 'card-view.html'),
      },
    },
  },
});

