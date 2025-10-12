import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        daily: resolve(__dirname, 'daily.html'),
        card: resolve(__dirname, 'card.html'),
        monthly: resolve(__dirname, 'monthly.html'),
        week: resolve(__dirname, 'week.html'),
        cardView: resolve(__dirname, 'card-view.html'),
      },
    },
  },
});

