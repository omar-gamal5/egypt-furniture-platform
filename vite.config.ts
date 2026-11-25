import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Must match the GitHub repository name, because GitHub Pages serves the app
// from https://<user>.github.io/<repo>/. Change this if the repo is renamed.
const REPO_NAME = 'egypt-furniture-platform';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // The dev server stays at "/", production builds are served from the repo sub-path.
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // index.html is the app entry; 404.html is an identical copy that GitHub
      // Pages serves for deep links (e.g. /explore), so client-side routing works.
      input: {
        main: 'index.html',
        notFound: '404.html',
      },
    },
  },
}));
