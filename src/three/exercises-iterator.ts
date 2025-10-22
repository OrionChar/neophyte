import type { AnimationClip } from "three";
import type IExercise from "../models/i-exercise";
import type IExerciseBundle from "../models/i-ixercise-bundl";

type x = { exercise: IExercise, animation: AnimationClip }

export default class ExercisesIterator {
    private indexCurrentExercise = 0;

    constructor(private exercises: IExerciseBundle[]) {}

    public getCurrentExercise(): IExerciseBundle  {
        return this.exercises[this.indexCurrentExercise];
    }

    public switchNextExercise(): IExerciseBundle {
        const isOutOfRange = this.indexCurrentExercise + 1 > this.exercises.length - 1;
        isOutOfRange ? this.indexCurrentExercise = 0 : this.indexCurrentExercise++;
        return this.exercises[this.indexCurrentExercise];        
    }

    public switchPreviousExercise(): IExerciseBundle {
        const isOutOfRange = this.indexCurrentExercise - 1 < 0;
        isOutOfRange ? this.indexCurrentExercise = this.exercises.length - 1 : this.indexCurrentExercise--;
        return this.exercises[this.indexCurrentExercise];
    }
}