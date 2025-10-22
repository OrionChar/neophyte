<script lang="ts">
    import type { HTMLProps } from "node_modules/svelte/svelte-html";
    import type { HTMLAttributes } from "svelte/elements";
    import RepetitionSlider from "./repetition-slider.svelte";
    import {Button} from "$shadcn/components/ui/button/index";
    import ChevronLeft from '@lucide/svelte/icons/chevron-left';
    import ChevronRight from '@lucide/svelte/icons/chevron-right';
    import Ban from '@lucide/svelte/icons/ban';
    import Play from '@lucide/svelte/icons/play';

    const {
        isTraining,
        onSwitchNext,
        onSwitchBack,
        onStart,
        onAbort,
        onRepetitionsChanged,
        root
    }: {
        isTraining: boolean;
        onSwitchNext: () => void;
        onSwitchBack: () => void;
        onStart: () => void;
        onAbort: () => void;
        onRepetitionsChanged: (value: number) => void;
        root?: HTMLProps<"article", HTMLAttributes<any>>
    } = $props();

    

    const initialValue = 8
    
    $effect(() => {
        onRepetitionsChanged(initialValue)
	});
</script>

<article class={['flex justify-center items-end gap-3', root?.class]}>
    <div class='flex gap-1'>
        <Button disabled={isTraining} hidden={isTraining} onclick={onSwitchBack}><ChevronLeft /></Button>
        <Button disabled={isTraining} hidden={isTraining} onclick={onSwitchNext}><ChevronRight /></Button>
    </div>

    <RepetitionSlider
        {initialValue}
        disabled={isTraining}
        hidden={isTraining}
        onInput={onRepetitionsChanged}
    />

    <Button onclick={onStart} disabled={isTraining}><Play />Start</Button>
    <Button onclick={() => {
            if (confirm("Are you sure?")) {
                onAbort();
            }
        }}
        variant='destructive'
        disabled={!isTraining}
        hidden={!isTraining}><Ban />Abort</Button>
</article>
