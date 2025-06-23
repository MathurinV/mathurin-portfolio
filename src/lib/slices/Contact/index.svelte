<script lang="ts">
	import { MyRichText } from '$lib/components';
	import { isFilled, type Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink, type SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.ContactSlice>;

	const { slice }: Props = $props();

	const gradientStart = 10;
	const gradientEnd = 90;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="mx-auto min-h-screen w-full max-w-2xl snap-start p-4"
>
	<h2
		class="text-secondary-500 inline-block pb-4 text-4xl font-bold drop-shadow-md not-noscript:text-transparent"
		style="background: linear-gradient(90deg, var(--color-primary-500) {gradientStart}%, var(--color-secondary-500) {gradientEnd}%); -webkit-background-clip: text; background-clip: text;"
	>
		Contact
	</h2>
	<div class="px-2">
		{#if isFilled.richText(slice.primary.contact_description)}
			<div class="pb-2">
				<MyRichText field={slice.primary.contact_description} />
			</div>
		{/if}

		<!-- Contact wrapper div -->
		<div class="relative overflow-hidden rounded inset-shadow-xs backdrop-blur-sm">
			<!-- Scrollable contacts div -->
			<div class="relative flex h-9 snap-y snap-mandatory flex-col overflow-y-scroll pb-4">
				{#each slice.primary.contact_items as contact_item (contact_item.contact_link.text)}
					<!-- Contact item div -->
					<div class="flex snap-start flex-row gap-2">
						<PrismicImage field={contact_item.contact_image} class="svg-primary" />
						<PrismicLink
							field={contact_item.contact_link}
							class="decoration-secondary-500 text-secondary-500 hover:underline"
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
