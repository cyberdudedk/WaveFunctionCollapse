class WFC {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public tileName: string = '';

    public tileScaleHeight = 30;
    public tileScaleWidth = 30;
    private halfScaleHeight = this.tileScaleHeight / 2;
    private halfScaleWidth = this.tileScaleWidth / 2;

    private fast: boolean = true;
    private runSpeed: number = 10;
    private runLoop: number = 10;

    public tilesHeight = 20;
    public tilesWidth = 20;
    public superImposed = 2;
    public useMouse = false;

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
    public set: string ="all";
    public currentSet: { [pieceName: string]: {} } = {} = {};

    public retryCount = 0;
    public maxRetryCount = 50;
    
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

    public async init() {
        console.clear();
        let ctx = this.ctx;
        let canvas = this.canvas;
        this.halfScaleHeight = this.tileScaleHeight / 2;
        this.halfScaleWidth = this.tileScaleWidth / 2;
        canvas.height = this.tilesHeight * this.tileScaleHeight;
        canvas.width = this.tilesWidth * this.tileScaleWidth;
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const queryParams = new URLSearchParams(window.location.search);
        this.tileName = queryParams.get('tile') ?? 'Knots';
        //this.tileName = 'Circuit';
        //this.tileName = 'Castle';
        
        this.set = queryParams.get('set') ?? 'all';

        let tileSets: { [name: string]: any } = { 
            'Knots': {
                all: {
                    "corner": { }, 
                    "t": { }, 
                    "cross": { }, 
                    "line": { }, 
                    "empty": { }, 
                },
                nonempty: {"corner": { }, "t": { }, "cross": { }, "line": { }},
                onlycorners: {"corner": { }},
                nocrossnoempty: {"corner": { }, "t": { }, "line": { }},
                nocross: {"corner": { }, "t": { }, "line": { }, "empty": { }},
                onlyt: {"t": { }},
                braided: {"line": { }, "cross": { }},
                cross: {"cross": { }},
                crosst: {"cross": { }, "t": { }},
                cornert: {"corner": { }, "t": { }}
            },
            'Circuit': {
                all: {
                    "bridge": { }, 
                    "component": { }, 
                    "connection": { }, 
                    "corner": { }, 
                    "dskew": { }, 
                    "skew": { }, 
                    "substrate": { },
                    "t": { },
                    "track": { },
                    "transition": { },
                    "turn": { },
                    "viad": { },
                    "vias": { },
                    "wire": { },
                }
            },
            'Castle': {
                all: {
                    "bridge": { }, 
                    "ground": { }, 
                    "river": { }, 
                    "riverturn": { }, 
                    "road": { }, 
                    "roadturn": { }, 
                    "t": { },
                    "tower": { },
                    "wall": { },
                    "wallriver": { },
                    "wallroad": { },
                }
            }
        };


        let tilePieces: { [name: string]: any } = {
            'Circuit': [
                {
                    'name': 'bridge',
                    'imgsrc': 'bridge.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '020',
                        'bottom': '010',
                        'left': '020'
                    }
                },
                {
                    'name': 'connection',
                    'imgsrc': 'connection.png',
                    'rotations': [0,1,2,3],
                    'weight': 3,
                    'socket': {
                        'top': '010',
                        'right': '003',
                        'bottom': '333',
                        'left': '300'
                    }
                },
                {
                    'name': 'dskew',
                    'imgsrc': 'dskew.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '010',
                        'bottom': '010',
                        'left': '010'
                    }
                },
                {
                    'name': 'skew',
                    'imgsrc': 'skew.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '010',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'substrate',
                    'imgsrc': 'substrate.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 't',
                    'imgsrc': 't.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '010',
                        'bottom': '010',
                        'left': '010'
                    }
                },
                {
                    'name': 'track',
                    'imgsrc': 'track.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '000',
                        'bottom': '010',
                        'left': '000'
                    }
                },
                {
                    'name': 'transition',
                    'imgsrc': 'transition.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '020',
                        'right': '000',
                        'bottom': '010',
                        'left': '000'
                    }
                },
                {
                    'name': 'turn',
                    'imgsrc': 'turn.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '010',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'viad',
                    'imgsrc': 'viad.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '010',
                        'bottom': '000',
                        'left': '010'
                    }
                },
                {
                    'name': 'vias',
                    'imgsrc': 'vias.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '000',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'wire',
                    'imgsrc': 'wire.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '020',
                        'bottom': '000',
                        'left': '020'
                    }
                },
                {
                    'name': 'component',
                    'imgsrc': 'component.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '333',
                        'right': '333',
                        'bottom': '333',
                        'left': '333'
                    }
                },
                {
                    'name': 'corner',
                    'imgsrc': 'corner.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '003',
                        'left': '300'
                    }
                },
            ],
            'Knots': [
                {
                    'name': 'corner',
                    'imgsrc': 'corner.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '010',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'cross',
                    'imgsrc': 'cross.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '010',
                        'bottom': '010',
                        'left': '010'
                    }
                },
                {
                    'name': 'empty',
                    'imgsrc': 'empty.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'line',
                    'imgsrc': 'line.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '010',
                        'bottom': '000',
                        'left': '010'
                    }
                },
                {
                    'name': 't',
                    'imgsrc': 't.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '010',
                        'bottom': '010',
                        'left': '010'
                    }
                },
            ],
            'Castle': [
                {
                    'name': 'bridge',
                    'imgsrc': 'bridge.png',
                    'rotations': [0,1],
                    'weight': 2,
                    'socket': {
                        'top': '010',
                        'right': '020',
                        'bottom': '010',
                        'left': '020'
                    }
                },
                {
                    'name': 'ground',
                    'imgsrc': 'ground.png',
                    'rotations': [0],
                    'weight': 3,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'river',
                    'imgsrc': 'river.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '000',
                        'bottom': '010',
                        'left': '000'
                    }
                },
                {
                    'name': 'riverturn',
                    'imgsrc': 'riverturn.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '010',
                        'right': '010',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'road',
                    'imgsrc': 'road.png',
                    'rotations': [0,1],
                    'weight': 3,
                    'socket': {
                        'top': '020',
                        'right': '000',
                        'bottom': '020',
                        'left': '000'
                    }
                },
                {
                    'name': 'roadturn',
                    'imgsrc': 'roadturn.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '020',
                        'right': '020',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 't',
                    'imgsrc': 't.png',
                    'rotations': [0,1,2,3],
                    'weight': 2,
                    'socket': {
                        'top': '000',
                        'right': '020',
                        'bottom': '020',
                        'left': '020'
                    }
                },
                {
                    'name': 'tower',
                    'imgsrc': 'tower.png',
                    'rotations': [0],
                    'weight': 0.5,
                    'socket': {
                        'top': '434',
                        'right': '434',
                        'bottom': '434',
                        'left': '434'
                    }
                },
                {
                    'name': 'wall',
                    'imgsrc': 'wall.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '434',
                        'right': '000',
                        'bottom': '434',
                        'left': '000'
                    }
                },
                {
                    'name': 'wallriver',
                    'imgsrc': 'wallriver.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '434',
                        'right': '010',
                        'bottom': '434',
                        'left': '010'
                    }
                },
                {
                    'name': 'wallroad',
                    'imgsrc': 'wallroad.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '434',
                        'right': '020',
                        'bottom': '434',
                        'left': '020'
                    }
                },
            ]
        };

        /*
        green = 0
        blue = 1,
        yellow = 2
        grey = 3
        black = 4
        */

        this.pieces = tilePieces[this.tileName];
        this.sets = tileSets[this.tileName];
        this.currentSet = this.sets[this.set];
        
        let loadImagesAsync = this.pieces.map(async (x: any) : Promise<{name: string, img: CanvasImageSource}> => {
            return {
                name: x.name,
                img: await this.preloadImage('tiles/' + this.tileName + '/' + x.imgsrc)
            }
        });

        console.log('currentSet', this.currentSet);

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
            piece.rotations.forEach((rotation: number) => { 
                let socketMatchObject: { [name: string]: any } = {};
                this.directionsMapIntToKey.forEach((direction: any, index) => {
                    let rotationMoved = (index - rotation) % this.directionsMapIntToKey.length;
                    if(rotationMoved < 0) rotationMoved += this.directionsMapIntToKey.length;
                    let newRotation = this.directionsMapIntToKey[rotationMoved];
                    let flipped = index >= (this.directionsMapIntToKey.length / 2);
                    if(flipped) {
                        socketMatchObject[direction] = pieceSockets[newRotation].split("").reverse().join("");
                    } else {
                        socketMatchObject[direction] = pieceSockets[newRotation];
                    }
                    
                });
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
                        let socketMatchInnerValue: string = socket[1];
                        let socketDirectionInnerIndex = this.directionsMapKeyToInt[socketDirectionInner];
                        let socketDirectionPolarIndex = (socketDirectionInnerIndex + this.directionsMapIntToKey.length/2) % this.directionsMapIntToKey.length;
                        let socketDirectionPolar = this.directionsMapIntToKey[socketDirectionPolarIndex];
                        
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
            }
            
        });
        console.log('socketBuckets', socketBuckets);

        console.log('mappedPieces',mappedPieces);

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
                            let socket = socketPair[1];
                            if(socketBuckets[socket] != undefined && socketBuckets[socket][socketDirection] != undefined) {
                                let validPiecesForSocket = socketBuckets[socket][socketDirection];
                                validPiecesForSocket.forEach((validPiece: string) => {
                                    if(!validNeighbors[socketDirection].includes(validPiece)) {
                                        validNeighbors[socketDirection].push(validPiece);
                                    }
                                });
                                    
                            }
                            
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

        console.log('piecesMap', this.piecesMap);

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
        let startingTile = {
            validPieces: piecesKeys,
        };
        this.tiles = Array.from({length:this.tilesWidth}, 
            () => {
                return Array.from({length:this.tilesHeight}, () => {
                    let k = Math.floor(Math.random() * 10);
                  return {
                    validPieces: [...startingTile.validPieces]
                  };
                });
            }
        )
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
        for(var i = 0; i < this.runLoop; i++) {
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
                    break;

                }
                let randomPiece = Math.floor(Math.random() * currentTile.validPieces.length);
                let tileKey = this.getRandomElementFromArrayWeigted(currentTile.validPieces);
                if(tileKey == null) {
                    this.noValidFound();
                    break;
                }
                
                let piece = this.piecesMap[tileKey];
                this.tiles[x][y] = piece;
                if(piece == undefined) {
                    console.log('piece',x,y, piece, tileKey, randomPiece, currentTile.validPieces);
                }
                
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
                        neighbor.tile.validPieces = neighbor.tile.validPieces
                            .filter((validPieceToCheck: string) => {
                                return piece.validNeighbors[neighbor.direction].includes(validPieceToCheck);
                            });
                    }
                });
            }
        }
        
        let stop = this.checkForStop();
        if(!stop && this.fast) {
            this.runWFC3();
        }
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
            this.stopWFCLoop();
            return true;
        }
    }

    private wfcLoop: number | undefined = undefined;

    public startWFCLoop(interval: number) {
        this.stopRunning = false;
        if(this.useMouse) {
            document.body.addEventListener('click', ()=>this.runWFC3(), true); 
        } else {
            this.wfcLoop = setInterval(() => {
                this.runWFC3();
            },interval);
        }
        
/*
        this.wfcLoop = setTimeout(() => {
            this.runWFC3();
        },50);*/

        
    }



    public stopWFCLoop() {
        console.log('stopWFCLoop');
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
        //this.ctx.fillStyle = "black";
        //this.ctx.fillStyle = "transparent";
        //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if(tile.validPieces) {
                    let validCount = tile.validPieces.length;
                    
                    if(tile.validPieces.length > 0) {
                        if(this.superImposed == 1) {
                            //superimposed 1 - on top of each
                            tile.validPieces.forEach((key: string)=> {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
                            });
                        } else if (this.superImposed == 2) {
                            //superimposed 2 - grid
                            let gridSize = Math.ceil(Math.sqrt(validCount));
                            tile.validPieces.forEach((key: string, index: number)=> {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount);
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
        this.drawImgGrid(img, x, y, rotation, 0.8 / possible);
    }

    private drawSuperimposedPartGrid(img: CanvasImageSource, x: number, y: number, gridSize: number, gridIndex: number, rotation: number, possible: number) {
        let width = this.tileScaleWidth / gridSize;
        let height =this.tileScaleHeight / (gridSize);
        let newX = (this.tileScaleWidth*x) + ( (gridIndex % gridSize) * width);
        let newY = (this.tileScaleHeight*y) + ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg(img, newX,newY, width, height, rotation, 0.4);
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