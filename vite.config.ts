import { defineConfig, PluginOption } from 'vite';
import { preprocess } from '@aurelia/plugin-conventions';

export default defineConfig({
	plugins: [ au2() ]
});

function au2() {
	return {
		name: 'au2',
		enforce: 'pre',
		transform(code: string, id: string) {
			if (id.includes('node_modules')) return;
			if (id.endsWith('.html') || id.endsWith('.ts')) {
				const result = preprocess({
					path: id,
					contents: code
				}, {})
				return result;
				// const part = {
				// 	code: result.code,
				// 	// https://rollupjs.org/guide/en/#source-code-transformations
				// 	// Rollup doc says rollup only needs mappings,
				// 	// but this does not work inside Vite.
				// 	// Might be Vite did not expect there is incoming sourcemap
				// 	// before Vite's core plugins.
				// 	map: { mappings: result.map.mappings }
				// };
				// console.log(part);
				// return part;
			}
		}
	} as PluginOption;
}
