export class PieceObject {
    public key: string;
    public name: string;
    public rotation: number;
    public validNeighbors: { [name: string]: string[]; };
    public edgeblacklist: string[] | null;
    public weight: any;

    public constructor(
        key: string,
        name: string,
        rotation: number,
        validNeighbors: { [name: string]: string[]; },
        edgeblacklist: string[] | null,
        weight: any
    ) {
        this.key = key;
        this.name = name;
        this.rotation = rotation;
        this.validNeighbors = validNeighbors;
        this.edgeblacklist = edgeblacklist;
        this.weight = weight;
    }
}
