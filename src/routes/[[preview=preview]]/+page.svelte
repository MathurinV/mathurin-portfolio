<script lang="ts">
	import { components } from '$lib/slices';
	import { SliceZone } from '@prismicio/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<div class="h-screen snap-y snap-mandatory overflow-y-scroll md:snap-proximity">
	<SliceZone slices={data.page.data.slices} {components} />
</div>
