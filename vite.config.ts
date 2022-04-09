import { defineConfig, PluginOption } from 'vite';
import { preprocess } from '@aurelia/plugin-conventions';
import { createFilter } from '@rollup/pluginutils';

export default defineConfig({
	plugins: [ au2({ include: 'src/**/*.{ts,html}' }) ]
});

function au2(options = {}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: 'au2',
		enforce: 'pre',
		transform(code: string, id: string) {
			if (!filter(id)) return;
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
	} as PluginOption;
}
