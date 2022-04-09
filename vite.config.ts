import { defineConfig, normalizePath } from 'vite';
import { preprocess } from '@aurelia/plugin-conventions';
// import typescript from 'rollup-plugin-typescript2';
import path from 'path';

export default defineConfig({
	plugins: [ au2() ]
});

function au2() {
	return {
		name: 'au2',
		enforce: 'pre',
		transform(src, id) {
			if (id.includes('node_modules')) return;
			if (id.endsWith('.html') || id.endsWith('.ts')) {
				const result = preprocess({
					path: normalizePath(path.relative(process.cwd(), id)),
					contents: src
				}, {})
				return result;
			}
		}
	}
}
