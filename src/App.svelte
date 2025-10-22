<script lang="ts">
    import "./app.css";
    import ExerciseController from "./three/exercise-controller";
    import ControlPanel from "./components/control-panel.svelte";
    import WorkoutHistory from "./components/workout-history.svelte";
    import TrainingHistoryStore from "./db/training-history-store";
    import DBInitializer from "./db/db-initializer";
    import type ITraining from "./models/i-training";
    import WebGLError from "./components/webgl-error.svelte";

    const {
        exerciseController,
    }: { exerciseController: ExerciseController | null } = $props();
    let isTraining = $state(false);

    if (exerciseController) {
        exerciseController.addEventListener("start", onStart);
        exerciseController.addEventListener("finish", onFinish);
        exerciseController.addEventListener("abort", onAbort);

        const dbInitializer = new DBInitializer();
        const openRequest = dbInitializer.init();

        openRequest.addEventListener("success", onSuccess);
    }

    let trainingHistoryStore: TrainingHistoryStore;
    let trainings: ITraining[] = $state([]);

    function onStart(): void {
        isTraining = true;
    }

    function onFinish(): void {
        isTraining = false;
        alert("Great!");
    }

    function onAbort(): void {
        isTraining = false;
    }

    function onSuccess(this: IDBOpenDBRequest, ev: Event) {
        trainingHistoryStore = new TrainingHistoryStore(this.result);
        getTrainings();

        exerciseController?.addEventListener("finish", ({ detail }) => {
            trainingHistoryStore.add(detail.exercise, detail.repetition);
        });
    }

    function getTrainings() {
        const request = trainingHistoryStore.getAll();

        request.onsuccess = function () {
            if (request.result) {
                trainings = request.result; // array of books with price=10
            } else {
                console.log("No such books");
            }
        };
    }
</script>

<main class={exerciseController ? 'neophyte' : 'min-h-svh flex items-center'}>
    {#if exerciseController}
        <ControlPanel
            root={{
                class: [
                    "absolute",
                    "bottom-10",
                    "right-[50%]",
                    "translate-x-[50%]",
                ],
            }}
            {isTraining}
            onSwitchNext={exerciseController.switchNext}
            onSwitchBack={exerciseController.switchBack}
            onStart={exerciseController.start}
            onAbort={exerciseController.abort}
            onRepetitionsChanged={exerciseController.changeCounter}
        />
        <WorkoutHistory
            {trainings}
            trigger={{ class: "absolute top-10 right-10" }}
            onOpenChange={(open) => {
                if (open) getTrainings();
            }}
        />
    {:else}
        <WebGLError />
    {/if}
</main>
