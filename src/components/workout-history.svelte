<script lang="ts">
    import type ITraining from "../models/i-training";
    import TrendingUp from '@lucide/svelte/icons/trending-up';
    import X from '@lucide/svelte/icons/x';
    import Button, { type ButtonProps } from "$shadcn/components/ui/button/button.svelte";
    import * as AlertDialog from "$shadcn/components/ui/alert-dialog";
    import * as Table from "$shadcn/components/ui/table/index.js";
    import ScrollArea from "$shadcn/components/ui/scroll-area/scroll-area.svelte";
    import type { DialogRootPropsWithoutHTML, DialogTriggerProps } from "bits-ui";
	import { formatTime, formatTitleDate } from "../mist/format-date";
    import { isToday } from "../mist/time-predicates";

	function printTime(date: Date): string {
		return isToday(date) ? formatTime(date) : date.toLocaleTimeString(navigator.languages[0], {hour: '2-digit', minute: '2-digit'})
	}

	function isNextDay(date1: Date, date2: Date): boolean {
		return date1.getDay() !== date2.getDay()
	}

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
		<Table.Body>
			{#each trainings as training, index}
				{@const previousTraining = trainings[index - 1]}
				{#if (index === 0) || isNextDay(training.date, previousTraining.date)}
					<h3 class="scroll-m-20 text-lg not-first:mt-5 font-semibold tracking-tight">{formatTitleDate(training.date)}</h3>          
				{/if}
				<Table.Row>
						<Table.Cell class="font-medium">{training.exercise.name}</Table.Cell>
						<Table.Cell>{training.repetition}</Table.Cell>
						<Table.Cell>{printTime(training.date)}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}


<style></style>
