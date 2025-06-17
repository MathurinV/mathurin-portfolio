import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { qrcode } from 'vite-plugin-qrcode';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), qrcode()],
	server: {
		fs: {
			allow: ['./slicemachine.config.json']
		},
		host: '0.0.0.0'
	}
});
