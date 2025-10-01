import type IExercise from "../models/IExercise"
import type ITraining from "../models/ITraining"

export default class TrainingHistoryStore {
    constructor(private db: IDBDatabase) {}
    readonly storeName = 'TrainingHistoryStore'

    create() {
        this.db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true })
    }

    add(exercise: IExercise, repetition: number) {
        const transaction = this.db.transaction(this.storeName, 'readwrite')
        transaction.objectStore(this.storeName).add({exercise, repetition, date: new Date()})
    }

    getAll() {
        return this.db.transaction(this.storeName, 'readonly').objectStore(this.storeName).getAll()
    }
}