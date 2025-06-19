<script lang="ts">
	import { browser } from '$app/environment';
	import { CarouselCard, MyRichText } from '$lib/components';
	import { isFilled, type Content } from '@prismicio/client';
	import { type SliceComponentProps } from '@prismicio/svelte';
	import { onMount, onDestroy } from 'svelte';

	type Props = SliceComponentProps<Content.CarouselSlice>;

	const { slice }: Props = $props();

	let currentIndex = $state(0);
	let carouselContainer: HTMLElement;
	let thumbnailContainer: HTMLElement;
	let observer: IntersectionObserver;
	let childElements: Element[] = [];
	let thumbnailElements: Element[] = [];
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

			// Scroll thumbnail into view as well
			scrollThumbnailIntoView(index);

			// Reset scrolling flag after animation
			setTimeout(() => {
				isScrolling = false;
			}, 500);
		}
	}

	function scrollThumbnailIntoView(index: number) {
		if (!thumbnailContainer || !thumbnailElements[index]) return;

		const thumbnail = thumbnailElements[index] as HTMLElement;
		const container = thumbnailContainer;

		// Calculate if thumbnail is visible
		const containerRect = container.getBoundingClientRect();
		const thumbnailRect = thumbnail.getBoundingClientRect();

		const isVisible =
			thumbnailRect.left >= containerRect.left && thumbnailRect.right <= containerRect.right;

		if (!isVisible) {
			thumbnail.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
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
						scrollThumbnailIntoView(newIndex);
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
			scrollThumbnailIntoView(closestIndex);
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

			if (thumbnailContainer) {
				thumbnailElements = Array.from(thumbnailContainer.children);
			}

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
		thumbnailElements = [];
	});

	let split_percentage = $derived(
		Math.round(((currentIndex + 1) / slice.primary.carousel_group.length) * 100)
	);

	let gradientStart = $derived(Math.max(0, split_percentage - 10));
	let gradientEnd = $derived(Math.min(100, split_percentage + 10));
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="mx-auto min-h-screen w-full max-w-2xl snap-start p-4"
>
	<!-- Carousel Title -->
	<h2
		class="text-secondary-500 inline-block text-4xl font-bold drop-shadow-md not-noscript:text-transparent"
		style="background: linear-gradient(90deg, var(--color-primary-500) {gradientStart}%, var(--color-secondary-500) {gradientEnd}%); -webkit-background-clip: text; background-clip: text;"
	>
		{slice.primary.title}
	</h2>

	{#if isFilled.richText(slice.primary.carousel_text)}
		<div class="pb-2">
			<MyRichText field={slice.primary.carousel_text} />
		</div>
	{/if}

	<!-- Carousel Container -->
	<div class="relative overflow-hidden rounded inset-shadow-xs backdrop-blur-sm">
		<!-- Scrollable Carousel -->
		<div
			bind:this={carouselContainer}
			id="carousel-container"
			class="scrollbar-hide flex snap-x snap-mandatory overflow-x-scroll px-4 pb-4"
		>
			{#each slice.primary.carousel_group as carousel_item, index (carousel_item.media_link.text)}
				<div class="flex w-full flex-shrink-0 snap-center justify-center px-8">
					<div class="w-80 max-w-sm">
						<CarouselCard {...carousel_item} />
					</div>
				</div>
			{/each}
		</div>

		<!-- Enhanced Thumbnail Navigation -->
		<div class="relative mt-4 block pb-2 noscript:hidden">
			<!-- Scrollable thumbnail container -->
			<div
				bind:this={thumbnailContainer}
				class="scrollbar-hide flex snap-x snap-mandatory justify-center-safe gap-2 overflow-x-auto mask-r-from-95% mask-r-to-100% mask-l-from-95% mask-l-to-100% px-4 py-2"
				style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;"
			>
				{#each slice.primary.carousel_group as carousel_item, index}
					<div class="flex-shrink-0 snap-center">
						<div
							class="dark:bg-surface-900 h-12 w-12 rounded-lg bg-white shadow transition-all duration-75 active:scale-95 sm:h-16 sm:w-16 {currentIndex ===
							index
								? 'scale-105'
								: ''}"
						>
							<button
								type="button"
								onclick={() => scrollToItem(index)}
								class="h-full w-full overflow-hidden rounded-lg p-1 transition-all duration-75 sm:p-2 {currentIndex ===
								index
									? 'opacity-100'
									: 'opacity-60 hover:opacity-80'}"
								aria-label={`Go to slide ${index + 1}`}
							>
								<img
									src={carousel_item.image.thumbnail?.url || carousel_item.image.url}
									alt={carousel_item.image.alt || `Slide ${index + 1}`}
									class="svg-primary h-full w-full rounded object-cover"
									loading="lazy"
								/>
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
