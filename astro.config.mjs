import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bluebu-dev.github.io',
  base: '/lamplbruderschaft',

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});