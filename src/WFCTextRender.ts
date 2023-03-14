import { SuperImposedState } from './SuperImposedState';
import { StartingPositions } from './StartingPositions';
import { SizingMethod } from './SizingMethod';
import { WFCConfig, WFCRenderConfig } from './WFCConfig';
import { WFCData } from './WFCData';
import { WFCRunner } from './WFCRunner';
import { WFCTiles } from './WFCTiles';
import { WFCEvent } from './WFCEvent';
import { RunMethod } from './RunMethod';
import { RenderType } from './RenderType';

export class WFCTextRender {
    public config: WFCConfig = new WFCConfig();

    public wfc: WFCTiles = new WFCTiles();
    public wfcRunner!: WFCRunner;

    //Rendering stuff
    public textField: HTMLDivElement;

    constructor(canvasId: string) {
        this.textField = <HTMLDivElement>document.getElementById(canvasId);
    }

    public getAvailableTiles() {
        return Object.keys(this.wfc.wfcData.tileSets);
    }

    public getSuperImposedStates() {
        return SuperImposedState;
    }

    public getStartingPositions() {
        return StartingPositions;
    }

    public getSizingMethods() {
        return SizingMethod;
    }

    public getRunMethods() {
        return RunMethod;
    }

    public getRenderTypes() {
        return RenderType;
    }

    public getAvailableSets(tileName: string) {
        var sets = this.wfc.wfcData.tileSets[tileName];
        if (sets == null)
            return null;
        return Object.keys(sets);
    }

    public getTileSets(): { [name: string]: any; } {
        return this.wfc.wfcData.tileSets;
    }
   
    private wfcCallback = (event: WFCEvent) : boolean => {
        if(event.type != 'step' && 
            event.type != "found" && 
            event.type != "stopped" &&
            event.type != "reset"
        ) console.log('event', event.type, event.data);
        if(event.type == 'step') {
            this.draw(event.data.affectedTiles);
        } else if(event.type == 'reset') {
        } else {
            this.draw();
        }
        
        return true;
    };

    public async init(config: WFCConfig, wfc: WFCTiles, wfcRunner: WFCRunner) {
        this.config = config;

        this.resizeCanvas();

        this.wfc = wfc;

        this.wfcRunner = wfcRunner;
        this.wfcRunner.addCallback(this.wfcCallback);
    }

    public resizeCanvas() {
        if(this.config.sizingMethod == SizingMethod.CalcCanvasSize) 
        {
            this.textField.style.height = (this.config.tilesHeight * this.config.tileScale) + "px";
            this.textField.style.width = this.config.tilesWidth * this.config.tileScale + "px";
        }
        else 
        {
            this.textField.style.height = this.config.canvasHeight + "px";
            this.textField.style.width = this.config.canvasWidth + "px";
        }

        //TODO: Move this check to the config
        if(this.config.sizingMethod == SizingMethod.CalcTileSize) 
        {
            this.config.tilesHeight = Math.floor(this.config.canvasHeight / this.config.tileScale);
            this.config.tilesWidth = Math.floor(this.config.canvasWidth / this.config.tileScale);
        }
        else if(this.config.sizingMethod == SizingMethod.CalcTileScale) 
        {
            this.config.tileScale = Math.max(Math.floor(this.config.canvasHeight) / this.config.tilesHeight, Math.floor(this.config.canvasWidth / this.config.tilesWidth));
        }
    }

    public expand() {
        this.resizeCanvas();
        this.draw();
    }

    public draw(tiles: {x: number, y: number}[] | undefined = undefined) {
        this.drawAllTiles();
    }

    public drawAllTiles() {
        let result = [];
        
        for(let columnIndex = -this.config.offsetX; columnIndex < this.config.tilesWidth - this.config.offsetX; columnIndex++) {
            let columIndexPos = columnIndex + this.config.offsetX;
            if(result[columIndexPos] == undefined) {
                let row: string[] = [];
                result[columIndexPos] = row
            }
            let column = this.wfc.tiles[columnIndex];
            for(let rowIndex = -this.config.offsetY; rowIndex < this.config.tilesHeight - this.config.offsetY; rowIndex++) {
                let tile = column[rowIndex];
                if(tile) {
                    if (tile.key != undefined) {
                        let tileStr = tile.key;
                        result[columIndexPos].push(tileStr);
                    }
                }
            }
        }

        let jsonStr = JSON.stringify(result, null, 2);
        this.textField.innerHTML = "<pre>" + jsonStr + "</pre>";
    }
}
