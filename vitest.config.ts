import { coverageConfigDefaults, defaultExclude, defineConfig } from 'vitest/config'

const { pathname: srcRoot } = new URL('./src/', import.meta.url)

export default defineConfig({
  resolve: {
    alias: {
      '~/': srcRoot,
    },
  },
  test: {
    coverage: {
      all: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/__mocks__/**/*',
        'src/main.tsx',
        'src/test',
        'src/types.ts',
        'src/mocks/**',
        '**/mockServiceWorker.js',
        'playwright.config.ts',
      ],
    },
    environment: 'jsdom',
    exclude: [
      ...defaultExclude,
      'tests/playwright/**/*',
    ],
    globals: true,
    mockReset: true,
    reporters: 'verbose',
    setupFiles: './src/test/vitest.setup',
  },
})
