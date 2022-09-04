import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			sass: true,
		})
	],

	kit: {
		adapter: adapter(),
		files: {
			assets: 'static',
			routes: 'src/routes',
			appTemplate: 'src/app.html',
			lib: 'src/lib'
		},
		moduleExtensions: ['.ts'],
		paths: {
			assets: '',
			base: ''
		}
	}
};

export default config;
