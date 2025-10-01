import type ExercisesIterator from "./ExercisesIterator";
import type Player from "./Player";
import type Interior from "./Interior";
import type IExercise from "../models/IExercise";

interface ExerciseControllerEventMap {
    'start': CustomEvent;
    'finish': CustomEvent<{ exercise: IExercise, repetition: number }>;
    'abort': CustomEvent;
}

export default class ExerciseController extends EventTarget {
    constructor(private interior: Interior, private exercisesIterator: ExercisesIterator, private player: Player) {
        super()
    }

    private restRepetition: number = 0
    private initialRepetitions: number = 0

    start = () => {
        this.initialRepetitions = this.restRepetition;
        this.player.animationMixer.addEventListener('loop', this.onLoop);
        const startEvent = new CustomEvent('start');
        this.dispatchEvent(startEvent);
    }

    private onLoop = () => {
        if (this.restRepetition > 1) {
            this.restRepetition--;
            this.changeCounter(this.restRepetition);
        } else {
            this.changeCounter(this.initialRepetitions)
            this.removeListeners()

            const finishEvent = new CustomEvent<{ exercise: IExercise, repetition: number }>('finish', {
                detail: {
                    exercise: this.exercisesIterator.getCurrentExercise().exercise,
                    repetition: this.initialRepetitions
                }
            });
            this.dispatchEvent(finishEvent)
        }
    }

    changeCounter = (value: number) => {
        this.restRepetition = value
        this.interior.updateCounter(value)
    }

    private removeListeners = () => {
        this.player.animationMixer.removeEventListener('loop', this.onLoop)
    }

    abort = () => {
        this.changeCounter(this.initialRepetitions)
        this.removeListeners()
        const abortEvent = new CustomEvent('abort');
        this.dispatchEvent(abortEvent)
    }

    switchNext = () => {
        this.player.stop()
        this.player.set(this.exercisesIterator.switchNextExercise().animation)
        this.player.play()
    }

    switchBack = () => {
        this.player.stop()
        this.player.set(this.exercisesIterator.switchPreviousExercise().animation)
        this.player.play()
    }

    /**
     * @see https://adropincalm.com/blog/notes-on-typescript-custom-events/
     */
    // @ts-ignore
    addEventListener<K extends keyof ExerciseControllerEventMap>(
        event: K, 
        callback: ((ev: ExerciseControllerEventMap[K]) => any) | null, 
        options?: AddEventListenerOptions | boolean): void;
    // @ts-ignore
    addEventListener(
        type: string, 
        callback: EventListenerOrEventListenerObject | null, 
        options?: AddEventListenerOptions | boolean): void {
        super.addEventListener(type, callback, options);
    }
}
