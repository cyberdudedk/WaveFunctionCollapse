import { Direction } from './Direction';
import { PieceObject } from './PieceObject';
import { WFCConfig } from './WFCConfig';
import { WFCData } from './WFCData';

export class WFCTiles {
    public wfcData: WFCData = new WFCData();
    public config: WFCConfig = new WFCConfig();

    public piecesMap: { [name: string]: any } = {};
    public tiles: any[][] = [];
    public tileCounters: { [name: string]: {minimum: number, maximum: number, count: number} } = {};

    private minX = 0;
    private minY = 0;
    private maxX = 0;
    private maxY = 0;

    constructor() {

    }

    public async init(config: WFCConfig) {
        //console.clear();
        this.config = config;
        this.config.offsetX = 0;
        this.config.offsetY = 0;

        this.minX = 0;
        this.minY = 0;
        this.maxX = this.config.tilesWidth;
        this.maxY = this.config.tilesHeight;

        this.loadTiles();
    }

    private loadTiles() {
        this.wfcData = new WFCData();
        this.wfcData.tilePieces = {};
        this.wfcData.tileSets = {};
        
        var tileNames = ["Castle", "Circles", "Circuit", "FloorPlan", "Knots", "Rooms","Summer", "Sudoku"];
        for(let tileIndex in tileNames) {
            const tile = tileNames[tileIndex];
            this.wfcData.tilePieces[tile] = require('./metadata/tiles/'+tile+'.json');
            this.wfcData.tileSets[tile] = require('./metadata/sets/'+tile+'.json');
        }
    }

    public async initTileData() {
        let pieces: any[] = this.wfcData.tilePieces[this.config.tileName];
        let sets = this.wfcData.tileSets[this.config.tileName];
        let currentSet = sets[this.config.set];
        
        Object.entries<any>(currentSet).forEach((value: [string, {weight: number, rotations: number[], edgeblacklist: string[], minimum: number, maximum: number}]) => {
            let pieceName = value[0];
            let properties = value[1];
            if(properties.rotations != undefined) {
                pieces.find(x => x.name == pieceName).rotations = properties.rotations;
            }
            if(properties.weight != undefined) {
                pieces.find(x => x.name == pieceName).weight = properties.weight;
            }
            if(properties.edgeblacklist != undefined) {
                pieces.find(x => x.name == pieceName).edgeblacklist = properties.edgeblacklist;
            }
            if(properties.minimum != undefined) {
                pieces.find(x => x.name == pieceName).minimum = properties.minimum;
            }
            if(properties.maximum != undefined) {
                pieces.find(x => x.name == pieceName).maximum = properties.maximum;
            }
        });

        let mappedPieces = pieces.reduce((piecesMap, piece) => {
            if(currentSet[piece.name] == undefined) {
                return piecesMap;
            }
            let pieceSockets = piece.socket
            piece.socketmatching = {};
            piece.blacklistedNeighbors = {};
            this.tileCounters[piece.name] = {minimum: piece.minimum, maximum: piece.maximum, count: 0};

            piece.rotations.forEach((rotation: number) => { 
                let socketMatchObject: { [name: string]: any } = {};
                let blacklistedNeighbors: { [name: string]: string[] } = {};
                let innerRotation = rotation;
                //TODO: Fix grid fixes and innerRotation
                if(rotation == 2) {
                    innerRotation = 3;
                }
                else if(rotation == 3) {
                    innerRotation = 5;
                }
                
                Object.keys(Direction).forEach((direction: string, index: number) =>{
                    if (!isNaN(Number(direction))) return;
                    if(direction == 'grid') return;
                    if(direction == 'grid2') return;
                    let directionsCount = (Object.keys(Direction).length / 2);
                    let directionIndex = Direction[direction as keyof typeof Direction];
                    let rotationMoved = (directionIndex - innerRotation + directionsCount) % directionsCount;
                    if((Direction[rotationMoved] == 'grid' || Direction[rotationMoved] == 'grid2') && innerRotation == 1) {
                        rotationMoved = (rotationMoved - 1 + directionsCount) % directionsCount;
                    }
                    else if((Direction[rotationMoved] == 'grid' || Direction[rotationMoved] == 'grid2') && innerRotation == 5) {
                        rotationMoved = (rotationMoved + 1 + directionsCount) % directionsCount;
                    }
                    
                    let flipped = directionIndex >= (directionsCount / 2);
                    let sockets = pieceSockets[Direction[rotationMoved]];
                    (Array.isArray(sockets) ? sockets : [sockets]).forEach((socket: string) => {
                        (socketMatchObject[direction] ||= []).push(flipped ? socket.split("").reverse().join("") : socket);
                    });
                });

                if(this.config.gridSize > 0) {
                    var gridSockets = pieceSockets[Direction[Direction.grid]];
                    var gridSockets2 = pieceSockets[Direction[Direction.grid2]];
                    socketMatchObject[Direction[Direction.grid]] = Array.isArray(gridSockets) ? gridSockets : [gridSockets];
                    socketMatchObject[Direction[Direction.grid2]] = Array.isArray(gridSockets2) ? gridSockets2 : [gridSockets2];
                }

                if(piece.blacklist) {
                    Object.entries(piece.blacklist).forEach((blacklist: [string, any]) => {
                        let blackListDirection = blacklist[0];
                        let blackListValue = blacklist[1];
                        let blackListIndex = Direction[blackListDirection as keyof typeof Direction];
                        let directionsCount = (Object.keys(Direction).length / 2);
                        let rotationBlacklistingIndex = (blackListIndex + rotation) % directionsCount;  // Fix rotation pointing at innerRotation instead?
                        let rotationBlacklisting = Direction[rotationBlacklistingIndex];
                        Object.entries(blackListValue).forEach((blacklistPiece: [string, any]) => {
                            let blackListPieceName = blacklistPiece[0];
                            let blackListPieceRotations = blacklistPiece[1];
                            blackListPieceRotations.forEach((blackListPieceRotation: number) => {
                                let blackListPieceNameWithRotation = blackListPieceName + "_" + (blackListPieceRotation + rotation) % directionsCount;
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
                        let socketDirectionInnerIndex = Direction[socketDirectionInner as keyof typeof Direction];
                        let directionsCount = (Object.keys(Direction).length / 2);
                        let socketDirectionPolarIndex = (socketDirectionInnerIndex + directionsCount/2) % directionsCount;
                        let socketDirectionPolar = Direction[socketDirectionPolarIndex];
                        
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
        
        this.piecesMap = Object.entries(mappedPieces).reduce((piecesMap: { [name: string]: PieceObject }, piecePair: any) => {
            let piece = piecePair[1];
            if(currentSet[piece.name] == undefined) {
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
                    left: [],
                    grid: [],
                    grid2: []
                };
                
                if(piece.socketmatching != undefined) {
                    
                    if(piece.socketmatching[rotation] != undefined) {
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

                let edgeBlackList: string[] | null = null;
                if(piece.edgeblacklist) {
                    edgeBlackList = piece.edgeblacklist.map((direction: string) => {
                        let dir = Direction[direction as keyof typeof Direction];
                        let directionsCount = (Object.keys(Direction).length / 2);
                        let newDir = (dir + rotation) % directionsCount;
                        return Direction[newDir];
                    });
                }

                piecesMap[pieceName] = new PieceObject(
                    piece.name + "_" + rotation,
                    piece.name, 
                    rotation, 
                    validNeighbors,
                    edgeBlackList,
                    weight,
                    piece.socketmatching[rotation],
                    piece.minimum,
                    piece.maximum
                );
            });
            
            return piecesMap;
        }, <{ [name: string]: any }>{});

        return true;
    }

    public reset() {
        //this.tileCounters = {};
        let piecesKeys = Object.keys(this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };

        let useEdgeSocket = false;
        let edgeSockets: { [name: string]: string } = {};

        if(this.config.edgeSocket != '') {
            useEdgeSocket = true;
            edgeSockets = {
                "top": this.config.edgeSocket,
                "left": this.config.edgeSocket.split("").reverse().join(""),
                "bottom": this.config.edgeSocket,
                "right": this.config.edgeSocket.split("").reverse().join("")
            };
        }

        this.tiles = [];

        for(let x = this.minX; x < this.maxX; x++) {
            if(this.tiles[x] == undefined) {
                this.tiles[x] = this.startingRow(x, startingTile, useEdgeSocket, edgeSockets);
            }
        }

        console.log('this.tiles', this.tiles);

        Object.entries(this.tileCounters).forEach((value: [string, any]) => {
            let numbers = value[1];
            numbers.count = 0;
        });
    }

    private startingCell(x: number, y: number, startingTile: { validPieces: string[]; }, useEdgeSocket: boolean, edgeSockets: { [name: string]: string; }): { position: { x: number; y: number; }; validPieces: string[]; } {
        var edges: string[] = [];
        if (x == this.minX)
            edges.push('left');
        if (y == this.minY)
            edges.push('top');
        if (x == this.maxX - 1)
            edges.push('right');
        if (y == this.maxY - 1)
            edges.push('bottom');

        if (edges.length > 0) {
            let validPieces = startingTile.validPieces.filter((pieceName: string) => {
                let piece = this.piecesMap[pieceName];
                let allow = true;
                if (useEdgeSocket) {
                    allow = edges.every(edge => piece.sockets[edge].includes(edgeSockets[edge])
                    );
                }

                if (piece.edgeblacklist) {
                    return !edges.some(v => piece.edgeblacklist.includes(v)) && allow;
                } else {
                    return true && allow;
                }
            });

            return {
                position: { x: x, y: y },
                validPieces: validPieces
            };
        } else {
            return {
                position: { x: x, y: y },
                validPieces: [...startingTile.validPieces]
            };
        }
    }

    private startingRow(x: number, startingTile: { validPieces: string[]; }, useEdgeSocket: boolean, edgeSockets: { [name: string]: string; }): { position: { x: number; y: number; }; validPieces: string[]; }[] {
        let row = [];
        for(let y = this.minY; y < this.maxY; y++) {
            
            if(row[y] == undefined) {
                row[y] = this.startingCell(x,y, startingTile, useEdgeSocket, edgeSockets);
            }
        }

        return row;
    }

    public expand() {
        this.minX = -this.config.offsetX || 0;
        this.minY = -this.config.offsetY || 0;
        this.maxX = this.config.tilesWidth - (this.config.offsetX || 0);
        this.maxY = this.config.tilesHeight - (this.config.offsetY || 0);

        let piecesKeys = Object.keys(this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };

        let useEdgeSocket = false;
        let edgeSockets: { [name: string]: string } = {};

        if(this.config.edgeSocket != '') {
            useEdgeSocket = true;
            edgeSockets = {
                "top": this.config.edgeSocket,
                "left": this.config.edgeSocket.split("").reverse().join(""),
                "bottom": this.config.edgeSocket,
                "right": this.config.edgeSocket.split("").reverse().join("")
            };
        }
/*
        this.tiles = Array.from({length:this.maxX}, 
            (a,x) => {
                return this.startingRow(x, startingTile, useEdgeSocket, edgeSockets);
            }
        );*/

        let newCells: {x: number, y: number, tile: any}[] = [];
        for(let x = this.minX; x < this.maxX; x++) {
            if(this.tiles[x] == undefined) {
                //Entire row is undefined
                this.tiles[x] = this.startingRow(x, startingTile, useEdgeSocket, edgeSockets);
                Object.keys(this.tiles[x]).forEach((yKey: string) => {
                    let y = parseInt(yKey);
                    newCells.push({
                        x: x,
                        y: y,
                        tile: this.tiles[x][y]
                    });
                });
            } else {
                for(let y = this.minY; y < this.maxY; y++) {
                    if(this.tiles[x][y] == undefined) {
                        //Cell is undefined
                        this.tiles[x][y] = this.startingCell(x,y, startingTile, useEdgeSocket, edgeSockets);
                        newCells.push({
                            x: x,
                            y: y,
                            tile: this.tiles[x][y]
                        });
                    }
                }
            }
        }
        return newCells;
    }
}