import type { AnimationClip } from "three";
import type IExercise from "./IExercise";
import exercises from "../data/exercises";

export default abstract class IExerciseBundle {
    static bundle(exercises: IExercise[], animations: AnimationClip[]): IExerciseBundle[] {
        const areExercisesMoreTheAnimations = exercises.length > animations.length

        if (areExercisesMoreTheAnimations) {
            throw `Length (${exercises.length}) of exercises array does not match to length (${animations.length}) of animation array`
        }

        const bundles: IExerciseBundle[] = new Array(exercises.length)

        exercises.forEach((exercise, exerciseIndex) => {
            const animation = animations.find(animation => animation.name === exercise.name)

            if (!animation) {
                throw `The exercise "${exercise.name}" does not have animation`
            }

            bundles[exerciseIndex] = {
                exercise, animation
            }
        })

        return bundles
    }

    abstract exercise: IExercise
    abstract animation: AnimationClip
}
