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
import { Backtracking } from './Backtracking';

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

    private gridHashmap: { [key: string]: CanvasImageSource; } = {};

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

    private preloadColorImage(color: string): Promise<CanvasImageSource> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d")!;
            canvas.width = 10;
            canvas.height = 10;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 10, 10);
            image.src = canvas.toDataURL();
            resolve(image);
        });
    }

    private preloadPixelColorImage(src: string): Promise<CanvasImageSource> {
        return new Promise((resolve, reject) => {

            const image = new Image();
            image.onload = (event) => {
                const colorImage = new Image();
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext("2d")!;
                const colorCanvas = document.createElement('canvas');
                const colorCtx = colorCanvas.getContext("2d")!;
                let r = 0;
                let g = 0;
                let b = 0;

                if(this.renderConfig.renderType == RenderType.PixelBasedColorDominant) {
                    ctx.imageSmoothingEnabled = true;
                    ctx!.drawImage(image, 0, 0, 1, 1);
                    const dominantColor = ctx!.getImageData(0, 0, 1, 1).data.slice(0,3);
                    r = dominantColor[0];
                    g = dominantColor[1];
                    b = dominantColor[2];
                } else if(this.renderConfig.renderType == RenderType.PixelBasedColorAverage) {
                    var blockSize = 5, // only visit every 5 pixels
                    data, width, height,
                    i = -4,
                    length,
                    rgb = {r:0,g:0,b:0},
                    count = 0;
                    height = canvas.height = image.naturalHeight || image.offsetHeight || image.height;
                    width = canvas.width = image.naturalWidth || image.offsetWidth || image.width;
                    ctx.drawImage(image, 0, 0);
                    data = ctx.getImageData(0, 0, width, height);
                    length = data.data.length;
                    while ( (i += blockSize * 4) < length ) {
                        ++count;
                        rgb.r += data.data[i];
                        rgb.g += data.data[i+1];
                        rgb.b += data.data[i+2];
                    }
            
                    // ~~ used to floor values
                    r = ~~(rgb.r/count);
                    g = ~~(rgb.g/count);
                    b = ~~(rgb.b/count);
                }
                colorCanvas.width = 10;
                colorCanvas.height = 10;
                colorCtx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 1)"; 
                colorCtx.fillRect(0, 0, 10, 10);
                colorImage.src = colorCanvas.toDataURL();
                resolve(colorImage);
            }
            image.onerror = (event) => reject();
            image.src = src;
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

    public getBacktrackingMethods() {
        return Backtracking;
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
        ) {
            //console.log('event', event.type, event.data);
        }
        if(event.type == 'step') {
            if(this.renderConfig.renderType != RenderType.None) this.draw(event.data.affectedTiles);
        } else if(event.type == 'reset') {
            //if(this.renderConfig.renderType != RenderType.None) 
            this.startOver();
        } else {
            //if(this.renderConfig.renderType != RenderType.None) console.log('calling draw from wfcCallback', event);
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
            if(this.renderConfig.renderType == RenderType.ColorOnly) {
                tileMap[tileImage.name] = tileImage.color;
            } else {
                tileMap[tileImage.name] = tileImage.imgsrc;
            }
            return tileMap;
        }, <{ [name: string]: string; }>{});

        
        let loadImagesAsync: Promise<{
            name: string;
            img: CanvasImageSource;
        }>[] = [];
        

        if(this.renderConfig.renderType == RenderType.ColorOnly) {
            loadImagesAsync = pieces.map(async (x: any): Promise<{ name: string; img: CanvasImageSource; }> => {
                return {
                    name: x.name,
                    img: await this.preloadColorImage(tileImageMap[x.name])
                };
            });
        } else if(this.renderConfig.renderType == RenderType.PixelBasedColorDominant || 
            this.renderConfig.renderType == RenderType.PixelBasedColorAverage) {
            loadImagesAsync = pieces.map(async (x: any): Promise<{ name: string; img: CanvasImageSource; }> => {
                return {
                    name: x.name,
                    img: await this.preloadPixelColorImage('tiles/' + this.config.tileName + '/' + tileImageMap[x.name])
                };
            });
        } 
        else {
            loadImagesAsync = pieces.map(async (x: any): Promise<{ name: string; img: CanvasImageSource; }> => {
                return {
                    name: x.name,
                    img: await this.preloadImage('tiles/' + this.config.tileName + '/' + tileImageMap[x.name])
                };
            });
        }

        this.imagesMap = (await Promise.all(loadImagesAsync)).reduce((piecesMap, piece) => {
            piecesMap[piece.name] = piece.img;
            return piecesMap;
        }, <{ [name: string]: CanvasImageSource; }>{});
    }


    public initDraw() {
        this.startOver();
    }

    public startOver() {
        this.reset();
        this.startWFCLoop(this.config.runSpeed);
    }

    public expand() {
        this.resizeCanvas();
        if(this.renderConfig.renderType != RenderType.None) console.log('calling draw from expand');
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
            if(this.renderConfig.renderType != RenderType.None) console.log('calling draw from canvasClicked');
            this.draw();
        } else if(event.button == 2) {
            this.wfcRunner.placeCycledTile(tileX, tileY);
            if(this.renderConfig.renderType != RenderType.None) console.log('calling draw from canvasClicked');
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
    }

    public draw(tiles: {x: number, y: number}[] | undefined = undefined) {
        if(this.renderConfig.renderType != RenderType.None) {
            this.ctx.save();
            if(tiles != undefined) {
                this.drawTiles(tiles);
            }
            else {
                this.drawAllTiles();
            }
            
            this.ctx.restore();
        }
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
                        if(this.renderConfig.renderType == RenderType.TilesAndSuperImposed || this.renderConfig.renderType == RenderType.SuperImposedOnly) {
                            this.clearTile(columnIndex, rowIndex);
                            this.drawSuperImposed(columnIndex, rowIndex, tile);
                        }
                    }
                }
                if(this.renderConfig.renderType == RenderType.TilesAndSuperImposed || 
                    this.renderConfig.renderType == RenderType.TilesOnly ||
                    this.renderConfig.renderType == RenderType.ColorOnly ||
                    this.renderConfig.renderType == RenderType.PixelBasedColorAverage ||
                    this.renderConfig.renderType == RenderType.PixelBasedColorDominant
                    ) {
                        if (tile.key != undefined) {
                            this.clearTile(columnIndex, rowIndex);
                            this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.key].name], columnIndex, rowIndex, tile.rotation);
                        } else if(tile.temporary && this.renderConfig.renderType == RenderType.TilesAndSuperImposed) {
                            this.clearTile(columnIndex, rowIndex);
                            this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.temporary.key].name], columnIndex, rowIndex, tile.temporary.rotation, 0.8);
                        }
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
                            if(this.renderConfig.renderType == RenderType.TilesAndSuperImposed || this.renderConfig.renderType == RenderType.SuperImposedOnly) {
                                this.drawSuperImposed(columnIndex, rowIndex, tile);
                            }
                        }
                    }
                    if(this.renderConfig.renderType == RenderType.TilesAndSuperImposed || 
                        this.renderConfig.renderType == RenderType.TilesOnly ||
                        this.renderConfig.renderType == RenderType.ColorOnly ||
                        this.renderConfig.renderType == RenderType.PixelBasedColorAverage ||
                        this.renderConfig.renderType == RenderType.PixelBasedColorDominant
                        ) {
                        if (tile.key != undefined) {
                            this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.key].name], columnIndex, rowIndex, tile.rotation);
                        } else if(tile.temporary && this.renderConfig.renderType == RenderType.TilesAndSuperImposed) {
                            this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.temporary.key].name], columnIndex, rowIndex, tile.temporary.rotation, 0.8);
                        }
                    }
                }
            }
        }
    }

    private drawSuperImposed(columnIndex: number, rowIndex: number, tile: any) {
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

    private drawSuperImposed_Layered(columnIndex: number, rowIndex: number, tile: any, validCount: number) {
        this.drawSuperImposedCache(tile.validPieces, (ctx: CanvasRenderingContext2D) => {
            tile.validPieces.forEach((key: string) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                this.drawSuperimposed_single(ctx, tileImage, piece.rotation, validCount);
            });
        }, (canvas: CanvasImageSource) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
        });
    }

    private drawSuperImposed_LayeredSorted(columnIndex: number, rowIndex: number, tile: any, validCount: number) {
        let sortedValid = tile.validPieces.sort((a: string, b: string) => {
            let pieceA = this.wfc.piecesMap[a];
            let pieceB = this.wfc.piecesMap[b];
            return pieceB.weight - pieceA.weight;
        });

        this.drawSuperImposedCache(sortedValid, (ctx: CanvasRenderingContext2D) => {
            sortedValid.forEach((key: string, index: number) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                this.drawSuperimposed_single(ctx, tileImage, piece.rotation, validCount);
            });
        }, (canvas: CanvasImageSource) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
        });
    }

    private drawSuperImposed_GridScaled(columnIndex: number, rowIndex: number, tile: any, validCount: number) {
        let gridSize = Math.ceil(Math.sqrt(validCount));
        this.drawSuperImposedCache(tile.validPieces, (ctx: CanvasRenderingContext2D) => {
            tile.validPieces.forEach((key: string, index: number) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                this.drawSuperimposedPartGrid_single(ctx, tileImage, gridSize, index, piece.rotation, validCount, 0.6);
            });
        }, (canvas: CanvasImageSource) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
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
        
        this.drawSuperImposedCache(sortedValid, (ctx: CanvasRenderingContext2D) => {
            sortedValid.forEach((key: string, index: number) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                this.drawSuperimposedPartGrid_single(ctx, tileImage, gridSize, index, piece.rotation, piecesCount, 0.5);
            });
        }, (canvas: CanvasImageSource) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
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


        this.drawSuperImposedCache(sortedValid, (ctx: CanvasRenderingContext2D) => {
            sortedValid.forEach((key: string, index: number) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                let weight = piece.weight;
                let weightPercent = ((weight - minWeight)) / (maxWeight - minWeight);
                let adjustedAlpha = (weightPercent * (0.6 - 0.2)) + 0.2;
                let gridSize = Math.ceil(Math.sqrt(validCount));
                this.drawSuperimposedPartGrid_single(ctx, tileImage, gridSize, index, piece.rotation, validCount, adjustedAlpha);
            });
        }, (canvas: CanvasImageSource) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
        });
    }
    
    private drawSuperImposedCache(arr: string[], drawFunction: (ctx: CanvasRenderingContext2D) => void, drawTileFunction: (canvas: CanvasImageSource) => void) {
        let sortedValidStr = arr.join('|');
        let hash = JSON.stringify(sortedValidStr);
        if(hash in this.gridHashmap) {
            drawTileFunction(this.gridHashmap[hash]);
        }
        else {
            let canvas = document.createElement('canvas');
            this.gridHashmap[hash] = canvas; 
            let ctx = canvas.getContext("2d")!;
            
            canvas.width = this.config.tileScale;
            canvas.height = this.config.tileScale;
            drawFunction(ctx);
            drawTileFunction(canvas);      
        }
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

    private drawImgGrid_onContext(ctx: CanvasRenderingContext2D, img: CanvasImageSource, rotation: number, alpha: number) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(
            this.halfScaleWidth, 
            this.halfScaleHeight
        );
        ctx.rotate((rotation * 90) * (Math.PI / 180));
        ctx.drawImage(img, -this.halfScaleWidth, -this.halfScaleHeight, this.config.tileScale, this.config.tileScale);
        ctx.restore();
    }

    private clearTile(x: number, y: number) {
        this.ctx.clearRect(
            (this.config.tileScale * (x + this.config.offsetX)), 
            (this.config.tileScale * (y + this.config.offsetY)), 
            this.config.tileScale, this.config.tileScale
        );
    }

    private drawTile(img: CanvasImageSource, x: number, y: number, rotation: number, alpha: number = 1) {
        this.drawImgGrid(img, x, y, rotation, alpha);
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

    private drawSuperimposedPartGrid_single(ctx: CanvasRenderingContext2D, img: CanvasImageSource, gridSize: number, gridIndex: number, rotation: number, possible: number, alpha: number) {
        let width = this.config.tileScale / gridSize;
        let height = this.config.tileScale / (gridSize);
        let newX = ((gridIndex % gridSize) * width);
        let newY = ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg_onContext(ctx, img, newX, newY, width, height, rotation, alpha);
    }

    private drawSuperimposed_single(ctx: CanvasRenderingContext2D, img: CanvasImageSource, rotation: number, possible: number) {
        this.drawImgGrid_onContext(ctx, img, rotation, 0.9 / possible);
    }

    private drawSuperimposedWeighted_single(ctx: CanvasRenderingContext2D, img: CanvasImageSource, rotation: number, possible: number, alpha: number) {
        this.drawImgGrid_onContext(ctx, img, rotation, alpha);
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

    private drawImg_onContext(ctx: CanvasRenderingContext2D, img: CanvasImageSource, x: number, y: number, width: number, height: number, rotation: number, alpha: number) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(
            x + (width / 2), 
            y + (height / 2)
        );
        ctx.rotate((rotation * 90) * (Math.PI / 180));
        ctx.drawImage(img, -(width / 2), -(height / 2), width, height);
        ctx.restore();
    }

    public getImage() {
        return this.canvas.toDataURL("image/png");
    }
}
