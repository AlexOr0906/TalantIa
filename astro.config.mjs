import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dety74.ru',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
