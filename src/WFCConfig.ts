
export class WFCConfig {
    public maxRetryCount: number = 10;
    public maxDepth: number = 100;
    public tileScale: number = 40;
    public fast: boolean = false;
    public runSpeed: number = 10;
    public runLoop: number = 30;

    public tilesHeight: number = 30;
    public tilesWidth: number = 30;
    public superImposed: number = 1;
    public useMouse: boolean = false;

    public edgeWrapAround: boolean = false;
    public edgeSocket: string = "";

    public tileName: string = 'Knots';
    public set: string = 'all';
}
