import React from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const { pathname: configRoot } = new URL('./config/', import.meta.url)
const { pathname: srcRoot } = new URL('./src/', import.meta.url)

export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: {
      '~/': srcRoot,
    },
  },
  server: {
    https: {
      cert: `${configRoot}localhost.pem`,
      key: `${configRoot}localhost-key.pem`,
    },
  },
})
