import type IExercise from "./IExercise"

export default interface ITraining {
    id: number
    exercise: IExercise
    repetition: number
    date: Date
}