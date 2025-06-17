<script lang="ts">
	import CarouselCard from '$lib/components/CarouselCard/index.svelte';
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
	<h2 class="mb-6 text-center text-2xl font-bold">
		{slice.primary.title}
	</h2>

	<!-- Carousel Container -->
	<div class="relative overflow-hidden rounded inset-shadow-sm">
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
		<div class="mt-4 flex justify-center">
			<div class="flex gap-2 rounded-t shadow-sm transition-all">
				{#each slice.primary.carousel_group as carousel_item, index}
					<button
						type="button"
						onclick={() => scrollToItem(index)}
						class="h-16 w-16 overflow-hidden rounded-lg border-2 border-transparent p-2 opacity-60 hover:opacity-80 focus:opacity-100 focus:outline-none"
					>
						<img
							src={carousel_item.image.thumbnail.url || carousel_item.image.url}
							alt={carousel_item.image.alt}
							class="svg-primary h-full w-full object-cover"
						/>
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<div class="h-64"></div>
