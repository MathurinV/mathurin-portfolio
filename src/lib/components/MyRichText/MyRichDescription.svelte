<script lang="ts">
	import Hyperlink from './Hyperlink.svelte';
	import List from './List.svelte';
	import { PrismicRichText } from '@prismicio/svelte';

	let { field } = $props();
</script>

<div class="dark:bg-surface-900/80 rounded bg-white/80 p-2 shadow">
	<PrismicRichText
		{field}
		components={{
			hyperlink: Hyperlink,
			list: List
		}}
	/>
</div>
