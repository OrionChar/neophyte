import type TrainingHistoryStore from "./TrainingHistoryStore";

export default class ObjectStores {
    static create(trainingHistoryStore: TrainingHistoryStore) {
        if (!this.instance) {
            this.instance = new ObjectStores(trainingHistoryStore);
        }
        return this.instance;
    }

    private static instance: ObjectStores;

    private constructor(public readonly trainingHistoryStore: TrainingHistoryStore) { }
};