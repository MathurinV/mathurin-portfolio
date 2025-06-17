<script lang="ts">
	import { repositoryName } from '$lib/prismicio';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import '../app.css';
	let { children } = $props();
</script>

<main>{@render children()}</main>
<PrismicPreview {repositoryName} />
