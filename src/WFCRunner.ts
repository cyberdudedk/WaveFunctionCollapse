import { WFCConfig } from './WFCConfig';
import { WFCTiles } from './WFCTiles';


export class WFCRunner {
    public config: WFCConfig;
    public wfc: WFCTiles;

    public retryCount = 0;
    public stopRunning = true;
    public wfcLoop: NodeJS.Timer | undefined = undefined;

    public callback: any;

    public constructor(config: WFCConfig, wfc: WFC, callback: any) {
        this.config = config;
        this.wfc = wfc;

        this.callback = callback;
    }

    private getTilePositionsAsEntropyGroups() {
        let entropyGroups: { [entropy: number]: { x: number; y: number; }[]; } = {};
        this.wfc.tiles.forEach((column, x) => {
            column.forEach((tile, y) => {
                if (tile.validPieces) {
                    let entropy = tile.validPieces.length;
                    if (entropyGroups[entropy] == undefined) {
                        entropyGroups[entropy] = [];
                    }
                    entropyGroups[entropy].push({ x: x, y: y });
                }
            });
        });
        return entropyGroups;
    }

    public noValidFound() {
        this.retryCount++;
        this.stopWFCLoop();
        if (this.retryCount <= this.config.maxRetryCount) {
            this.startOver();
        } else {
            console.log('not possible to solve within ' + this.config.maxRetryCount + ' retries');
        }
    }

    public runWFC() {
        for (var i = 0; (i < this.config.runLoop) || this.config.fast; i++) {
            let stop = this.checkForStop();
            if (stop) {
                this.hasRunWFC();
                return;
            }
            if (this.stopRunning)
                return;
            let entropyGroups = this.getTilePositionsAsEntropyGroups();
            let entropyKeys = Object.keys(entropyGroups);
            if (entropyKeys.length == 0) {
                this.stopWFCLoop();
                return;
            }

            let lowestEntropyKey = Number(entropyKeys[0]);
            let lowestEntroyGroup = entropyGroups[lowestEntropyKey];
            let randomPositionFromLowestEntropyGroup = this.getRandomElementFromArray(lowestEntroyGroup);
            let x = randomPositionFromLowestEntropyGroup.x;
            let y = randomPositionFromLowestEntropyGroup.y;

            let currentTile = this.wfc.tiles[x][y];
            if (currentTile.validPieces != undefined) {
                if (currentTile.validPieces.length == 0) {
                    this.noValidFound();
                    return false;
                }
                let randomPiece = Math.floor(Math.random() * currentTile.validPieces.length);
                let tileKey = this.getRandomElementFromArrayWeigted(currentTile.validPieces);
                if (tileKey == null) {
                    this.noValidFound();
                    return false;
                }

                let piece = this.wfc.piecesMap[tileKey];
                this.wfc.tiles[x][y] = piece;
                if (piece == undefined) {
                    console.log('piece', x, y, piece, tileKey, randomPiece, currentTile.validPieces);
                }
                let validation = this.runValidation(x, y, [piece]);
                if (validation == null) {
                    break;
                }

                let depth = 0;
                while (validation.length > 0 && depth < this.config.maxDepth) {
                    let newValidations: any[] = [];
                    if (validation.length > 0) {
                        validation.forEach((v) => {
                            let validationTile = this.wfc.tiles[v.x][v.y];
                            let validationTilePieces = validationTile.validPieces;
                            let pieces = validationTilePieces.map((tileKey: string) => {
                                return this.wfc.piecesMap[tileKey];
                            });
                            let innerValidation = this.runValidation(v.x, v.y, pieces);
                            newValidations.push(innerValidation);
                        });
                    }
                    let newValidationsConcat = [].concat.apply([], newValidations);
                    let newValidationsSet = Array.from(new Set(newValidationsConcat));
                    depth += 1;
                    validation = newValidationsSet;
                }
            }
        }
        this.hasRunWFC();
    }

    public hasRunWFC = () => {
        this.callback();
    };

    public runValidation(x: number, y: number, pieces: any[]) {
        let recheck: any[] = [];
        let neighbors = [];
        if (y != 0) {
            neighbors.push(
                { direction: 'top', tile: this.wfc.tiles[x][y - 1] }
            );
        }

        if (x != this.config.tilesWidth - 1) {
            neighbors.push(
                { direction: 'right', tile: this.wfc.tiles[x + 1][y] }
            );
        }

        if (y != this.config.tilesHeight - 1) {
            neighbors.push(
                { direction: 'bottom', tile: this.wfc.tiles[x][y + 1] }
            );
        }

        if (x != 0) {
            neighbors.push(
                { direction: 'left', tile: this.wfc.tiles[x - 1][y] }
            );
        }

        neighbors.forEach((neighbor) => {

            if (neighbor.tile.validPieces) {
                let validBefore = neighbor.tile.validPieces.length;
                let validArray: any = [];
                pieces.forEach((piece) => {
                    validArray.push(neighbor.tile.validPieces
                        .filter((validPieceToCheck: string) => {
                            return piece.validNeighbors[neighbor.direction].includes(validPieceToCheck);
                        }));
                });
                let validArrayConcat = [].concat.apply([], validArray);
                let uniquevalidArraySet = Array.from(new Set(validArrayConcat));
                neighbor.tile.validPieces = uniquevalidArraySet;
                var validAfter = neighbor.tile.validPieces.length;
                if (validBefore != validAfter) {
                    recheck.push(neighbor.tile.position);
                }
            }
        });

        return recheck;
    }

    public checkForStop() {
        let stop = true;
        this.wfc.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if (tile.key == undefined) {
                    stop = false;
                    return false;
                }
            });
            if (!stop) {
                return false;
            }
        });

        if (stop) {
            console.log('checkForStop', 'return true');
            console.log('Found solution after ' + this.retryCount + ' retries');
            this.stopWFCLoop();
            return true;
        }
        return stop;
    }

    public stopWFCLoop() {
        this.stopRunning = true;
        clearInterval(this.wfcLoop);
    }

    public startOver() {
        this.wfc.reset();

        this.startWFCLoop(this.config.runSpeed);
    }

    public startWFCLoop(interval: number) {
        this.stopRunning = false;
        if (this.config.useMouse) {
        } else {
            this.wfcLoop = setInterval(() => {
                this.runWFC();
            }, interval);
        }
    }

    private getRandomElementFromArray(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }

    private getRandomElementFromArrayWeigted(array: any[]) {
        let summed: any = [];
        let sumCount = 0;
        let lastSum = 0;
        array.forEach((x, i) => {
            let weight = this.wfc.piecesMap[x].weight;
            if (weight > 0) {
                lastSum = sumCount;
                sumCount += weight;
                summed.push({
                    'key': x,
                    'minsum': lastSum,
                    'maxsum': sumCount
                });
            }
        });
        if (summed.length == 0)
            return null;

        let rnd = Math.random() * sumCount;
        let selected = summed.find((x: any) => {
            return x.minsum <= rnd && x.maxsum > rnd;
        });
        if (selected == undefined) {
            console.log('summed', summed);
        }
        return selected.key;
    }

}
