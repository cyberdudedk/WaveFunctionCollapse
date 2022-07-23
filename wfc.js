"use strict";
class WFC {
    constructor(canvasId) {
        this.tileName = '';
        this.tileScaleHeight = 30;
        this.tileScaleWidth = 30;
        this.halfScaleHeight = this.tileScaleHeight / 2;
        this.halfScaleWidth = this.tileScaleWidth / 2;
        this.fast = false;
        this.runSpeed = 1;
        this.runLoop = 100;
        this.tilesHeight = 20;
        this.tilesWidth = 20;
        this.superImposed = 2;
        this.useMouse = false;
        this.pieces = [];
        this.piecesMap = {};
        this.imagesMap = {};
        this.tiles = [];
        this.directionsMapIntToKey = [
            'top',
            'right',
            'bottom',
            'left'
        ];
        this.directionsMapKeyToInt = {
            'top': 0,
            'right': 1,
            'bottom': 2,
            'left': 3
        };
        this.sets = {};
        this.set = "all";
        this.currentSet = [];
        this.stopRunning = true;
        this.wfcLoop = undefined;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
    }
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = (event) => resolve(image);
            image.onerror = (event) => reject();
            image.src = src;
            return image;
        });
    }
    async init() {
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
                'rotations': [0, 1],
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
                'rotations': [0, 1],
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
                'rotations': [0, 1, 2, 3],
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
        let loadImagesAsync = this.pieces.map(async (x) => {
            return {
                name: x.name,
                img: await this.preloadImage('tiles/' + this.tileName + '/' + x.imgsrc)
            };
        });
        this.imagesMap = (await Promise.all(loadImagesAsync)).reduce((piecesMap, piece) => {
            piecesMap[piece.name] = piece.img;
            return piecesMap;
        }, {});
        let mappedPieces = this.pieces.reduce((piecesMap, piece) => {
            if (!this.currentSet.includes(piece.name)) {
                return piecesMap;
            }
            let pieceSockets = piece.socket;
            piece.socketmatching = {};
            piece.rotations.forEach((rotation) => {
                let socketMatchObject = {};
                this.directionsMapIntToKey.forEach((direction, index) => {
                    let rotationMoved = (index - rotation) % this.directionsMapIntToKey.length;
                    if (rotationMoved < 0)
                        rotationMoved += this.directionsMapIntToKey.length;
                    let newRotation = this.directionsMapIntToKey[rotationMoved];
                    socketMatchObject[direction] = pieceSockets[newRotation];
                });
                console.log(socketMatchObject);
                piece.socketmatching[rotation] = socketMatchObject;
            });
            piecesMap[piece.name] = piece;
            return piecesMap;
        }, {});
        this.piecesMap = Object.entries(mappedPieces).reduce((piecesMap, piecePair) => {
            let piece = piecePair[1];
            if (!this.currentSet.includes(piece.name)) {
                return piecesMap;
            }
            if (piece.rotations == undefined) {
                piece.rotations = [0];
            }
            if (piece.socket != undefined) {
                piece.newValid = {};
                let pieceSockets = piece.socket;
                Object.entries(pieceSockets).forEach(([socketDirection, socket]) => {
                    let socketDirectionIndex = this.directionsMapKeyToInt[socketDirection];
                    let searchDirectionIndex = (socketDirectionIndex + (this.directionsMapIntToKey.length / 2)) % this.directionsMapIntToKey.length;
                    let searchDirection = this.directionsMapIntToKey[searchDirectionIndex];
                    this.pieces.forEach((pieceSearch) => {
                        if (pieceSearch.socketmatching != undefined) {
                            let matches = Object.entries(pieceSearch.socketmatching);
                            matches.forEach((socketSearch) => {
                                let socketSearchDirectionSocket = socketSearch[1][searchDirection];
                                let socketDirectionSearch = parseInt(socketSearch[0]);
                                if (socketSearchDirectionSocket == socket) {
                                    if (piece.newValid[socketDirection] == undefined) {
                                        piece.newValid[socketDirection] = [];
                                    }
                                    let findValidObject = piece.newValid[socketDirection].find((x) => x.key == pieceSearch.name);
                                    if (findValidObject == undefined) {
                                        piece.newValid[socketDirection].push({ key: pieceSearch.name, rotations: [socketDirectionSearch] });
                                    }
                                    else {
                                        findValidObject.rotations.push(socketDirectionSearch);
                                    }
                                }
                            });
                        }
                    });
                });
            }
            piece.rotations.forEach((rotation) => {
                var _a, _b;
                let validNeighbors = {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                };
                this.directionsMapIntToKey.forEach((direction, index) => {
                    let outerOffsettedIndex = (index + rotation) % this.directionsMapIntToKey.length;
                    let outerOffsettedDirection = this.directionsMapIntToKey[outerOffsettedIndex];
                    piece.newValid[direction].forEach((t) => {
                        let originalPiece = mappedPieces[t.key];
                        if (originalPiece != undefined) {
                            t.rotations.forEach((directionRotation) => {
                                let offsettedIndex = (directionRotation + rotation) % originalPiece.rotations.length;
                                let offsettedDirection = this.directionsMapIntToKey[offsettedIndex];
                                let validName = t.key + "_" + offsettedIndex;
                                if (!validNeighbors[outerOffsettedDirection].includes(validName)) {
                                    validNeighbors[outerOffsettedDirection].push(validName);
                                }
                            });
                        }
                    });
                });
                let weight = (_a = piece.weight) !== null && _a !== void 0 ? _a : 1;
                if (Array.isArray(piece.weight)) {
                    weight = (_b = weight[rotation]) !== null && _b !== void 0 ? _b : 1;
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
        }, {});
        console.log('piecesMap', this.piecesMap);
        this.startOver();
        this.startDrawingLoop();
    }
    startOver() {
        this.reset();
        this.startWFCLoop(this.runSpeed);
    }
    reset() {
        //this.ctx.fillStyle = "black";
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        let piecesKeys = Object.keys(this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };
        this.tiles = Array.from({ length: this.tilesWidth }, () => {
            return Array.from({ length: this.tilesHeight }, () => {
                let k = Math.floor(Math.random() * 10);
                return {
                    validPieces: [...startingTile.validPieces]
                };
            });
        });
    }
    getTilePositionsAsEntropyGroups() {
        let entropyGroups = {};
        this.tiles.forEach((column, x) => {
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
    getRandomElementFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    getRandomElementFromArrayWeigted(array) {
        let summed = [];
        let sumCount = 0;
        let lastSum = 0;
        array.forEach((x, i) => {
            let weight = this.piecesMap[x].weight;
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
        let selected = summed.find((x) => {
            return x.minsum <= rnd && x.maxsum > rnd;
        });
        if (selected == undefined) {
            console.log(summed, summed);
        }
        return selected.key;
    }
    runWFC3() {
        for (var i = 0; i < this.runLoop; i++) {
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
            let currentTile = this.tiles[x][y];
            if (currentTile.validPieces != undefined) {
                if (currentTile.validPieces.length == 0) {
                    console.log('not possible to solve restarting');
                    this.stopWFCLoop();
                    this.startOver();
                    break;
                }
                let randomPiece = Math.floor(Math.random() * currentTile.validPieces.length);
                let tileKey = this.getRandomElementFromArrayWeigted(currentTile.validPieces);
                if (tileKey == null) {
                    console.log('not possible to solve restarting');
                    this.stopWFCLoop();
                    this.startOver();
                    break;
                }
                let piece = this.piecesMap[tileKey];
                this.tiles[x][y] = piece;
                if (piece == undefined) {
                    console.log('piece', x, y, piece, tileKey, randomPiece, currentTile.validPieces);
                }
                let neighbors = [];
                if (y != 0) {
                    neighbors.push({ direction: 'top', tile: this.tiles[x][y - 1] });
                }
                if (x != this.tilesWidth - 1) {
                    neighbors.push({ direction: 'right', tile: this.tiles[x + 1][y] });
                }
                if (y != this.tilesHeight - 1) {
                    neighbors.push({ direction: 'bottom', tile: this.tiles[x][y + 1] });
                }
                if (x != 0) {
                    neighbors.push({ direction: 'left', tile: this.tiles[x - 1][y] });
                }
                neighbors.forEach((neighbor) => {
                    if (neighbor.tile.validPieces) {
                        neighbor.tile.validPieces = neighbor.tile.validPieces
                            .filter((validPieceToCheck) => {
                            return piece.validNeighbors[neighbor.direction].includes(validPieceToCheck);
                        });
                    }
                });
            }
        }
        let stop = this.checkForStop();
        if (!stop && this.fast) {
            this.runWFC3();
        }
    }
    checkForStop() {
        let stop = true;
        this.tiles.forEach((column, columnIndex) => {
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
            this.stopWFCLoop();
            return true;
        }
    }
    startWFCLoop(interval) {
        this.stopRunning = false;
        if (this.useMouse) {
            document.body.addEventListener('click', () => this.runWFC3(), true);
        }
        else {
            this.wfcLoop = setInterval(() => {
                this.runWFC3();
            }, interval);
        }
        /*
                this.wfcLoop = setTimeout(() => {
                    this.runWFC3();
                },50);*/
    }
    stopWFCLoop() {
        console.log('stopWFCLoop');
        this.stopRunning = true;
        clearInterval(this.wfcLoop);
    }
    startDrawingLoop() {
        requestAnimationFrame(() => this.draw());
    }
    stopDrawingLoop() {
    }
    draw() {
        this.ctx.save();
        this.drawTiles();
        this.ctx.restore();
        requestAnimationFrame(() => this.draw());
    }
    drawTiles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //this.ctx.fillStyle = "black";
        //this.ctx.fillStyle = "transparent";
        //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if (tile.validPieces) {
                    let validCount = tile.validPieces.length;
                    if (tile.validPieces.length > 0) {
                        if (this.superImposed == 1) {
                            //superimposed 1 - on top of each
                            tile.validPieces.forEach((key) => {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
                            });
                        }
                        else if (this.superImposed == 2) {
                            //superimposed 2 - grid
                            let gridSize = Math.ceil(Math.sqrt(validCount));
                            tile.validPieces.forEach((key, index) => {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount);
                            });
                        }
                    }
                }
                if (tile.key != undefined) {
                    let key = tile.key;
                    let piece = this.piecesMap[key];
                    let tileImage = this.imagesMap[piece.name];
                    this.drawTile(tileImage, columnIndex, rowIndex, tile.rotation);
                }
            });
        });
    }
    drawImgGrid(img, x, y, rotation, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate((this.tileScaleWidth * x) + this.halfScaleWidth, (this.tileScaleHeight * y) + this.halfScaleHeight);
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -this.halfScaleWidth, -this.halfScaleHeight, this.tileScaleWidth, this.tileScaleHeight);
        this.ctx.restore();
    }
    drawTile(img, x, y, rotation) {
        this.drawImgGrid(img, x, y, rotation, 1);
    }
    drawSuperimposed(img, x, y, rotation, possible) {
        this.drawImgGrid(img, x, y, rotation, 0.8 / possible);
    }
    drawSuperimposedPartGrid(img, x, y, gridSize, gridIndex, rotation, possible) {
        let width = Math.ceil(this.tileScaleWidth / gridSize);
        let height = Math.ceil(this.tileScaleHeight / (gridSize));
        let newX = (this.tileScaleWidth * x) + ((gridIndex % gridSize) * width);
        let newY = (this.tileScaleHeight * y) + ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg(img, newX, newY, width, height, rotation, 0.4);
    }
    drawImg(img, x, y, width, height, rotation, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate(x + (width / 2), y + (height / 2));
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -(width / 2), -(height / 2), width, height);
        this.ctx.restore();
    }
}
