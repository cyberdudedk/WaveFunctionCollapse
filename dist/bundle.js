/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SuperImposedState.ts":
/*!**********************************!*\
  !*** ./src/SuperImposedState.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuperImposedState": () => (/* binding */ SuperImposedState)
/* harmony export */ });
var SuperImposedState;
(function (SuperImposedState) {
    SuperImposedState[SuperImposedState["None"] = 0] = "None";
    SuperImposedState[SuperImposedState["Layered"] = 1] = "Layered";
    SuperImposedState[SuperImposedState["LayeredSorted"] = 2] = "LayeredSorted";
    SuperImposedState[SuperImposedState["Grid"] = 3] = "Grid";
    SuperImposedState[SuperImposedState["GridScaled"] = 4] = "GridScaled";
    SuperImposedState[SuperImposedState["GridAlpha"] = 5] = "GridAlpha";
})(SuperImposedState || (SuperImposedState = {}));


/***/ }),

/***/ "./src/wfc.ts":
/*!********************!*\
  !*** ./src/wfc.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFC": () => (/* binding */ WFC)
/* harmony export */ });
/* harmony import */ var _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SuperImposedState */ "./src/SuperImposedState.ts");

class WFC {
    constructor(canvasId) {
        this.maxRetryCount = 10;
        this.maxDepth = 100;
        this.tileScaleHeight = 40;
        this.tileScaleWidth = 40;
        this.fast = false;
        this.runSpeed = 10;
        this.runLoop = 30;
        this.tilesHeight = 30;
        this.tilesWidth = 30;
        this.superImposed = 1;
        this.useMouse = false;
        this.tileName = 'Knots';
        this.set = 'all';
        this.halfScaleHeight = this.tileScaleHeight / 2;
        this.halfScaleWidth = this.tileScaleWidth / 2;
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
        this.currentSet = {} = {};
        this.retryCount = 0;
        this.tileSets = {};
        this.tilePieces = {};
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
    getAvailableTiles() {
        return Object.keys(this.tileSets);
    }
    getSuperImposedStates() {
        return _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState;
    }
    getAvailableSets(tileName) {
        var sets = this.tileSets[tileName];
        if (sets == null)
            return null;
        return Object.keys(sets);
    }
    getTileSets() {
        return this.tileSets;
    }
    loadTiles() {
        this.tilePieces = {};
        this.tileSets = {};
        var tileNames = ["Castle", "Circles", "Circuit", "FloorPlan", "Knots", "Rooms", "Summer"];
        for (let tileIndex in tileNames) {
            const tile = tileNames[tileIndex];
            this.tilePieces[tile] = __webpack_require__("./src/metadata/tiles sync recursive ^\\.\\/.*\\.json$")("./" + tile + ".json");
            this.tileSets[tile] = __webpack_require__("./src/metadata/sets sync recursive ^\\.\\/.*\\.json$")("./" + tile + ".json");
        }
    }
    async init(config) {
        console.clear();
        let ctx = this.ctx;
        let canvas = this.canvas;
        this.tileName = config.tileName;
        this.set = config.set;
        this.maxRetryCount = config.maxRetryCount;
        this.maxDepth = config.maxDepth;
        this.tileScaleHeight = config.tileScale;
        this.tileScaleWidth = config.tileScale;
        this.fast = config.fast;
        this.runSpeed = config.runSpeed;
        this.runLoop = config.runLoop;
        this.tilesHeight = config.tilesHeight;
        this.tilesWidth = config.tilesWidth;
        this.superImposed = config.superImposed;
        this.useMouse = config.useMouse;
        this.halfScaleHeight = this.tileScaleHeight / 2;
        this.halfScaleWidth = this.tileScaleWidth / 2;
        canvas.height = this.tilesHeight * this.tileScaleHeight;
        canvas.width = this.tilesWidth * this.tileScaleWidth;
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.loadTiles();
    }
    async initTileData() {
        this.pieces = this.tilePieces[this.tileName];
        this.sets = this.tileSets[this.tileName];
        this.currentSet = this.sets[this.set];
        let loadImagesAsync = this.pieces.map(async (x) => {
            return {
                name: x.name,
                img: await this.preloadImage('tiles/' + this.tileName + '/' + x.imgsrc)
            };
        });
        Object.entries(this.currentSet).forEach((value) => {
            let pieceName = value[0];
            let properties = value[1];
            if (properties.rotations != undefined) {
                this.pieces.find(x => x.name == pieceName).rotations = properties.rotations;
            }
            if (properties.weight != undefined) {
                this.pieces.find(x => x.name == pieceName).weight = properties.weight;
            }
        });
        this.imagesMap = (await Promise.all(loadImagesAsync)).reduce((piecesMap, piece) => {
            piecesMap[piece.name] = piece.img;
            return piecesMap;
        }, {});
        let mappedPieces = this.pieces.reduce((piecesMap, piece) => {
            if (this.currentSet[piece.name] == undefined) {
                return piecesMap;
            }
            let pieceSockets = piece.socket;
            piece.socketmatching = {};
            piece.blacklistedNeighbors = {};
            piece.rotations.forEach((rotation) => {
                let socketMatchObject = {};
                let blacklistedNeighbors = {};
                this.directionsMapIntToKey.forEach((direction, index) => {
                    let rotationMoved = (index - rotation) % this.directionsMapIntToKey.length;
                    if (rotationMoved < 0)
                        rotationMoved += this.directionsMapIntToKey.length;
                    let newRotation = this.directionsMapIntToKey[rotationMoved];
                    let flipped = index >= (this.directionsMapIntToKey.length / 2);
                    let sockets = pieceSockets[newRotation];
                    if (!Array.isArray(sockets)) {
                        sockets = [sockets];
                    }
                    sockets.forEach((socket) => {
                        if (socketMatchObject[direction] == undefined) {
                            socketMatchObject[direction] = [];
                        }
                        if (flipped) {
                            socketMatchObject[direction].push(socket.split("").reverse().join(""));
                        }
                        else {
                            socketMatchObject[direction].push(socket);
                        }
                    });
                });
                if (piece.blacklist) {
                    Object.entries(piece.blacklist).forEach((blacklist) => {
                        let blackListDirection = blacklist[0];
                        let blackListValue = blacklist[1];
                        let blackListIndex = this.directionsMapKeyToInt[blackListDirection];
                        let rotationBlacklistingIndex = (blackListIndex + rotation) % this.directionsMapIntToKey.length;
                        let rotationBlacklisting = this.directionsMapIntToKey[rotationBlacklistingIndex];
                        Object.entries(blackListValue).forEach((blacklistPiece) => {
                            let blackListPieceName = blacklistPiece[0];
                            let blackListPieceRotations = blacklistPiece[1];
                            blackListPieceRotations.forEach((blackListPieceRotation) => {
                                let blackListPieceNameWithRotation = blackListPieceName + "_" + (blackListPieceRotation + rotation) % this.directionsMapIntToKey.length;
                                if (blacklistedNeighbors[rotationBlacklisting] == undefined) {
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
        }, {});
        let socketBuckets = {};
        Object.entries(mappedPieces).forEach((mappedPieceValue) => {
            let pieceName = mappedPieceValue[0];
            let piece = mappedPieceValue[1];
            if (piece.socketmatching != undefined) {
                Object.entries(piece.socketmatching).forEach((socketMatchValue) => {
                    let socketDirection = parseInt(socketMatchValue[0]);
                    let socketMatch = socketMatchValue[1];
                    Object.entries(socketMatch).forEach((socket) => {
                        let socketDirectionInner = socket[0];
                        let socketMatchInnerValueArray = socket[1];
                        let socketDirectionInnerIndex = this.directionsMapKeyToInt[socketDirectionInner];
                        let socketDirectionPolarIndex = (socketDirectionInnerIndex + this.directionsMapIntToKey.length / 2) % this.directionsMapIntToKey.length;
                        let socketDirectionPolar = this.directionsMapIntToKey[socketDirectionPolarIndex];
                        socketMatchInnerValueArray.forEach((socketMatchInnerValue) => {
                            if (socketBuckets[socketMatchInnerValue] == undefined) {
                                let innerObject = {};
                                socketBuckets[socketMatchInnerValue] = innerObject;
                            }
                            if (socketBuckets[socketMatchInnerValue][socketDirectionPolar] == undefined) {
                                socketBuckets[socketMatchInnerValue][socketDirectionPolar] = [];
                            }
                            socketBuckets[socketMatchInnerValue][socketDirectionPolar].push(pieceName + "_" + socketDirection);
                        });
                    });
                });
            }
        });
        this.piecesMap = Object.entries(mappedPieces).reduce((piecesMap, piecePair) => {
            let piece = piecePair[1];
            if (this.currentSet[piece.name] == undefined) {
                return piecesMap;
            }
            if (piece.rotations == undefined) {
                piece.rotations = [0];
            }
            piece.rotations.forEach((rotation) => {
                var _a, _b;
                let pieceName = piece.name + "_" + rotation;
                let validNeighbors = {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                };
                if (piece.socketmatching != undefined) {
                    if (piece.socketmatching[rotation] != undefined) {
                        let rotationDirection = this.directionsMapIntToKey[rotation];
                        let socketMatch = piece.socketmatching[rotation];
                        Object.entries(socketMatch).forEach((socketPair) => {
                            let socketDirection = socketPair[0];
                            let sockets = socketPair[1];
                            sockets.forEach((socket) => {
                                if (socketBuckets[socket] != undefined && socketBuckets[socket][socketDirection] != undefined) {
                                    let validPiecesForSocket = socketBuckets[socket][socketDirection];
                                    validPiecesForSocket.forEach((validPiece) => {
                                        var _a;
                                        let blackList = (_a = piece.blacklistedNeighbors[rotation][socketDirection]) !== null && _a !== void 0 ? _a : [];
                                        if (!validNeighbors[socketDirection].includes(validPiece) && !blackList.includes(validPiece)) {
                                            validNeighbors[socketDirection].push(validPiece);
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
                let weight = (_a = piece.weight) !== null && _a !== void 0 ? _a : 1;
                if (Array.isArray(piece.weight)) {
                    weight = (_b = weight[rotation]) !== null && _b !== void 0 ? _b : 1;
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
        }, {});
        return true;
    }
    initDraw() {
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
        console.log('this.piecesMap', this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };
        this.tiles = Array.from({ length: this.tilesWidth }, (a, x) => {
            return Array.from({ length: this.tilesHeight }, (b, y) => {
                return {
                    position: { x: x, y: y },
                    validPieces: [...startingTile.validPieces]
                };
            });
        });
        console.log('this.tiles', this.tiles);
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
            console.log('summed', summed);
        }
        return selected.key;
    }
    noValidFound() {
        this.retryCount++;
        this.stopWFCLoop();
        if (this.retryCount <= this.maxRetryCount) {
            this.startOver();
        }
        else {
            console.log('not possible to solve within ' + this.maxRetryCount + ' retries');
        }
    }
    runWFC3() {
        for (var i = 0; (i < this.runLoop) || this.fast; i++) {
            let stop = this.checkForStop();
            if (stop)
                return;
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
                    this.noValidFound();
                    return false;
                }
                let randomPiece = Math.floor(Math.random() * currentTile.validPieces.length);
                let tileKey = this.getRandomElementFromArrayWeigted(currentTile.validPieces);
                if (tileKey == null) {
                    this.noValidFound();
                    return false;
                }
                let piece = this.piecesMap[tileKey];
                this.tiles[x][y] = piece;
                if (piece == undefined) {
                    console.log('piece', x, y, piece, tileKey, randomPiece, currentTile.validPieces);
                }
                let validation = this.runValidation(x, y, [piece]);
                if (validation == null) {
                    break;
                }
                let depth = 0;
                while (validation.length > 0 && depth < this.maxDepth) {
                    let newValidations = [];
                    if (validation.length > 0) {
                        validation.forEach((v) => {
                            let validationTile = this.tiles[v.x][v.y];
                            let validationTilePieces = validationTile.validPieces;
                            let pieces = validationTilePieces.map((tileKey) => {
                                return this.piecesMap[tileKey];
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
    }
    runValidation(x, y, pieces) {
        let recheck = [];
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
                let validBefore = neighbor.tile.validPieces.length;
                let validArray = [];
                pieces.forEach((piece) => {
                    validArray.push(neighbor.tile.validPieces
                        .filter((validPieceToCheck) => {
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
            console.log('checkForStop', 'return true');
            console.log('Found solution after ' + this.retryCount + ' retries');
            this.stopWFCLoop();
            return true;
        }
        return stop;
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
    }
    stopWFCLoop() {
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
        this.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if (tile.validPieces) {
                    let validCount = tile.validPieces.length;
                    if (tile.validPieces.length > 0) {
                        if (this.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.Layered) {
                            //superimposed 1 - on top of each
                            tile.validPieces.forEach((key) => {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
                            });
                        }
                        else if (this.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.GridScaled) {
                            //superimposed 2 - grid
                            let gridSize = Math.ceil(Math.sqrt(validCount));
                            tile.validPieces.forEach((key, index) => {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, 0.4);
                            });
                        }
                        else if (this.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.Grid) {
                            //superimposed 3 - grid without scaling
                            validCount = Object.keys(this.piecesMap).length;
                            let gridSize = Math.ceil(Math.sqrt(validCount));
                            tile.validPieces.forEach((key, index) => {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, 0.4);
                            });
                        }
                        else if (this.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.None) {
                            //superimposed 4 - none
                        }
                        else if (this.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.LayeredSorted) {
                            //superimposed 5 - layered sorted
                            let sortedValid = tile.validPieces.sort((a, b) => {
                                let pieceA = this.piecesMap[a];
                                let pieceB = this.piecesMap[b];
                                return pieceB.weight - pieceA.weight;
                            });
                            sortedValid.forEach((key) => {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
                            });
                        }
                        else if (this.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.GridAlpha) {
                            //superimposed 6 - grid scaled alpha
                            let minWeight = 999;
                            let maxWeight = 0;
                            let sortedValid = tile.validPieces.sort((a, b) => {
                                let pieceA = this.piecesMap[a];
                                let pieceB = this.piecesMap[b];
                                let weight = pieceA.weight;
                                if (minWeight > weight) {
                                    minWeight = weight;
                                }
                                if (maxWeight < weight) {
                                    maxWeight = weight;
                                }
                                return pieceB.weight - pieceA.weight;
                            });
                            sortedValid.forEach((key, index) => {
                                let piece = this.piecesMap[key];
                                let tileImage = this.imagesMap[piece.name];
                                let weight = piece.weight;
                                let weightPercent = ((weight - minWeight)) / (maxWeight - minWeight);
                                let adjustedAlpha = (weightPercent * (0.6 - 0.2)) + 0.2;
                                let gridSize = Math.ceil(Math.sqrt(validCount));
                                this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, adjustedAlpha);
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
        this.drawImgGrid(img, x, y, rotation, 0.9 / possible);
    }
    drawSuperimposedWeighted(img, x, y, rotation, possible, alpha) {
        this.drawImgGrid(img, x, y, rotation, alpha);
    }
    drawSuperimposedPartGrid(img, x, y, gridSize, gridIndex, rotation, possible, alpha) {
        let width = this.tileScaleWidth / gridSize;
        let height = this.tileScaleHeight / (gridSize);
        let newX = (this.tileScaleWidth * x) + ((gridIndex % gridSize) * width);
        let newY = (this.tileScaleHeight * y) + ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg(img, newX, newY, width, height, rotation, alpha);
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


/***/ }),

/***/ "./src/metadata/sets sync recursive ^\\.\\/.*\\.json$":
/*!************************************************!*\
  !*** ./src/metadata/sets/ sync ^\.\/.*\.json$ ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./Castle.json": "./src/metadata/sets/Castle.json",
	"./Circles.json": "./src/metadata/sets/Circles.json",
	"./Circuit.json": "./src/metadata/sets/Circuit.json",
	"./FloorPlan.json": "./src/metadata/sets/FloorPlan.json",
	"./Knots.json": "./src/metadata/sets/Knots.json",
	"./Rooms.json": "./src/metadata/sets/Rooms.json",
	"./Summer.json": "./src/metadata/sets/Summer.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/metadata/sets sync recursive ^\\.\\/.*\\.json$";

/***/ }),

/***/ "./src/metadata/tiles sync recursive ^\\.\\/.*\\.json$":
/*!*************************************************!*\
  !*** ./src/metadata/tiles/ sync ^\.\/.*\.json$ ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./Castle.json": "./src/metadata/tiles/Castle.json",
	"./Circles.json": "./src/metadata/tiles/Circles.json",
	"./Circuit.json": "./src/metadata/tiles/Circuit.json",
	"./FloorPlan.json": "./src/metadata/tiles/FloorPlan.json",
	"./Knots.json": "./src/metadata/tiles/Knots.json",
	"./Rooms.json": "./src/metadata/tiles/Rooms.json",
	"./Summer.json": "./src/metadata/tiles/Summer.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/metadata/tiles sync recursive ^\\.\\/.*\\.json$";

/***/ }),

/***/ "./src/metadata/sets/Castle.json":
/*!***************************************!*\
  !*** ./src/metadata/sets/Castle.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"bridge":{},"ground":{},"river":{},"riverturn":{},"road":{},"roadturn":{},"t":{},"tower":{},"wall":{},"wallriver":{},"wallroad":{}},"grassytower":{"ground":{"weight":5},"road":{"weight":0.1},"roadturn":{"weight":0.1},"t":{"weight":0.01},"tower":{"weight":0.1},"wall":{},"wallroad":{"weight":0.1}}}');

/***/ }),

/***/ "./src/metadata/sets/Circles.json":
/*!****************************************!*\
  !*** ./src/metadata/sets/Circles.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"b_half":{},"b_i":{},"b_quarter":{},"b":{},"w_half":{},"w_i":{},"w_quarter":{},"w":{}},"large":{"b_quarter":{},"w_quarter":{}},"largeandsolid":{"b_quarter":{},"b":{},"w_quarter":{},"w":{}},"nosolid":{"b_half":{},"b_i":{},"b_quarter":{},"w_half":{},"w_i":{},"w_quarter":{}}}');

/***/ }),

/***/ "./src/metadata/sets/Circuit.json":
/*!****************************************!*\
  !*** ./src/metadata/sets/Circuit.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"bridge":{},"component":{},"connection":{},"corner":{},"dskew":{},"skew":{},"substrate":{},"t":{},"track":{},"transition":{},"turn":{},"viad":{},"vias":{},"wire":{}},"noic":{"bridge":{"weight":0.4},"component":{"weight":0},"connection":{"weight":0},"corner":{"weight":0},"dskew":{"weight":0.3},"skew":{"weight":0.3},"substrate":{"weight":5},"t":{"weight":1},"track":{"weight":1},"transition":{"weight":0.3},"turn":{"weight":1},"viad":{"weight":0.01},"vias":{"weight":0.1},"wire":{"weight":0}},"iconly":{"bridge":{"weight":0},"component":{"weight":2},"connection":{"weight":1},"corner":{"weight":1},"dskew":{"weight":0.5},"skew":{"weight":0.5},"substrate":{"weight":10},"t":{"weight":0.5},"track":{"weight":0.7},"transition":{"weight":0},"turn":{"weight":0.6},"viad":{"weight":0},"vias":{"weight":0.1},"wire":{"weight":0}}}');

/***/ }),

/***/ "./src/metadata/sets/FloorPlan.json":
/*!******************************************!*\
  !*** ./src/metadata/sets/FloorPlan.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"div":{},"divt":{},"divturn":{},"door":{},"empty":{},"floor":{},"glass":{},"halfglass":{},"halfglass2":{},"in":{},"out":{},"stairs":{},"table":{},"vent":{},"w":{},"wall":{},"walldiv":{},"window":{}},"nooutdoor":{"div":{"weight":0.1},"divt":{"weight":0.1},"divturn":{"weight":1},"door":{"weight":0.1},"empty":{"weight":1},"floor":{"weight":5},"stairs":{"weight":0.1},"table":{"weight":0.1},"vent":{"weight":0.1}}}');

/***/ }),

/***/ "./src/metadata/sets/Knots.json":
/*!**************************************!*\
  !*** ./src/metadata/sets/Knots.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"corner":{},"t":{},"cross":{},"line":{},"empty":{}},"nonempty":{"corner":{},"t":{},"cross":{},"line":{}},"onlycorners":{"corner":{}},"nocrossnoempty":{"corner":{},"t":{},"line":{}},"nocross":{"corner":{},"t":{},"line":{},"empty":{}},"onlyt":{"t":{}},"braided":{"line":{},"cross":{}},"cross":{"cross":{}},"crosst":{"cross":{},"t":{}},"cornert":{"corner":{},"t":{}}}');

/***/ }),

/***/ "./src/metadata/sets/Rooms.json":
/*!**************************************!*\
  !*** ./src/metadata/sets/Rooms.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"bend":{},"corner":{},"corridor":{},"door":{},"empty":{},"side":{},"t":{},"turn":{},"wall":{}},"areas":{"bend":{"weight":0.1},"corner":{"weight":0.1},"corridor":{"weight":1},"door":{"weight":1},"empty":{"weight":10},"side":{"weight":0.1},"t":{"weight":0.1},"turn":{"weight":0.1},"wall":{"weight":10}}}');

/***/ }),

/***/ "./src/metadata/sets/Summer.json":
/*!***************************************!*\
  !*** ./src/metadata/sets/Summer.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"cliff 0":{},"cliff 1":{},"cliff 2":{},"cliff 3":{},"cliffcorner 0":{},"cliffcorner 1":{},"cliffcorner 2":{},"cliffcorner 3":{},"cliffturn 0":{},"cliffturn 1":{},"cliffturn 2":{},"cliffturn 3":{},"grass 0":{},"grasscorner 0":{},"grasscorner 1":{},"grasscorner 2":{},"grasscorner 3":{},"road 0":{},"road 1":{},"road 2":{},"road 3":{},"roadturn 0":{},"roadturn 1":{},"roadturn 2":{},"roadturn 3":{},"water_a 0":{},"water_b 0":{},"water_c 0":{},"watercorner 0":{},"watercorner 1":{},"watercorner 2":{},"watercorner 3":{},"waterside 0":{},"waterside 1":{},"waterside 2":{},"waterside 3":{},"waterturn 0":{},"waterturn 1":{},"waterturn 2":{},"waterturn 3":{}},"nocliff":{"grass 0":{},"grasscorner 0":{},"grasscorner 1":{},"grasscorner 2":{},"grasscorner 3":{},"road 0":{},"road 1":{},"road 2":{},"road 3":{},"roadturn 0":{},"roadturn 1":{},"roadturn 2":{},"roadturn 3":{},"water_a 0":{},"water_b 0":{},"water_c 0":{},"watercorner 0":{},"watercorner 1":{},"watercorner 2":{},"watercorner 3":{},"waterside 0":{},"waterside 1":{},"waterside 2":{},"waterside 3":{},"waterturn 0":{},"waterturn 1":{},"waterturn 2":{},"waterturn 3":{}},"nowater":{"cliff 0":{},"cliff 1":{},"cliff 2":{},"cliff 3":{},"cliffcorner 0":{},"cliffcorner 1":{},"cliffcorner 2":{},"cliffcorner 3":{},"cliffturn 0":{},"cliffturn 1":{},"cliffturn 2":{},"cliffturn 3":{},"grass 0":{},"grasscorner 0":{},"grasscorner 1":{},"grasscorner 2":{},"grasscorner 3":{},"road 0":{},"road 1":{},"road 2":{},"road 3":{},"roadturn 0":{},"roadturn 1":{},"roadturn 2":{},"roadturn 3":{}},"noroad":{"cliff 0":{},"cliff 1":{},"cliff 2":{},"cliff 3":{},"cliffcorner 0":{},"cliffcorner 1":{},"cliffcorner 2":{},"cliffcorner 3":{},"cliffturn 0":{},"cliffturn 1":{},"cliffturn 2":{},"cliffturn 3":{},"grass 0":{},"water_a 0":{},"water_b 0":{},"water_c 0":{},"watercorner 0":{},"watercorner 1":{},"watercorner 2":{},"watercorner 3":{},"waterside 0":{},"waterside 1":{},"waterside 2":{},"waterside 3":{},"waterturn 0":{},"waterturn 1":{},"waterturn 2":{},"waterturn 3":{}}}');

/***/ }),

/***/ "./src/metadata/tiles/Castle.json":
/*!****************************************!*\
  !*** ./src/metadata/tiles/Castle.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bridge","imgsrc":"bridge.png","rotations":[0,1],"weight":2,"socket":{"top":"010","right":"020","bottom":"010","left":"020"}},{"name":"ground","imgsrc":"ground.png","rotations":[0],"weight":3,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"river","imgsrc":"river.png","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"riverturn","imgsrc":"riverturn.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"road","imgsrc":"road.png","rotations":[0,1],"weight":3,"socket":{"top":"020","right":"000","bottom":"020","left":"000"}},{"name":"roadturn","imgsrc":"roadturn.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"020","right":"020","bottom":"000","left":"000"}},{"name":"t","imgsrc":"t.png","rotations":[0,1,2,3],"weight":2,"socket":{"top":"000","right":"020","bottom":"020","left":"020"}},{"name":"tower","imgsrc":"tower.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":["030"],"right":["030"],"bottom":["000"],"left":["000"]},"blacklist":{"bottom":{"tower":[0,1,2,3],"wall":[1,3]},"right":{"tower":[0,1,2,3],"wall":[0,2]},"top":{"tower":[0,1,2,3],"wall":[1,3]},"left":{"tower":[0,1,2,3],"wall":[0,2]}}},{"name":"wall","imgsrc":"wall.png","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"000","bottom":"030","left":"000"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}},{"name":"wallriver","imgsrc":"wallriver.png","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"010","bottom":"030","left":"010"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}},{"name":"wallroad","imgsrc":"wallroad.png","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"020","bottom":"030","left":"020"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}}]');

/***/ }),

/***/ "./src/metadata/tiles/Circles.json":
/*!*****************************************!*\
  !*** ./src/metadata/tiles/Circles.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"b_half","imgsrc":"b_half.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"011","bottom":"111","left":"110"}},{"name":"b_i","imgsrc":"b_i.png","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"010","bottom":"000","left":"010"}},{"name":"b_quarter","imgsrc":"b_quarter.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"000","bottom":"111","left":"111"}},{"name":"b","imgsrc":"b.png","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"w_half","imgsrc":"w_half.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"100","bottom":"000","left":"001"}},{"name":"w_i","imgsrc":"w_i.png","rotations":[0,1],"weight":1,"socket":{"top":"111","right":"101","bottom":"111","left":"101"}},{"name":"w_quarter","imgsrc":"w_quarter.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"111","bottom":"000","left":"000"}},{"name":"w","imgsrc":"w.png","rotations":[0],"weight":1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}}]');

/***/ }),

/***/ "./src/metadata/tiles/Circuit.json":
/*!*****************************************!*\
  !*** ./src/metadata/tiles/Circuit.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bridge","imgsrc":"bridge.png","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"020","bottom":"010","left":"020"}},{"name":"connection","imgsrc":"connection.png","rotations":[0,1,2,3],"weight":3,"socket":{"top":"010","right":"003","bottom":"333","left":"300"},"blacklist":{"bottom":{"connection":[2]}}},{"name":"dskew","imgsrc":"dskew.png","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"010","bottom":"010","left":"010"}},{"name":"skew","imgsrc":"skew.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"substrate","imgsrc":"substrate.png","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"t","imgsrc":"t.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"010","bottom":"010","left":"010"}},{"name":"track","imgsrc":"track.png","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"transition","imgsrc":"transition.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"020","right":"000","bottom":"010","left":"000"}},{"name":"turn","imgsrc":"turn.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"viad","imgsrc":"viad.png","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"010","bottom":"000","left":"010"}},{"name":"vias","imgsrc":"vias.png","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"000","left":"000"}},{"name":"wire","imgsrc":"wire.png","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"020","bottom":"000","left":"020"}},{"name":"component","imgsrc":"component.png","rotations":[0],"weight":1,"socket":{"top":"333","right":"333","bottom":"333","left":"333"}},{"name":"corner","imgsrc":"corner.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"000","bottom":"003","left":"300"}}]');

/***/ }),

/***/ "./src/metadata/tiles/FloorPlan.json":
/*!*******************************************!*\
  !*** ./src/metadata/tiles/FloorPlan.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"div","imgsrc":"div.png","rotations":[0,1],"weight":0.5,"socket":{"top":"111","right":"121","bottom":"111","left":"121"}},{"name":"divt","imgsrc":"divt.png","rotations":[0,1,2,3],"weight":0.5,"socket":{"top":"111","right":"121","bottom":"121","left":"121"}},{"name":"divturn","imgsrc":"divturn.png","rotations":[0,1,2,3],"weight":0.5,"socket":{"top":"121","right":"121","bottom":"111","left":"111"}},{"name":"door","imgsrc":"door.png","rotations":[0,1,2,3],"weight":0.2,"socket":{"top":"111","right":"121","bottom":"111","left":"121"}},{"name":"empty","imgsrc":"empty.png","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"floor","imgsrc":"floor.png","rotations":[0],"weight":3,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"glass","imgsrc":"glass.png","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"130","bottom":"000","left":"031"}},{"name":"halfglass","imgsrc":"halfglass.png","rotations":[0,1,2,3],"weight":0.3,"socket":{"top":"111","right":"130","bottom":"000","left":"021"}},{"name":"halfglass2","imgsrc":"halfglass2.png","rotations":[0,1,2,3],"weight":0.3,"socket":{"top":"111","right":"120","bottom":"000","left":"031"}},{"name":"in","imgsrc":"in.png","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"120","left":"021"}},{"name":"out","imgsrc":"out.png","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"021","right":"120","bottom":"000","left":"000"}},{"name":"stairs","imgsrc":"stairs.png","rotations":[0,1,2,3],"weight":0.2,"socket":{"top":"111","right":"121","bottom":"222","left":"121"}},{"name":"table","imgsrc":"table.png","rotations":[0],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"vent","imgsrc":"vent.png","rotations":[0],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"w","imgsrc":"w.png","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}},{"name":"wall","imgsrc":"wall.png","rotations":[0,1,2,3],"weight":0.25,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}},{"name":"walldiv","imgsrc":"walldiv.png","rotations":[0,1,2,3],"weight":0.25,"socket":{"top":"121","right":"120","bottom":"000","left":"021"}},{"name":"window","imgsrc":"window.png","rotations":[0,1,2,3],"weight":0.05,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}}]');

/***/ }),

/***/ "./src/metadata/tiles/Knots.json":
/*!***************************************!*\
  !*** ./src/metadata/tiles/Knots.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"corner","imgsrc":"corner.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"cross","imgsrc":"cross.png","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"010","bottom":"010","left":"010"}},{"name":"empty","imgsrc":"empty.png","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"line","imgsrc":"line.png","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"010","bottom":"000","left":"010"}},{"name":"t","imgsrc":"t.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"010","bottom":"010","left":"010"}}]');

/***/ }),

/***/ "./src/metadata/tiles/Rooms.json":
/*!***************************************!*\
  !*** ./src/metadata/tiles/Rooms.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bend","imgsrc":"bend.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"100","right":"001","bottom":"111","left":"111"}},{"name":"corner","imgsrc":"corner.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"001","right":"100","bottom":"000","left":"000"}},{"name":"corridor","imgsrc":"corridor.png","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"door","imgsrc":"door.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"100","bottom":"010","left":"001"}},{"name":"empty","imgsrc":"empty.png","rotations":[0],"weight":1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"side","imgsrc":"side.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"001","bottom":"111","left":"100"}},{"name":"t","imgsrc":"t.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"010","bottom":"010","left":"010"}},{"name":"turn","imgsrc":"turn.png","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"wall","imgsrc":"wall.png","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}}]');

/***/ }),

/***/ "./src/metadata/tiles/Summer.json":
/*!****************************************!*\
  !*** ./src/metadata/tiles/Summer.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"cliff 0","imgsrc":"cliff 0.png","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"040","bottom":"000","left":"040"}},{"name":"cliff 1","imgsrc":"cliff 1.png","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"040","left":"000"}},{"name":"cliff 2","imgsrc":"cliff 2.png","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"030","bottom":"000","left":"030"}},{"name":"cliff 3","imgsrc":"cliff 3.png","rotations":[0],"weight":0.1,"socket":{"top":"030","right":"000","bottom":"030","left":"000"}},{"name":"cliffcorner 0","imgsrc":"cliffcorner 0.png","rotations":[0],"weight":0.1,"socket":{"top":"030","right":"030","bottom":"000","left":"000"}},{"name":"cliffcorner 1","imgsrc":"cliffcorner 1.png","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"000","left":"030"}},{"name":"cliffcorner 2","imgsrc":"cliffcorner 2.png","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"000","bottom":"030","left":"040"}},{"name":"cliffcorner 3","imgsrc":"cliffcorner 3.png","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"040","bottom":"040","left":"000"}},{"name":"cliffturn 0","imgsrc":"cliffturn 0.png","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"040","bottom":"000","left":"000"}},{"name":"cliffturn 1","imgsrc":"cliffturn 1.png","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"000","left":"040"}},{"name":"cliffturn 2","imgsrc":"cliffturn 2.png","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"000","bottom":"030","left":"030"}},{"name":"cliffturn 3","imgsrc":"cliffturn 3.png","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"030","bottom":"030","left":"000"}},{"name":"grass 0","imgsrc":"grass 0.png","rotations":[0],"weight":2,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"grasscorner 0","imgsrc":"grasscorner 0.png","rotations":[0],"weight":0.4,"socket":{"top":"110","right":"011","bottom":"111","left":"111"}},{"name":"grasscorner 1","imgsrc":"grasscorner 1.png","rotations":[0],"weight":0.4,"socket":{"top":"011","right":"111","bottom":"111","left":"110"}},{"name":"grasscorner 2","imgsrc":"grasscorner 2.png","rotations":[0],"weight":0.4,"socket":{"top":"111","right":"111","bottom":"110","left":"011"}},{"name":"grasscorner 3","imgsrc":"grasscorner 3.png","rotations":[0],"weight":0.4,"socket":{"top":"111","right":"110","bottom":"011","left":"111"}},{"name":"road 0","imgsrc":"road 0.png","rotations":[0],"weight":0.7,"socket":{"top":"111","right":"110","bottom":"000","left":"011"}},{"name":"road 1","imgsrc":"road 1.png","rotations":[0],"weight":0.7,"socket":{"top":"110","right":"000","bottom":"011","left":"111"}},{"name":"road 2","imgsrc":"road 2.png","rotations":[0],"weight":0.7,"socket":{"top":"000","right":"011","bottom":"111","left":"110"}},{"name":"road 3","imgsrc":"road 3.png","rotations":[0],"weight":0.7,"socket":{"top":"011","right":"111","bottom":"110","left":"000"}},{"name":"roadturn 0","imgsrc":"roadturn 0.png","rotations":[0],"weight":0.2,"socket":{"top":"011","right":"110","bottom":"000","left":"000"}},{"name":"roadturn 1","imgsrc":"roadturn 1.png","rotations":[0],"weight":0.2,"socket":{"top":"110","right":"000","bottom":"000","left":"011"}},{"name":"roadturn 2","imgsrc":"roadturn 2.png","rotations":[0],"weight":0.2,"socket":{"top":"000","right":"000","bottom":"011","left":"110"}},{"name":"roadturn 3","imgsrc":"roadturn 3.png","rotations":[0],"weight":0.2,"socket":{"top":"000","right":"011","bottom":"110","left":"000"}},{"name":"water_a 0","imgsrc":"water_a 0.png","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"water_b 0","imgsrc":"water_b 0.png","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"water_c 0","imgsrc":"water_c 0.png","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"watercorner 0","imgsrc":"watercorner 0.png","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"230","bottom":"000","left":"000"}},{"name":"watercorner 1","imgsrc":"watercorner 1.png","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"000","bottom":"000","left":"032"}},{"name":"watercorner 2","imgsrc":"watercorner 2.png","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"000","bottom":"032","left":"230"}},{"name":"watercorner 3","imgsrc":"watercorner 3.png","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"032","bottom":"230","left":"000"}},{"name":"waterside 0","imgsrc":"waterside 0.png","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"230","bottom":"000","left":"032"}},{"name":"waterside 1","imgsrc":"waterside 1.png","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"000","bottom":"032","left":"222"}},{"name":"waterside 2","imgsrc":"waterside 2.png","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"032","bottom":"222","left":"230"}},{"name":"waterside 3","imgsrc":"waterside 3.png","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"222","bottom":"230","left":"000"}},{"name":"waterturn 0","imgsrc":"waterturn 0.png","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"230","left":"032"}},{"name":"waterturn 1","imgsrc":"waterturn 1.png","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"230","bottom":"032","left":"222"}},{"name":"waterturn 2","imgsrc":"waterturn 2.png","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"032","bottom":"222","left":"222"}},{"name":"waterturn 3","imgsrc":"waterturn 3.png","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"222","bottom":"222","left":"230"}}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wfc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wfc */ "./src/wfc.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_wfc__WEBPACK_IMPORTED_MODULE_0__.WFC);
window.getWFC = function getWFC(canvasId) {
    return new _wfc__WEBPACK_IMPORTED_MODULE_0__.WFC(canvasId);
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map