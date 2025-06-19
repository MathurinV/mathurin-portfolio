<script lang="ts">
	import type { RTStrongNode } from '@prismicio/client';
	import type { RichTextComponentProps } from '@prismicio/svelte';

	let { children }: RichTextComponentProps<RTStrongNode> = $props();
</script>

<strong class="font-semibold">
	{@render children?.()}
</strong>
