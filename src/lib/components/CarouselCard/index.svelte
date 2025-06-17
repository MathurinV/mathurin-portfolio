<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import type { Simplify } from '../../../prismicio-types';

	const carousel_item: Simplify<Content.CarouselSliceDefaultPrimaryCarouselGroupItem> = $props();
</script>

<div class="flex flex-col items-center gap-1 px-2">
	<div class="inline-flex items-center font-mono text-xl">
		<PrismicLink field={carousel_item.media_link} class="hover:underline" />
		<span class="ml-1 animate-pulse">_</span>
	</div>
	<div class="relative">
		<img
			src={carousel_item.image.url}
			alt={carousel_item.image.alt}
			width="256"
			class="svg-primary"
		/>
		{#if carousel_item.description && carousel_item.description.length > 0}
			<div class="absolute inset-0 z-10 flex items-center justify-center p-4">
				<div class="bg-surface-50-950/80 rounded p-2">
					<PrismicRichText field={carousel_item.description} />
				</div>
			</div>
		{/if}
	</div>
</div>
