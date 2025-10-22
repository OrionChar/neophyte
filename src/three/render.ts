import type Player from "./player";
import type { Scene, Camera, WebGLRenderer } from "three";
import { Clock } from "three";
import type { OrbitControls } from "three/examples/jsm/Addons.js";

const delta = new Clock();

export default function render(scene: Scene, camera: Camera, renderer: WebGLRenderer, orbitController: OrbitControls, player: Player): void {
    requestAnimationFrame(() => render(scene, camera, renderer, orbitController, player));

    orbitController.update();
    renderer.render(scene, camera);

    player.animationMixer.update(delta.getDelta());
}