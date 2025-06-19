<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<div class="h-screen snap-y snap-mandatory overflow-y-scroll">
	<SliceZone slices={data.page.data.slices} {components} />
</div>
