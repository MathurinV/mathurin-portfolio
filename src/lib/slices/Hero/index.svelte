<script lang="ts">
	import { MyRichText } from '$lib/components';
	import { isFilled, type Content } from '@prismicio/client';
	import { type SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.HeroSlice>;

	const { slice }: Props = $props();
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="mx-auto min-h-screen w-full max-w-2xl snap-start p-4"
>
	<!-- Presentation -->
	<div class="flex flex-col gap-4 md:flex-row">
		<div class="h-full w-full text-wrap md:h-1/2 md:w-2/3">
			<div class="pb-2 text-end md:text-start">
				<h2
					class="bg-surface-900 base-font-color-dark dark:base-font-color inline-block px-2 font-mono shadow dark:bg-white"
				>
					{slice.primary.creator_name}
				</h2>
			</div>
			<div class="rounded">
				<h1 class="text-primary-500 text-6xl text-shadow-md">
					{slice.primary.website_name}
				</h1>

				{#if isFilled.richText(slice.primary.website_introduction)}
					<div class="rich-text px-2 pt-4">
						<MyRichText field={slice.primary.website_introduction} />
					</div>
				{/if}
			</div>
		</div>

		<!-- Art -->
		<div class="bg-primary-500 h-64 w-64 rounded-full"></div>
	</div>
</section>
