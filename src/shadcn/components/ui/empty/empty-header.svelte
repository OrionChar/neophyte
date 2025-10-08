<script lang="ts">
	import { cn } from "$shadcn/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="empty-header"
	class={cn("flex max-w-md flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</div>
