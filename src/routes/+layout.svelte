<script lang="ts">
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { repositoryName } from '$lib/prismicio';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import '@fontsource-variable/roboto';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	import { AnimatedBackground } from '$lib/components';

	let { children } = $props();

	injectSpeedInsights();
</script>

<AnimatedBackground />
<main>{@render children()}</main>
<PrismicPreview {repositoryName} />
