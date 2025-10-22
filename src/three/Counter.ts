import { Mesh, MeshStandardMaterial } from "three";
import { TextGeometry, type Font, type TextGeometryParameters } from "three/examples/jsm/Addons.js";

export default class Counter {
    private meterial = [
        // front & back
        new MeshStandardMaterial({
            color: 0x00ff00,
            side: 2
        }),
        
        // side
        new MeshStandardMaterial({
            color: 0x00ff00
        }),
    ];
    
    private textGeometryParameters: TextGeometryParameters;

    constructor(font: Font) {
        this.textGeometryParameters = {
            font,
            size: 1.5,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
        }
    }

    create(value: number): Mesh {
        const textGeometry = new TextGeometry(value.toString(), this.textGeometryParameters);
        textGeometry.computeBoundingBox()
        const textMesh = new Mesh(textGeometry, this.meterial);

        textMesh.castShadow = true
        textMesh.receiveShadow = true
        textMesh.position.set(1, 0, -1)
        textMesh.rotateY(-Math.PI / 4)

        return textMesh;
    }
}
