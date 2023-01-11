import { SuperImposedState } from './SuperImposedState';
import { WFCConfig } from './WFCConfig';
import { WFCData } from './WFCData';
import { WFCRunner } from './WFCRunner';
import { WFCTiles } from './WFCTiles';


export class WFCRender {
    public config: WFCConfig = new WFCConfig();
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

    public getAvailableSets(tileName: string) {
        var sets = this.wfc.wfcData.tileSets[tileName];
        if (sets == null)
            return null;
        return Object.keys(sets);
    }

    public getTileSets(): { [name: string]: any; } {
        return this.wfc.wfcData.tileSets;
    }

    public getWFCData(): WFCData {
        return this.wfc.wfcData;
    }

    public getWFC(): WFCTiles {
        return this.wfc;
    }

    private wfcCallback = () => {
        this.draw();
    };

    public async init(config: WFCConfig) {
        console.clear();
        this.config = config;
        this.wfc = new WFCTiles();
        this.wfc.init(config);

        this.wfcRunner = new WFCRunner(config, this.wfc, this.wfcCallback);

        await this.initImageData();

        let ctx = this.ctx;
        let canvas = this.canvas;

        this.halfScaleHeight = this.config.tileScale / 2;
        this.halfScaleWidth = this.config.tileScale / 2;
        canvas.height = this.config.tilesHeight * this.config.tileScale;
        canvas.width = this.config.tilesWidth * this.config.tileScale;
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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
        this.wfc.reset();
        this.reset();

        this.startWFCLoop(this.config.runSpeed);
    }


    public reset() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public startWFCLoop(interval: number) {
        if (this.config.useMouse) {
            document.body.addEventListener('click', () => this.wfcRunner.runWFC(), true);
        }
        this.draw();

        this.wfcRunner.startWFCLoop(interval);
    }

    public draw() {
        this.ctx.save();
        this.drawTiles();
        this.ctx.restore();
    }

    public drawTiles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.wfc.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if (!this.config.fast) {
                    if (tile.validPieces) {
                        this.drawSuperImposed(columnIndex, rowIndex, tile);
                    }
                }
                if (tile.key != undefined) {
                    this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.key].name], columnIndex, rowIndex, tile.rotation);
                }
            });
        });
    }

    private drawSuperImposed(columnIndex: number, rowIndex: number, tile: any) {
        let validCount = tile.validPieces.length;
        if (validCount > 0) {
            switch (this.config.superImposed) {
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
        tile.validPieces.forEach((key: string, index: number) => {
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
        this.ctx.translate((this.config.tileScale * x) + this.halfScaleWidth, (this.config.tileScale * y) + this.halfScaleHeight);
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -this.halfScaleWidth, -this.halfScaleHeight, this.config.tileScale, this.config.tileScale);
        this.ctx.restore();
    }

    private drawTile(img: CanvasImageSource, x: number, y: number, rotation: number) {
        this.drawImgGrid(img, x, y, rotation, 1);
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
        let newX = (this.config.tileScale * x) + ((gridIndex % gridSize) * width);
        let newY = (this.config.tileScale * y) + ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg(img, newX, newY, width, height, rotation, alpha);
    }

    private drawImg(img: CanvasImageSource, x: number, y: number, width: number, height: number, rotation: number, alpha: number) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate(x + (width / 2), y + (height / 2));
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -(width / 2), -(height / 2), width, height);
        this.ctx.restore();
    }

    public getImage() {
        return this.canvas.toDataURL("image/png");
    }
}
