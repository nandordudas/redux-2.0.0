import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'

const { pathname: srcRoot } = new URL('./src/', import.meta.url)

export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: {
      '~/': srcRoot,
    },
  },
})
