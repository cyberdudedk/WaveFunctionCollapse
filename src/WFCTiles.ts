import { Direction } from './Direction';
import { PieceObject } from './PieceObject';
import { WFCConfig } from './WFCConfig';
import { WFCData } from './WFCData';

export class WFCTiles {
    public wfcData: WFCData = new WFCData();
    public config: WFCConfig = new WFCConfig();

    public piecesMap: { [name: string]: any } = {};
    public tiles: any[][] = [];

    constructor() {

    }

    public async init(config: WFCConfig) {
        console.clear();
        this.config = config;

        this.loadTiles();
    }

    private loadTiles() {
        this.wfcData = new WFCData();
        this.wfcData.tilePieces = {};
        this.wfcData.tileSets = {};
        
        var tileNames = ["Castle", "Circles", "Circuit", "FloorPlan", "Knots", "Rooms","Summer"];
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

        Object.entries<any>(currentSet).forEach((value: [string, {weight: number, rotations: number[]}]) => {
            let pieceName = value[0];
            let properties = value[1];
            if(properties.rotations != undefined) {
                pieces.find(x => x.name == pieceName).rotations = properties.rotations;
            }
            if(properties.weight != undefined) {
                pieces.find(x => x.name == pieceName).weight = properties.weight;
            }
        });

        let mappedPieces = pieces.reduce((piecesMap, piece) => {
            if(currentSet[piece.name] == undefined) {
                return piecesMap;
            }

            let pieceSockets = piece.socket
            piece.socketmatching = {};
            piece.blacklistedNeighbors = {};

            piece.rotations.forEach((rotation: number) => { 
                let socketMatchObject: { [name: string]: any } = {};
                let blacklistedNeighbors: { [name: string]: string[] } = {};

                Object.keys(Direction).forEach((direction: string, index: number) =>{
                    if (!isNaN(Number(direction))) return;
                    let directionsCount = (Object.keys(Direction).length / 2);
                    let directionIndex = Direction[direction as keyof typeof Direction];
                    let rotationMoved = (directionIndex - rotation + directionsCount) % directionsCount;
                    let flipped = directionIndex >= (directionsCount / 2);
                    let sockets = pieceSockets[Direction[rotationMoved]];
                    (Array.isArray(sockets) ? sockets : [sockets]).forEach((socket: string) => {
                        (socketMatchObject[direction] ||= []).push(flipped ? socket.split("").reverse().join("") : socket);
                    });
                });

                if(piece.blacklist) {
                    Object.entries(piece.blacklist).forEach((blacklist: [string, any]) => {
                        let blackListDirection = blacklist[0];
                        let blackListValue = blacklist[1];
                        let blackListIndex = Direction[blackListDirection as keyof typeof Direction];
                        let directionsCount = (Object.keys(Direction).length / 2);
                        let rotationBlacklistingIndex = (blackListIndex + rotation) % directionsCount;
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
                    left: []
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

                piecesMap[pieceName] = new PieceObject(
                    piece.name + "_" + rotation,
                    piece.name, 
                    rotation, 
                    validNeighbors,
                    piece.newValid,
                    weight,
                );
                
            });
            
            return piecesMap;
        }, <{ [name: string]: any }>{});

        return true;
    }

    public reset() {
        let piecesKeys = Object.keys(this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };
        this.tiles = Array.from({length:this.config.tilesWidth}, 
            (a,x) => {
                return Array.from({length:this.config.tilesHeight}, (b, y) => {
                  return {
                    position: {x: x, y: y},
                    validPieces: [...startingTile.validPieces]
                  };
                });
            }
        )
    }
}