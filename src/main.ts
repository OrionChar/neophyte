import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import type { GLTF, Font } from 'three/examples/jsm/Addons.js';
import AssetLoader from './three/asset-loader';
import initThree from './three/init-three';
import type ExerciseController from './three/exercise-controller';
import IExerciseBundle from './models/IExerciseBundl';
import exercises from './data/exercises';
import WebGL from 'three/addons/capabilities/WebGL.js';
import setupScene from './three/setup-scene';
import render from './three/render';

let exerciseController: ExerciseController | null = null

if (WebGL.isWebGL2Available()) {
    const assetLoader: AssetLoader = new AssetLoader();
    const mannequin: GLTF = await assetLoader.loadModel();
    const font: Font = await assetLoader.loadFont();
    const location: GLTF = await assetLoader.loadLocation();

    const exercisesBundles = IExerciseBundle.bundle(exercises, mannequin.animations)
    const { scene, camera, orbit, renderer } = initThree();
    const {exerciseController: controller, player} = setupScene(scene, camera, orbit, exercisesBundles, mannequin.scene, location.scene, font)

    exerciseController = controller
    
    render(scene, camera, renderer, orbit, player);
}

const app = mount(App, {
    target: document.getElementById('app')!,
    props: { exerciseController }
})

export default app
