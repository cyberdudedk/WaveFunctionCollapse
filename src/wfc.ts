import { SuperImposedState } from './SuperImposedState';

export class WFC {
    public maxRetryCount = 10;
    public maxDepth = 100;
    public tileScaleHeight = 40;
    public tileScaleWidth = 40;
    private fast: boolean = false;
    private runSpeed: number = 10;
    private runLoop: number = 30;

    public tilesHeight = 30;
    public tilesWidth = 30;
    public superImposed = 1;
    public useMouse = false;

    public tileName: string = 'Knots';
    public set: string = 'all';

    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private halfScaleHeight = this.tileScaleHeight / 2;
    private halfScaleWidth = this.tileScaleWidth / 2;

    public pieces: any[] = [];
    public piecesMap: { [name: string]: any } = {};
    public imagesMap: { [name: string]: CanvasImageSource } = {};

    public tiles: any[][] = [];
    public directionsMapIntToKey = [
        'top',
        'right',
        'bottom',
        'left'
    ];
    public directionsMapKeyToInt: { [direction: string]: number} = {
        'top': 0,
        'right': 1,
        'bottom': 2,
        'left': 3
    };

    public sets: { [name: string]: {} } = {};
    public currentSet: { [pieceName: string]: {} } = {} = {};
    public retryCount = 0;

    private tileSets: { [name: string]: any } = {};
    private tilePieces: { [name: string]: any } = {};

    constructor(canvasId: string){
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }

    private preloadImage(src: string) : Promise<CanvasImageSource> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = (event) => resolve(image);
            image.onerror = (event) => reject();
            image.src = src;
            return image;
        });
    }

    public getAvailableTiles() {
        return Object.keys(this.tileSets);
    }

    public getSuperImposedStates() {
        return SuperImposedState;
    }

    public getAvailableSets(tileName: string) {
        var sets = this.tileSets[tileName];
        if(sets == null) return null;
        return Object.keys(sets);
    }

    public getTileSets() : { [name: string]: any } {
        return this.tileSets;
    }

    private loadTiles() {
        this.tilePieces = {};
        this.tileSets = {};
        
        var tileNames = ["Castle", "Circles", "Circuit", "FloorPlan", "Knots", "Rooms","Summer"];
        for(let tileIndex in tileNames) {
            const tile = tileNames[tileIndex];
            this.tilePieces[tile] = require('./metadata/tiles/'+tile+'.json');
            this.tileSets[tile] = require('./metadata/sets/'+tile+'.json');
        }
    }

    public async init(config: any) {
        console.clear();
        let ctx = this.ctx;
        let canvas = this.canvas;

        this.tileName = config.tileName;
        this.set = config.set;
        this.maxRetryCount = config.maxRetryCount;
        this.maxDepth =  config.maxDepth;
        this.tileScaleHeight =  config.tileScale;
        this.tileScaleWidth =  config.tileScale;
        this.fast = config.fast;
        this.runSpeed =  config.runSpeed;
        this.runLoop =  config.runLoop;
        this.tilesHeight = config.tilesHeight;
        this.tilesWidth =  config.tilesWidth;
        this.superImposed =  config.superImposed;
        this.useMouse = config.useMouse;

        this.halfScaleHeight = this.tileScaleHeight / 2;
        this.halfScaleWidth = this.tileScaleWidth / 2;
        canvas.height = this.tilesHeight * this.tileScaleHeight;
        canvas.width = this.tilesWidth * this.tileScaleWidth;
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.loadTiles();
    }

    public async initTileData() {
        this.pieces = this.tilePieces[this.tileName];
        this.sets = this.tileSets[this.tileName];
        this.currentSet = this.sets[this.set];
        let loadImagesAsync = this.pieces.map(async (x: any) : Promise<{name: string, img: CanvasImageSource}> => {
            return {
                name: x.name,
                img: await this.preloadImage('tiles/' + this.tileName + '/' + x.imgsrc)
            }
        });

        Object.entries<any>(this.currentSet).forEach((value: [string, {weight: number, rotations: number[]}]) => {
            let pieceName = value[0];
            let properties = value[1];
            if(properties.rotations != undefined) {
                this.pieces.find(x => x.name == pieceName).rotations = properties.rotations;
            }
            if(properties.weight != undefined) {
                this.pieces.find(x => x.name == pieceName).weight = properties.weight;
            }
        });

        this.imagesMap = (await Promise.all(loadImagesAsync)).reduce((piecesMap, piece) => {
            piecesMap[piece.name] = piece.img;
            return piecesMap;
        }, <{ [name: string]: CanvasImageSource }>{});

        let mappedPieces = this.pieces.reduce((piecesMap, piece) => {
            if(this.currentSet[piece.name] == undefined) {
                return piecesMap;
            }

            let pieceSockets = piece.socket
            piece.socketmatching = {};
            piece.blacklistedNeighbors = {};

            piece.rotations.forEach((rotation: number) => { 
                let socketMatchObject: { [name: string]: any } = {};
                let blacklistedNeighbors: { [name: string]: string[] } = {};

                this.directionsMapIntToKey.forEach((direction: any, index) => {
                    let rotationMoved = (index - rotation) % this.directionsMapIntToKey.length;
                    if(rotationMoved < 0) rotationMoved += this.directionsMapIntToKey.length;
                    let newRotation = this.directionsMapIntToKey[rotationMoved];
                    let flipped = index >= (this.directionsMapIntToKey.length / 2);
                    let sockets = pieceSockets[newRotation];
                    if(!Array.isArray(sockets)) {
                        sockets = [sockets];
                    }
                    sockets.forEach((socket: string) => {
                        if(socketMatchObject[direction] == undefined) {
                            socketMatchObject[direction] = [];
                        }
                        if(flipped) {
                            socketMatchObject[direction].push(socket.split("").reverse().join(""));
                        } else {
                            socketMatchObject[direction].push(socket);
                        }
                    });
                });

                if(piece.blacklist) {
                    Object.entries(piece.blacklist).forEach((blacklist: [string, any]) => {
                        let blackListDirection = blacklist[0];
                        let blackListValue = blacklist[1];
                        let blackListIndex = this.directionsMapKeyToInt[blackListDirection];
                        let rotationBlacklistingIndex = (blackListIndex + rotation) % this.directionsMapIntToKey.length;
                        let rotationBlacklisting = this.directionsMapIntToKey[rotationBlacklistingIndex];
                        Object.entries(blackListValue).forEach((blacklistPiece: [string, any]) => {
                            let blackListPieceName = blacklistPiece[0];
                            let blackListPieceRotations = blacklistPiece[1];
                            blackListPieceRotations.forEach((blackListPieceRotation: number) => {
                                let blackListPieceNameWithRotation = blackListPieceName + "_" + (blackListPieceRotation + rotation) % this.directionsMapIntToKey.length;
                                if(blacklistedNeighbors[rotationBlacklisting] == undefined) {
                                    blacklistedNeighbors[rotationBlacklisting] = [];
                                }
                                blacklistedNeighbors[rotationBlacklisting].push(blackListPieceNameWithRotation);
                            });
                            
                        });

                    });
                }

                piece.blacklistedNeighbors[rotation] = blacklistedNeighbors;
                piece.socketmatching[rotation] = socketMatchObject;
            });

            piecesMap[piece.name] = piece;
            return piecesMap;
        }, <{ [name: string]: any }>{});

        let socketBuckets: { [socket: string]: { [socket: string]: string[] } } = {};

        Object.entries(mappedPieces).forEach((mappedPieceValue: [string, any]) => {
            let pieceName = mappedPieceValue[0];
            let piece = mappedPieceValue[1];
            if(piece.socketmatching != undefined) {
                
                Object.entries(piece.socketmatching).forEach((socketMatchValue: [string, any]) => {
                    let socketDirection = parseInt(socketMatchValue[0]);
                    let socketMatch = socketMatchValue[1];
                    Object.entries(socketMatch).forEach((socket: [string, any]) => {
                        let socketDirectionInner: string = socket[0];
                        let socketMatchInnerValueArray: string[] = socket[1];
                        let socketDirectionInnerIndex = this.directionsMapKeyToInt[socketDirectionInner];
                        let socketDirectionPolarIndex = (socketDirectionInnerIndex + this.directionsMapIntToKey.length/2) % this.directionsMapIntToKey.length;
                        let socketDirectionPolar = this.directionsMapIntToKey[socketDirectionPolarIndex];
                        
                        socketMatchInnerValueArray.forEach((socketMatchInnerValue: string) => {
                            if(socketBuckets[socketMatchInnerValue] == undefined) {
                                let innerObject: { [socket: string]: string[] } = {};
                                socketBuckets[socketMatchInnerValue] = innerObject;
                            }
                            if(socketBuckets[socketMatchInnerValue][socketDirectionPolar] == undefined) {
                                socketBuckets[socketMatchInnerValue][socketDirectionPolar] = [];
                            }
                            socketBuckets[socketMatchInnerValue][socketDirectionPolar].push(pieceName + "_" + socketDirection);
                        });
                        
                    });     
                });
            }
        });

        this.piecesMap = Object.entries(mappedPieces).reduce((piecesMap, piecePair: any) => {
            let piece = piecePair[1];
            if(this.currentSet[piece.name] == undefined) {
                return piecesMap;
            }
            if(piece.rotations == undefined) {
                piece.rotations = [0];
            }
            
            piece.rotations.forEach((rotation: number) => {
                let pieceName = piece.name + "_" + rotation;

                let validNeighbors: { [name: string]: string[] } = {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                };
                
                if(piece.socketmatching != undefined) {
                    if(piece.socketmatching[rotation] != undefined) {
                        let rotationDirection = this.directionsMapIntToKey[rotation];

                        let socketMatch = piece.socketmatching[rotation];
                        Object.entries(socketMatch).forEach((socketPair: [string, any]) => {
                            let socketDirection = socketPair[0];
                            let sockets = socketPair[1];
                            sockets.forEach((socket: string) => {
                                if(socketBuckets[socket] != undefined && socketBuckets[socket][socketDirection] != undefined) {
                                    let validPiecesForSocket = socketBuckets[socket][socketDirection];
                                    validPiecesForSocket.forEach((validPiece: string) => {
                                        let blackList = piece.blacklistedNeighbors[rotation][socketDirection] ?? [];
                                        if(!validNeighbors[socketDirection].includes(validPiece) && !blackList.includes(validPiece)) {
                                            validNeighbors[socketDirection].push(validPiece);
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
                
                let weight = piece.weight ?? 1;
                if(Array.isArray(piece.weight)) {
                    weight = weight[rotation] ?? 1;
                }
                
                
                piecesMap[pieceName] = {
                    key: piece.name + "_" + rotation,
                    name: piece.name, 
                    rotation: rotation, 
                    validNeighbors: validNeighbors,
                    newValid: piece.newValid,
                    weight: weight,
                };
                
            });
            
            return piecesMap;
        }, <{ [name: string]: any }>{});

        return true;
        
    }

    public initDraw() {
        this.startOver();
        this.startDrawingLoop();
    }

    public startOver() {
        this.reset();
        this.startWFCLoop(this.runSpeed);
    }

    public reset() {
        //this.ctx.fillStyle = "black";
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        let piecesKeys = Object.keys(this.piecesMap);
        console.log('this.piecesMap', this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };
        this.tiles = Array.from({length:this.tilesWidth}, 
            (a,x) => {
                return Array.from({length:this.tilesHeight}, (b, y) => {
                  return {
                    position: {x: x, y: y},
                    validPieces: [...startingTile.validPieces]
                  };
                });
            }
        )

        console.log('this.tiles', this.tiles);
    }

    private getTilePositionsAsEntropyGroups() {
        let entropyGroups:  { [entropy: number]: { x: number; y: number }[] } =  {};
        this.tiles.forEach((column, x) => {
            column.forEach((tile, y) => {
                if(tile.validPieces) {
                    let entropy = tile.validPieces.length;
                    if(entropyGroups[entropy] == undefined) {
                        entropyGroups[entropy] = [];
                    }
                    entropyGroups[entropy].push({x: x, y: y});
                }
            });
        });
        return entropyGroups;
    }

    private getRandomElementFromArray(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }

    private getRandomElementFromArrayWeigted(array: any[]) {
        let summed: any = [];
        let sumCount = 0;
        let lastSum = 0;
        array.forEach((x, i) => {
            let weight = this.piecesMap[x].weight;
            if(weight > 0) {
                lastSum = sumCount;
                sumCount+=weight;
                summed.push({
                    'key': x,
                    'minsum': lastSum,
                    'maxsum': sumCount
                });
            }
        });
        if(summed.length == 0) return null;
        
        let rnd = Math.random() * sumCount;
        let selected = summed.find((x: any) => {
            return x.minsum <= rnd && x.maxsum > rnd;
        });
        if(selected == undefined) {
            console.log('summed', summed);
        }
        return selected.key;
    }

    private stopRunning = true;

    public noValidFound() {
        this.retryCount++;
        this.stopWFCLoop();
        if(this.retryCount <= this.maxRetryCount) {
            this.startOver();
        } else {
            console.log('not possible to solve within ' + this.maxRetryCount + ' retries');
        }
    }

    public runWFC3() {
        for(var i = 0; (i < this.runLoop) || this.fast; i++) {
            let stop = this.checkForStop();
            if(stop) return;
            if(this.stopRunning) return;
            let entropyGroups = this.getTilePositionsAsEntropyGroups();
            let entropyKeys = Object.keys(entropyGroups);
            if(entropyKeys.length == 0) {
                this.stopWFCLoop();
                return;
            }
            
            let lowestEntropyKey = Number(entropyKeys[0]);
            let lowestEntroyGroup = entropyGroups[lowestEntropyKey];
            let randomPositionFromLowestEntropyGroup = this.getRandomElementFromArray(lowestEntroyGroup);
            let x = randomPositionFromLowestEntropyGroup.x;
            let y = randomPositionFromLowestEntropyGroup.y;
            
            let currentTile = this.tiles[x][y];
            if(currentTile.validPieces != undefined) {
                if(currentTile.validPieces.length == 0) {
                    this.noValidFound();
                    return false;
                }
                let randomPiece = Math.floor(Math.random() * currentTile.validPieces.length);
                let tileKey = this.getRandomElementFromArrayWeigted(currentTile.validPieces);
                if(tileKey == null) {
                    this.noValidFound();
                    return false;
                }
                
                let piece = this.piecesMap[tileKey];
                this.tiles[x][y] = piece;
                if(piece == undefined) {
                    console.log('piece',x,y, piece, tileKey, randomPiece, currentTile.validPieces);
                }
                let validation = this.runValidation(x, y, [piece]);
                if(validation == null) {
                    break;
                }
                
                let depth = 0;
                while(validation.length > 0 && depth < this.maxDepth) {
                    let newValidations: any[] = [];
                    if(validation.length > 0) {
                        validation.forEach((v) => {
                            let validationTile = this.tiles[v.x][v.y];
                            let validationTilePieces = validationTile.validPieces;
                            let pieces = validationTilePieces.map((tileKey: string) => {
                                return this.piecesMap[tileKey];
                            })
                            let innerValidation = this.runValidation(v.x, v.y, pieces);
                            newValidations.push(innerValidation);
                        });
                    }
                    let newValidationsConcat = [].concat.apply([], newValidations);
                    let newValidationsSet = Array.from(new Set(newValidationsConcat));
                    depth+=1;
                    validation = newValidationsSet;
                }
            }
        }
    }

    public runValidation(x: number, y: number, pieces: any[]) {
        let recheck: any[] = [];
        let neighbors = [];
        if(y != 0) {
            neighbors.push(
                {direction: 'top', tile: this.tiles[x][y - 1]}
            );
        }

        if(x != this.tilesWidth-1) {
            neighbors.push(
                {direction: 'right', tile: this.tiles[x + 1][y]}
            );
        }

        if(y != this.tilesHeight-1) {
            neighbors.push(
                {direction: 'bottom', tile: this.tiles[x][y + 1]}
            );
        }

        if(x != 0) {
            neighbors.push(
                {direction: 'left', tile: this.tiles[x - 1][y]}
            );
        }
        
        neighbors.forEach((neighbor) => {
            
            if(neighbor.tile.validPieces) {
                let validBefore = neighbor.tile.validPieces.length;
                let validArray: any = [];
                pieces.forEach((piece) => {
                    validArray.push(neighbor.tile.validPieces
                        .filter((validPieceToCheck: string) => {
                            return piece.validNeighbors[neighbor.direction].includes(validPieceToCheck);
                        }));
                });
                let validArrayConcat = [].concat.apply([], validArray)
                let uniquevalidArraySet = Array.from(new Set(validArrayConcat));
                neighbor.tile.validPieces = uniquevalidArraySet;
                var validAfter = neighbor.tile.validPieces.length;
                if(validBefore != validAfter) {
                    recheck.push(neighbor.tile.position);
                }
            }
        });

        return recheck;
    } 

    public checkForStop() {
        let stop = true;
        this.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if(tile.key == undefined) {
                    stop = false;
                    return false;
                }
            });
            if(!stop) {
                return false;
            }
        });

        if(stop) {
            console.log('checkForStop', 'return true');
            console.log('Found solution after ' + this.retryCount + ' retries');
            this.stopWFCLoop();
            return true;
        }
        return stop;
    }

    private wfcLoop: NodeJS.Timer | undefined = undefined;

    public startWFCLoop(interval: number) {
        this.stopRunning = false;
        if(this.useMouse) {
            document.body.addEventListener('click', ()=>this.runWFC3(), true); 
        } else {
            this.wfcLoop = setInterval(() => {
                this.runWFC3();
            },interval);
        }
    }

    public stopWFCLoop() {
        this.stopRunning = true;
        clearInterval(this.wfcLoop);
    }

    public startDrawingLoop() {
        requestAnimationFrame(() => this.draw());
    }

    public stopDrawingLoop() {

    }

    public draw() {
        this.ctx.save();
        this.drawTiles();
        this.ctx.restore();
        requestAnimationFrame(() => this.draw());
    }

    public drawTiles() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if(tile.validPieces) {
                    let validCount = tile.validPieces.length;
                    
                    if(tile.validPieces.length > 0) {
                        if(this.superImposed == SuperImposedState.Layered) {
                            //superimposed 1 - on top of each
                            tile.validPieces.forEach((key: string)=> {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
                            });
                        } else if (this.superImposed == SuperImposedState.GridScaled) {
                            //superimposed 2 - grid
                            let gridSize = Math.ceil(Math.sqrt(validCount));
                            tile.validPieces.forEach((key: string, index: number)=> {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, 0.4);
                            });
                        } else if (this.superImposed == SuperImposedState.Grid) {
                            //superimposed 3 - grid without scaling
                            validCount = Object.keys(this.piecesMap).length;
                            let gridSize = Math.ceil(Math.sqrt(validCount));
                            tile.validPieces.forEach((key: string, index: number)=> {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, 0.4);
                            });
                        } else if (this.superImposed == SuperImposedState.None) {
                            //superimposed 4 - none
                        }  else if (this.superImposed == SuperImposedState.LayeredSorted) {
                            //superimposed 5 - layered sorted
                            let sortedValid = tile.validPieces.sort((a: string,b: string) =>{
                                let pieceA = this.piecesMap[a];
                                let pieceB = this.piecesMap[b];
                                return  pieceB.weight - pieceA.weight;
                            });
                            sortedValid.forEach((key: string)=> {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
                            });
                            
                        }  else if (this.superImposed == SuperImposedState.GridAlpha) {
                            //superimposed 6 - grid scaled alpha
                            let minWeight = 999;
                            let maxWeight = 0;
                            let sortedValid = tile.validPieces.sort((a: string,b: string) =>{
                                let pieceA = this.piecesMap[a];
                                let pieceB = this.piecesMap[b];
                                let weight = pieceA.weight;
                                if(minWeight > weight) {
                                    minWeight = weight;
                                }
                                if(maxWeight < weight) {
                                    maxWeight = weight;
                                }
                                return pieceB.weight - pieceA.weight;
                            });
                            sortedValid.forEach((key: string, index: number)=> {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                let weight = piece.weight;
                                let weightPercent = ((weight - minWeight)) / (maxWeight - minWeight)
                                let adjustedAlpha = (weightPercent * (0.6 - 0.2)) + 0.2;
                                let gridSize = Math.ceil(Math.sqrt(validCount));
                                this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, adjustedAlpha);
                            });
                            
                        }
                    }
                }
                if(tile.key != undefined) {
                    let key = tile.key;
                    let piece = this.piecesMap[key];
                    let tileImage = this.imagesMap[piece.name];
                    this.drawTile(tileImage, columnIndex, rowIndex, tile.rotation);
                }
            });
        });
    }

    private drawImgGrid(img: CanvasImageSource, x: number, y: number, rotation: number, alpha: number) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha; 
        this.ctx.translate((this.tileScaleWidth*x)+this.halfScaleWidth, (this.tileScaleHeight*y)+this.halfScaleHeight);
        this.ctx.rotate((rotation*90) * (Math.PI/180));
        this.ctx.drawImage(img, -this.halfScaleWidth, -this.halfScaleHeight,this.tileScaleWidth,this.tileScaleHeight);
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
        let width = this.tileScaleWidth / gridSize;
        let height =this.tileScaleHeight / (gridSize);
        let newX = (this.tileScaleWidth*x) + ( (gridIndex % gridSize) * width);
        let newY = (this.tileScaleHeight*y) + ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg(img, newX,newY, width, height, rotation, alpha);
    }

    private drawImg(img: CanvasImageSource, x: number, y: number, width: number, height: number, rotation: number, alpha: number) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate(x+(width / 2), y+(height / 2));
        this.ctx.rotate((rotation*90) * (Math.PI/180));
        this.ctx.drawImage(img, -(width / 2), -(height / 2),width,height);
        this.ctx.restore(); 
    }
}