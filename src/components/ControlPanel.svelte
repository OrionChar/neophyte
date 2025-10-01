<script lang="ts">
    import RepetitionSlider from "./RepetitionSlider.svelte";

    const {
        isTraining,
        onSwitchNext,
        onSwitchBack,
        onStart,
        onAbort,
        onRepetitionsChanged,
    }: {
        isTraining: boolean;
        onSwitchNext: () => void;
        onSwitchBack: () => void;
        onStart: () => void;
        onAbort: () => void;
        onRepetitionsChanged: (value: number) => void;
    } = $props();
</script>

<button disabled={isTraining} hidden={isTraining} onclick={onSwitchBack}
    >←</button
>
<button disabled={isTraining} hidden={isTraining} onclick={onSwitchNext}
    >→</button
>

<RepetitionSlider
    disabled={isTraining}
    hidden={isTraining}
    onInput={onRepetitionsChanged}
/>

<button onclick={onStart} disabled={isTraining}>Start</button>
<button
    onclick={() => {
        if (confirm("Are you sure?")) {
            onAbort();
        }
    }}
    disabled={!isTraining}
    hidden={!isTraining}
>Abort</button>
