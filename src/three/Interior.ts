import { Scene, PerspectiveCamera, Color, AmbientLight, Group, type Object3DEventMap, Mesh, Vector3, MeshStandardMaterial, DirectionalLight, SpotLight } from "three";
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

    public setupScene(mannequin: Group<Object3DEventMap>, gym: Group<Object3DEventMap>): void {
        this.scene.background = new Color('#ffffff');

        this.addGym(gym)
        this.addMannequin(mannequin)
        this.addLighting();
        this.setupCounter()
    }

    private addLighting = (): void => {
        const coordinates = new Vector3(-2.5, 4.2, -10)

        const backLight = new DirectionalLight('#ffffff', 1.5)
        backLight.shadow.mapSize.width = 1024
        backLight.shadow.mapSize.height = 1024
        backLight.castShadow = true
        backLight.shadow.intensity = 1
        backLight.shadow.camera.left = -15
        backLight.shadow.camera.right = 20
        backLight.shadow.camera.top = 15
        backLight.shadow.camera.far = 25
        backLight.position.set(coordinates.x, coordinates.y, coordinates.z)

        const fillLight = new AmbientLight('#ffffff', 1);

        const frontLight = new SpotLight('#ffffff', 3.5)
        frontLight.castShadow = true
        frontLight.shadow.intensity = 1
        frontLight.position.set(0, 2, 2)
        frontLight.angle = 0.75
        frontLight.penumbra = 1
        frontLight.distance = 4
        frontLight.target.position.set(0, 1.5, 0)

        this.scene.add(fillLight)
        this.scene.add(backLight)
        this.scene.add(frontLight)
    }

    private addMannequin = (mannequin: Group): void => {
        const mannequinMesh = mannequin.children[0].children[0].children[0]
        mannequinMesh.castShadow = true
        mannequinMesh.receiveShadow = true

        const material = new MeshStandardMaterial({
            color: 0xffffff,
            roughness: 1,
            metalness: 0.0,
            emissive: 0
        })

        mannequinMesh.material = material

        const mannequinLogo = mannequin.children[0].children[0].children[1]
        mannequinLogo.material = material

        this.scene.add(mannequin)
    }

    private addGym = (gym: Group): void => {
        gym.castShadow = true

        const material = new MeshStandardMaterial({
            color: 0xe0e0e0,
            roughness: 1,
            metalness: 0.0,
            emissive: 0
        })

        gym.children.forEach(mesh => {
            mesh.material = material
            mesh.castShadow = true
            mesh.receiveShadow = true
        })

        this.scene.add(gym);
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