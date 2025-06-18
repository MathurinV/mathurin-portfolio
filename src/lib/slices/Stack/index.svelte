<script lang="ts">
	import { StackCard } from '$lib/components';
	import type { Content } from '@prismicio/client';
	import {
		PrismicImage,
		PrismicLink,
		PrismicRichText,
		type SliceComponentProps
	} from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.StackSlice>;

	const { slice }: Props = $props();
	$inspect(slice);
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	{#each slice.primary.item as stack_item (stack_item.item_title)}
		<StackCard {...stack_item} />
	{/each}
</section>
