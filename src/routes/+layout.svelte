<script lang="ts">
	import '../app.css';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { repositoryName } from '$lib/prismicio';

	let { children } = $props();
</script>

<main>{@render children()}</main>
<PrismicPreview {repositoryName} />
