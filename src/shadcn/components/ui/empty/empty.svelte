<script lang="ts">
	import { cn } from "$shadcn/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="empty"
	class={cn(
		"flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 md:p-12",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
