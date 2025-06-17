<script lang="ts">
	import { repositoryName } from '$lib/prismicio';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();
	onMount(() => injectAnalytics());
</script>

<main>{@render children()}</main>
<PrismicPreview {repositoryName} />
