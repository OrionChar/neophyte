import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PCFSoftShadowMap, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export default function initThree() {
	const scene = new Scene();
	const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const canvas: HTMLCanvasElement = document.createElement('canvas')
	document.body.appendChild<HTMLCanvasElement>(canvas);

	const renderer = new WebGLRenderer({ canvas, antialias: true });
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = PCFSoftShadowMap
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	window.addEventListener('resize', () => onResize(camera, renderer));

	const orbitController = new OrbitControls(camera, canvas)

	return {
		scene, renderer, camera, orbit: orbitController, canvas
	}
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