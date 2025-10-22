import { Font, FontLoader, GLTFLoader, type GLTF } from "three/examples/jsm/Addons.js";

export default class AssetLoader {
    public loadModel(): Promise<GLTF> {
        const srcModel = '/3d-assets/exercises-v2.glb';
        return new GLTFLoader().loadAsync(srcModel);
    }

    public loadFont(): Promise<Font> {
        const srcFont = '/fonts/oswald-medium-regular-digits-only-v2.json';
        return new Promise<Font>((resolve) => {
            new FontLoader().load(srcFont, resolve, undefined, this.onError);
        })
    }

    public loadGym(): Promise<GLTF> {
        const srcModel = '/3d-assets/gym.glb';
        return new GLTFLoader().loadAsync(srcModel);
    }

    private onError(error: unknown): void {
        console.error(error)
    }
}