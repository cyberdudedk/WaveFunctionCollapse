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

export class WFCRender {
    public config: WFCConfig = new WFCConfig();
    public renderConfig: WFCRenderConfig = new WFCRenderConfig();

    public wfc: WFCTiles = new WFCTiles();
    public wfcRunner!: WFCRunner;

    //Rendering stuff
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private halfScaleHeight = this.config.tileScale / 2;
    private halfScaleWidth = this.config.tileScale / 2;

    public imagesMap: { [name: string]: CanvasImageSource; } = {};

    constructor(canvasId: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }

    private preloadImage(src: string): Promise<CanvasImageSource> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = (event) => resolve(image);
            image.onerror = (event) => reject();
            image.src = src;
            return image;
        });
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
        if(event.type != 'step' && event.type != "found") console.log('event', event.type, event.data);
        if(event.type == 'step') {
            this.draw(event.data.affectedTiles);
        } else if(event.type == 'reset') {
            this.startOver();
        } else {
            this.draw();
        }
        
        return true;
    };

    public async init(config: WFCConfig, renderConfig: WFCRenderConfig, wfc: WFCTiles, wfcRunner: WFCRunner) {
        this.config = config;
        this.renderConfig = renderConfig;

        this.resizeCanvas();

        this.ctx.fillStyle = "transparent";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);        
        
        this.wfc = wfc;

        this.wfcRunner = wfcRunner;
        this.wfcRunner.addCallback(this.wfcCallback);
    }

    public resizeCanvas() {
        if(this.config.sizingMethod == SizingMethod.CalcCanvasSize) 
        {
            this.canvas.height = this.config.tilesHeight * this.config.tileScale;
            this.canvas.width = this.config.tilesWidth * this.config.tileScale;
        }
        else 
        {
            this.canvas.height = this.config.canvasHeight;
            this.canvas.width = this.config.canvasWidth;
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

        this.halfScaleHeight = this.config.tileScale / 2;
        this.halfScaleWidth = this.config.tileScale / 2;
    }

    public async initImageData() {
        let pieces: any[] = this.wfc.wfcData.tilePieces[this.config.tileName];
        let tileImages = require('./metadata/render/' + this.config.tileName + '.json');
        let tileImageMap = tileImages.reduce((tileMap: any, tileImage: any) => {
            tileMap[tileImage.name] = tileImage.imgsrc;
            return tileMap;
        }, <{ [name: string]: string; }>{});

        let loadImagesAsync = pieces.map(async (x: any): Promise<{ name: string; img: CanvasImageSource; }> => {
            return {
                name: x.name,
                img: await this.preloadImage('tiles/' + this.config.tileName + '/' + tileImageMap[x.name])
            };
        });

        this.imagesMap = (await Promise.all(loadImagesAsync)).reduce((piecesMap, piece) => {
            piecesMap[piece.name] = piece.img;
            return piecesMap;
        }, <{ [name: string]: CanvasImageSource; }>{});
    }


    public initDraw() {
        this.startOver();
    }

    public startOver() {
        //this.wfcRunner.reset();
        this.reset();

        this.startWFCLoop(this.config.runSpeed);
    }

    public expand() {
        this.resizeCanvas();
        this.draw();
    }


    public reset() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    private getCursorPosition(event: MouseEvent) : {x: number, y: number} {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return { x, y };
    }

    private canvasClicked(event: MouseEvent) {
        
        event.button == 2
        let position = this.getCursorPosition(event);
        let tileX = Math.floor(position.x / this.config.tileScale) - this.config.offsetX;
        let tileY = Math.floor(position.y / this.config.tileScale) - this.config.offsetY;
        if(event.button == 0) {
            this.wfcRunner.cycleTile(tileX, tileY);
            this.draw();
        } else if(event.button == 2) {
            this.wfcRunner.placeCycledTile(tileX, tileY);
            this.draw();
        }
    }

    public startWFCLoop(interval: number) {
        if (this.config.useMouse) {
            this.canvas.addEventListener('click', (e) => {
                this.canvasClicked(e);
            });
            this.canvas.addEventListener('contextmenu', (e) => {
                this.canvasClicked(e);
                if(e.preventDefault != undefined) e.preventDefault();
                if(e.stopPropagation != undefined) e.stopPropagation();
                return false;
            });
        }
        this.draw();

        this.wfcRunner.start(interval);
    }

    public draw(tiles: {x: number, y: number}[] | undefined = undefined) {
        this.ctx.save();
        if(tiles != undefined) {
            this.drawTiles(tiles);
        }
        else {
            this.drawAllTiles();
        }
        
        this.ctx.restore();
    }

    public drawTiles(positions: {x: number, y: number}[]) {
        for(let pos of positions) {
            let columnIndex = pos.x;
            let rowIndex = pos.y;
            let column = this.wfc.tiles[columnIndex];
            
            let tile = column[rowIndex];
            if(tile) {
                if (!this.config.fast) {
                    if (tile.validPieces) {
                        this.clearTile(columnIndex, rowIndex);
                        this.drawSuperImposed(columnIndex, rowIndex, tile);
                    }
                }
                if (tile.key != undefined) {
                    this.clearTile(columnIndex, rowIndex);
                    this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.key].name], columnIndex, rowIndex, tile.rotation);
                } else if(tile.temporary) {
                    this.clearTile(columnIndex, rowIndex);
                    this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.temporary.key].name], columnIndex, rowIndex, tile.temporary.rotation, 0.8);
                }
            }
        }
    }

    public drawAllTiles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(let columnIndex = -this.config.offsetX; columnIndex < this.config.tilesWidth - this.config.offsetX; columnIndex++) {
            let column = this.wfc.tiles[columnIndex];
            for(let rowIndex = -this.config.offsetY; rowIndex < this.config.tilesHeight - this.config.offsetY; rowIndex++) {
                let tile = column[rowIndex];
                if(tile) {
                    if (!this.config.fast) {
                        if (tile.validPieces) {
                            //this.clearTile(columnIndex, rowIndex);
                            this.drawSuperImposed(columnIndex, rowIndex, tile);
                        }
                    }
                    if (tile.key != undefined) {
                        //this.clearTile(columnIndex, rowIndex);
                        this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.key].name], columnIndex, rowIndex, tile.rotation);
                    } else if(tile.temporary) {
                        //this.clearTile(columnIndex, rowIndex);
                        this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.temporary.key].name], columnIndex, rowIndex, tile.temporary.rotation, 0.8);
                    }
                }
            }
        }
    }

    private drawSuperImposed(columnIndex: number, rowIndex: number, tile: any) {
        if(this.renderConfig.renderType == RenderType.TilesAndSuperImposed || this.renderConfig.renderType == RenderType.SuperImposedOnly) {
            if(tile.key != undefined) return;
            let validCount = tile.validPieces.length;

            if (validCount > 0) {
                switch (this.renderConfig.superImposed) {
                    case SuperImposedState.Layered:
                        this.drawSuperImposed_Layered(columnIndex, rowIndex, tile, validCount);
                        break;
                    case SuperImposedState.GridScaled:
                        this.drawSuperImposed_GridScaled(columnIndex, rowIndex, tile, validCount);
                        break;
                    case  SuperImposedState.Grid:
                        this.drawSuperImposed_Grid(columnIndex, rowIndex, tile, validCount);
                        break;
                    case SuperImposedState.LayeredSorted:
                        this.drawSuperImposed_LayeredSorted(columnIndex, rowIndex, tile, validCount);
                        break;
                    case  SuperImposedState.GridAlpha:
                        this.drawSuperImposed_GridAlpha(columnIndex, rowIndex, tile, validCount);
                        break;
                }
            }
        }
    }

    private drawSuperImposed_Layered(columnIndex: number, rowIndex: number, tile: any, validCount: number) {
        tile.validPieces.forEach((key: string) => {
            let piece = this.wfc.piecesMap[key];
            let tileImage = this.imagesMap[piece.name];
            this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
        });
    }

    private drawSuperImposed_LayeredSorted(columnIndex: number, rowIndex: number, tile: any, validCount: number) {
        let sortedValid = tile.validPieces.sort((a: string, b: string) => {
            let pieceA = this.wfc.piecesMap[a];
            let pieceB = this.wfc.piecesMap[b];
            return pieceB.weight - pieceA.weight;
        });
        sortedValid.forEach((key: string) => {
            let piece = this.wfc.piecesMap[key];
            let tileImage = this.imagesMap[piece.name];
            this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
        });
    }

    private drawSuperImposed_GridScaled(columnIndex: number, rowIndex: number, tile: any, validCount: number) {
        let gridSize = Math.ceil(Math.sqrt(validCount));
        tile.validPieces.forEach((key: string, index: number) => {
            let piece = this.wfc.piecesMap[key];
            let tileImage = this.imagesMap[piece.name];
            this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, 0.4);
        });
    }

    private drawSuperImposed_Grid(columnIndex: number, rowIndex: number, tile: any, validCount: number) {
        let piecesCount = Object.keys(this.wfc.piecesMap).length;
        let gridSize = Math.ceil(Math.sqrt(piecesCount));
        let minWeight = 999;
        let maxWeight = 0;
        let sortedValid = tile.validPieces.sort((a: string, b: string) => {
            let pieceA = this.wfc.piecesMap[a];
            let pieceB = this.wfc.piecesMap[b];
            let weight = pieceA.weight;
            if (minWeight > weight) {
                minWeight = weight;
            }
            if (maxWeight < weight) {
                maxWeight = weight;
            }
            if(pieceA.weight == pieceB.weight) {
                return a.localeCompare(b);
            }
            return pieceB.weight - pieceA.weight;
        });
        sortedValid.forEach((key: string, index: number) => {
            let piece = this.wfc.piecesMap[key];
            let tileImage = this.imagesMap[piece.name];
            this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, piecesCount, 0.4);
        });
    }

    private drawSuperImposed_GridAlpha(columnIndex: number, rowIndex: number, tile: any, validCount: number) {
        let minWeight = 999;
        let maxWeight = 0;
        let sortedValid = tile.validPieces.sort((a: string, b: string) => {
            let pieceA = this.wfc.piecesMap[a];
            let pieceB = this.wfc.piecesMap[b];
            let weight = pieceA.weight;
            if (minWeight > weight) {
                minWeight = weight;
            }
            if (maxWeight < weight) {
                maxWeight = weight;
            }
            if(pieceA.weight == pieceB.weight) {
                return a.localeCompare(b);
            }
            return pieceB.weight - pieceA.weight;
        });
        sortedValid.forEach((key: string, index: number) => {
            let piece = this.wfc.piecesMap[key];
            let tileImage = this.imagesMap[piece.name];
            let weight = piece.weight;
            let weightPercent = ((weight - minWeight)) / (maxWeight - minWeight);
            let adjustedAlpha = (weightPercent * (0.6 - 0.2)) + 0.2;
            let gridSize = Math.ceil(Math.sqrt(validCount));
            this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, adjustedAlpha);
        });
    }

    private drawImgGrid(img: CanvasImageSource, x: number, y: number, rotation: number, alpha: number) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate(
            (this.config.tileScale * (x + this.config.offsetX)) + this.halfScaleWidth, 
            (this.config.tileScale * (y + this.config.offsetY)) + this.halfScaleHeight
        );
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -this.halfScaleWidth, -this.halfScaleHeight, this.config.tileScale, this.config.tileScale);
        this.ctx.restore();
    }

    private clearTile(x: number, y: number) {
        //this.ctx.save();
        
        this.ctx.clearRect(
            (this.config.tileScale * (x + this.config.offsetX)), 
            (this.config.tileScale * (y + this.config.offsetY)), 
            this.config.tileScale, this.config.tileScale
        );
        //this.ctx.restore();
    }

    private drawTile(img: CanvasImageSource, x: number, y: number, rotation: number, alpha: number = 1) {
        if(this.renderConfig.renderType == RenderType.TilesAndSuperImposed || this.renderConfig.renderType == RenderType.TilesOnly) {
            this.drawImgGrid(img, x, y, rotation, alpha);
        }
    }

    private drawSuperimposed(img: CanvasImageSource, x: number, y: number, rotation: number, possible: number) {
        this.drawImgGrid(img, x, y, rotation, 0.9 / possible);
    }

    private drawSuperimposedWeighted(img: CanvasImageSource, x: number, y: number, rotation: number, possible: number, alpha: number) {
        this.drawImgGrid(img, x, y, rotation, alpha);
    }

    private drawSuperimposedPartGrid(img: CanvasImageSource, x: number, y: number, gridSize: number, gridIndex: number, rotation: number, possible: number, alpha: number) {
        let width = this.config.tileScale / gridSize;
        let height = this.config.tileScale / (gridSize);
        let newX = (this.config.tileScale * (x + this.config.offsetX)) 
            + ((gridIndex % gridSize) * width);
        let newY = (this.config.tileScale * (y + this.config.offsetY)) 
            + ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg(img, newX, newY, width, height, rotation, alpha);
    }

    private drawImg(img: CanvasImageSource, x: number, y: number, width: number, height: number, rotation: number, alpha: number) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate(
            x + (width / 2), 
            y + (height / 2)
        );
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -(width / 2), -(height / 2), width, height);
        this.ctx.restore();
    }

    public getImage() {
        return this.canvas.toDataURL("image/png");
    }
}
