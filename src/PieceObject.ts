export class PieceObject {
    public key: string;
    public name: string;
    public rotation: number;
    public validNeighbors: { [name: string]: string[]; };
    public newValid: any;
    public weight: any;

    public constructor(
        key: string,
        name: string,
        rotation: number,
        validNeighbors: { [name: string]: string[]; },
        newValid: any,
        weight: any
    ) {
        this.key = key;
        this.name = name;
        this.rotation = rotation;
        this.validNeighbors = validNeighbors;
        this.newValid = newValid;
        this.weight = weight;
    }
}
