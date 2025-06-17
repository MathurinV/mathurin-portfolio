<script lang="ts">
	import { CarouselCard } from '$lib/components';
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.CarouselSlice>;

	const { slice }: Props = $props();

	function scrollToItem(index: number) {
		const container = document.getElementById('carousel-container');
		if (container) {
			const items = container.children;
			if (items[index]) {
				items[index].scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center'
				});
			}
		}
	}
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="mx-auto w-full max-w-2xl p-4"
>
	<!-- Carousel Title -->
	<h2 class="text-secondary-500 mb-6 text-center text-4xl font-bold">
		{slice.primary.title}
	</h2>

	<!-- Carousel Container -->
	<div class="relative overflow-hidden rounded inset-shadow-xs backdrop-blur-sm">
		<!-- Scrollable Carousel -->
		<div id="carousel-container" class="flex snap-x snap-mandatory overflow-x-scroll px-4 pb-4">
			{#each slice.primary.carousel_group as carousel_item, index (carousel_item.media_link.text)}
				<div class="flex w-full flex-shrink-0 snap-center justify-center px-8">
					<div class="w-80 max-w-sm">
						<CarouselCard {...carousel_item} />
					</div>
				</div>
			{/each}
		</div>

		<!-- Thumbnail Navigation -->
		<div class="mt-4 flex justify-center gap-4 pb-2">
			<!-- <div class="flex gap-2 rounded-t shadow-sm transition-all"> -->
			{#each slice.primary.carousel_group as carousel_item, index}
				<div class="dark:bg-surface-900 h-16 w-16 rounded-lg bg-white shadow active:scale-95">
					<button
						type="button"
						onclick={() => scrollToItem(index)}
						class="h-16 w-16 overflow-x-scroll p-2 opacity-60 hover:opacity-80 focus:opacity-100 focus:outline-none"
					>
						<img
							src={carousel_item.image.thumbnail.url || carousel_item.image.url}
							alt={carousel_item.image.alt}
							class="svg-primary h-full w-full object-cover"
						/>
					</button>
				</div>
			{/each}
			<!-- </div> -->
		</div>
	</div>
</section>

<div class="h-64"></div>
