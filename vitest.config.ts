import { coverageConfigDefaults, defineConfig } from 'vitest/config'

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
        'src/test',
        'src/types.ts',
        'src/main.tsx',
        '**/__mocks__/**/*',
      ],
    },
    environment: 'jsdom',
    globals: true,
    mockReset: true,
    onConsoleLog(_log, type) {
      if (type === 'stderr')
        return false
    },
    reporters: 'verbose',
    setupFiles: './src/test/vitest.setup',
  },
})
