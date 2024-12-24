<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
>>>>>>> 0ea9d96b983c8d309ca22e86b7702c8d457710e3

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})

