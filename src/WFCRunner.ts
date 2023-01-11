import { PieceObject } from './PieceObject';
import { WFCConfig } from './WFCConfig';
import { WFCTiles } from './WFCTiles';


export class WFCRunner {
    public config: WFCConfig;
    public wfc: WFCTiles;

    public retryCount = 0;
    public stopRunning = true;
    public wfcLoop: NodeJS.Timer | undefined = undefined;

    public callback: any;

    public constructor(config: WFCConfig, wfc: WFCTiles, callback: any) {
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
            //console.log('no valid found, retrying', this.retryCount);
            if(!this.config.fast) {
                this.hasRunWFC();
            }
            
            this.reset();
            this.startWFCLoop(this.config.runSpeed);
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

                let tileKey = this.getRandomElementFromArrayWeigted(currentTile.validPieces);
                if (tileKey == null) {
                    this.noValidFound();
                    return false;
                }

                let placed = this.placeTile(x, y, tileKey);
                if(!placed) {
                    break;
                }
            }
        }
        if( !this.config.fast ) {
            this.hasRunWFC();
        }
    }

    public placeTile(x: number, y: number, tileKey: string) {
        let piece = this.wfc.piecesMap[tileKey];
        this.wfc.tiles[x][y] = piece;
        let validation = this.runValidation(x, y, [piece]);
        if (validation == null) {
            return false;
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
        this.wfc.tileCounters[piece.name].count += 1;
        this.checkForMaximumTiles(piece.name);
        return true;
    }

    public hasRunWFC = () => {
        this.callback();
    };

    public runValidation(x: number, y: number, pieces: any[]) {
        let recheck: any[] = [];
        let neighbors = [];
        
        if (this.config.edgeWrapAround || y != 0) {
            neighbors.push(
                { direction: 'top', tile: this.wfc.tiles[x][((y - 1) + this.config.tilesHeight) % (this.config.tilesHeight)] }
            );
        }

        if (this.config.edgeWrapAround || x != this.config.tilesWidth - 1) {
            neighbors.push(
                { direction: 'right', tile: this.wfc.tiles[((x + 1) + this.config.tilesWidth) % (this.config.tilesWidth)][y] }
            );
        }

        if (this.config.edgeWrapAround || y != this.config.tilesHeight - 1) {
            neighbors.push(
                { direction: 'bottom', tile: this.wfc.tiles[x][((y + 1) + this.config.tilesHeight) % (this.config.tilesHeight)] }
            );
        }

        if (this.config.edgeWrapAround || x != 0) {
            neighbors.push(
                { direction: 'left', tile: this.wfc.tiles[((x - 1) + this.config.tilesWidth) % (this.config.tilesWidth)][y] }
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

    public reset() {
        this.wfc.reset();
        this.setStartTiles();
    }

    public setStartTiles() {
        let failed = false;
        Object.entries(this.wfc.tileCounters).forEach((values) => {
            if(failed) return;
            let tileCounterKey = values[0];
            let countObject = values[1];
            if(countObject.minimum != undefined && countObject.minimum > 0) {
                let maxTrySet = countObject.minimum * 10;
                let trySet = 0;
                while(countObject.count < countObject.minimum && trySet < maxTrySet) {
                    trySet++;
                    let x = Math.floor(Math.random() * this.config.tilesWidth);
                    let y = Math.floor(Math.random() * this.config.tilesHeight);
                    let tile = this.wfc.tiles[x][y];
                    let tilePieces = tile.validPieces;
                    if(tile.validPieces == undefined) continue;
                    if(tile.validPieces.length == 0) continue;
                    let counterTiles = tilePieces.filter((tileKey: string) => this.wfc.piecesMap[tileKey].name == tileCounterKey);

                    if(counterTiles.length > 0) {
                        let randomIndex = Math.floor(Math.random() * counterTiles.length);
                        let placeTileKey = counterTiles[randomIndex];
                        let placed = this.placeTile(x, y, placeTileKey);
                        if(!placed) {
                            continue;
                        }
                    }
                    
                    
                }

                if(countObject.count < countObject.minimum) {
                    failed = true;
                }
            }

        });

        if(failed) {
            this.noValidFound();
        } else {
            this.checkForMaximumTilesReached();
        }
    }

    public checkForMaximumTilesReached() {
        Object.entries(this.wfc.tileCounters).forEach((values) => {
            let tileCounterKey = values[0];
            this.checkForMaximumTiles(tileCounterKey);
        });
    }

    public checkForMaximumTiles(tileName: string) {
        var countObject = this.wfc.tileCounters[tileName];
        if(countObject.maximum != undefined) {
            if(countObject.count >= countObject.maximum) {
                this.maximumReached(tileName);
            }
        }
    }

    public maximumReached(tileName: string) 
    {
        let pieceObjectsForRemoval = Object.entries(this.wfc.piecesMap)
            .filter((values) => values[1].name == tileName )
            .map((values) => values[0]);

        this.wfc.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if(tile.validPieces) {
                    tile.validPieces = tile.validPieces.filter((tileKey: string) => !pieceObjectsForRemoval.includes(tileKey));
                }
            });
        });
    }

    public start(interval: number) {
        this.startWFCLoop(interval);
    }

    public startWFCLoop(interval: number) {
        this.stopWFCLoop();
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
