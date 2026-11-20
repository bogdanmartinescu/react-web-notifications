import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: 'src/react-web-notifications.tsx',
	format: ['esm', 'cjs'],
	platform: 'neutral',
	target: 'es2020',
	cjsDefault: false,
	dts: true,
	sourcemap: true,
	banner: { js: "'use client';" },
	exports: {
		// Deep import paths published by 1.x.
		customExports(exports) {
			exports['./dist/react-web-notifications.js'] = './dist/react-web-notifications.js';
			exports['./dist/react-web-notifications.es.js'] = './dist/react-web-notifications.mjs';
			return exports;
		}
	},
	publint: true,
	attw: true
});
