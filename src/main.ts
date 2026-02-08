import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import AssetLoader from './three/asset-loader';
import initThree from './three/init-three';
import type ExerciseController from './three/exercise-controller';
import IExerciseBundle from './models/i-ixercise-bundl';
import exercises from './data/exercises';
import WebGL from 'three/addons/capabilities/WebGL.js';
import setupScene from './three/setup-scene';
import render from './three/render';
import Preloader from './preloader';

let exerciseController: ExerciseController | null = null

if (WebGL.isWebGL2Available()) {
    const assetLoader: AssetLoader = new AssetLoader();

    const [
        mannequin,
        font,
        location,
        inventory,
    ] = await Promise.all([
        assetLoader.loadModel(),
        assetLoader.loadFont(),
        assetLoader.loadLocation(),
        assetLoader.loadInventory(),
    ])

    const exercisesBundles = IExerciseBundle.bundle(exercises, mannequin.animations)
    const { scene, camera, orbit, renderer } = initThree();
    const { exerciseController: controller, player } = setupScene(scene, camera, orbit, exercisesBundles, mannequin.scene, location.scene, inventory.scene, font)

    exerciseController = controller

    render(scene, camera, renderer, orbit, player);
    new Preloader().destroy();
}

const app = mount(App, {
    target: document.getElementById('app')!,
    props: { exerciseController }
})

export default app
