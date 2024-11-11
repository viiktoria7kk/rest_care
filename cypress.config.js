import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import codeCoverageTask from '@cypress/code-coverage/task.js';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
      },
    },
    specPattern: ['src/**/*.cy.{js,jsx}'],
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);

      on('file:preprocessor', vitePreprocessor());

      return config;
    },
    viewportWidth: 1366,
    viewportHeight: 768,
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
    },
  },
});