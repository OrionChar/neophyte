import { Font, FontLoader, GLTFLoader, type GLTF } from "three/examples/jsm/Addons.js";

export default class AssetLoader {
    public loadModel(): Promise<GLTF> {
        const srcModel = '/3d-assets/Exercises.glb';
        return new GLTFLoader().loadAsync(srcModel);
    }

    public loadFont(): Promise<Font> {
        const srcFont = '/fonts/Roboto_Regular.json';
        return new Promise<Font>((resolve) => {
            new FontLoader().load(srcFont, resolve, undefined, this.onError);
        })
    }

    private onError(error: unknown): void {
        console.error(error)
    }
}