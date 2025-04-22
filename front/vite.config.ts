import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const devMode = env.NODE_ENV !== 'production';
	const baseURL = env.REACT_APP_API_URL;

	return {
		plugins: [react(), svgr()],

		build: {
			target: 'es2015',
			outDir: 'dist',
			minify: 'esbuild',
			chunkSizeWarningLimit: 500,
			sourcemap: devMode,
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['react', 'react-dom', 'react-router-dom'],
					},
				},
			},
		},

		server: {
			open: true,
			host: '0.0.0.0',
			port: 3000,
			proxy: {
				'/api': {
					target: baseURL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},

		resolve: {
			alias: {
				'@App': path.resolve(__dirname, 'src/App.tsx'),
				'@api': path.resolve(__dirname, 'src/api'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@context': path.resolve(__dirname, 'src/context'),
				'@hooks': path.resolve(__dirname, 'src/hooks'),
				'@layouts': path.resolve(__dirname, 'src/layouts'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@store': path.resolve(__dirname, 'src/store'),
				'@utils': path.resolve(__dirname, 'src/utils'),
			},
		},

		define: {
			'process.env': {
				NODE_ENV: JSON.stringify(mode),
				REACT_APP_API_URL: devMode ? '/api' : baseURL,
			},
		},
	};
});
