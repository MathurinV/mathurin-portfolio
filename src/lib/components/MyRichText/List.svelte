<script lang="ts">
	import type { RTListNode } from '@prismicio/client';
	import type { RichTextComponentProps } from '@prismicio/svelte';

	let { children }: RichTextComponentProps<RTListNode> = $props();
</script>

<ul class="dark:bg-surface-900 m-2 list-disc rounded bg-white px-6 py-2 shadow">
	{@render children?.()}
</ul>
