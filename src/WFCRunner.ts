import { PieceObject } from './PieceObject';
import { RunMethod } from './RunMethod';
import { StartingPositions } from './StartingPositions';
import { WFCConfig } from './WFCConfig';
import { WFCEvent } from './WFCEvent';
import { WFCTiles } from './WFCTiles';


export class WFCRunner {
    public config: WFCConfig;
    public wfc: WFCTiles;

    public retryCount = 0;
    public stopRunning = true;
    public wfcLoop: NodeJS.Timer | undefined = undefined;

    public callback: (event: WFCEvent) => boolean;
    
    private pickFirstTile = true;

    public constructor(config: WFCConfig, wfc: WFCTiles, callback: (event: WFCEvent) => boolean) {
        this.config = config;
        this.wfc = wfc;

        this.callback = callback;
    }

    public expand() {
        let newCells = this.wfc.expand();
        newCells.forEach((cell) => {
            let placedNeighbors = this.runValidation(cell.x, cell.y, [], true);

            if (placedNeighbors.length > 0) {
                placedNeighbors.forEach((position) => {
                    let piece = this.wfc.tiles[position.x][position.y];
                    this.runValidationLoop(position.x, position.y, [piece]);
                });
            }
        });
    }

    private getTilePositionsAsEntropyGroups() {
        let entropyGroups: { [entropy: number]: { x: number; y: number; }[]; } = {};
        for(let x = -this.config.offsetX; x < this.config.tilesWidth - this.config.offsetX; x++) {
            let column = this.wfc.tiles[x];
            for(let y = -this.config.offsetY; y < this.config.tilesHeight - this.config.offsetY; y++) {
                let tile = column[y];
                if (tile.key == undefined) {
                    let entropy = tile.validPieces.length;
                    if (entropyGroups[entropy] == undefined) {
                        entropyGroups[entropy] = [];
                    }
                    entropyGroups[entropy].push({ x: x, y: y });
                }
            }
        }
        return entropyGroups;
    }

    public noValidFound() {
        this.retryCount++;
        this.stopWFCLoop();
        if (this.retryCount <= this.config.maxRetryCount) {
            if(!this.config.fast) {
                this.hasRunWFC(new WFCEvent('retry'));
            }
            
            this.reset();
            this.startWFCLoop(this.config.runSpeed);
        } else {
            console.log('not possible to solve within ' + this.config.maxRetryCount + ' retries');
            this.hasRunWFC(new WFCEvent('unsolvable'));
        }
    }

    private pickPosition(position: StartingPositions): {x: number, y: number} | null {
        switch(position) {
            case StartingPositions.TopLeft:
                return {x: -this.config.offsetX, y: -this.config.offsetY};
            case StartingPositions.TopCenter:
                return {x: Math.floor(this.config.tilesWidth / 2) - this.config.offsetX, y: -this.config.offsetY};
            case StartingPositions.TopRight:
                return {x: this.config.tilesWidth - this.config.offsetX - 1, y: -this.config.offsetY};
            case StartingPositions.CenterLeft:
                return {x: -this.config.offsetX, y: Math.floor(this.config.tilesHeight / 2)-this.config.offsetY};
            case StartingPositions.Mid:
                return {x: Math.floor(this.config.tilesWidth / 2) - this.config.offsetX, y: Math.floor(this.config.tilesHeight / 2)-this.config.offsetY};
            case StartingPositions.CenterRight:
                return {x: this.config.tilesWidth - this.config.offsetX - 1, y: Math.floor(this.config.tilesHeight / 2) -this.config.offsetY };
            case StartingPositions.BottomLeft:
                return {x: -this.config.offsetX, y: this.config.tilesHeight - this.config.offsetY - 1};
            case StartingPositions.BottomCenter:
                return {x: Math.floor(this.config.tilesWidth / 2) - this.config.offsetX, y: this.config.tilesHeight - this.config.offsetY - 1};
            case StartingPositions.BottomRight:
                return {x: this.config.tilesWidth - this.config.offsetX - 1, y: this.config.tilesHeight - this.config.offsetY - 1};
            case StartingPositions.Random:
                let entropyGroups = this.getTilePositionsAsEntropyGroups();
                let entropyKeys = Object.keys(entropyGroups);
                if (entropyKeys.length == 0) {
                    return null;
                }
                let lowestEntropyKey = Number(entropyKeys[0]);
                let lowestEntroyGroup = entropyGroups[lowestEntropyKey];
                let randomPositionFromLowestEntropyGroup = this.getRandomElementFromArray(lowestEntroyGroup);
                return randomPositionFromLowestEntropyGroup;
        }
    }

    public runWFC() {
        for (var i = 0; (i < this.config.runLoop) || this.config.fast; i++) {
            let stop = this.checkForStop();
            if (stop) {
                this.hasRunWFC(new WFCEvent('stop'));
                return;
            }
            if (this.stopRunning)
                return;

            let pos = null;
            if(this.pickFirstTile) {
                pos = this.pickPosition(this.config.startingPosition);
                this.pickFirstTile = false;
            } else {
                pos = this.pickPosition(StartingPositions.Random);
            }

            if(pos == null) {
                console.log('noposition found stopping');
                this.stopWFCLoop();
                return;
            }

            let placed = this.placeTilePosition(pos.x, pos.y);
            if(placed == false) {
                break;
            }

        }
        if( !this.config.fast ) {
            this.hasRunWFC(new WFCEvent('step'));
        }
    }

    public placeTilePosition(x: number, y: number) : boolean | undefined {
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
                return false;
            }
            return true;
        }
    }

    public cycleTile(x: number, y: number) {
        let currentTile = this.wfc.tiles[x][y];
        if(currentTile.validPieces == undefined || currentTile.validPieces.length == 0) {
            return;
        }
        if(currentTile.cycle == undefined) {
            currentTile.cycle = 0;
        } else {
            currentTile.cycle += 1;
        }
        currentTile.cycle = currentTile.cycle % currentTile.validPieces.length;
        let tileKey = currentTile.validPieces[currentTile.cycle];
        let piece = this.wfc.piecesMap[tileKey];
        currentTile.temporary = piece;

    }

    public placeCycledTile(x: number, y: number) {
        let currentTile = this.wfc.tiles[x][y];
        if(currentTile.temporary == undefined) {
            return;
        }
        let temporary = currentTile.temporary;
        currentTile.temporary = undefined;
        this.placeTile(x, y, temporary.key);
    }

    public placeTile(x: number, y: number, tileKey: string) {
        let piece = this.wfc.piecesMap[tileKey];
        this.wfc.tiles[x][y] = Object.assign(this.wfc.tiles[x][y],  piece);
        //this.wfc.tiles[x][y] = piece;
        this.runValidationLoop(x, y, [piece]);

        this.wfc.tileCounters[piece.name].count += 1;
        this.checkForMaximumTiles(piece.name);
        return true;
    }

    public runValidationLoop(x: number, y: number, pieces: any[]) {
        let validation = this.runValidation(x, y, pieces);
        if (validation == null) {
            return false;
        }

        let depth = 0;
        while (validation.length > 0 && depth < this.config.maxDepth) {
            let newValidations: any[] = [];
            if (validation.length > 0) {
                validation.forEach((v) => {
                    let innerValidation = this.validatePosition(v.x, v.y);
                    newValidations.push(innerValidation);
                });
            }
            let newValidationsConcat = [].concat.apply([], newValidations);
            let newValidationsSet = Array.from(new Set(newValidationsConcat));
            depth += 1;
            validation = newValidationsSet;
        }
    }

    public validatePosition(x: number, y: number) {
        let validationTile = this.wfc.tiles[x][y];
        let validationTilePieces = validationTile.validPieces;
        let pieces = validationTilePieces.map((tileKey: string) => {
            return this.wfc.piecesMap[tileKey];
        });
        let innerValidation = this.runValidation(x, y, pieces);
        return innerValidation;
    }

    public hasRunWFC = (event: WFCEvent) : Boolean => {
        return this.callback(event);
    };

    public runValidation(x: number, y: number, pieces: any[], getPlaced: boolean = false) {
        let recheck: any[] = [];
        let neighbors = [];
        
        if (this.config.edgeWrapAround || y != -this.config.offsetY) {
            let offsettedNeighborY = ((y+this.config.offsetY - 1 + this.config.tilesHeight) % this.config.tilesHeight) - this.config.offsetY;
            neighbors.push(
                { direction: 'top', tile: this.wfc.tiles[x][offsettedNeighborY], x: x, y: offsettedNeighborY  }
            );
        }

        if (this.config.edgeWrapAround || x != this.config.tilesWidth - this.config.offsetX - 1) {
            let offsettedNeighborX = ((x+this.config.offsetX + 1 + this.config.tilesWidth) % this.config.tilesWidth) - this.config.offsetX;
            neighbors.push(
                { direction: 'right', tile: this.wfc.tiles[offsettedNeighborX][y], x: offsettedNeighborX, y: y }
            );
        }

        if (this.config.edgeWrapAround || y != this.config.tilesHeight - this.config.offsetY - 1) {
            let offsettedNeighborY = ((y+this.config.offsetY + 1 + this.config.tilesHeight) % this.config.tilesHeight) - this.config.offsetY;
            neighbors.push(
                { direction: 'bottom', tile: this.wfc.tiles[x][offsettedNeighborY], x: x, y: offsettedNeighborY }
            );
        }

        if (this.config.edgeWrapAround || x != -this.config.offsetX) {
            let offsettedNeighborX = ((x+this.config.offsetX - 1 + this.config.tilesWidth) % this.config.tilesWidth) - this.config.offsetX;
            neighbors.push(
                { direction: 'left', tile: this.wfc.tiles[offsettedNeighborX][y], x: offsettedNeighborX, y: y }
            );
        }

        neighbors.forEach((neighbor) => {
            if (!getPlaced && neighbor.tile.validPieces) {
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
                if(neighbor.tile.temporary != undefined) {
                    if(!neighbor.tile.validPieces.includes(neighbor.tile.temporary.key)) {
                        neighbor.tile.temporary = undefined;
                    }
                }
                var validAfter = neighbor.tile.validPieces.length;
                if (validBefore != validAfter) {
                    recheck.push(neighbor.tile.position);
                }
            } else if(getPlaced && (neighbor.tile.key != undefined)) {
                recheck.push({
                    x: neighbor.x, 
                    y: neighbor.y
                });
            }
        });

        return recheck;
    }

    public checkForStop() {
        let stop = true;
        for(let x = -this.config.offsetX; x < this.config.tilesWidth - this.config.offsetX; x++) {
            let column = this.wfc.tiles[x];
            for(let y = -this.config.offsetY; y < this.config.tilesHeight - this.config.offsetY; y++) {
                let tile = column[y];
                if (tile.key == undefined) {
                    stop = false;
                    return false;
                }
            }
            if (!stop) {
                return false;
            }
        }

        if (stop) {
            console.log('Found solution after ' + this.retryCount + ' retries');
            let continueRun = this.hasRunWFC(new WFCEvent('found')) ?? false;
            if(!continueRun) { 
                console.log('stopWFCLoop');
                this.stopWFCLoop();
                return true;
            }
            else {
                return false;
            }
        }
        return stop;
    }

    public stopWFCLoop() {
        this.stopRunning = true;
        console.log('stopWFCLoop');
        clearInterval(this.wfcLoop);
    }

    public reset() {
        this.wfc.reset();
        this.setStartTiles();

        this.pickFirstTile = true;
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

        for(let x = -this.config.offsetX; x < this.config.tilesWidth - this.config.offsetX; x++) {
            let column = this.wfc.tiles[x];
            for(let y = -this.config.offsetY; y < this.config.tilesHeight - this.config.offsetY; y++) {
                let tile = column[y];
                if(tile.validPieces) {
                    tile.validPieces = tile.validPieces.filter((tileKey: string) => !pieceObjectsForRemoval.includes(tileKey));
                }
            }
        }
    }

    public start(interval: number) {
        this.startWFCLoop(interval);
    }

    public continueRun() {
        this.stopRunning = false;
        if (this.config.runMethod == RunMethod.Step) {

            this.runWFC();
        } else {
            this.wfcLoop = setInterval(() => {
                this.runWFC();
            }, this.config.runSpeed);
        }
        
    }

    public startWFCLoop(interval: number) {
        this.stopWFCLoop();
        this.stopRunning = false;
        if(this.config.runMethod == RunMethod.AutoStart) {
            this.wfcLoop = setInterval(() => {
                this.runWFC();
            }, interval);
        }
    }

    private getRandomElementFromArray<T>(array: T[]) : T {
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
