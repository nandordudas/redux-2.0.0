import { defineConfig } from 'vitest/config'

const { pathname: srcRoot } = new URL('./src/', import.meta.url)

export default defineConfig({
  resolve: {
    alias: {
      '~/': srcRoot,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    mockReset: true,
    reporters: 'verbose',
    setupFiles: './src/test/vitest.setup',
  },
})
