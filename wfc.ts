class WFC {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public tileName: string = '';

    public tileScaleHeight = 30;
    public tileScaleWidth = 30;
    private halfScaleHeight = this.tileScaleHeight / 2;
    private halfScaleWidth = this.tileScaleWidth / 2;

    private fast: boolean = false;
    private runSpeed: number = 1;
    private runLoop: number = 100;

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

    public sets: { [name: string]: string[] } = {};
    public set: string ="all";
    public currentSet: string[] = [];
    
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

        this.tileName = 'Knots';
        this.set = 'all';

        this.sets = {
            all: ["corner", "t", "cross", "line", "empty"],
            nonempty: ["corner", "t", "cross", "line"],
            onlycorners: ["corner"],
            nocrossnoempty: ["corner", "t", "line"],
            nocross: ["corner", "t", "line", "empty"],
            onlyt: ["t"],
            braided: ["line", "cross"],
            cross: ["cross"],
            crosst: ["cross", "t"],
            cornert: ["corner", "t"],
        };

        this.pieces = [
        {
            'name': 'corner',
            'imgsrc': 'corner.png',
            'rotations': [0, 1, 2, 3],
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
        ];



        this.currentSet = this.sets[this.set];

        let loadImagesAsync = this.pieces.map(async (x: any) : Promise<{name: string, img: CanvasImageSource}> => {
            return {
                name: x.name,
                img: await this.preloadImage('tiles/' + this.tileName + '/' + x.imgsrc)
            }
        });

        this.imagesMap = (await Promise.all(loadImagesAsync)).reduce((piecesMap, piece) => {
            piecesMap[piece.name] = piece.img;
            return piecesMap;
        }, <{ [name: string]: CanvasImageSource }>{});

        let mappedPieces = this.pieces.reduce((piecesMap, piece) => {
            if(!this.currentSet.includes(piece.name)) {
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
                    socketMatchObject[direction] = pieceSockets[newRotation];
                });

                console.log(socketMatchObject);

                piece.socketmatching[rotation] = socketMatchObject;
            });

            piecesMap[piece.name] = piece;
            return piecesMap;
        }, <{ [name: string]: any }>{});

        this.piecesMap = Object.entries(mappedPieces).reduce((piecesMap, piecePair: any) => {
            let piece = piecePair[1];
            if(!this.currentSet.includes(piece.name)) {
                return piecesMap;
            }
            if(piece.rotations == undefined) {
                piece.rotations = [0];
            }

            if(piece.socket != undefined) {
                piece.newValid = {};
                let pieceSockets = piece.socket;
                
                Object.entries(pieceSockets).forEach(([socketDirection, socket]) => {
                    let socketDirectionIndex = this.directionsMapKeyToInt[socketDirection];
                    let searchDirectionIndex = (socketDirectionIndex + (this.directionsMapIntToKey.length / 2)) % this.directionsMapIntToKey.length;
                    let searchDirection = this.directionsMapIntToKey[searchDirectionIndex];
                    this.pieces.forEach((pieceSearch) => {
                        if(pieceSearch.socketmatching != undefined) {
                            let matches = Object.entries(pieceSearch.socketmatching);
                            matches.forEach((socketSearch: [socketDirectionSearch: string, searchSockets: any]) => {
                                let socketSearchDirectionSocket = socketSearch[1][searchDirection];
                                let socketDirectionSearch = parseInt(socketSearch[0]);
                                if(socketSearchDirectionSocket == socket) {
                                    if(piece.newValid[socketDirection] == undefined) {
                                        piece.newValid[socketDirection] = [];
                                    }
                                    let findValidObject = piece.newValid[socketDirection].find((x: any) => x.key == pieceSearch.name);
                                    if(findValidObject == undefined) {
                                        piece.newValid[socketDirection].push(
                                            {key: pieceSearch.name, rotations: [socketDirectionSearch]},
                                        );
                                    } else {
                                        findValidObject.rotations.push(socketDirectionSearch);
                                    }
                                }
                            });
                            
                        }
                    });
                });

            }
            
            piece.rotations.forEach((rotation: number) => {

                let validNeighbors: { [name: string]: string[] } = {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                };
    
                this.directionsMapIntToKey.forEach((direction, index) => {
                    let outerOffsettedIndex = (index+rotation)%this.directionsMapIntToKey.length;
                    let outerOffsettedDirection = this.directionsMapIntToKey[outerOffsettedIndex];
                    
                    piece.newValid[direction].forEach((t: {key: string, rotations: number[]}) => {
                        let originalPiece = mappedPieces[t.key];
                        if(originalPiece != undefined) {
                            t.rotations.forEach((directionRotation) => {
                                let offsettedIndex = (directionRotation+rotation)%originalPiece.rotations.length;
                                let offsettedDirection = this.directionsMapIntToKey[offsettedIndex];
                                let validName = t.key + "_" + offsettedIndex;
                                if(!validNeighbors[outerOffsettedDirection].includes(validName)) {
                                    validNeighbors[outerOffsettedDirection].push(validName);
                                }
                                
                            });
                        }
                    });
                });



                
                let weight = piece.weight ?? 1;
                if(Array.isArray(piece.weight)) {
                    weight = weight[rotation] ?? 1;
                }
                piecesMap[piece.name + "_" + rotation] = {
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
            console.log(summed, summed);
        }
        return selected.key;
    }

    private stopRunning = true;

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
                    console.log('not possible to solve restarting');
                    this.stopWFCLoop();
                    this.startOver();
                    break;

                }
                let randomPiece = Math.floor(Math.random() * currentTile.validPieces.length);
                let tileKey = this.getRandomElementFromArrayWeigted(currentTile.validPieces);
                if(tileKey == null) {
                    console.log('not possible to solve restarting');
                    this.stopWFCLoop();
                    this.startOver();
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
        let width = Math.ceil(this.tileScaleWidth / gridSize);
        let height = Math.ceil(this.tileScaleHeight / (gridSize));
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
