import { Scene, PerspectiveCamera, Color, AmbientLight, Group, type Object3DEventMap, Mesh, Vector3, MeshStandardMaterial, DirectionalLight, SpotLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type Counter from "./counter";

export default class SceneBuilder {
    private numberRepetition: Mesh;

    constructor(
        private scene: Scene,
        private camera: PerspectiveCamera,
        private counter: Counter,
        private orbit: OrbitControls
    ) {
        this.numberRepetition = this.counter.create(10)
    }

    public setup(location: Group, mannequin: Group, inventory: Group): void {
        this.scene.background = new Color('#ffffff');

        this.addLocation(location)
        this.addInventory(inventory)
        this.addMannequin(mannequin)
        this.addLighting();
        this.setupCounter();
        this.setupCamera();
        this.tuneOrbit();
    }

    private addInventory = (inventory: Group): void => {
        const material = new MeshStandardMaterial({
            color: 0xffffff,
            roughness: 1,
            metalness: 0.0,
            emissive: 0
        })

        inventory.children.forEach(child => {
            child.castShadow = true
            child.receiveShadow = true
            child.material = material
        })

        console.log(inventory);
        

        this.scene.add(inventory)
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

    private addLocation = (location: Group): void => {
        location.castShadow = true

        const material = new MeshStandardMaterial({
            color: 0xe0e0e0,
            roughness: 1,
            metalness: 0.0,
            emissive: 0
        })

        location.children.forEach(mesh => {
            mesh.material = material
            mesh.castShadow = true
            mesh.receiveShadow = true
        })

        this.scene.add(location);
    }

    private setupCounter() {
        this.scene.add(this.numberRepetition)
    }

    private setupCamera(): void {
        this.camera.position.set(-1.5, 1, 2);
    }

    public updateCounter(value: number): void {
        this.scene.remove(this.numberRepetition)
        this.numberRepetition = this.counter.create(value)
        this.setupCounter()
    }

    private tuneOrbit() {
        this.orbit.maxDistance = 3.2
        this.orbit.minDistance = 1.3
        this.orbit.minPolarAngle = Math.PI / 6
        this.orbit.maxPolarAngle = Math.PI / 2
        this.orbit.maxAzimuthAngle = Math.PI / 6
        this.orbit.minAzimuthAngle = 4 * Math.PI / 3
        this.orbit.target.set(0, 0.5, 0)
        this.orbit.enableDamping = true; // for smooth motion
        this.orbit.dampingFactor = 0.01;
        this.orbit.enablePan = false
    }
}
