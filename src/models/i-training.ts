import type IExercise from "./i-exercise"

export default interface ITraining {
    id: number
    exercise: IExercise
    repetition: number
    date: Date
}