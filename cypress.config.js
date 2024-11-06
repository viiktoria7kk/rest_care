import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import codeCoverageTask from '@cypress/code-coverage/task.js';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        // Add your Vite configuration here if needed
      },
    },
    specPattern: ['src/**/*.cy.{js,jsx}'],
    setupNodeEvents(on, config) {
      // component testing node events setup code
      // https://docs.cypress.io/guides/tooling/code-coverage
      codeCoverageTask(on, config);

      on('file:preprocessor', vitePreprocessor());

      return config;
    },
    viewportWidth: 1366,
    viewportHeight: 768,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});