<script lang="ts">
	import Hyperlink from './Hyperlink.svelte';
	import List from './List.svelte';
	import { PrismicRichText } from '@prismicio/svelte';

	let { field } = $props();
</script>

<PrismicRichText
	{field}
	components={{
		hyperlink: Hyperlink,
		list: List
	}}
/>
