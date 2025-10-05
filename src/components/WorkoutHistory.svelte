<script lang="ts">
    import type ITraining from "../models/ITraining";
    import TrendingUp from '@lucide/svelte/icons/trending-up';
    import X from '@lucide/svelte/icons/x';
    import Button, { type ButtonProps } from "$shadcn/components/ui/button/button.svelte";
    import * as AlertDialog from "$shadcn/components/ui/alert-dialog";
    import * as Table from "$shadcn/components/ui/table/index.js";
    import ScrollArea from "$shadcn/components/ui/scroll-area/scroll-area.svelte";
    import type { DialogRootPropsWithoutHTML, DialogTriggerProps } from "bits-ui";

    const {trainings, trigger, ...restProps}: {trainings: ITraining[], trigger: DialogTriggerProps} & DialogRootPropsWithoutHTML = $props();
</script>

<AlertDialog.Root {...restProps}>
  <AlertDialog.Trigger class={trigger.class}>
    <Button variant="secondary" size="icon"><TrendingUp /></Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content class='max-w-[90svw]'>
    <ScrollArea class='w-full max-h-[90svh] px-6' type="hover">
      <AlertDialog.Header class="flex justify-between items-center mt-6 mb-7">
        <AlertDialog.Title class="text-5xl">Workout History</AlertDialog.Title>
        <AlertDialog.Cancel><X /></AlertDialog.Cancel>
      </AlertDialog.Header>
      {@render trainingsHistory(trainings)}
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>

{#snippet trainingsHistory(trainings: ITraining[])}
    <Table.Root>
        <Table.Header>
            <Table.Row>
                <Table.Head class="w-[100px]">Exercise</Table.Head>
                <Table.Head>Repetitions</Table.Head>
                <Table.Head>Date</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each trainings as training, index}
                <Table.Row>
                    <Table.Cell class="font-medium">{trainings[trainings.length - index - 1].exercise.name}</Table.Cell>
                    <Table.Cell>{trainings[trainings.length - index - 1].repetition}</Table.Cell>
                    <Table.Cell>{trainings[trainings.length - index - 1].date.toLocaleString()}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
{/snippet}


<style></style>
