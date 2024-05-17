import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
      alias: {
          '@shared': resolve(__dirname, '../shared_resources'),
          '@components': resolve(__dirname, 'src/components'),
          '@stores': resolve(__dirname, 'src/stores'),
          '@screens': resolve(__dirname, 'src/screens'),
          '@assets': resolve(__dirname, 'src/assets')
      }
  }
})
