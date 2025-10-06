import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import type { GLTF, Font } from 'three/examples/jsm/Addons.js';
import AssetLoader from './three/AssetLoader';
import initThree from './three/initThree';
import type ExerciseController from './three/ExerciseController';
import IExerciseBundle from './models/IExerciseBundl';
import exercises from './data/exercises';

const assetLoader: AssetLoader = new AssetLoader();
const mannequin: GLTF = await assetLoader.loadModel();
const font: Font = await assetLoader.loadFont();
const exercisesBundles = IExerciseBundle.bundle(exercises, mannequin.animations)

const three: HTMLCanvasElement = document.getElementById('three') as HTMLCanvasElement;
const exerciseController: ExerciseController = initThree(three, exercisesBundles, mannequin, font);

const app = mount(App, {
    target: document.getElementById('app')!,
    props: { exerciseController }
})

export default app
