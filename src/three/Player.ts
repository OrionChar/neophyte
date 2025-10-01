import { AnimationAction, AnimationClip, AnimationMixer, AnimationObjectGroup, Object3D } from "three";

export default class Player {
    readonly animationMixer: AnimationMixer;
    private action: AnimationAction 
    
    constructor(root: Object3D | AnimationObjectGroup, initialClip: AnimationClip) {
        this.animationMixer = new AnimationMixer(root)
        this.action = this.animationMixer.clipAction(initialClip)
    }

    set(clip: AnimationClip) {
        this.action = this.animationMixer.clipAction(clip)
    }

    play() {
        this.action.play()
    }

    stop() {
        this.action.stop()
    }
}