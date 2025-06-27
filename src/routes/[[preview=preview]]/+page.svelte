<script lang="ts">
	import { components } from '$lib/slices';
	import { SliceZone } from '@prismicio/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<div class="h-screen snap-y snap-proximity overflow-y-scroll">
	<SliceZone slices={data.page.data.slices} {components} />
</div>
