import { Scene, PerspectiveCamera, Color, AmbientLight, GridHelper, Group, type Object3DEventMap, Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type Counter from "./Counter";

export default class Interior {
    private numberRepetition: Mesh;

    constructor(
        private scene: Scene,
        private camera: PerspectiveCamera,
        private counter: Counter
    ) {
        this.numberRepetition = this.counter.create(10)
    }

    public setupScene(mannequin: Group<Object3DEventMap>): void {
        this.scene.background = new Color('#ffffff');
        this.scene.add(new AmbientLight('#ffffff', 1));
        this.scene.add(new GridHelper(10, 10));
        this.scene.add(mannequin);
        this.setupCounter()
    }

    private setupCounter() {
        this.scene.add(this.numberRepetition)
    }

    public updateCounter(value: number): void {
        this.scene.remove(this.numberRepetition)
        this.numberRepetition = this.counter.create(value)
        this.setupCounter()
    }

    public setupCamera(): void {
        this.camera.position.set(-1.5, 1, 2);
    }

    public setupOrbitControl(domElement: HTMLElement): OrbitControls {
        const controls = new OrbitControls(this.camera, domElement);
        controls.enableDamping = true; // for smooth motion
        controls.dampingFactor = 0.01;

        return controls
    }
}