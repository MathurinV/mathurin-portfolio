<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import type { Simplify } from '../../../prismicio-types';
	import { MyRichText } from '..';

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
		{#if isFilled.richText(carousel_item.description)}
			<div class="absolute inset-0 z-10 flex items-center justify-center p-4">
				<div class="bg-surface-50-950/80 rounded p-2">
					<MyRichText field={carousel_item.description} />
				</div>
			</div>
		{/if}
	</div>
</div>
