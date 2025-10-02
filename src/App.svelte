<script lang="ts">
    import "./app.css";
    import ExerciseController from "./three/ExerciseController";
    import ControlPanel from "./components/ControlPanel.svelte";
    import Statistic from "./components/Statistic.svelte";
    import ObjectStores from "./db/ObjectStores";
    import TrainingHistoryStore from "./db/TrainingHistoryStore";
    import DBInitializer from "./db/DBInitializer";
    import type ITraining from "./models/ITraining";
    
    const { exerciseController }: { exerciseController: ExerciseController } = $props();
    let isTraining = $state(false);
    
    exerciseController.addEventListener("start", onStart);
    exerciseController.addEventListener("finish", onFinish);
    exerciseController.addEventListener("abort", onAbort);
    
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
    
    //---
    const dbInitializer = new DBInitializer();
    const openRequest = dbInitializer.init();
    
    openRequest.addEventListener("success", onSuccess);
    
    let trainingHistoryStore: TrainingHistoryStore;
    let trainings: ITraining[] = $state([]);
    
    function onSuccess(this: IDBOpenDBRequest, ev: Event) {
        trainingHistoryStore = new TrainingHistoryStore(this.result);
        getTrainings();
    
        exerciseController.addEventListener("finish", ({ detail }) => {
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

<main>
    <ControlPanel
        {isTraining}
        onSwitchNext={exerciseController.switchNext}
        onSwitchBack={exerciseController.switchBack}
        onStart={exerciseController.start}
        onAbort={exerciseController.abort}
        onRepetitionsChanged={exerciseController.changeCounter}
    />
    <Statistic {trainings} onOpen={getTrainings} />
</main>
