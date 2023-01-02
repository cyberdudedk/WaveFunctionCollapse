/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Direction.ts":
/*!**************************!*\
  !*** ./src/Direction.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Direction": () => (/* binding */ Direction)
/* harmony export */ });
var Direction;
(function (Direction) {
    Direction[Direction["top"] = 0] = "top";
    Direction[Direction["right"] = 1] = "right";
    Direction[Direction["bottom"] = 2] = "bottom";
    Direction[Direction["left"] = 3] = "left";
})(Direction || (Direction = {}));


/***/ }),

/***/ "./src/PieceObject.ts":
/*!****************************!*\
  !*** ./src/PieceObject.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PieceObject": () => (/* binding */ PieceObject)
/* harmony export */ });
class PieceObject {
    constructor(key, name, rotation, validNeighbors, newValid, weight) {
        this.key = key;
        this.name = name;
        this.rotation = rotation;
        this.validNeighbors = validNeighbors;
        this.newValid = newValid;
        this.weight = weight;
    }
}


/***/ }),

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

/***/ "./src/WFC.ts":
/*!********************!*\
  !*** ./src/WFC.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFC": () => (/* binding */ WFC)
/* harmony export */ });
/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Direction */ "./src/Direction.ts");
/* harmony import */ var _PieceObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PieceObject */ "./src/PieceObject.ts");
/* harmony import */ var _WFCConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WFCConfig */ "./src/WFCConfig.ts");
/* harmony import */ var _WFCData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WFCData */ "./src/WFCData.ts");




class WFC {
    constructor() {
        this.wfcData = new _WFCData__WEBPACK_IMPORTED_MODULE_3__.WFCData();
        this.config = new _WFCConfig__WEBPACK_IMPORTED_MODULE_2__.WFCConfig();
        this.piecesMap = {};
        this.tiles = [];
    }
    async init(config) {
        console.clear();
        this.config = config;
        this.loadTiles();
    }
    loadTiles() {
        this.wfcData = new _WFCData__WEBPACK_IMPORTED_MODULE_3__.WFCData();
        this.wfcData.tilePieces = {};
        this.wfcData.tileSets = {};
        var tileNames = ["Castle", "Circles", "Circuit", "FloorPlan", "Knots", "Rooms", "Summer"];
        for (let tileIndex in tileNames) {
            const tile = tileNames[tileIndex];
            this.wfcData.tilePieces[tile] = __webpack_require__("./src/metadata/tiles sync recursive ^\\.\\/.*\\.json$")("./" + tile + ".json");
            this.wfcData.tileSets[tile] = __webpack_require__("./src/metadata/sets sync recursive ^\\.\\/.*\\.json$")("./" + tile + ".json");
        }
    }
    async initTileData() {
        let pieces = this.wfcData.tilePieces[this.config.tileName];
        let sets = this.wfcData.tileSets[this.config.tileName];
        let currentSet = sets[this.config.set];
        Object.entries(currentSet).forEach((value) => {
            let pieceName = value[0];
            let properties = value[1];
            if (properties.rotations != undefined) {
                pieces.find(x => x.name == pieceName).rotations = properties.rotations;
            }
            if (properties.weight != undefined) {
                pieces.find(x => x.name == pieceName).weight = properties.weight;
            }
        });
        let mappedPieces = pieces.reduce((piecesMap, piece) => {
            if (currentSet[piece.name] == undefined) {
                return piecesMap;
            }
            let pieceSockets = piece.socket;
            piece.socketmatching = {};
            piece.blacklistedNeighbors = {};
            piece.rotations.forEach((rotation) => {
                let socketMatchObject = {};
                let blacklistedNeighbors = {};
                Object.keys(_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction).forEach((direction, index) => {
                    if (!isNaN(Number(direction)))
                        return;
                    let directionsCount = (Object.keys(_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction).length / 2);
                    let directionIndex = _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[direction];
                    let rotationMoved = (directionIndex - rotation + directionsCount) % directionsCount;
                    let flipped = directionIndex >= (directionsCount / 2);
                    let sockets = pieceSockets[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved]];
                    (Array.isArray(sockets) ? sockets : [sockets]).forEach((socket) => {
                        (socketMatchObject[direction] || (socketMatchObject[direction] = [])).push(flipped ? socket.split("").reverse().join("") : socket);
                    });
                });
                if (piece.blacklist) {
                    Object.entries(piece.blacklist).forEach((blacklist) => {
                        let blackListDirection = blacklist[0];
                        let blackListValue = blacklist[1];
                        let blackListIndex = _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[blackListDirection];
                        let directionsCount = (Object.keys(_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction).length / 2);
                        let rotationBlacklistingIndex = (blackListIndex + rotation) % directionsCount;
                        let rotationBlacklisting = _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationBlacklistingIndex];
                        Object.entries(blackListValue).forEach((blacklistPiece) => {
                            let blackListPieceName = blacklistPiece[0];
                            let blackListPieceRotations = blacklistPiece[1];
                            blackListPieceRotations.forEach((blackListPieceRotation) => {
                                let blackListPieceNameWithRotation = blackListPieceName + "_" + (blackListPieceRotation + rotation) % directionsCount;
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
                        let socketDirectionInnerIndex = _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[socketDirectionInner];
                        let directionsCount = (Object.keys(_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction).length / 2);
                        let socketDirectionPolarIndex = (socketDirectionInnerIndex + directionsCount / 2) % directionsCount;
                        let socketDirectionPolar = _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[socketDirectionPolarIndex];
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
        console.log('mappedPieces', mappedPieces);
        this.piecesMap = Object.entries(mappedPieces).reduce((piecesMap, piecePair) => {
            let piece = piecePair[1];
            if (currentSet[piece.name] == undefined) {
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
                console.log('newValid', piece.newValid);
                piecesMap[pieceName] = new _PieceObject__WEBPACK_IMPORTED_MODULE_1__.PieceObject(piece.name + "_" + rotation, piece.name, rotation, validNeighbors, piece.newValid, weight);
            });
            return piecesMap;
        }, {});
        console.log(this.piecesMap);
        return true;
    }
    reset() {
        let piecesKeys = Object.keys(this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };
        this.tiles = Array.from({ length: this.config.tilesWidth }, (a, x) => {
            return Array.from({ length: this.config.tilesHeight }, (b, y) => {
                return {
                    position: { x: x, y: y },
                    validPieces: [...startingTile.validPieces]
                };
            });
        });
    }
}


/***/ }),

/***/ "./src/WFCConfig.ts":
/*!**************************!*\
  !*** ./src/WFCConfig.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFCConfig": () => (/* binding */ WFCConfig)
/* harmony export */ });
class WFCConfig {
    constructor() {
        this.maxRetryCount = 10;
        this.maxDepth = 100;
        this.tileScale = 40;
        this.fast = false;
        this.runSpeed = 10;
        this.runLoop = 30;
        this.tilesHeight = 30;
        this.tilesWidth = 30;
        this.superImposed = 1;
        this.useMouse = false;
        this.tileName = 'Knots';
        this.set = 'all';
    }
}


/***/ }),

/***/ "./src/WFCData.ts":
/*!************************!*\
  !*** ./src/WFCData.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFCData": () => (/* binding */ WFCData)
/* harmony export */ });
class WFCData {
    constructor() {
        this.tileSets = {};
        this.tilePieces = {};
    }
}


/***/ }),

/***/ "./src/WFCRender.ts":
/*!**************************!*\
  !*** ./src/WFCRender.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFCRender": () => (/* binding */ WFCRender)
/* harmony export */ });
/* harmony import */ var _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SuperImposedState */ "./src/SuperImposedState.ts");
/* harmony import */ var _WFCConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WFCConfig */ "./src/WFCConfig.ts");
/* harmony import */ var _WFCRunner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WFCRunner */ "./src/WFCRunner.ts");
/* harmony import */ var _WFC__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WFC */ "./src/WFC.ts");




class WFCRender {
    constructor(canvasId) {
        this.config = new _WFCConfig__WEBPACK_IMPORTED_MODULE_1__.WFCConfig();
        this.wfc = new _WFC__WEBPACK_IMPORTED_MODULE_3__.WFC();
        this.halfScaleHeight = this.config.tileScale / 2;
        this.halfScaleWidth = this.config.tileScale / 2;
        this.imagesMap = {};
        this.wfcCallback = () => {
            this.draw();
        };
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
        return Object.keys(this.wfc.wfcData.tileSets);
    }
    getSuperImposedStates() {
        return _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState;
    }
    getAvailableSets(tileName) {
        var sets = this.wfc.wfcData.tileSets[tileName];
        if (sets == null)
            return null;
        return Object.keys(sets);
    }
    getTileSets() {
        return this.wfc.wfcData.tileSets;
    }
    getWFCData() {
        return this.wfc.wfcData;
    }
    getWFC() {
        return this.wfc;
    }
    async init(config) {
        console.clear();
        this.config = config;
        this.wfc = new _WFC__WEBPACK_IMPORTED_MODULE_3__.WFC();
        this.wfc.init(config);
        this.wfcRunner = new _WFCRunner__WEBPACK_IMPORTED_MODULE_2__.WFCRunner(config, this.wfc, this.wfcCallback);
        await this.initImageData();
        let ctx = this.ctx;
        let canvas = this.canvas;
        this.halfScaleHeight = this.config.tileScale / 2;
        this.halfScaleWidth = this.config.tileScale / 2;
        canvas.height = this.config.tilesHeight * this.config.tileScale;
        canvas.width = this.config.tilesWidth * this.config.tileScale;
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    async initImageData() {
        let pieces = this.wfc.wfcData.tilePieces[this.config.tileName];
        let tileImages = __webpack_require__("./src/metadata/render sync recursive ^\\.\\/.*\\.json$")("./" + this.config.tileName + ".json");
        let tileImageMap = tileImages.reduce((tileMap, tileImage) => {
            tileMap[tileImage.name] = tileImage.imgsrc;
            return tileMap;
        }, {});
        let loadImagesAsync = pieces.map(async (x) => {
            return {
                name: x.name,
                img: await this.preloadImage('tiles/' + this.config.tileName + '/' + tileImageMap[x.name])
            };
        });
        this.imagesMap = (await Promise.all(loadImagesAsync)).reduce((piecesMap, piece) => {
            piecesMap[piece.name] = piece.img;
            return piecesMap;
        }, {});
    }
    initDraw() {
        this.startOver();
    }
    startOver() {
        this.wfc.reset();
        this.reset();
        this.startWFCLoop(this.config.runSpeed);
    }
    reset() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    startWFCLoop(interval) {
        if (this.config.useMouse) {
            document.body.addEventListener('click', () => this.wfcRunner.runWFC(), true);
        }
        this.draw();
        this.wfcRunner.startWFCLoop(interval);
    }
    draw() {
        this.ctx.save();
        this.drawTiles();
        this.ctx.restore();
    }
    drawTiles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.wfc.tiles.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                if (!this.config.fast) {
                    if (tile.validPieces) {
                        let validCount = tile.validPieces.length;
                        if (tile.validPieces.length > 0) {
                            if (this.config.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.Layered) {
                                //superimposed 1 - on top of each
                                tile.validPieces.forEach((key) => {
                                    let piece = this.wfc.piecesMap[key];
                                    let tileImage = this.imagesMap[piece.name];
                                    this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
                                });
                            }
                            else if (this.config.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.GridScaled) {
                                //superimposed 2 - grid
                                let gridSize = Math.ceil(Math.sqrt(validCount));
                                tile.validPieces.forEach((key, index) => {
                                    let piece = this.wfc.piecesMap[key];
                                    let tileImage = this.imagesMap[piece.name];
                                    this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, 0.4);
                                });
                            }
                            else if (this.config.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.Grid) {
                                //superimposed 3 - grid without scaling
                                validCount = Object.keys(this.wfc.piecesMap).length;
                                let gridSize = Math.ceil(Math.sqrt(validCount));
                                tile.validPieces.forEach((key, index) => {
                                    let piece = this.wfc.piecesMap[key];
                                    let tileImage = this.imagesMap[piece.name];
                                    this.drawSuperimposedPartGrid(tileImage, columnIndex, rowIndex, gridSize, index, piece.rotation, validCount, 0.4);
                                });
                            }
                            else if (this.config.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.None) {
                                //superimposed 4 - none
                            }
                            else if (this.config.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.LayeredSorted) {
                                //superimposed 5 - layered sorted
                                let sortedValid = tile.validPieces.sort((a, b) => {
                                    let pieceA = this.wfc.piecesMap[a];
                                    let pieceB = this.wfc.piecesMap[b];
                                    return pieceB.weight - pieceA.weight;
                                });
                                sortedValid.forEach((key) => {
                                    let piece = this.wfc.piecesMap[key];
                                    let tileImage = this.imagesMap[piece.name];
                                    this.drawSuperimposed(tileImage, columnIndex, rowIndex, piece.rotation, validCount);
                                });
                            }
                            else if (this.config.superImposed == _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.GridAlpha) {
                                //superimposed 6 - grid scaled alpha
                                let minWeight = 999;
                                let maxWeight = 0;
                                let sortedValid = tile.validPieces.sort((a, b) => {
                                    let pieceA = this.wfc.piecesMap[a];
                                    let pieceB = this.wfc.piecesMap[b];
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
                                    let piece = this.wfc.piecesMap[key];
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
                }
                if (tile.key != undefined) {
                    let key = tile.key;
                    let piece = this.wfc.piecesMap[key];
                    let tileImage = this.imagesMap[piece.name];
                    this.drawTile(tileImage, columnIndex, rowIndex, tile.rotation);
                }
            });
        });
    }
    drawImgGrid(img, x, y, rotation, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate((this.config.tileScale * x) + this.halfScaleWidth, (this.config.tileScale * y) + this.halfScaleHeight);
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -this.halfScaleWidth, -this.halfScaleHeight, this.config.tileScale, this.config.tileScale);
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
        let width = this.config.tileScale / gridSize;
        let height = this.config.tileScale / (gridSize);
        let newX = (this.config.tileScale * x) + ((gridIndex % gridSize) * width);
        let newY = (this.config.tileScale * y) + ((Math.floor(gridIndex / gridSize)) * height);
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

/***/ "./src/WFCRunner.ts":
/*!**************************!*\
  !*** ./src/WFCRunner.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFCRunner": () => (/* binding */ WFCRunner)
/* harmony export */ });
class WFCRunner {
    constructor(config, wfc, callback) {
        this.retryCount = 0;
        this.stopRunning = true;
        this.wfcLoop = undefined;
        this.hasRunWFC = () => {
            this.callback();
        };
        this.config = config;
        this.wfc = wfc;
        this.callback = callback;
    }
    getTilePositionsAsEntropyGroups() {
        let entropyGroups = {};
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
    noValidFound() {
        this.retryCount++;
        this.stopWFCLoop();
        if (this.retryCount <= this.config.maxRetryCount) {
            this.startOver();
        }
        else {
            console.log('not possible to solve within ' + this.config.maxRetryCount + ' retries');
        }
    }
    runWFC() {
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
                let randomPiece = Math.floor(Math.random() * currentTile.validPieces.length);
                let tileKey = this.getRandomElementFromArrayWeigted(currentTile.validPieces);
                if (tileKey == null) {
                    this.noValidFound();
                    return false;
                }
                let piece = this.wfc.piecesMap[tileKey];
                this.wfc.tiles[x][y] = piece;
                if (piece == undefined) {
                    console.log('piece', x, y, piece, tileKey, randomPiece, currentTile.validPieces);
                }
                let validation = this.runValidation(x, y, [piece]);
                if (validation == null) {
                    break;
                }
                let depth = 0;
                while (validation.length > 0 && depth < this.config.maxDepth) {
                    let newValidations = [];
                    if (validation.length > 0) {
                        validation.forEach((v) => {
                            let validationTile = this.wfc.tiles[v.x][v.y];
                            let validationTilePieces = validationTile.validPieces;
                            let pieces = validationTilePieces.map((tileKey) => {
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
            }
        }
        this.hasRunWFC();
    }
    runValidation(x, y, pieces) {
        let recheck = [];
        let neighbors = [];
        if (y != 0) {
            neighbors.push({ direction: 'top', tile: this.wfc.tiles[x][y - 1] });
        }
        if (x != this.config.tilesWidth - 1) {
            neighbors.push({ direction: 'right', tile: this.wfc.tiles[x + 1][y] });
        }
        if (y != this.config.tilesHeight - 1) {
            neighbors.push({ direction: 'bottom', tile: this.wfc.tiles[x][y + 1] });
        }
        if (x != 0) {
            neighbors.push({ direction: 'left', tile: this.wfc.tiles[x - 1][y] });
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
            console.log('checkForStop', 'return true');
            console.log('Found solution after ' + this.retryCount + ' retries');
            this.stopWFCLoop();
            return true;
        }
        return stop;
    }
    stopWFCLoop() {
        this.stopRunning = true;
        clearInterval(this.wfcLoop);
    }
    startOver() {
        this.wfc.reset();
        this.startWFCLoop(this.config.runSpeed);
    }
    startWFCLoop(interval) {
        this.stopRunning = false;
        if (this.config.useMouse) {
        }
        else {
            this.wfcLoop = setInterval(() => {
                this.runWFC();
            }, interval);
        }
    }
    getRandomElementFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    getRandomElementFromArrayWeigted(array) {
        let summed = [];
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
        let selected = summed.find((x) => {
            return x.minsum <= rnd && x.maxsum > rnd;
        });
        if (selected == undefined) {
            console.log('summed', summed);
        }
        return selected.key;
    }
}


/***/ }),

/***/ "./src/metadata/render sync recursive ^\\.\\/.*\\.json$":
/*!**************************************************!*\
  !*** ./src/metadata/render/ sync ^\.\/.*\.json$ ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./Castle.json": "./src/metadata/render/Castle.json",
	"./Circles.json": "./src/metadata/render/Circles.json",
	"./Circuit.json": "./src/metadata/render/Circuit.json",
	"./FloorPlan.json": "./src/metadata/render/FloorPlan.json",
	"./Knots.json": "./src/metadata/render/Knots.json",
	"./Rooms.json": "./src/metadata/render/Rooms.json",
	"./Summer.json": "./src/metadata/render/Summer.json"
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
webpackContext.id = "./src/metadata/render sync recursive ^\\.\\/.*\\.json$";

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

/***/ "./src/metadata/render/Castle.json":
/*!*****************************************!*\
  !*** ./src/metadata/render/Castle.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bridge","imgsrc":"bridge.png"},{"name":"ground","imgsrc":"ground.png"},{"name":"river","imgsrc":"river.png"},{"name":"riverturn","imgsrc":"riverturn.png"},{"name":"road","imgsrc":"road.png"},{"name":"roadturn","imgsrc":"roadturn.png"},{"name":"t","imgsrc":"t.png"},{"name":"tower","imgsrc":"tower.png"},{"name":"wall","imgsrc":"wall.png"},{"name":"wallriver","imgsrc":"wallriver.png"},{"name":"wallroad","imgsrc":"wallroad.png"}]');

/***/ }),

/***/ "./src/metadata/render/Circles.json":
/*!******************************************!*\
  !*** ./src/metadata/render/Circles.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"b_half","imgsrc":"b_half.png"},{"name":"b_i","imgsrc":"b_i.png"},{"name":"b_quarter","imgsrc":"b_quarter.png"},{"name":"b","imgsrc":"b.png"},{"name":"w_half","imgsrc":"w_half.png"},{"name":"w_i","imgsrc":"w_i.png"},{"name":"w_quarter","imgsrc":"w_quarter.png"},{"name":"w","imgsrc":"w.png"}]');

/***/ }),

/***/ "./src/metadata/render/Circuit.json":
/*!******************************************!*\
  !*** ./src/metadata/render/Circuit.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bridge","imgsrc":"bridge.png"},{"name":"connection","imgsrc":"connection.png"},{"name":"dskew","imgsrc":"dskew.png"},{"name":"skew","imgsrc":"skew.png"},{"name":"substrate","imgsrc":"substrate.png"},{"name":"t","imgsrc":"t.png"},{"name":"track","imgsrc":"track.png"},{"name":"transition","imgsrc":"transition.png"},{"name":"turn","imgsrc":"turn.png"},{"name":"viad","imgsrc":"viad.png"},{"name":"vias","imgsrc":"vias.png"},{"name":"wire","imgsrc":"wire.png"},{"name":"component","imgsrc":"component.png"},{"name":"corner","imgsrc":"corner.png"}]');

/***/ }),

/***/ "./src/metadata/render/FloorPlan.json":
/*!********************************************!*\
  !*** ./src/metadata/render/FloorPlan.json ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"div","imgsrc":"div.png"},{"name":"divt","imgsrc":"divt.png"},{"name":"divturn","imgsrc":"divturn.png"},{"name":"door","imgsrc":"door.png"},{"name":"empty","imgsrc":"empty.png"},{"name":"floor","imgsrc":"floor.png"},{"name":"glass","imgsrc":"glass.png"},{"name":"halfglass","imgsrc":"halfglass.png"},{"name":"halfglass2","imgsrc":"halfglass2.png"},{"name":"in","imgsrc":"in.png"},{"name":"out","imgsrc":"out.png"},{"name":"stairs","imgsrc":"stairs.png"},{"name":"table","imgsrc":"table.png"},{"name":"vent","imgsrc":"vent.png"},{"name":"w","imgsrc":"w.png"},{"name":"wall","imgsrc":"wall.png"},{"name":"walldiv","imgsrc":"walldiv.png"},{"name":"window","imgsrc":"window.png"}]');

/***/ }),

/***/ "./src/metadata/render/Knots.json":
/*!****************************************!*\
  !*** ./src/metadata/render/Knots.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"corner","imgsrc":"corner.png"},{"name":"cross","imgsrc":"cross.png"},{"name":"empty","imgsrc":"empty.png"},{"name":"line","imgsrc":"line.png"},{"name":"t","imgsrc":"t.png"}]');

/***/ }),

/***/ "./src/metadata/render/Rooms.json":
/*!****************************************!*\
  !*** ./src/metadata/render/Rooms.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bend","imgsrc":"bend.png"},{"name":"corner","imgsrc":"corner.png"},{"name":"corridor","imgsrc":"corridor.png"},{"name":"door","imgsrc":"door.png"},{"name":"empty","imgsrc":"empty.png"},{"name":"side","imgsrc":"side.png"},{"name":"t","imgsrc":"t.png"},{"name":"turn","imgsrc":"turn.png"},{"name":"wall","imgsrc":"wall.png"}]');

/***/ }),

/***/ "./src/metadata/render/Summer.json":
/*!*****************************************!*\
  !*** ./src/metadata/render/Summer.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"cliff 0","imgsrc":"cliff 0.png"},{"name":"cliff 1","imgsrc":"cliff 1.png"},{"name":"cliff 2","imgsrc":"cliff 2.png"},{"name":"cliff 3","imgsrc":"cliff 3.png"},{"name":"cliffcorner 0","imgsrc":"cliffcorner 0.png"},{"name":"cliffcorner 1","imgsrc":"cliffcorner 1.png"},{"name":"cliffcorner 2","imgsrc":"cliffcorner 2.png"},{"name":"cliffcorner 3","imgsrc":"cliffcorner 3.png"},{"name":"cliffturn 0","imgsrc":"cliffturn 0.png"},{"name":"cliffturn 1","imgsrc":"cliffturn 1.png"},{"name":"cliffturn 2","imgsrc":"cliffturn 2.png"},{"name":"cliffturn 3","imgsrc":"cliffturn 3.png"},{"name":"grass 0","imgsrc":"grass 0.png"},{"name":"grasscorner 0","imgsrc":"grasscorner 0.png"},{"name":"grasscorner 1","imgsrc":"grasscorner 1.png"},{"name":"grasscorner 2","imgsrc":"grasscorner 2.png"},{"name":"grasscorner 3","imgsrc":"grasscorner 3.png"},{"name":"road 0","imgsrc":"road 0.png"},{"name":"road 1","imgsrc":"road 1.png"},{"name":"road 2","imgsrc":"road 2.png"},{"name":"road 3","imgsrc":"road 3.png"},{"name":"roadturn 0","imgsrc":"roadturn 0.png"},{"name":"roadturn 1","imgsrc":"roadturn 1.png"},{"name":"roadturn 2","imgsrc":"roadturn 2.png"},{"name":"roadturn 3","imgsrc":"roadturn 3.png"},{"name":"water_a 0","imgsrc":"water_a 0.png"},{"name":"water_b 0","imgsrc":"water_b 0.png"},{"name":"water_c 0","imgsrc":"water_c 0.png"},{"name":"watercorner 0","imgsrc":"watercorner 0.png"},{"name":"watercorner 1","imgsrc":"watercorner 1.png"},{"name":"watercorner 2","imgsrc":"watercorner 2.png"},{"name":"watercorner 3","imgsrc":"watercorner 3.png"},{"name":"waterside 0","imgsrc":"waterside 0.png"},{"name":"waterside 1","imgsrc":"waterside 1.png"},{"name":"waterside 2","imgsrc":"waterside 2.png"},{"name":"waterside 3","imgsrc":"waterside 3.png"},{"name":"waterturn 0","imgsrc":"waterturn 0.png"},{"name":"waterturn 1","imgsrc":"waterturn 1.png"},{"name":"waterturn 2","imgsrc":"waterturn 2.png"},{"name":"waterturn 3","imgsrc":"waterturn 3.png"}]');

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
module.exports = JSON.parse('[{"name":"bridge","rotations":[0,1],"weight":2,"socket":{"top":"010","right":"020","bottom":"010","left":"020"}},{"name":"ground","rotations":[0],"weight":3,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"river","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"riverturn","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"road","rotations":[0,1],"weight":3,"socket":{"top":"020","right":"000","bottom":"020","left":"000"}},{"name":"roadturn","rotations":[0,1,2,3],"weight":1,"socket":{"top":"020","right":"020","bottom":"000","left":"000"}},{"name":"t","rotations":[0,1,2,3],"weight":2,"socket":{"top":"000","right":"020","bottom":"020","left":"020"}},{"name":"tower","rotations":[0,1,2,3],"weight":1,"socket":{"top":["030"],"right":["030"],"bottom":["000"],"left":["000"]},"blacklist":{"bottom":{"tower":[0,1,2,3],"wall":[1,3]},"right":{"tower":[0,1,2,3],"wall":[0,2]},"top":{"tower":[0,1,2,3],"wall":[1,3]},"left":{"tower":[0,1,2,3],"wall":[0,2]}}},{"name":"wall","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"000","bottom":"030","left":"000"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}},{"name":"wallriver","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"010","bottom":"030","left":"010"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}},{"name":"wallroad","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"020","bottom":"030","left":"020"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}}]');

/***/ }),

/***/ "./src/metadata/tiles/Circles.json":
/*!*****************************************!*\
  !*** ./src/metadata/tiles/Circles.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"b_half","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"011","bottom":"111","left":"110"}},{"name":"b_i","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"010","bottom":"000","left":"010"}},{"name":"b_quarter","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"000","bottom":"111","left":"111"}},{"name":"b","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"w_half","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"100","bottom":"000","left":"001"}},{"name":"w_i","rotations":[0,1],"weight":1,"socket":{"top":"111","right":"101","bottom":"111","left":"101"}},{"name":"w_quarter","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"111","bottom":"000","left":"000"}},{"name":"w","rotations":[0],"weight":1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}}]');

/***/ }),

/***/ "./src/metadata/tiles/Circuit.json":
/*!*****************************************!*\
  !*** ./src/metadata/tiles/Circuit.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bridge","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"020","bottom":"010","left":"020"}},{"name":"connection","rotations":[0,1,2,3],"weight":3,"socket":{"top":"010","right":"003","bottom":"333","left":"300"},"blacklist":{"bottom":{"connection":[2]}}},{"name":"dskew","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"010","bottom":"010","left":"010"}},{"name":"skew","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"substrate","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"t","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"010","bottom":"010","left":"010"}},{"name":"track","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"transition","rotations":[0,1,2,3],"weight":1,"socket":{"top":"020","right":"000","bottom":"010","left":"000"}},{"name":"turn","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"viad","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"010","bottom":"000","left":"010"}},{"name":"vias","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"000","left":"000"}},{"name":"wire","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"020","bottom":"000","left":"020"}},{"name":"component","rotations":[0],"weight":1,"socket":{"top":"333","right":"333","bottom":"333","left":"333"}},{"name":"corner","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"000","bottom":"003","left":"300"}}]');

/***/ }),

/***/ "./src/metadata/tiles/FloorPlan.json":
/*!*******************************************!*\
  !*** ./src/metadata/tiles/FloorPlan.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"div","rotations":[0,1],"weight":0.5,"socket":{"top":"111","right":"121","bottom":"111","left":"121"}},{"name":"divt","rotations":[0,1,2,3],"weight":0.5,"socket":{"top":"111","right":"121","bottom":"121","left":"121"}},{"name":"divturn","rotations":[0,1,2,3],"weight":0.5,"socket":{"top":"121","right":"121","bottom":"111","left":"111"}},{"name":"door","rotations":[0,1,2,3],"weight":0.2,"socket":{"top":"111","right":"121","bottom":"111","left":"121"}},{"name":"empty","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"floor","rotations":[0],"weight":3,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"glass","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"130","bottom":"000","left":"031"}},{"name":"halfglass","rotations":[0,1,2,3],"weight":0.3,"socket":{"top":"111","right":"130","bottom":"000","left":"021"}},{"name":"halfglass2","rotations":[0,1,2,3],"weight":0.3,"socket":{"top":"111","right":"120","bottom":"000","left":"031"}},{"name":"in","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"120","left":"021"}},{"name":"out","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"021","right":"120","bottom":"000","left":"000"}},{"name":"stairs","rotations":[0,1,2,3],"weight":0.2,"socket":{"top":"111","right":"121","bottom":"222","left":"121"}},{"name":"table","rotations":[0],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"vent","rotations":[0],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"w","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}},{"name":"wall","rotations":[0,1,2,3],"weight":0.25,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}},{"name":"walldiv","rotations":[0,1,2,3],"weight":0.25,"socket":{"top":"121","right":"120","bottom":"000","left":"021"}},{"name":"window","rotations":[0,1,2,3],"weight":0.05,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}}]');

/***/ }),

/***/ "./src/metadata/tiles/Knots.json":
/*!***************************************!*\
  !*** ./src/metadata/tiles/Knots.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"corner","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"cross","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"010","bottom":"010","left":"010"}},{"name":"empty","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"line","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"010","bottom":"000","left":"010"}},{"name":"t","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"010","bottom":"010","left":"010"}}]');

/***/ }),

/***/ "./src/metadata/tiles/Rooms.json":
/*!***************************************!*\
  !*** ./src/metadata/tiles/Rooms.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bend","rotations":[0,1,2,3],"weight":1,"socket":{"top":"100","right":"001","bottom":"111","left":"111"}},{"name":"corner","rotations":[0,1,2,3],"weight":1,"socket":{"top":"001","right":"100","bottom":"000","left":"000"}},{"name":"corridor","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"door","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"100","bottom":"010","left":"001"}},{"name":"empty","rotations":[0],"weight":1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"side","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"001","bottom":"111","left":"100"}},{"name":"t","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"010","bottom":"010","left":"010"}},{"name":"turn","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"wall","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}}]');

/***/ }),

/***/ "./src/metadata/tiles/Summer.json":
/*!****************************************!*\
  !*** ./src/metadata/tiles/Summer.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"cliff 0","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"040","bottom":"000","left":"040"}},{"name":"cliff 1","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"040","left":"000"}},{"name":"cliff 2","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"030","bottom":"000","left":"030"}},{"name":"cliff 3","rotations":[0],"weight":0.1,"socket":{"top":"030","right":"000","bottom":"030","left":"000"}},{"name":"cliffcorner 0","rotations":[0],"weight":0.1,"socket":{"top":"030","right":"030","bottom":"000","left":"000"}},{"name":"cliffcorner 1","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"000","left":"030"}},{"name":"cliffcorner 2","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"000","bottom":"030","left":"040"}},{"name":"cliffcorner 3","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"040","bottom":"040","left":"000"}},{"name":"cliffturn 0","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"040","bottom":"000","left":"000"}},{"name":"cliffturn 1","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"000","left":"040"}},{"name":"cliffturn 2","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"000","bottom":"030","left":"030"}},{"name":"cliffturn 3","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"030","bottom":"030","left":"000"}},{"name":"grass 0","rotations":[0],"weight":2,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"grasscorner 0","rotations":[0],"weight":0.4,"socket":{"top":"110","right":"011","bottom":"111","left":"111"}},{"name":"grasscorner 1","rotations":[0],"weight":0.4,"socket":{"top":"011","right":"111","bottom":"111","left":"110"}},{"name":"grasscorner 2","rotations":[0],"weight":0.4,"socket":{"top":"111","right":"111","bottom":"110","left":"011"}},{"name":"grasscorner 3","rotations":[0],"weight":0.4,"socket":{"top":"111","right":"110","bottom":"011","left":"111"}},{"name":"road 0","rotations":[0],"weight":0.7,"socket":{"top":"111","right":"110","bottom":"000","left":"011"}},{"name":"road 1","rotations":[0],"weight":0.7,"socket":{"top":"110","right":"000","bottom":"011","left":"111"}},{"name":"road 2","rotations":[0],"weight":0.7,"socket":{"top":"000","right":"011","bottom":"111","left":"110"}},{"name":"road 3","rotations":[0],"weight":0.7,"socket":{"top":"011","right":"111","bottom":"110","left":"000"}},{"name":"roadturn 0","rotations":[0],"weight":0.2,"socket":{"top":"011","right":"110","bottom":"000","left":"000"}},{"name":"roadturn 1","rotations":[0],"weight":0.2,"socket":{"top":"110","right":"000","bottom":"000","left":"011"}},{"name":"roadturn 2","rotations":[0],"weight":0.2,"socket":{"top":"000","right":"000","bottom":"011","left":"110"}},{"name":"roadturn 3","rotations":[0],"weight":0.2,"socket":{"top":"000","right":"011","bottom":"110","left":"000"}},{"name":"water_a 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"water_b 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"water_c 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"watercorner 0","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"230","bottom":"000","left":"000"}},{"name":"watercorner 1","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"000","bottom":"000","left":"032"}},{"name":"watercorner 2","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"000","bottom":"032","left":"230"}},{"name":"watercorner 3","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"032","bottom":"230","left":"000"}},{"name":"waterside 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"230","bottom":"000","left":"032"}},{"name":"waterside 1","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"000","bottom":"032","left":"222"}},{"name":"waterside 2","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"032","bottom":"222","left":"230"}},{"name":"waterside 3","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"222","bottom":"230","left":"000"}},{"name":"waterturn 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"230","left":"032"}},{"name":"waterturn 1","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"230","bottom":"032","left":"222"}},{"name":"waterturn 2","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"032","bottom":"222","left":"222"}},{"name":"waterturn 3","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"222","bottom":"222","left":"230"}}]');

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
/* harmony import */ var _WFC__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WFC */ "./src/WFC.ts");
/* harmony import */ var _WFCRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WFCRender */ "./src/WFCRender.ts");


window.getWFCRender = function getWFCRender(canvasId) {
    return new _WFCRender__WEBPACK_IMPORTED_MODULE_1__.WFCRender(canvasId);
};
window.getWFC = function getWFC() {
    return new _WFC__WEBPACK_IMPORTED_MODULE_0__.WFC();
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map