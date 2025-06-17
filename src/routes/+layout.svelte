<script lang="ts">
	import { repositoryName } from '$lib/prismicio';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import '@fontsource-variable/roboto';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	let { children } = $props();
</script>

<main>{@render children()}</main>
<PrismicPreview {repositoryName} />
