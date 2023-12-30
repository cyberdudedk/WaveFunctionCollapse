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
        console.log('init config', config);
        this.config = config;
        this.config.offsetX = 0;
        this.config.offsetY = 0;

        this.minX = 0;
        this.minY = 0;
        this.maxX = this.config.tilesWidth;
        this.maxY = this.config.tilesHeight;

        await this.loadTiles();
    }

    private async loadTiles() {
        this.wfcData = new WFCData();
        this.wfcData.tilePieces = {};
        this.wfcData.tileSets = {};
        
        var tileNames = ["Castle", "Circles", "Circuit", "FloorPlan", "Knots", "Rooms","Summer", "Sudoku", "Happyland", "TmwDesertSpacing"];
        for(let tileIndex in tileNames) {
            const tile = tileNames[tileIndex];
            this.wfcData.tileSets[tile] = require('./metadata/sets/'+tile+'.json');
        }

        await this.loadTilePieces(this.config.tileName);
    }

    private async loadTilePieces(tile: string) {
        let tilePieces = require('./metadata/tiles/'+tile+'.json');
        if(Array.isArray(tilePieces)) {
            this.wfcData.tilePieces[tile] = tilePieces;    
        } else if(typeof tilePieces === 'object' && tilePieces !== null) {
            if(tilePieces.tiles != undefined) {
                if(tilePieces.metadata != undefined) {
                    this.wfcData.tilePieces[tile] = await this.loadTilePiecesWithMetadata(tilePieces.tiles, tilePieces.metadata);
                } else {
                    this.wfcData.tilePieces[tile] = tilePieces.tiles;
                }
            }
        }
    }

    private async loadTilePiecesWithMetadata(tiles: any, metadata: any) {
        if(metadata.socketGenerator) {
            let generator = metadata.socketGenerator;
            if(generator.type == "name") {
                let settings = generator.settings;
                let regex = new RegExp(settings.regex);
                tiles.forEach((tile: any) => {
                    if(settings.namingtype == "border") {
                        tile.socket = tile.name.match(regex).groups;
                    } else if(settings.namingtype == "rows") {
                        let rows = tile.name.match(regex).slice(1);
                        tile.socket = {
                            "top": rows[0],
                            "bottom": rows[rows.length - 1].split("").reverse().join(""),
                            "left": rows.reduce((a: string, b: string) => b[0] + a, ""),
                            "right": rows.reduce((a: string, b: string) => a + b[b.length-1], "")
                        };
                    }
                });
            } 
            else if(generator.type == "pixelsedge" || generator.type == 'pixels') {
                let settings = generator.settings;
                let socketKeys = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let gridSize = settings.gridSize || 3;
                let maxBuckets = settings.buckets || 4;

                let tileImages = require('./metadata/render/' + this.config.tileName + '.json');
                let tileImageMap = tileImages.reduce((tileMap: any, tileImage: any) => {
                    tileMap[tileImage.name] = tileImage.imgsrc;
                    return tileMap;
                }, <{ [name: string]: string; }>{});
                
                let loadImagesAsync: Promise<{
                    name: string,
                    img: HTMLImageElement,
                    gridBuckets: any[]
                }>[] = [];
                loadImagesAsync = tiles.map(async (tile: any): Promise<{ name: string; img: HTMLImageElement; gridBuckets: any[];}> => {
                    return {
                        name: tile.name,
                        img: await this.preloadImage('tiles/' + this.config.tileName + '/' + tileImageMap[tile.name]),
                        gridBuckets: [],
                    };
                });

                let canvasrender = <HTMLCanvasElement>document.getElementById('drawrender');
                let context = canvasrender.getContext('2d')!;

                let imageCache = await Promise.all(loadImagesAsync);
                let imageIndex = 0;

                let calculateAverageGridBuckets = (gridBuckets: any[]) => {
                    gridBuckets.forEach((gridBucket) => {
                        let r = 0; let g = 0; let b = 0;
                        gridBucket.gridBucket.forEach((pixel: any) => {
                            r += pixel.r;
                            g += pixel.g;
                            b += pixel.b;
                        });
                        r /= gridBucket.gridBucket.length;
                        g /= gridBucket.gridBucket.length;
                        b /= gridBucket.gridBucket.length;
                        gridBucket.avgColorKey = [r, g, b].join("|");
                    });
                    return gridBuckets;
                }

                let getNamedSocketLookup = (imageCache: any[], colorKeyLookupToSocket: any) => {
                    let namedSocketLookup: any = {};
                    imageCache.forEach((cachedImage: {name: string, img: HTMLImageElement; gridBuckets: any[]}) => {
                        let rows: any[][] = [];
                        cachedImage.gridBuckets.forEach((bucket: any) => {
                            if(rows[bucket.position1] == undefined) {
                                rows[bucket.position1] = [];
                            }
                            rows[bucket.position1][bucket.position2] = colorKeyLookupToSocket[bucket.avgColorKey];
                        });
                        namedSocketLookup[cachedImage.name] = rows;
                    });
                    return namedSocketLookup;
                }

                if(generator.type == "pixelsedge") {
                    let edgeThickness = settings.thickness || 1;
                    imageCache.forEach((cachedImage: {name: string, img: HTMLImageElement; gridBuckets: any[]}) => {
                        let dataRGB = this.imageToRGB(cachedImage.img);
                        let gridBuckets: any[] = [];

                        let edges = [{
                            direction: 1,
                            type: 'horizontal'
                        },
                        {
                            direction: -1,
                            type: 'horizontal'
                        },
                        {
                            direction: 1,
                            type: 'vertical'
                        },
                        {
                            direction: -1,
                            type: 'vertical'
                        }];
                        
                        edges.forEach((edge, index) => {
                            let line1 = edge.type == 'horizontal' ? 'width' : 'height';
                            let line2 = edge.type == 'horizontal' ? 'height' : 'width';
                            let base = (edge.direction == 1 ? 1 : (<any>cachedImage.img)[line2]);
                            let gridLength = (<any>cachedImage.img)[line1];
                            let pixelPos = 0;
                            for(let pos = 0; pos < gridSize; pos++) {
                                let storedPixelPos = pixelPos;
                                let innerGridLength = Math.floor(gridLength / gridSize);
                                if(pos != 0 && pos != (gridSize -1)){
                                    innerGridLength = Math.ceil(gridLength / gridSize);
                                }
                                pixelPos = storedPixelPos;
                                let gridBucket = [];
                                for(let pos2 = 0; pos2 < innerGridLength; pos2++) {
                                    for(let t = 0; t < edgeThickness; t++) {
                                        let basePos = (base - 1) + (t * edge.direction); 
                                        let xPart = (edge.type == 'horizontal' ? pixelPos : basePos);
                                        let yPart = (edge.type == 'horizontal' ? basePos : pixelPos);
                                        gridBucket.push(dataRGB[xPart + (yPart * cachedImage.img.width)]);
                                    }
                                    pixelPos++;
                                }
                                gridBuckets.push({
                                    position1: index,
                                    position2: pos,
                                    gridBucket: gridBucket,
                                });
                            }
                        });

                        imageIndex++;
                        cachedImage.gridBuckets = calculateAverageGridBuckets(gridBuckets);
                    });

                    let colorKeyLookupToSocket = this.getColorKeyLookupToSocket(imageCache, maxBuckets, socketKeys, context);
                    let namedSocketLookup = getNamedSocketLookup(imageCache, colorKeyLookupToSocket);
                    tiles.forEach((tile: any) => {
                        if(namedSocketLookup[tile.name] == undefined) {
                            return;
                        }
                        let edges = namedSocketLookup[tile.name];
                        tile.socket = {
                            "top": edges[0].join(""),
                            "bottom": [...edges[1]].reverse().join(""),
                            "left": [...edges[2]].reverse().join(""),
                            "right": edges[3].join("")
                        };
                    });
                } else if(generator.type == "pixels") {
                    imageCache.forEach((cachedImage: {name: string, img: HTMLImageElement; gridBuckets: any[]}) => {
                        let dataRGB = this.imageToRGB(cachedImage.img);
                        let gridBuckets = [];
                        let pixelY = 0;
                        for(let y = 0; y < gridSize; y++) {
                            let innerGridHeight = Math.floor(cachedImage.img.height / gridSize);
                            if(y != 0 && y != (gridSize -1)){
                                innerGridHeight = Math.ceil(cachedImage.img.height / gridSize);
                            }
                            let pixelX = 0;
                            let storedPixelY = pixelY;
                            for(let x = 0; x < gridSize; x++) {
                                let innerGridWidth = Math.floor(cachedImage.img.width / gridSize);
                                if(x != 0 && x != (gridSize -1)){
                                    innerGridWidth = Math.ceil(cachedImage.img.width / gridSize);
                                }
                                let gridBucket = [];
                                let storedPixelX = pixelX;
                                pixelY = storedPixelY;
                                for(let y2 = 0; y2 < innerGridHeight; y2++) {
                                    pixelX = storedPixelX;
                                    for(let x2 = 0; x2 < innerGridWidth; x2++) {
                                        gridBucket.push(dataRGB[pixelX + pixelY * cachedImage.img.width]);
                                        pixelX++;
                                    }
                                    pixelY++;
                                }

                                gridBuckets.push({
                                    position1: y,
                                    position2: x,
                                    gridBucket,
                                });
                            } 
                        }

                        imageIndex++;
                        cachedImage.gridBuckets = calculateAverageGridBuckets(gridBuckets);
                    });

                    let colorKeyLookupToSocket = this.getColorKeyLookupToSocket(imageCache, maxBuckets, socketKeys, context);
                    let namedSocketLookup = getNamedSocketLookup(imageCache, colorKeyLookupToSocket);
                    tiles.forEach((tile: any) => {
                        if(namedSocketLookup[tile.name] == undefined) {
                            return;
                        }
                        let rows = namedSocketLookup[tile.name];
                        tile.socket = {
                            "top": rows[0].join(""),
                            "bottom": [...rows[rows.length - 1]].reverse().join(""),
                            "left": rows.reduce((a: string, b: string[]) => b[0] + a, ""),
                            "right": rows.reduce((a: string, b: string[]) => a + b[b.length-1], "")
                        };
                    });
                }
            }
        }
        return tiles;
    }

    private imageToRGB = (image: HTMLImageElement) => {
        let tempcontext = document.createElement('canvas').getContext('2d')!;
        tempcontext.drawImage(image, 0,0, image.width, image.height);
        let imageData = tempcontext.getImageData(0, 0, image.width, image.height);
        let dataRGB = [];
        for(let i = 0; i < imageData.data.length; i+=4) {
            dataRGB.push(
                {
                    r: imageData.data[i],
                    g: imageData.data[i+1],
                    b: imageData.data[i+2],
                }
            );
        }
        return dataRGB;
    }

    private getColorKeyLookupToSocket(imageCache: {
        name: string;
        img: HTMLImageElement;
        gridBuckets: any[];
    }[], maxBuckets: number, socketKeys: string, debugContext: CanvasRenderingContext2D) : any {
        let colorBucketToSocket: any[] = [];
        let maxDistanceIndexes = [];
        let avgColorsKeys = imageCache.map(cache => 
            cache.gridBuckets.map((gridBucket) => 
                gridBucket.avgColorKey
            )
        ).flat();

        let uniqueAvgColors = [...new Set(avgColorsKeys)].map((key) => {
            var spl = key.split("|");
            let r = parseFloat(spl[0]);
            let g = parseFloat(spl[1]);
            let b = parseFloat(spl[2]);
            return {
                r: r,
                g: g,
                b: b,
                key: key
            }
        });

        let uniqueAvgColorsHsv = uniqueAvgColors.map((color) => {
            return {
                hsv: this.rgb2hsv(color),
                rgbKey: color.key
            };
        });

        let distancesLookup: any[][] = [];
        for(let color1index = 0; color1index < uniqueAvgColors.length; color1index++) {
            for(let color2index = color1index+1; color2index < uniqueAvgColors.length; color2index++) {
                if(color1index == color2index) continue;
                let color1hsv = uniqueAvgColorsHsv[color1index].hsv;
                let color2hsv = uniqueAvgColorsHsv[color2index].hsv;
                let distance = this.hsvdistance(color1hsv, color2hsv);
                distancesLookup[color1index < color2index ? color1index : color2index] = distancesLookup[color1index < color2index ? color1index : color2index] || [];
                distancesLookup[color1index < color2index ? color1index : color2index][color1index < color2index ? color2index : color1index] = {
                    color1index: color1index,
                    color2index: color2index,
                    color1hsv,
                    color2hsv,
                    distance
                };
            }
        }

        let lookupDistance = (color1index: number, color2index: number) => {
            if(color1index == color2index) return 0;
            if(color1index < color2index) {
                return distancesLookup[color1index][color2index].distance;
            }
            else {
                return distancesLookup[color2index][color1index].distance;
            }
        }

        maxBuckets = Math.min(maxBuckets, uniqueAvgColors.length);
        if(maxBuckets == 1) {
            colorBucketToSocket.push([0]);
            maxDistanceIndexes.push(0);
        }
        if(maxBuckets > 1) {
            let maxPair = [...distancesLookup.flat()]
                .sort((a, b) => a.distance - b.distance)
                .slice(-1)[0];
            colorBucketToSocket.push([maxPair.color1index]);
            colorBucketToSocket.push([maxPair.color2index]);
            maxDistanceIndexes.push(maxPair.color1index);
            maxDistanceIndexes.push(maxPair.color2index);

            for(var loop = 3; loop <= maxBuckets; loop++) {
                let maxDistanceCompare = 0;
                let maxDistanceNewIndex = -1;
                for(let i = 0; i < uniqueAvgColors.length; i++) {
                    if(maxDistanceIndexes.includes(i)) continue;
                    let newDistance = Math.sqrt(maxDistanceIndexes.reduce((sum: number, index: number) => 
                        sum += Math.pow(lookupDistance(index, i), 2)
                    , 0));
                    
                    if(newDistance > maxDistanceCompare) {
                        maxDistanceCompare = newDistance;
                        maxDistanceNewIndex = i;
                    }
                }
                maxDistanceIndexes.push(maxDistanceNewIndex);
                colorBucketToSocket.push([maxDistanceNewIndex]);
            }
        }

        for(let i = 0; i < uniqueAvgColors.length; i++) {
            if(maxDistanceIndexes.includes(i)) continue;
            let arr = [];
            for(var j = 0; j < maxDistanceIndexes.length; j++) {
                arr.push(
                    {
                        "index": j,
                        "distance": lookupDistance(maxDistanceIndexes[j], i)
                    }
                );
            }

            let sorted = arr.sort((a, b) => a.distance - b.distance);
            colorBucketToSocket[sorted[0].index].push(i);
        }
  /*      
        // debug avgColors
        for(let i = 0; i < uniqueAvgColors.length; i++) {
            let color = uniqueAvgColors[i];
            debugContext.fillStyle = "rgb(" + color.r + ", " +  color.g + ", " + color.b + ")"; 
            debugContext.fillRect(20 * i, 0, 20, 20);
        }
        //debug buckets
        colorBucketToSocket.forEach((bucket, bucketIndex) => {
            bucket.forEach((index: number, i: number) => {
                let color = uniqueAvgColors[index];
                debugContext.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")"; 
                debugContext.fillRect(20 * i, (30 * bucketIndex) + 30, 20, 20);
            })
        })
*/
        let colorKeyLookupToSocket: any = {};
        for(var i = 0; i < colorBucketToSocket.length; i++) {
            let colorBucket = colorBucketToSocket[i];
            for(let j = 0; j < colorBucket.length; j++) {
                let colorIndex = colorBucket[j];
                let color = uniqueAvgColors[colorIndex];
                colorKeyLookupToSocket[color.key] = socketKeys[i];
            }
        }

        return colorKeyLookupToSocket;
    };

    private hsvdistance(color1hsv: {h: number,s: number,v: number}, color2hsv: {h: number,s: number,v: number}) {
        let hbias = 4.0;
        let sbias = 4.0;
        let vbias = 1;
        //let hbias = 7.0;
        //let sbias = 1.0;
        //let vbias = 1;
        let hdiff = Math.min(Math.abs(color1hsv.h - color2hsv.h), Math.abs(color1hsv.h - color2hsv.h + (color1hsv.h < color2hsv.h ? -360.0 : 360.0)));// * 1.2;
        let sdiff = Math.abs(color1hsv.s - color2hsv.s);
        let vdiff = Math.abs(color1hsv.v - color2hsv.v);
        let distance = Math.sqrt(Math.pow(hdiff * hbias, 2) + Math.pow(sdiff * sbias,2) + Math.pow(vdiff* vbias, 2));
        return distance;
    }

    private rgb2hsv (c: {r: number, g: number, b: number}) {
        let rabs: number, gabs: number, babs: number, rr: number, gg: number, bb: number, h: number, s: number, v: number, diff: number;
        rabs = c.r / 255;
        gabs = c.g / 255;
        babs = c.b / 255;
        h = 0;
        v = Math.max(rabs, gabs, babs),
        diff = v - Math.min(rabs, gabs, babs);
        let diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
        let percentRoundFn = (num: number) => Math.round(num * 100) / 100;
        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);
    
            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = (1 / 3) + rr - bb;
            } else if (babs === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            }else if (h > 1) {
                h -= 1;
            }
        }
        return {
            h: Math.round(h * 360),
            s: percentRoundFn(s * 100),
            v: percentRoundFn(v * 100)
        };
    }

    

    private preloadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = (event) => resolve(image);
            image.onerror = (event) => reject();
            image.src = src;
            
            return image;
        });
    }
    
    private mapSetConfigToPieces(set: any, pieces: any[]) {
        Object.entries<any>(set).forEach((value: [string, {weight: number, rotations: number[], edgeblacklist: string[], minimum: number, maximum: number}]) => {
            let pieceName = value[0];
            let properties = value[1];
            let piece = pieces.find(x => x.name == pieceName);
            if(properties.rotations != undefined) {
                piece.rotations = properties.rotations;
            }
            if(properties.weight != undefined) {
                piece.weight = properties.weight;
            }
            if(properties.edgeblacklist != undefined) {
                piece.edgeblacklist = properties.edgeblacklist;
            }
            if(properties.minimum != undefined) {
                piece.minimum = properties.minimum;
            }
            if(properties.maximum != undefined) {
                piece.maximum = properties.maximum;
            }
        });
    }

    private mapPieces(pieces: any[], set: any) {
        return pieces.reduce((piecesMap, piece) => {
            if(set[piece.name] == undefined) {
                return piecesMap;
            }
            let pieceSockets = piece.socket;
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
    }



    private mapSocketBuckets(mappedPieces: any) {
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

        return socketBuckets;
    }

    private mapPiecesMap(mappedPieces: any[], set: any, socketBuckets: { [socket: string]: { [socket: string]: string[] } }) {
        return Object.entries(mappedPieces).reduce((piecesMap: { [name: string]: PieceObject }, piecePair: any) => {
            //TODO: Fix grid fixes and innerRotation
            let piece = piecePair[1];
            if(set[piece.name] == undefined) {
                return piecesMap;
            }
            if(piece.rotations == undefined) {
                piece.rotations = [0];
            }
            
            piece.rotations.forEach((rotation: number) => {
                let innerRotation = rotation;
                if(rotation == 2) {
                    innerRotation = 3;
                }
                else if(rotation == 3) {
                    innerRotation = 5;
                }

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
                        //TODO: Fix grid fixes and innerRotation
                        let dir = Direction[direction as keyof typeof Direction];
                        if(direction == 'grid') return;
                        if(direction == 'grid2') return;
                        let directionsCount = (Object.keys(Direction).length / 2);

                        let rotationMoved = (dir + innerRotation) % directionsCount;
                        if((Direction[rotationMoved] == 'grid' || Direction[rotationMoved] == 'grid2') && innerRotation == 1) {
                            rotationMoved = (rotationMoved + 1) % directionsCount;
                        }
                        else if((Direction[rotationMoved] == 'grid' || Direction[rotationMoved] == 'grid2') && innerRotation == 5) {
                            rotationMoved = (rotationMoved - 1) % directionsCount;
                        }
                        
                        return Direction[rotationMoved];
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
    }

    public async initTileData() {
        let pieces: any[] = this.wfcData.tilePieces[this.config.tileName];
        let sets = this.wfcData.tileSets[this.config.tileName];
        let currentSet = sets[this.config.set];

        this.mapSetConfigToPieces(currentSet, pieces);
        let mappedPieces = this.mapPieces(pieces, currentSet);
        let socketBuckets = this.mapSocketBuckets(mappedPieces);
        
        this.piecesMap = this.mapPiecesMap(mappedPieces, currentSet, socketBuckets);

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

        //console.log('this.tiles', this.tiles);

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