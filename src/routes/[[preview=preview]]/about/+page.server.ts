import { createClient } from '$lib/prismicio';
import type { PageServerLoad, EntryGenerator } from './$types';

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });

	const page = await client.getSingle('about');

	return {
		page
	};
};

export const entries: EntryGenerator = async () => {
	return [{}];
};
