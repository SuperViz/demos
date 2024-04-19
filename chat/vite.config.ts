import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsConfigPaths()],
	base: './',
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
			},
			output: {
				dir: 'dist',
				entryFileNames: 'whiteboard.js',
				chunkFileNames: 'chunk.js',
				manualChunks: undefined,
			},
		},
	},
})
