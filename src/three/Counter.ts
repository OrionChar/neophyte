import { Mesh, MeshPhongMaterial } from "three";
import { TextGeometry, type Font, type TextGeometryParameters } from "three/examples/jsm/Addons.js";

export default class Counter {
    private meterial = [
        // front
        new MeshPhongMaterial({
            color: 0x00ff00,
            flatShading: true,
            side: 1,
        }),
        
        // side
        new MeshPhongMaterial({
            color: 0x00ff00
        }),
    ];
    
    private textGeometryParameters: TextGeometryParameters;

    constructor(font: Font) {
        this.textGeometryParameters = {
            font,
            size: 1,
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
        }
    }

    create(value: number): Mesh {
        const textGeometry = new TextGeometry(value.toString(), this.textGeometryParameters);
        const textMesh = new Mesh(textGeometry, this.meterial);

        return textMesh;
    }
}