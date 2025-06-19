<script lang="ts">
	import type { RTLinkNode } from '@prismicio/client';
	import type { RichTextComponentProps } from '@prismicio/svelte';

	let { node, children }: RichTextComponentProps<RTLinkNode> = $props();

	$inspect({
		node,
		children
	});
</script>

<a class="decoration-secondary-500 text-secondary-500 hover:underline" href={node.data.url}>
	{@render children?.()}
</a>
