import { StartingPositions } from "./StartingPositions";
import { SuperImposedState } from "./SuperImposedState";
import { SizingMethod } from "./SizingMethod";
import { RunMethod } from "./RunMethod";
import { RenderType } from "./RenderType";
import { Backtracking } from "./Backtracking";

export class WFCConfig {
    public maxRetryCount: number = 10;
    public maxDepth: number = 100;
    public tileScale: number = 40;
    public fast: boolean = false;
    public runSpeed: number = 10;
    public runLoop: number = 30;

    public tilesHeight: number = 30;
    public tilesWidth: number = 30;
    public useMouse: boolean = false;

    public edgeWrapAround: boolean = false;
    public edgeSocket: string = "";

    public tileName: string = 'Knots';
    public set: string = 'all';

    public startingPosition: StartingPositions = StartingPositions.Random;

    public canvasHeight: number = 450;
    public canvasWidth: number = 450;
    public sizingMethod: SizingMethod = SizingMethod.Fixed;

    public offsetX: number = 0;
    public offsetY: number = 0;
    
    public autoExpandSize: number = 1;
    public autoExpand: boolean = false;

    public runMethod: RunMethod = RunMethod.AutoRun;

    public neighborDistance: number = 1;
    public gridSize: number = 0;

    public backtracking: Backtracking = Backtracking.None;
}

export class WFCRenderConfig {
    public superImposed: SuperImposedState = SuperImposedState.Layered;
    public renderType: RenderType = RenderType.TilesAndSuperImposed;

    public canvasHeight: number = 450;
    public canvasWidth: number = 450;
    public sizingMethod: SizingMethod = SizingMethod.Fixed;
}
