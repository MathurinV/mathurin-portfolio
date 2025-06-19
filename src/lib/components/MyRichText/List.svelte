<script lang="ts">
	import type { RTListNode } from '@prismicio/client';
	import type { RichTextComponentProps } from '@prismicio/svelte';

	let { children }: RichTextComponentProps<RTListNode> = $props();
</script>

<ul class="list-disc pl-6">
	{@render children?.()}
</ul>
