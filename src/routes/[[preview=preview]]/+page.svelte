<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import type { PageProps } from './$types';
	import { AnimatedBackground } from '$lib/components';

	const { data }: PageProps = $props();
</script>

<AnimatedBackground />
<SliceZone slices={data.page.data.slices} {components} />
