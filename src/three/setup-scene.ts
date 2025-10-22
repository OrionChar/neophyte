import Counter from './counter';
import ExerciseController from "./exercise-controller";
import ExercisesIterator from "./exercises-iterator";
import SceneBuilder from "./scene-builder";
import Player from "./player";
import type { Group, PerspectiveCamera, Scene } from "three";
import type { Font, OrbitControls } from "three/examples/jsm/Addons.js";
import type IExerciseBundle from "src/models/i-ixercise-bundl";

export default function setupScene(
    scene: Scene, 
    camera: PerspectiveCamera,
    orbit: OrbitControls,
    exercises: IExerciseBundle[],
    mannequin: Group,
    location: Group,
    font: Font,
) {
    const counter = new Counter(font)

    const interior = new SceneBuilder(scene, camera, counter, orbit)
    interior.setup(mannequin, location)

    const listExercises = new ExercisesIterator(exercises);
	const player = new Player(mannequin, listExercises.getCurrentExercise().animation);
	player.play()

    return {
        exerciseController: new ExerciseController(interior, listExercises, player),
        player
    }
}
