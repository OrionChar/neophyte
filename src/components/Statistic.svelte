<script lang="ts">
    import type ITraining from "../models/ITraining";

    let isOpen = $state(false);
    const {trainings, onOpen}: {trainings: ITraining[], onOpen: () => void} = $props();
</script>

<button onclick={() => {
    isOpen = !isOpen
    onOpen()
}}>Statistic</button>
<table class="statistic-table" hidden={!isOpen}>
    <thead>
        <tr>
            <th>Exercise</th>
            <th>Repetition</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {#each trainings as training}
            <tr>
                <td>{training.exercise.name}</td>
                <td>{training.repetition}</td>
                <td>{training.date.toLocaleDateString()}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .statistic-table {
        background: black;
        position: absolute;
        top: 0;
        left: 0;
        width: 90vw;
        height: 90vh;
    }
</style>
