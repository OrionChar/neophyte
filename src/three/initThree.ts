import { Font, type GLTF } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ExercisesIterator from './ExercisesIterator';
import Interior from './Interior';
import { Camera, Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Counter from './Counter';
import Player from './Player';
import ExerciseController from './ExerciseController';
import type IExerciseBundle from '../models/IExerciseBundl';

export default function initThree(canvas: HTMLCanvasElement, exercises: IExerciseBundle[], mannequin: GLTF, font: Font): ExerciseController {
	const scene = new Scene();
	const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const counter = new Counter(font)

	const interior = new Interior(scene, camera, counter)
	interior.setupScene(mannequin.scene)
	interior.setupCamera()

	const renderer = new WebGLRenderer({ canvas });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	window.addEventListener('resize', () => onResize(camera, renderer));

	const listExercises = new ExercisesIterator(exercises);
	const player = new Player(mannequin.scene, listExercises.getCurrentExercise().animation);
	player.play()

	const orbitController = interior.setupOrbitControl(canvas)
	const delta = new Clock();
	render(scene, camera, renderer, orbitController, delta, player);

	return new ExerciseController(interior, listExercises, player)
}

function render(scene: Scene, camera: Camera, renderer: WebGLRenderer, orbitController: OrbitControls, delta: Clock, player: Player): void {
	requestAnimationFrame(() => render(scene, camera, renderer, orbitController, delta, player));

	orbitController.update();
	renderer.render(scene, camera);

	player.animationMixer.update(delta.getDelta());
}

function onResize(camera: PerspectiveCamera, renderer: WebGLRenderer) {
	const width = window.innerWidth
	const height = window.innerHeight
	
	// Update camera aspect and projection
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	// Update renderer size and pixel ratio
	renderer.setSize(width, height);
}