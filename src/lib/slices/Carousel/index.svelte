<script lang="ts">
	import { browser } from '$app/environment';
	import { CarouselCard } from '$lib/components';
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import { onMount, onDestroy } from 'svelte';

	type Props = SliceComponentProps<Content.CarouselSlice>;

	const { slice }: Props = $props();

	let currentIndex = $state(0);
	let carouselContainer: HTMLElement;
	let observer: IntersectionObserver;
	let childElements: Element[] = [];
	let isScrolling = false;
	let scrollRAF: number;

	function scrollToItem(index: number) {
		if (currentIndex === index || isScrolling) return;

		isScrolling = true;
		currentIndex = index;

		const container = carouselContainer;
		if (container && childElements[index]) {
			childElements[index].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});

			// Reset scrolling flag after animation
			setTimeout(() => {
				isScrolling = false;
			}, 500);
		}
	}

	function setupIntersectionObserver() {
		if (!carouselContainer) return;

		// Cache child elements to avoid repeated DOM queries
		childElements = Array.from(carouselContainer.children);

		// Clean up existing observer
		observer?.disconnect();

		observer = new IntersectionObserver(
			(entries) => {
				if (isScrolling) return; // Skip updates during programmatic scrolling

				// Process only the most intersecting entry
				const mostVisible = entries.reduce((max, entry) =>
					entry.intersectionRatio > max.intersectionRatio ? entry : max
				);

				if (mostVisible.intersectionRatio > 0.6) {
					const newIndex = childElements.indexOf(mostVisible.target);
					if (newIndex !== -1 && newIndex !== currentIndex) {
						currentIndex = newIndex;
					}
				}
			},
			{
				root: carouselContainer,
				rootMargin: '0px',
				threshold: 0.6 // Single threshold at 60% visibility
			}
		);

		// Observe all carousel items
		childElements.forEach((child) => observer.observe(child));
	}

	// Optimized scroll-based fallback using RAF
	function handleScrollRAF() {
		if (!carouselContainer || isScrolling) return;

		const containerRect = carouselContainer.getBoundingClientRect();
		const containerCenter = containerRect.left + containerRect.width / 2;

		let closestIndex = 0;
		let minDistance = Infinity;

		// Use cached elements instead of querying DOM
		childElements.forEach((child, index) => {
			const childRect = child.getBoundingClientRect();
			const childCenter = childRect.left + childRect.width / 2;
			const distance = Math.abs(containerCenter - childCenter);

			if (distance < minDistance) {
				minDistance = distance;
				closestIndex = index;
			}
		});

		if (closestIndex !== currentIndex) {
			currentIndex = closestIndex;
		}
	}

	function handleScroll() {
		if (isScrolling || observer) return;

		if (browser) {
			cancelAnimationFrame(scrollRAF);
			scrollRAF = requestAnimationFrame(handleScrollRAF);
		} else {
			handleScrollRAF();
		}
	}

	onMount(() => {
		if (carouselContainer) {
			// Cache child elements once
			childElements = Array.from(carouselContainer.children);

			if ('IntersectionObserver' in window) {
				setupIntersectionObserver();
			} else {
				carouselContainer.addEventListener('scroll', handleScroll, { passive: true });
			}
		}
	});

	onDestroy(() => {
		observer?.disconnect();
		if (browser) {
			cancelAnimationFrame(scrollRAF);
		}
		carouselContainer?.removeEventListener('scroll', handleScroll);
		childElements = [];
	});
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
		<div
			bind:this={carouselContainer}
			id="carousel-container"
			class="flex snap-x snap-mandatory overflow-x-scroll px-4 pb-4"
		>
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
			{#each slice.primary.carousel_group as carousel_item, index}
				<div class="dark:bg-surface-900 h-16 w-16 rounded-lg bg-white shadow active:scale-95">
					<button
						type="button"
						onclick={() => scrollToItem(index)}
						class="h-16 w-16 overflow-x-scroll p-2 transition-opacity hover:opacity-80 focus:outline-none {currentIndex ===
						index
							? 'opacity-100'
							: 'opacity-60'}"
					>
						<img
							src={carousel_item.image.thumbnail.url || carousel_item.image.url}
							alt={carousel_item.image.alt}
							class="svg-primary h-full w-full object-cover"
						/>
					</button>
				</div>
			{/each}
		</div>
	</div>
</section>
