import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import type { GLTF, Font } from 'three/examples/jsm/Addons.js';
import AssetLoader from './three/AssetLoader';
import initThree from './three/initThree';
import type ExerciseController from './three/ExerciseController';
import IExerciseBundle from './models/IExerciseBundl';
import exercises from './data/exercises';
import WebGL from 'three/addons/capabilities/WebGL.js';

let exerciseController: ExerciseController | null = null

if ( WebGL.isWebGL2Available() ) {
    const assetLoader: AssetLoader = new AssetLoader();
    const mannequin: GLTF = await assetLoader.loadModel();
    const font: Font = await assetLoader.loadFont();
    const gym: GLTF = await assetLoader.loadGym();
    const exercisesBundles = IExerciseBundle.bundle(exercises, mannequin.animations)
    
    const three: HTMLCanvasElement = document.createElement('canvas')
    document.body.appendChild<HTMLCanvasElement>(three);
    exerciseController = initThree(three, exercisesBundles, mannequin, font, gym);
}

const app = mount(App, {
    target: document.getElementById('app')!,
    props: { exerciseController }
})

export default app
