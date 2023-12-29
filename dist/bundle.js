/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Backtracking.ts":
/*!*****************************!*\
  !*** ./src/Backtracking.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Backtracking": () => (/* binding */ Backtracking)
/* harmony export */ });
var Backtracking;
(function (Backtracking) {
    Backtracking[Backtracking["None"] = 0] = "None";
    Backtracking[Backtracking["Full"] = 1] = "Full";
    Backtracking[Backtracking["Linear"] = 2] = "Linear";
    Backtracking[Backtracking["Exponential"] = 3] = "Exponential";
    //Grid,
    //Combination
})(Backtracking || (Backtracking = {}));


/***/ }),

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
    Direction[Direction["grid"] = 2] = "grid";
    Direction[Direction["bottom"] = 3] = "bottom";
    Direction[Direction["left"] = 4] = "left";
    Direction[Direction["grid2"] = 5] = "grid2";
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
    constructor(key, name, rotation, validNeighbors, edgeblacklist, weight, sockets, minimum = null, maximum = null) {
        this.key = key;
        this.name = name;
        this.rotation = rotation;
        this.validNeighbors = validNeighbors;
        this.edgeblacklist = edgeblacklist;
        this.weight = weight;
        this.sockets = sockets;
        this.minimum = minimum;
        this.maximum = maximum;
    }
}


/***/ }),

/***/ "./src/RenderType.ts":
/*!***************************!*\
  !*** ./src/RenderType.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderType": () => (/* binding */ RenderType)
/* harmony export */ });
var RenderType;
(function (RenderType) {
    RenderType[RenderType["None"] = 0] = "None";
    RenderType[RenderType["TilesAndSuperImposed"] = 1] = "TilesAndSuperImposed";
    RenderType[RenderType["TilesOnly"] = 2] = "TilesOnly";
    RenderType[RenderType["SuperImposedOnly"] = 3] = "SuperImposedOnly";
    RenderType[RenderType["ColorOnly"] = 4] = "ColorOnly";
    RenderType[RenderType["PixelBasedColorDominant"] = 5] = "PixelBasedColorDominant";
    RenderType[RenderType["PixelBasedColorAverage"] = 6] = "PixelBasedColorAverage";
})(RenderType || (RenderType = {}));


/***/ }),

/***/ "./src/Replay.ts":
/*!***********************!*\
  !*** ./src/Replay.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Replay": () => (/* binding */ Replay)
/* harmony export */ });
var Replay;
(function (Replay) {
    Replay[Replay["None"] = 0] = "None";
    Replay[Replay["Backtrack"] = 1] = "Backtrack";
    Replay[Replay["Preset"] = 2] = "Preset";
    Replay[Replay["BacktrackOnly"] = 3] = "BacktrackOnly";
})(Replay || (Replay = {}));


/***/ }),

/***/ "./src/RunMethod.ts":
/*!**************************!*\
  !*** ./src/RunMethod.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RunMethod": () => (/* binding */ RunMethod)
/* harmony export */ });
var RunMethod;
(function (RunMethod) {
    RunMethod[RunMethod["AutoRun"] = 0] = "AutoRun";
    RunMethod[RunMethod["AutoStart"] = 1] = "AutoStart";
    RunMethod[RunMethod["Step"] = 2] = "Step";
    RunMethod[RunMethod["UntilExpand"] = 3] = "UntilExpand";
})(RunMethod || (RunMethod = {}));


/***/ }),

/***/ "./src/SizingMethod.ts":
/*!*****************************!*\
  !*** ./src/SizingMethod.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SizingMethod": () => (/* binding */ SizingMethod)
/* harmony export */ });
var SizingMethod;
(function (SizingMethod) {
    SizingMethod[SizingMethod["Fixed"] = 0] = "Fixed";
    SizingMethod[SizingMethod["CalcCanvasSize"] = 1] = "CalcCanvasSize";
    SizingMethod[SizingMethod["CalcTileSize"] = 2] = "CalcTileSize";
    SizingMethod[SizingMethod["CalcTileScale"] = 3] = "CalcTileScale";
})(SizingMethod || (SizingMethod = {}));


/***/ }),

/***/ "./src/StartingPositions.ts":
/*!**********************************!*\
  !*** ./src/StartingPositions.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StartingPositions": () => (/* binding */ StartingPositions)
/* harmony export */ });
var StartingPositions;
(function (StartingPositions) {
    StartingPositions[StartingPositions["Random"] = 0] = "Random";
    StartingPositions[StartingPositions["TopLeft"] = 1] = "TopLeft";
    StartingPositions[StartingPositions["TopCenter"] = 2] = "TopCenter";
    StartingPositions[StartingPositions["TopRight"] = 3] = "TopRight";
    StartingPositions[StartingPositions["CenterLeft"] = 4] = "CenterLeft";
    StartingPositions[StartingPositions["Mid"] = 5] = "Mid";
    StartingPositions[StartingPositions["CenterRight"] = 6] = "CenterRight";
    StartingPositions[StartingPositions["BottomLeft"] = 7] = "BottomLeft";
    StartingPositions[StartingPositions["BottomCenter"] = 8] = "BottomCenter";
    StartingPositions[StartingPositions["BottomRight"] = 9] = "BottomRight";
})(StartingPositions || (StartingPositions = {}));


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
    SuperImposedState[SuperImposedState["Layered"] = 0] = "Layered";
    SuperImposedState[SuperImposedState["LayeredSorted"] = 1] = "LayeredSorted";
    SuperImposedState[SuperImposedState["Grid"] = 2] = "Grid";
    SuperImposedState[SuperImposedState["GridScaled"] = 3] = "GridScaled";
    SuperImposedState[SuperImposedState["GridAlpha"] = 4] = "GridAlpha";
})(SuperImposedState || (SuperImposedState = {}));


/***/ }),

/***/ "./src/WFCConfig.ts":
/*!**************************!*\
  !*** ./src/WFCConfig.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFCConfig": () => (/* binding */ WFCConfig),
/* harmony export */   "WFCRenderConfig": () => (/* binding */ WFCRenderConfig)
/* harmony export */ });
/* harmony import */ var _StartingPositions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StartingPositions */ "./src/StartingPositions.ts");
/* harmony import */ var _SuperImposedState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SuperImposedState */ "./src/SuperImposedState.ts");
/* harmony import */ var _SizingMethod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SizingMethod */ "./src/SizingMethod.ts");
/* harmony import */ var _RunMethod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RunMethod */ "./src/RunMethod.ts");
/* harmony import */ var _RenderType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RenderType */ "./src/RenderType.ts");
/* harmony import */ var _Backtracking__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Backtracking */ "./src/Backtracking.ts");






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
        this.useMouse = false;
        this.edgeWrapAround = false;
        this.edgeSocket = "";
        this.tileName = 'Knots';
        this.set = 'all';
        this.startingPosition = _StartingPositions__WEBPACK_IMPORTED_MODULE_0__.StartingPositions.Random;
        this.canvasHeight = 450;
        this.canvasWidth = 450;
        this.sizingMethod = _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod.Fixed;
        this.offsetX = 0;
        this.offsetY = 0;
        this.autoExpandSize = 1;
        this.autoExpand = false;
        this.runMethod = _RunMethod__WEBPACK_IMPORTED_MODULE_3__.RunMethod.AutoRun;
        this.neighborDistance = 1;
        this.gridSize = 0;
        this.backtracking = _Backtracking__WEBPACK_IMPORTED_MODULE_5__.Backtracking.None;
    }
}
class WFCRenderConfig {
    constructor() {
        this.superImposed = _SuperImposedState__WEBPACK_IMPORTED_MODULE_1__.SuperImposedState.Layered;
        this.renderType = _RenderType__WEBPACK_IMPORTED_MODULE_4__.RenderType.TilesAndSuperImposed;
        this.canvasHeight = 450;
        this.canvasWidth = 450;
        this.sizingMethod = _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod.Fixed;
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

/***/ "./src/WFCEvent.ts":
/*!*************************!*\
  !*** ./src/WFCEvent.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFCEvent": () => (/* binding */ WFCEvent)
/* harmony export */ });
class WFCEvent {
    constructor(type, data = null) {
        this.type = type;
        this.data = data;
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
/* harmony import */ var _StartingPositions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StartingPositions */ "./src/StartingPositions.ts");
/* harmony import */ var _SizingMethod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SizingMethod */ "./src/SizingMethod.ts");
/* harmony import */ var _WFCConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WFCConfig */ "./src/WFCConfig.ts");
/* harmony import */ var _WFCTiles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WFCTiles */ "./src/WFCTiles.ts");
/* harmony import */ var _RunMethod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RunMethod */ "./src/RunMethod.ts");
/* harmony import */ var _RenderType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RenderType */ "./src/RenderType.ts");
/* harmony import */ var _Backtracking__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Backtracking */ "./src/Backtracking.ts");








class WFCRender {
    constructor(canvasId) {
        this.config = new _WFCConfig__WEBPACK_IMPORTED_MODULE_3__.WFCConfig();
        this.renderConfig = new _WFCConfig__WEBPACK_IMPORTED_MODULE_3__.WFCRenderConfig();
        this.wfc = new _WFCTiles__WEBPACK_IMPORTED_MODULE_4__.WFCTiles();
        this.halfScaleHeight = this.config.tileScale / 2;
        this.halfScaleWidth = this.config.tileScale / 2;
        this.imagesMap = {};
        this.gridHashmap = {};
        this.wfcCallback = (event) => {
            if (event.type != 'step' &&
                event.type != "found" &&
                event.type != "stopped" &&
                event.type != "reset") {
                //console.log('event', event.type, event.data);
            }
            if (event.type == 'step') {
                if (this.renderConfig.renderType != _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.None)
                    this.draw(event.data.affectedTiles);
            }
            else if (event.type == 'reset') {
                //if(this.renderConfig.renderType != RenderType.None) 
                this.startOver();
            }
            else {
                //if(this.renderConfig.renderType != RenderType.None) console.log('calling draw from wfcCallback', event);
                this.draw();
            }
            return true;
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
    preloadColorImage(color) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            canvas.width = 10;
            canvas.height = 10;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 10, 10);
            image.src = canvas.toDataURL();
            resolve(image);
        });
    }
    preloadPixelColorImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = (event) => {
                const colorImage = new Image();
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext("2d");
                const colorCanvas = document.createElement('canvas');
                const colorCtx = colorCanvas.getContext("2d");
                let r = 0;
                let g = 0;
                let b = 0;
                if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.PixelBasedColorDominant) {
                    ctx.imageSmoothingEnabled = true;
                    ctx.drawImage(image, 0, 0, 1, 1);
                    const dominantColor = ctx.getImageData(0, 0, 1, 1).data.slice(0, 3);
                    r = dominantColor[0];
                    g = dominantColor[1];
                    b = dominantColor[2];
                }
                else if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.PixelBasedColorAverage) {
                    var blockSize = 5, // only visit every 5 pixels
                    data, width, height, i = -4, length, rgb = { r: 0, g: 0, b: 0 }, count = 0;
                    height = canvas.height = image.naturalHeight || image.offsetHeight || image.height;
                    width = canvas.width = image.naturalWidth || image.offsetWidth || image.width;
                    ctx.drawImage(image, 0, 0);
                    data = ctx.getImageData(0, 0, width, height);
                    length = data.data.length;
                    while ((i += blockSize * 4) < length) {
                        ++count;
                        rgb.r += data.data[i];
                        rgb.g += data.data[i + 1];
                        rgb.b += data.data[i + 2];
                    }
                    // ~~ used to floor values
                    r = ~~(rgb.r / count);
                    g = ~~(rgb.g / count);
                    b = ~~(rgb.b / count);
                }
                colorCanvas.width = 10;
                colorCanvas.height = 10;
                colorCtx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 1)";
                colorCtx.fillRect(0, 0, 10, 10);
                colorImage.src = colorCanvas.toDataURL();
                resolve(colorImage);
            };
            image.onerror = (event) => reject();
            image.src = src;
        });
    }
    getAvailableTiles() {
        return Object.keys(this.wfc.wfcData.tileSets);
    }
    getSuperImposedStates() {
        return _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState;
    }
    getStartingPositions() {
        return _StartingPositions__WEBPACK_IMPORTED_MODULE_1__.StartingPositions;
    }
    getSizingMethods() {
        return _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod;
    }
    getRunMethods() {
        return _RunMethod__WEBPACK_IMPORTED_MODULE_5__.RunMethod;
    }
    getRenderTypes() {
        return _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType;
    }
    getBacktrackingMethods() {
        return _Backtracking__WEBPACK_IMPORTED_MODULE_7__.Backtracking;
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
    async init(config, renderConfig, wfc, wfcRunner) {
        this.config = config;
        this.renderConfig = renderConfig;
        this.resizeCanvas();
        this.ctx.fillStyle = "transparent";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.wfc = wfc;
        this.wfcRunner = wfcRunner;
        this.wfcRunner.addCallback(this.wfcCallback);
    }
    resizeCanvas() {
        if (this.config.sizingMethod == _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod.CalcCanvasSize) {
            this.canvas.height = this.config.tilesHeight * this.config.tileScale;
            this.canvas.width = this.config.tilesWidth * this.config.tileScale;
        }
        else {
            this.canvas.height = this.config.canvasHeight;
            this.canvas.width = this.config.canvasWidth;
        }
        //TODO: Move this check to the config
        if (this.config.sizingMethod == _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod.CalcTileSize) {
            this.config.tilesHeight = Math.floor(this.config.canvasHeight / this.config.tileScale);
            this.config.tilesWidth = Math.floor(this.config.canvasWidth / this.config.tileScale);
        }
        else if (this.config.sizingMethod == _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod.CalcTileScale) {
            this.config.tileScale = Math.max(Math.floor(this.config.canvasHeight) / this.config.tilesHeight, Math.floor(this.config.canvasWidth / this.config.tilesWidth));
        }
        this.halfScaleHeight = this.config.tileScale / 2;
        this.halfScaleWidth = this.config.tileScale / 2;
    }
    async initImageData() {
        let pieces = this.wfc.wfcData.tilePieces[this.config.tileName];
        let tileImages = __webpack_require__("./src/metadata/render sync recursive ^\\.\\/.*\\.json$")("./" + this.config.tileName + ".json");
        let tileImageMap = tileImages.reduce((tileMap, tileImage) => {
            if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.ColorOnly) {
                tileMap[tileImage.name] = tileImage.color;
            }
            else {
                tileMap[tileImage.name] = tileImage.imgsrc;
            }
            return tileMap;
        }, {});
        let loadImagesAsync = [];
        if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.ColorOnly) {
            loadImagesAsync = pieces.map(async (x) => {
                return {
                    name: x.name,
                    img: await this.preloadColorImage(tileImageMap[x.name])
                };
            });
        }
        else if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.PixelBasedColorDominant ||
            this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.PixelBasedColorAverage) {
            loadImagesAsync = pieces.map(async (x) => {
                return {
                    name: x.name,
                    img: await this.preloadPixelColorImage('tiles/' + this.config.tileName + '/' + tileImageMap[x.name])
                };
            });
        }
        else {
            loadImagesAsync = pieces.map(async (x) => {
                return {
                    name: x.name,
                    img: await this.preloadImage('tiles/' + this.config.tileName + '/' + tileImageMap[x.name])
                };
            });
        }
        this.imagesMap = (await Promise.all(loadImagesAsync)).reduce((piecesMap, piece) => {
            piecesMap[piece.name] = piece.img;
            return piecesMap;
        }, {});
    }
    initDraw() {
        this.startOver();
    }
    startOver() {
        this.reset();
        this.startWFCLoop(this.config.runSpeed);
    }
    expand() {
        this.resizeCanvas();
        if (this.renderConfig.renderType != _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.None)
            console.log('calling draw from expand');
        this.draw();
    }
    reset() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    getCursorPosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return { x, y };
    }
    canvasClicked(event) {
        event.button == 2;
        let position = this.getCursorPosition(event);
        let tileX = Math.floor(position.x / this.config.tileScale) - this.config.offsetX;
        let tileY = Math.floor(position.y / this.config.tileScale) - this.config.offsetY;
        if (event.button == 0) {
            this.wfcRunner.cycleTile(tileX, tileY);
            if (this.renderConfig.renderType != _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.None)
                console.log('calling draw from canvasClicked');
            this.draw();
        }
        else if (event.button == 2) {
            this.wfcRunner.placeCycledTile(tileX, tileY);
            if (this.renderConfig.renderType != _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.None)
                console.log('calling draw from canvasClicked');
            this.draw();
        }
    }
    startWFCLoop(interval) {
        if (this.config.useMouse) {
            this.canvas.addEventListener('click', (e) => {
                this.canvasClicked(e);
            });
            this.canvas.addEventListener('contextmenu', (e) => {
                this.canvasClicked(e);
                if (e.preventDefault != undefined)
                    e.preventDefault();
                if (e.stopPropagation != undefined)
                    e.stopPropagation();
                return false;
            });
        }
        this.draw();
    }
    draw(tiles = undefined) {
        if (this.renderConfig.renderType != _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.None) {
            this.ctx.save();
            if (tiles != undefined) {
                this.drawTiles(tiles);
            }
            else {
                this.drawAllTiles();
            }
            this.ctx.restore();
        }
    }
    drawTiles(positions) {
        for (let pos of positions) {
            let columnIndex = pos.x;
            let rowIndex = pos.y;
            let column = this.wfc.tiles[columnIndex];
            let tile = column[rowIndex];
            if (tile) {
                if (!this.config.fast) {
                    if (tile.validPieces) {
                        if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.TilesAndSuperImposed || this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.SuperImposedOnly) {
                            this.clearTile(columnIndex, rowIndex);
                            this.drawSuperImposed(columnIndex, rowIndex, tile);
                        }
                    }
                }
                if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.TilesAndSuperImposed ||
                    this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.TilesOnly ||
                    this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.ColorOnly ||
                    this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.PixelBasedColorAverage ||
                    this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.PixelBasedColorDominant) {
                    if (tile.key != undefined) {
                        this.clearTile(columnIndex, rowIndex);
                        this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.key].name], columnIndex, rowIndex, tile.rotation);
                    }
                    else if (tile.temporary && this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.TilesAndSuperImposed) {
                        this.clearTile(columnIndex, rowIndex);
                        this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.temporary.key].name], columnIndex, rowIndex, tile.temporary.rotation, 0.8);
                    }
                }
            }
        }
    }
    drawAllTiles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let columnIndex = -this.config.offsetX; columnIndex < this.config.tilesWidth - this.config.offsetX; columnIndex++) {
            let column = this.wfc.tiles[columnIndex];
            for (let rowIndex = -this.config.offsetY; rowIndex < this.config.tilesHeight - this.config.offsetY; rowIndex++) {
                let tile = column[rowIndex];
                if (tile) {
                    if (!this.config.fast) {
                        if (tile.validPieces) {
                            if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.TilesAndSuperImposed || this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.SuperImposedOnly) {
                                this.drawSuperImposed(columnIndex, rowIndex, tile);
                            }
                        }
                    }
                    if (this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.TilesAndSuperImposed ||
                        this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.TilesOnly ||
                        this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.ColorOnly ||
                        this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.PixelBasedColorAverage ||
                        this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.PixelBasedColorDominant) {
                        if (tile.key != undefined) {
                            this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.key].name], columnIndex, rowIndex, tile.rotation);
                        }
                        else if (tile.temporary && this.renderConfig.renderType == _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType.TilesAndSuperImposed) {
                            this.drawTile(this.imagesMap[this.wfc.piecesMap[tile.temporary.key].name], columnIndex, rowIndex, tile.temporary.rotation, 0.8);
                        }
                    }
                }
            }
        }
    }
    drawSuperImposed(columnIndex, rowIndex, tile) {
        if (tile.key != undefined)
            return;
        let validCount = tile.validPieces.length;
        if (validCount > 0) {
            switch (this.renderConfig.superImposed) {
                case _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.Layered:
                    this.drawSuperImposed_Layered(columnIndex, rowIndex, tile, validCount);
                    break;
                case _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.GridScaled:
                    this.drawSuperImposed_GridScaled(columnIndex, rowIndex, tile, validCount);
                    break;
                case _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.Grid:
                    this.drawSuperImposed_Grid(columnIndex, rowIndex, tile, validCount);
                    break;
                case _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.LayeredSorted:
                    this.drawSuperImposed_LayeredSorted(columnIndex, rowIndex, tile, validCount);
                    break;
                case _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState.GridAlpha:
                    this.drawSuperImposed_GridAlpha(columnIndex, rowIndex, tile, validCount);
                    break;
            }
        }
    }
    drawSuperImposed_Layered(columnIndex, rowIndex, tile, validCount) {
        this.drawSuperImposedCache(tile.validPieces, (ctx) => {
            tile.validPieces.forEach((key) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                this.drawSuperimposed_single(ctx, tileImage, piece.rotation, validCount);
            });
        }, (canvas) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
        });
    }
    drawSuperImposed_LayeredSorted(columnIndex, rowIndex, tile, validCount) {
        let sortedValid = tile.validPieces.sort((a, b) => {
            let pieceA = this.wfc.piecesMap[a];
            let pieceB = this.wfc.piecesMap[b];
            return pieceB.weight - pieceA.weight;
        });
        this.drawSuperImposedCache(sortedValid, (ctx) => {
            sortedValid.forEach((key, index) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                this.drawSuperimposed_single(ctx, tileImage, piece.rotation, validCount);
            });
        }, (canvas) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
        });
    }
    drawSuperImposed_GridScaled(columnIndex, rowIndex, tile, validCount) {
        let gridSize = Math.ceil(Math.sqrt(validCount));
        this.drawSuperImposedCache(tile.validPieces, (ctx) => {
            tile.validPieces.forEach((key, index) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                this.drawSuperimposedPartGrid_single(ctx, tileImage, gridSize, index, piece.rotation, validCount, 0.6);
            });
        }, (canvas) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
        });
    }
    drawSuperImposed_Grid(columnIndex, rowIndex, tile, validCount) {
        let piecesCount = Object.keys(this.wfc.piecesMap).length;
        let gridSize = Math.ceil(Math.sqrt(piecesCount));
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
            if (pieceA.weight == pieceB.weight) {
                return a.localeCompare(b);
            }
            return pieceB.weight - pieceA.weight;
        });
        this.drawSuperImposedCache(sortedValid, (ctx) => {
            sortedValid.forEach((key, index) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                this.drawSuperimposedPartGrid_single(ctx, tileImage, gridSize, index, piece.rotation, piecesCount, 0.5);
            });
        }, (canvas) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
        });
    }
    drawSuperImposed_GridAlpha(columnIndex, rowIndex, tile, validCount) {
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
            if (pieceA.weight == pieceB.weight) {
                return a.localeCompare(b);
            }
            return pieceB.weight - pieceA.weight;
        });
        this.drawSuperImposedCache(sortedValid, (ctx) => {
            sortedValid.forEach((key, index) => {
                let piece = this.wfc.piecesMap[key];
                let tileImage = this.imagesMap[piece.name];
                let weight = piece.weight;
                let weightPercent = ((weight - minWeight)) / (maxWeight - minWeight);
                let adjustedAlpha = (weightPercent * (0.6 - 0.2)) + 0.2;
                let gridSize = Math.ceil(Math.sqrt(validCount));
                this.drawSuperimposedPartGrid_single(ctx, tileImage, gridSize, index, piece.rotation, validCount, adjustedAlpha);
            });
        }, (canvas) => {
            this.drawTile(canvas, columnIndex, rowIndex, 0, 1);
        });
    }
    drawSuperImposedCache(arr, drawFunction, drawTileFunction) {
        let sortedValidStr = arr.join('|');
        let hash = JSON.stringify(sortedValidStr);
        if (hash in this.gridHashmap) {
            drawTileFunction(this.gridHashmap[hash]);
        }
        else {
            let canvas = document.createElement('canvas');
            this.gridHashmap[hash] = canvas;
            let ctx = canvas.getContext("2d");
            canvas.width = this.config.tileScale;
            canvas.height = this.config.tileScale;
            drawFunction(ctx);
            drawTileFunction(canvas);
        }
    }
    drawImgGrid(img, x, y, rotation, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate((this.config.tileScale * (x + this.config.offsetX)) + this.halfScaleWidth, (this.config.tileScale * (y + this.config.offsetY)) + this.halfScaleHeight);
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -this.halfScaleWidth, -this.halfScaleHeight, this.config.tileScale, this.config.tileScale);
        this.ctx.restore();
    }
    drawImgGrid_onContext(ctx, img, rotation, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.halfScaleWidth, this.halfScaleHeight);
        ctx.rotate((rotation * 90) * (Math.PI / 180));
        ctx.drawImage(img, -this.halfScaleWidth, -this.halfScaleHeight, this.config.tileScale, this.config.tileScale);
        ctx.restore();
    }
    clearTile(x, y) {
        this.ctx.clearRect((this.config.tileScale * (x + this.config.offsetX)), (this.config.tileScale * (y + this.config.offsetY)), this.config.tileScale, this.config.tileScale);
    }
    drawTile(img, x, y, rotation, alpha = 1) {
        this.drawImgGrid(img, x, y, rotation, alpha);
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
        let newX = (this.config.tileScale * (x + this.config.offsetX))
            + ((gridIndex % gridSize) * width);
        let newY = (this.config.tileScale * (y + this.config.offsetY))
            + ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg(img, newX, newY, width, height, rotation, alpha);
    }
    drawSuperimposedPartGrid_single(ctx, img, gridSize, gridIndex, rotation, possible, alpha) {
        let width = this.config.tileScale / gridSize;
        let height = this.config.tileScale / (gridSize);
        let newX = ((gridIndex % gridSize) * width);
        let newY = ((Math.floor(gridIndex / gridSize)) * height);
        this.drawImg_onContext(ctx, img, newX, newY, width, height, rotation, alpha);
    }
    drawSuperimposed_single(ctx, img, rotation, possible) {
        this.drawImgGrid_onContext(ctx, img, rotation, 0.9 / possible);
    }
    drawSuperimposedWeighted_single(ctx, img, rotation, possible, alpha) {
        this.drawImgGrid_onContext(ctx, img, rotation, alpha);
    }
    drawImg(img, x, y, width, height, rotation, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate(x + (width / 2), y + (height / 2));
        this.ctx.rotate((rotation * 90) * (Math.PI / 180));
        this.ctx.drawImage(img, -(width / 2), -(height / 2), width, height);
        this.ctx.restore();
    }
    drawImg_onContext(ctx, img, x, y, width, height, rotation, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x + (width / 2), y + (height / 2));
        ctx.rotate((rotation * 90) * (Math.PI / 180));
        ctx.drawImage(img, -(width / 2), -(height / 2), width, height);
        ctx.restore();
    }
    getImage() {
        return this.canvas.toDataURL("image/png");
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
/* harmony import */ var _Backtracking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Backtracking */ "./src/Backtracking.ts");
/* harmony import */ var _RunMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RunMethod */ "./src/RunMethod.ts");
/* harmony import */ var _StartingPositions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StartingPositions */ "./src/StartingPositions.ts");
/* harmony import */ var _WFCEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WFCEvent */ "./src/WFCEvent.ts");
/* harmony import */ var _Replay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Replay */ "./src/Replay.ts");





class WFCRunner {
    constructor(config, wfc) {
        this.retryCount = 0;
        this.stopRunning = true;
        this.wfcLoop = undefined;
        this.callbacks = [];
        this.pickFirstTile = true;
        this.placedTiles = 0;
        this.lastPosition = undefined;
        this.replay = [];
        this.replayPreset = [];
        this.hasRunWFC = (event) => {
            let results = this.callbacks.map((callback) => {
                return callback(event);
            });
            return results.every(Boolean);
        };
        this.entropyGroupsPositions = {};
        this.entropyPositions = {};
        this.config = config;
        this.wfc = wfc;
        this.backtrackingSelections = [];
    }
    addCallback(callback) {
        this.callbacks.push(callback);
    }
    expand() {
        this.config.tilesHeight += this.config.autoExpandSize * 2;
        this.config.tilesWidth += this.config.autoExpandSize * 2;
        this.config.offsetX += this.config.autoExpandSize * 1;
        this.config.offsetY += this.config.autoExpandSize * 1;
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
        //this.recalculateEntropyGroups();
    }
    getTilePositionsAsEntropyGroups() {
        let entropyGroups = {};
        for (let x = -this.config.offsetX; x < this.config.tilesWidth - this.config.offsetX; x++) {
            let column = this.wfc.tiles[x];
            for (let y = -this.config.offsetY; y < this.config.tilesHeight - this.config.offsetY; y++) {
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
    noValidFound() {
        this.retryCount++;
        this.stopWFCLoop();
        if (this.retryCount <= this.config.maxRetryCount) {
            if (this.config.backtracking != _Backtracking__WEBPACK_IMPORTED_MODULE_0__.Backtracking.None) {
                this.backtrack();
            }
            else {
                if (!this.config.fast) {
                    this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('retry'));
                }
                this.reset();
                this.startWFCLoop(this.config.runSpeed);
            }
        }
        else {
            console.log('not possible to solve within ' + this.config.maxRetryCount + ' retries');
            //this.hasRunWFC(new WFCEvent('unsolvable'));
        }
    }
    backtrack() {
        var slicedReplay = [];
        var lastReplay = undefined;
        var restReplays = [];
        if (this.config.backtracking == _Backtracking__WEBPACK_IMPORTED_MODULE_0__.Backtracking.Linear) {
            slicedReplay = this.replay.slice(0, -this.retryCount);
            restReplays = this.replay.slice(-this.retryCount);
        }
        else if (this.config.backtracking == _Backtracking__WEBPACK_IMPORTED_MODULE_0__.Backtracking.Exponential) {
            slicedReplay = this.replay.slice(0, -(this.retryCount * this.retryCount));
            restReplays = this.replay.slice(-(this.retryCount * this.retryCount));
        }
        else if (this.config.backtracking == _Backtracking__WEBPACK_IMPORTED_MODULE_0__.Backtracking.Full) {
            slicedReplay = this.replay.slice(0, -1);
            restReplays = this.replay.slice(-1);
        }
        this.replay = [];
        this.reset(false, false);
        this.replayPreset.forEach((value, index, array) => {
            this.placeTile(value.x, value.y, value.key, _Replay__WEBPACK_IMPORTED_MODULE_4__.Replay.None);
        });
        slicedReplay.forEach((value, index, array) => {
            this.placeTile(value.x, value.y, value.key, _Replay__WEBPACK_IMPORTED_MODULE_4__.Replay.BacktrackOnly);
        });
        lastReplay = restReplays[0];
        for (var i = 1; i < restReplays.length; i++) {
            delete this.backtrackingSelections[restReplays[i].x][restReplays[i].y];
        }
        if (lastReplay != undefined) {
            let lastReplayBackTrackingSelection = this.backtrackingSelections[lastReplay.x][lastReplay.y];
            let lastReplayTile = this.wfc.tiles[lastReplay.x][lastReplay.y];
            const lastReplayBackTrackingSelectionToRemove = new Set(lastReplayBackTrackingSelection);
            this.wfc.tiles[lastReplay.x][lastReplay.y].validPieces =
                this.wfc.tiles[lastReplay.x][lastReplay.y].validPieces
                    .filter((x) => !lastReplayBackTrackingSelectionToRemove.has(x));
            if (lastReplayTile.validPieces.length == 0) {
                delete this.backtrackingSelections[lastReplay.x][lastReplay.y];
                this.backtrack();
                return;
            }
        }
        this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('backtracked'));
        this.continueRun();
    }
    pickPosition(position) {
        switch (position) {
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.TopLeft:
                return { x: -this.config.offsetX, y: -this.config.offsetY };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.TopCenter:
                return { x: Math.floor(this.config.tilesWidth / 2) - this.config.offsetX, y: -this.config.offsetY };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.TopRight:
                return { x: this.config.tilesWidth - this.config.offsetX - 1, y: -this.config.offsetY };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.CenterLeft:
                return { x: -this.config.offsetX, y: Math.floor(this.config.tilesHeight / 2) - this.config.offsetY };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.Mid:
                return { x: Math.floor(this.config.tilesWidth / 2) - this.config.offsetX, y: Math.floor(this.config.tilesHeight / 2) - this.config.offsetY };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.CenterRight:
                return { x: this.config.tilesWidth - this.config.offsetX - 1, y: Math.floor(this.config.tilesHeight / 2) - this.config.offsetY };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.BottomLeft:
                return { x: -this.config.offsetX, y: this.config.tilesHeight - this.config.offsetY - 1 };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.BottomCenter:
                return { x: Math.floor(this.config.tilesWidth / 2) - this.config.offsetX, y: this.config.tilesHeight - this.config.offsetY - 1 };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.BottomRight:
                return { x: this.config.tilesWidth - this.config.offsetX - 1, y: this.config.tilesHeight - this.config.offsetY - 1 };
            case _StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.Random:
                let entropyGroups = this.entropyGroupsPositions;
                let entropyKeys = Object.keys(entropyGroups);
                if (entropyKeys.length == 0) {
                    return null;
                }
                let lowestEntropyKey = Number(entropyKeys[0]);
                let lowestEntroyGroup = entropyGroups[lowestEntropyKey];
                let lowestEntropyGroupPositions = Object.keys(lowestEntroyGroup);
                let randomKeyFromLowestEntropyGroup = this.getRandomElementFromArray(lowestEntropyGroupPositions);
                let randomPositionFromLowestEntropyGroup = lowestEntroyGroup[randomKeyFromLowestEntropyGroup];
                return randomPositionFromLowestEntropyGroup;
        }
    }
    runWFC() {
        let pickedPos = [];
        let allAffectedTiles = [];
        for (var i = 0; (i < this.config.runLoop) || this.config.fast; i++) {
            let stop = this.checkForStop();
            if (stop) {
                this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('stop'));
                return;
            }
            if (this.stopRunning)
                return;
            let pos = null;
            if (this.pickFirstTile) {
                pos = this.pickPosition(this.config.startingPosition);
                this.pickFirstTile = false;
            }
            else {
                pos = this.pickPosition(_StartingPositions__WEBPACK_IMPORTED_MODULE_2__.StartingPositions.Random);
            }
            if (pos == null) {
                console.log('noposition found stopping');
                this.stopWFCLoop();
                return;
            }
            let placed = this.placeTilePosition(pos.x, pos.y);
            if (placed == false) {
                break;
            }
            pickedPos.push(pos);
            if (placed != undefined && placed !== true) {
                allAffectedTiles = allAffectedTiles.concat(placed);
            }
        }
        if (!this.config.fast) {
            let allAffectedTilesSet = Array.from(new Set(allAffectedTiles));
            this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('step', { 'pickedPos': pickedPos, 'affectedTiles': allAffectedTilesSet }));
        }
    }
    placeTilePosition(x, y) {
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
            let affectedTiles = this.placeTile(x, y, tileKey, _Replay__WEBPACK_IMPORTED_MODULE_4__.Replay.Backtrack);
            if (affectedTiles == null) {
                return false;
            }
            return affectedTiles;
        }
        console.log('reached end of placetileposition, validpieces is undefined', currentTile, currentTile.validPieces);
    }
    cycleTile(x, y) {
        let currentTile = this.wfc.tiles[x][y];
        if (currentTile.validPieces == undefined || currentTile.validPieces.length == 0) {
            return;
        }
        if (currentTile.cycle == undefined) {
            currentTile.cycle = 0;
        }
        else {
            currentTile.cycle += 1;
        }
        currentTile.cycle = currentTile.cycle % currentTile.validPieces.length;
        let tileKey = currentTile.validPieces[currentTile.cycle];
        let piece = this.wfc.piecesMap[tileKey];
        currentTile.temporary = piece;
        let pos = { x: x, y: y };
        let pickedPos = [pos];
        let allAffectedTiles = [pos];
        this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('step', { 'pickedPos': pickedPos, 'affectedTiles': allAffectedTiles }));
    }
    placeCycledTile(x, y) {
        let currentTile = this.wfc.tiles[x][y];
        if (currentTile.temporary == undefined) {
            return;
        }
        let temporary = currentTile.temporary;
        currentTile.temporary = undefined;
        let allAffectedTiles = this.placeTile(x, y, temporary.key, _Replay__WEBPACK_IMPORTED_MODULE_4__.Replay.Preset);
        let pos = { x: x, y: y };
        let pickedPos = [pos];
        this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('step', { 'pickedPos': pickedPos, 'affectedTiles': allAffectedTiles }));
    }
    addBacktrackingSelection(x, y, key) {
        if (this.backtrackingSelections[x] == undefined) {
            this.backtrackingSelections[x] = [];
        }
        if (this.backtrackingSelections[x][y] == undefined) {
            this.backtrackingSelections[x][y] = [];
        }
        this.backtrackingSelections[x][y].push(key);
    }
    placeTile(x, y, tileKey, replayType) {
        let piece = this.wfc.piecesMap[tileKey];
        this.wfc.tiles[x][y] = Object.assign(this.wfc.tiles[x][y], piece);
        this.recalculateEntropyGroup(x, y);
        let affectedTiles = this.runValidationLoop(x, y, [piece]);
        if (affectedTiles == null) {
            affectedTiles = [{ x: x, y: y }];
        }
        else {
            affectedTiles.push({ x: x, y: y });
        }
        this.wfc.tileCounters[piece.name].count += 1;
        this.wfc.tiles[x][y].pickedFrom = this.lastPosition;
        this.lastPosition = { x: x, y: y };
        if (replayType == _Replay__WEBPACK_IMPORTED_MODULE_4__.Replay.Backtrack) {
            this.replay.push({ x: x, y: y, key: tileKey });
            this.addBacktrackingSelection(x, y, tileKey);
        }
        else if (replayType == _Replay__WEBPACK_IMPORTED_MODULE_4__.Replay.BacktrackOnly) {
            this.replay.push({ x: x, y: y, key: tileKey });
        }
        else if (replayType == _Replay__WEBPACK_IMPORTED_MODULE_4__.Replay.Preset) {
            this.replayPreset.push({ x: x, y: y, key: tileKey });
        }
        this.checkForMaximumTiles(piece.name);
        this.placedTiles += 1;
        return affectedTiles;
    }
    runValidationLoop(x, y, pieces) {
        let validation = this.runValidation(x, y, pieces);
        let runValidationLoopPosititions = validation;
        if (validation == null) {
            return null;
        }
        let depth = 0;
        while (validation.length > 0 && depth < this.config.maxDepth) {
            let newValidations = [];
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
            runValidationLoopPosititions = runValidationLoopPosititions.concat(newValidationsSet);
        }
        let runValidationLoopPosititionsSet = Array.from(new Set(runValidationLoopPosititions));
        return runValidationLoopPosititionsSet;
    }
    validatePosition(x, y) {
        let validationTile = this.wfc.tiles[x][y];
        let validationTilePieces = validationTile.validPieces;
        let pieces = validationTilePieces.map((tileKey) => {
            return this.wfc.piecesMap[tileKey];
        });
        let innerValidation = this.runValidation(x, y, pieces);
        return innerValidation;
    }
    getNeighbors(x, y, count) {
        let neighbors = [];
        if (this.config.edgeWrapAround || y != -this.config.offsetY) {
            for (let index = 0; index > -count; index--) {
                let offsettedNeighborY = this.config.edgeWrapAround ?
                    ((y + this.config.offsetY + index - 1 + this.config.tilesHeight) % this.config.tilesHeight) - this.config.offsetY :
                    y + index - 1;
                if (offsettedNeighborY >= -this.config.offsetY) {
                    neighbors.push({ direction: 'top', tile: this.wfc.tiles[x][offsettedNeighborY], x: x, y: offsettedNeighborY });
                }
            }
        }
        if (this.config.edgeWrapAround || y != this.config.tilesHeight - this.config.offsetY - 1) {
            for (let index = 0; index < count; index++) {
                let offsettedNeighborY = this.config.edgeWrapAround ?
                    ((y + this.config.offsetY + index + 1 + this.config.tilesHeight) % this.config.tilesHeight) - this.config.offsetY :
                    y + index + 1;
                if (offsettedNeighborY <= this.config.tilesHeight - this.config.offsetY - 1) {
                    neighbors.push({ direction: 'bottom', tile: this.wfc.tiles[x][offsettedNeighborY], x: x, y: offsettedNeighborY });
                }
            }
        }
        if (this.config.edgeWrapAround || x != this.config.tilesWidth - this.config.offsetX - 1) {
            for (let index = 0; index < count; index++) {
                let offsettedNeighborX = this.config.edgeWrapAround ?
                    ((x + this.config.offsetX + index + 1 + this.config.tilesWidth) % this.config.tilesWidth) - this.config.offsetX :
                    x + index + 1;
                if (offsettedNeighborX <= this.config.tilesWidth - this.config.offsetX - 1) {
                    neighbors.push({ direction: 'right', tile: this.wfc.tiles[offsettedNeighborX][y], x: offsettedNeighborX, y: y });
                }
            }
        }
        if (this.config.edgeWrapAround || x != -this.config.offsetX) {
            for (let index = 0; index > -count; index--) {
                let offsettedNeighborX = this.config.edgeWrapAround ?
                    ((x + this.config.offsetX + index - 1 + this.config.tilesWidth) % this.config.tilesWidth) - this.config.offsetX :
                    x + index - 1;
                if (offsettedNeighborX >= -this.config.offsetX) {
                    neighbors.push({ direction: 'left', tile: this.wfc.tiles[offsettedNeighborX][y], x: offsettedNeighborX, y: y });
                }
            }
        }
        return neighbors;
    }
    getNeighbors_grid(x, y, xGrid, yGrid) {
        let neighbors = [];
        let offsettedX = x;
        let offsettedY = y;
        let fromX = Math.floor(offsettedX / xGrid) * xGrid;
        let fromY = Math.floor(offsettedY / yGrid) * yGrid;
        for (let indexX = fromX; indexX < fromX + xGrid; indexX++) {
            for (let indexY = fromY; indexY < fromY + yGrid; indexY++) {
                let columns = this.wfc.tiles[indexX];
                if (columns != undefined) {
                    let neighbor = columns[indexY];
                    if (neighbor != undefined) {
                        if (neighbor.position.x != x || neighbor.position.y != y) {
                            neighbors.push({ direction: 'grid', tile: neighbor, x: indexX, y: indexY });
                        }
                    }
                }
            }
        }
        return neighbors;
    }
    getNeighbors_normal(x, y) {
        let neighbors = [];
        if (this.config.edgeWrapAround || y != -this.config.offsetY) {
            let offsettedNeighborY = ((y + this.config.offsetY - 1 + this.config.tilesHeight) % this.config.tilesHeight) - this.config.offsetY;
            neighbors.push({ direction: 'top', tile: this.wfc.tiles[x][offsettedNeighborY], x: x, y: offsettedNeighborY });
        }
        if (this.config.edgeWrapAround || x != this.config.tilesWidth - this.config.offsetX - 1) {
            let offsettedNeighborX = ((x + this.config.offsetX + 1 + this.config.tilesWidth) % this.config.tilesWidth) - this.config.offsetX;
            neighbors.push({ direction: 'right', tile: this.wfc.tiles[offsettedNeighborX][y], x: offsettedNeighborX, y: y });
        }
        if (this.config.edgeWrapAround || y != this.config.tilesHeight - this.config.offsetY - 1) {
            let offsettedNeighborY = ((y + this.config.offsetY + 1 + this.config.tilesHeight) % this.config.tilesHeight) - this.config.offsetY;
            neighbors.push({ direction: 'bottom', tile: this.wfc.tiles[x][offsettedNeighborY], x: x, y: offsettedNeighborY });
        }
        if (this.config.edgeWrapAround || x != -this.config.offsetX) {
            let offsettedNeighborX = ((x + this.config.offsetX - 1 + this.config.tilesWidth) % this.config.tilesWidth) - this.config.offsetX;
            neighbors.push({ direction: 'left', tile: this.wfc.tiles[offsettedNeighborX][y], x: offsettedNeighborX, y: y });
        }
        return neighbors;
    }
    runValidation(x, y, pieces, getPlaced = false) {
        let recheck = [];
        let neighbors = [];
        neighbors = neighbors.concat(this.getNeighbors(x, y, this.config.neighborDistance));
        if (this.config.gridSize > 0) {
            neighbors = neighbors.concat(this.getNeighbors_grid(x, y, this.config.gridSize, this.config.gridSize));
        }
        neighbors.forEach((neighbor) => {
            if (!getPlaced && neighbor.tile.validPieces) {
                let validBefore = neighbor.tile.validPieces.length;
                let validArray = [];
                pieces.forEach((piece) => {
                    validArray.push(neighbor.tile.validPieces
                        .filter((validPieceToCheck) => {
                        var _a;
                        return (_a = piece.validNeighbors[neighbor.direction]) === null || _a === void 0 ? void 0 : _a.includes(validPieceToCheck);
                    }));
                });
                let validArrayConcat = [].concat.apply([], validArray);
                let uniquevalidArraySet = Array.from(new Set(validArrayConcat));
                neighbor.tile.validPieces = uniquevalidArraySet;
                if (neighbor.tile.temporary != undefined) {
                    if (!neighbor.tile.validPieces.includes(neighbor.tile.temporary.key)) {
                        neighbor.tile.temporary = undefined;
                    }
                }
                var validAfter = neighbor.tile.validPieces.length;
                if (validBefore != validAfter) {
                    recheck.push(neighbor.tile.position);
                    this.recalculateEntropyGroup(neighbor.tile.position.x, neighbor.tile.position.y);
                }
            }
            else if (getPlaced && (neighbor.tile.key != undefined)) {
                recheck.push({
                    x: neighbor.x,
                    y: neighbor.y
                });
            }
        });
        return recheck;
    }
    checkForStop() {
        var _a;
        let stop = this.placedTiles >= this.config.tilesWidth * this.config.tilesHeight;
        if (stop) {
            console.log('Found solution after ' + this.retryCount + ' retries');
            let continueRun = (_a = this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('found'))) !== null && _a !== void 0 ? _a : false;
            if (!continueRun) {
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
    stopWFCLoop() {
        this.stopRunning = true;
        clearInterval(this.wfcLoop);
        this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('stopped'));
    }
    reset(refresh = true, setStartTiles = true) {
        this.wfc.reset();
        if (setStartTiles)
            this.setStartTiles();
        this.pickFirstTile = true;
        this.placedTiles = 0;
        if (refresh)
            this.hasRunWFC(new _WFCEvent__WEBPACK_IMPORTED_MODULE_3__.WFCEvent('reset'));
        this.recalculateEntropyGroups();
    }
    recalculateEntropyGroup(x, y) {
        let tile = this.wfc.tiles[x][y];
        let positionKey = x + ',' + y;
        let sameEntropy = false;
        let oldEntropy = this.entropyPositions[positionKey];
        if (tile.key == undefined) {
            let entropy = tile.validPieces.length;
            if (this.entropyGroupsPositions[entropy] == undefined) {
                this.entropyGroupsPositions[entropy] = {};
            }
            this.entropyGroupsPositions[entropy][positionKey] = { x: x, y: y };
            this.entropyPositions[positionKey] = entropy;
            if (oldEntropy && oldEntropy == entropy) {
                sameEntropy = true;
            }
        }
        else {
            delete this.entropyPositions[positionKey];
        }
        if (oldEntropy != undefined && sameEntropy == false) {
            if (this.entropyGroupsPositions[oldEntropy] != undefined) {
                if (this.entropyGroupsPositions[oldEntropy][positionKey] != undefined) {
                    delete this.entropyGroupsPositions[oldEntropy][positionKey];
                }
                if (this.entropyGroupsPositions[oldEntropy] != undefined && Object.keys(this.entropyGroupsPositions[oldEntropy]).length == 0) {
                    delete this.entropyGroupsPositions[oldEntropy];
                }
            }
        }
    }
    recalculateEntropyGroups() {
        for (let x = -this.config.offsetX; x < this.config.tilesWidth - this.config.offsetX; x++) {
            for (let y = -this.config.offsetY; y < this.config.tilesHeight - this.config.offsetY; y++) {
                this.recalculateEntropyGroup(x, y);
            }
        }
    }
    setStartTiles() {
        //console.log('this.wfc.piecesMap', this.wfc.piecesMap);
        let failed = false;
        Object.entries(this.wfc.tileCounters).forEach((values) => {
            if (failed)
                return;
            let tileCounterKey = values[0];
            let countObject = values[1];
            if (countObject.minimum != undefined && countObject.minimum > 0) {
                let maxTrySet = countObject.minimum * 10;
                let trySet = 0;
                while (countObject.count < countObject.minimum && trySet < maxTrySet) {
                    trySet++;
                    let x = Math.floor(Math.random() * this.config.tilesWidth);
                    let y = Math.floor(Math.random() * this.config.tilesHeight);
                    let tile = this.wfc.tiles[x][y];
                    let tilePieces = tile.validPieces;
                    if (tile.validPieces == undefined)
                        continue;
                    if (tile.validPieces.length == 0)
                        continue;
                    let counterTiles = tilePieces.filter((tileKey) => this.wfc.piecesMap[tileKey].name == tileCounterKey);
                    if (counterTiles.length > 0) {
                        let randomIndex = Math.floor(Math.random() * counterTiles.length);
                        let placeTileKey = counterTiles[randomIndex];
                        let placed = this.placeTile(x, y, placeTileKey, _Replay__WEBPACK_IMPORTED_MODULE_4__.Replay.Preset);
                        if (!placed) {
                            continue;
                        }
                    }
                }
                if (countObject.count < countObject.minimum) {
                    failed = true;
                }
            }
        });
        if (failed) {
            this.noValidFound();
        }
        else {
            this.checkForMaximumTilesReached();
        }
    }
    checkForMaximumTilesReached() {
        Object.entries(this.wfc.tileCounters).forEach((values) => {
            let tileCounterKey = values[0];
            this.checkForMaximumTiles(tileCounterKey);
        });
    }
    checkForMaximumTiles(tileName) {
        var countObject = this.wfc.tileCounters[tileName];
        if (countObject.maximum != undefined) {
            if (countObject.count >= countObject.maximum) {
                this.maximumReached(tileName);
            }
        }
    }
    maximumReached(tileName) {
        let pieceObjectsForRemoval = Object.entries(this.wfc.piecesMap)
            .filter((values) => values[1].name == tileName)
            .map((values) => values[0]);
        for (let x = -this.config.offsetX; x < this.config.tilesWidth - this.config.offsetX; x++) {
            let column = this.wfc.tiles[x];
            for (let y = -this.config.offsetY; y < this.config.tilesHeight - this.config.offsetY; y++) {
                let tile = column[y];
                if (tile.validPieces) {
                    tile.validPieces = tile.validPieces.filter((tileKey) => !pieceObjectsForRemoval.includes(tileKey));
                }
            }
        }
    }
    start(interval) {
        this.startWFCLoop(interval);
    }
    continueRun() {
        this.stopRunning = false;
        if (this.config.runMethod == _RunMethod__WEBPACK_IMPORTED_MODULE_1__.RunMethod.Step) {
            this.runWFC();
        }
        else {
            if (this.config.fast == true) {
                this.runWFC();
            }
            else {
                this.wfcLoop = setInterval(() => {
                    this.runWFC();
                }, this.config.runSpeed);
            }
        }
    }
    startWFCLoop(interval) {
        this.stopWFCLoop();
        this.stopRunning = false;
        if (this.config.runMethod == _RunMethod__WEBPACK_IMPORTED_MODULE_1__.RunMethod.AutoStart) {
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

/***/ "./src/WFCTextRender.ts":
/*!******************************!*\
  !*** ./src/WFCTextRender.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFCTextRender": () => (/* binding */ WFCTextRender)
/* harmony export */ });
/* harmony import */ var _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SuperImposedState */ "./src/SuperImposedState.ts");
/* harmony import */ var _StartingPositions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StartingPositions */ "./src/StartingPositions.ts");
/* harmony import */ var _SizingMethod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SizingMethod */ "./src/SizingMethod.ts");
/* harmony import */ var _WFCConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WFCConfig */ "./src/WFCConfig.ts");
/* harmony import */ var _WFCTiles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WFCTiles */ "./src/WFCTiles.ts");
/* harmony import */ var _RunMethod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RunMethod */ "./src/RunMethod.ts");
/* harmony import */ var _RenderType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RenderType */ "./src/RenderType.ts");







class WFCTextRender {
    constructor(canvasId) {
        this.config = new _WFCConfig__WEBPACK_IMPORTED_MODULE_3__.WFCConfig();
        this.wfc = new _WFCTiles__WEBPACK_IMPORTED_MODULE_4__.WFCTiles();
        this.wfcCallback = (event) => {
            if (event.type != 'step' &&
                event.type != "found" &&
                event.type != "stopped" &&
                event.type != "reset") {
                //console.log('event', event.type, event.data);
            }
            if (event.type == 'step') {
                this.draw(event.data.affectedTiles);
            }
            else if (event.type == 'reset') {
            }
            else {
                this.draw();
            }
            return true;
        };
        this.textField = document.getElementById(canvasId);
    }
    getAvailableTiles() {
        return Object.keys(this.wfc.wfcData.tileSets);
    }
    getSuperImposedStates() {
        return _SuperImposedState__WEBPACK_IMPORTED_MODULE_0__.SuperImposedState;
    }
    getStartingPositions() {
        return _StartingPositions__WEBPACK_IMPORTED_MODULE_1__.StartingPositions;
    }
    getSizingMethods() {
        return _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod;
    }
    getRunMethods() {
        return _RunMethod__WEBPACK_IMPORTED_MODULE_5__.RunMethod;
    }
    getRenderTypes() {
        return _RenderType__WEBPACK_IMPORTED_MODULE_6__.RenderType;
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
    async init(config, wfc, wfcRunner) {
        this.config = config;
        this.resizeCanvas();
        this.wfc = wfc;
        this.wfcRunner = wfcRunner;
        this.wfcRunner.addCallback(this.wfcCallback);
    }
    resizeCanvas() {
        if (this.config.sizingMethod == _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod.CalcCanvasSize) {
            this.textField.style.height = (this.config.tilesHeight * this.config.tileScale) + "px";
            this.textField.style.width = this.config.tilesWidth * this.config.tileScale + "px";
        }
        else {
            this.textField.style.height = this.config.canvasHeight + "px";
            this.textField.style.width = this.config.canvasWidth + "px";
        }
        //TODO: Move this check to the config
        if (this.config.sizingMethod == _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod.CalcTileSize) {
            this.config.tilesHeight = Math.floor(this.config.canvasHeight / this.config.tileScale);
            this.config.tilesWidth = Math.floor(this.config.canvasWidth / this.config.tileScale);
        }
        else if (this.config.sizingMethod == _SizingMethod__WEBPACK_IMPORTED_MODULE_2__.SizingMethod.CalcTileScale) {
            this.config.tileScale = Math.max(Math.floor(this.config.canvasHeight) / this.config.tilesHeight, Math.floor(this.config.canvasWidth / this.config.tilesWidth));
        }
    }
    expand() {
        this.resizeCanvas();
        this.draw();
    }
    draw(tiles = undefined) {
        this.drawAllTiles();
    }
    drawAllTiles() {
        let result = [];
        for (let columnIndex = -this.config.offsetX; columnIndex < this.config.tilesWidth - this.config.offsetX; columnIndex++) {
            let columIndexPos = columnIndex + this.config.offsetX;
            if (result[columIndexPos] == undefined) {
                let row = [];
                result[columIndexPos] = row;
            }
            let column = this.wfc.tiles[columnIndex];
            for (let rowIndex = -this.config.offsetY; rowIndex < this.config.tilesHeight - this.config.offsetY; rowIndex++) {
                let tile = column[rowIndex];
                if (tile) {
                    if (tile.key != undefined) {
                        let tileStr = tile.key;
                        result[columIndexPos].push(tileStr);
                    }
                }
            }
        }
        let jsonStr = JSON.stringify(result, null, 2);
        this.textField.innerHTML = "<pre>" + jsonStr + "</pre>";
    }
}


/***/ }),

/***/ "./src/WFCTiles.ts":
/*!*************************!*\
  !*** ./src/WFCTiles.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WFCTiles": () => (/* binding */ WFCTiles)
/* harmony export */ });
/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Direction */ "./src/Direction.ts");
/* harmony import */ var _PieceObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PieceObject */ "./src/PieceObject.ts");
/* harmony import */ var _WFCConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WFCConfig */ "./src/WFCConfig.ts");
/* harmony import */ var _WFCData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WFCData */ "./src/WFCData.ts");




class WFCTiles {
    constructor() {
        this.wfcData = new _WFCData__WEBPACK_IMPORTED_MODULE_3__.WFCData();
        this.config = new _WFCConfig__WEBPACK_IMPORTED_MODULE_2__.WFCConfig();
        this.piecesMap = {};
        this.tiles = [];
        this.tileCounters = {};
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.imageToRGB = (image) => {
            let tempcontext = document.createElement('canvas').getContext('2d');
            tempcontext.drawImage(image, 0, 0, image.width, image.height);
            let imageData = tempcontext.getImageData(0, 0, image.width, image.height);
            let dataRGB = [];
            for (let i = 0; i < imageData.data.length; i += 4) {
                dataRGB.push({
                    r: imageData.data[i],
                    g: imageData.data[i + 1],
                    b: imageData.data[i + 2],
                });
            }
            return dataRGB;
        };
    }
    async init(config) {
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
    async loadTiles() {
        this.wfcData = new _WFCData__WEBPACK_IMPORTED_MODULE_3__.WFCData();
        this.wfcData.tilePieces = {};
        this.wfcData.tileSets = {};
        var tileNames = ["Castle", "Circles", "Circuit", "FloorPlan", "Knots", "Rooms", "Summer", "Sudoku", "Happyland", "TmwDesertSpacing"];
        for (let tileIndex in tileNames) {
            const tile = tileNames[tileIndex];
            this.wfcData.tileSets[tile] = __webpack_require__("./src/metadata/sets sync recursive ^\\.\\/.*\\.json$")("./" + tile + ".json");
        }
        await this.loadTilePieces(this.config.tileName);
    }
    async loadTilePieces(tile) {
        let tilePieces = __webpack_require__("./src/metadata/tiles sync recursive ^\\.\\/.*\\.json$")("./" + tile + ".json");
        if (Array.isArray(tilePieces)) {
            this.wfcData.tilePieces[tile] = tilePieces;
        }
        else if (typeof tilePieces === 'object' && tilePieces !== null) {
            if (tilePieces.tiles != undefined) {
                if (tilePieces.metadata != undefined) {
                    this.wfcData.tilePieces[tile] = await this.loadTilePiecesWithMetadata(tilePieces.tiles, tilePieces.metadata);
                }
                else {
                    this.wfcData.tilePieces[tile] = tilePieces.tiles;
                }
            }
        }
    }
    async loadTilePiecesWithMetadata(tiles, metadata) {
        if (metadata.socketGenerator) {
            let generator = metadata.socketGenerator;
            if (generator.type == "name") {
                let settings = generator.settings;
                let regex = new RegExp(settings.regex);
                tiles.forEach((tile) => {
                    if (settings.namingtype == "border") {
                        tile.socket = tile.name.match(regex).groups;
                    }
                    else if (settings.namingtype == "rows") {
                        let rows = tile.name.match(regex).slice(1);
                        tile.socket = {
                            "top": rows[0],
                            "bottom": rows[rows.length - 1].split("").reverse().join(""),
                            "left": rows.reduce((a, b) => b[0] + a, ""),
                            "right": rows.reduce((a, b) => a + b[b.length - 1], "")
                        };
                    }
                });
            }
            else if (generator.type == "pixelsedge" || generator.type == 'pixels') {
                let settings = generator.settings;
                let socketKeys = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let gridSize = settings.gridSize || 7;
                let maxBuckets = settings.buckets || 12;
                let debugSize = 8;
                let debugSpace = 1;
                let tileImages = __webpack_require__("./src/metadata/render sync recursive ^\\.\\/.*\\.json$")("./" + this.config.tileName + ".json");
                let tileImageMap = tileImages.reduce((tileMap, tileImage) => {
                    tileMap[tileImage.name] = tileImage.imgsrc;
                    return tileMap;
                }, {});
                let loadImagesAsync = [];
                loadImagesAsync = tiles.map(async (tile) => {
                    return {
                        name: tile.name,
                        img: await this.preloadImage('tiles/' + this.config.tileName + '/' + tileImageMap[tile.name]),
                        gridBuckets: [],
                    };
                });
                let canvasrender = document.getElementById('drawrender');
                let context = canvasrender.getContext('2d');
                let imageCache = await Promise.all(loadImagesAsync);
                let imageIndex = 0;
                let calculateAverageGridBuckets = (gridBuckets) => {
                    gridBuckets.forEach((gridBucket) => {
                        let r = 0;
                        let g = 0;
                        let b = 0;
                        let a = 0;
                        gridBucket.gridBucket.forEach((pixel) => {
                            r += pixel.r;
                            g += pixel.g;
                            b += pixel.b;
                        });
                        r /= gridBucket.gridBucket.length;
                        g /= gridBucket.gridBucket.length;
                        b /= gridBucket.gridBucket.length;
                        gridBucket.avgColor = {
                            r: r,
                            g: g,
                            b: b,
                        };
                        gridBucket.avgColorKey = [r, g, b].join("|");
                    });
                    return gridBuckets;
                };
                if (generator.type == "pixelsedge") {
                    let edgeThickness = 1;
                    //debug
                    imageCache.forEach((cachedImage) => {
                        let dataRGB = this.imageToRGB(cachedImage.img);
                        let edgeRGB = {
                            top: [],
                            bottom: [],
                            left: [],
                            right: []
                        };
                        for (var x = 0; x < cachedImage.img.width; x++) {
                            let top = [];
                            let bottom = [];
                            for (var t = 0; t < edgeThickness; t++) {
                                let topY = t;
                                let bottomY = (cachedImage.img.height - 1) - t;
                                top.push(dataRGB[topY * cachedImage.img.width + x]);
                                bottom.push(dataRGB[bottomY * cachedImage.img.width + x]);
                            }
                            edgeRGB['top'].push(top);
                            edgeRGB['bottom'].push(bottom);
                        }
                        for (var y = 0; y < cachedImage.img.height; y++) {
                            let left = [];
                            let right = [];
                            for (var t = 0; t < edgeThickness; t++) {
                                let leftX = t;
                                let rightX = (cachedImage.img.width - 1) - t;
                                left.push(dataRGB[y * cachedImage.img.width + leftX]);
                                right.push(dataRGB[y * cachedImage.img.width + rightX]);
                            }
                            edgeRGB['left'].push(left);
                            edgeRGB['right'].push(right);
                        }
                        let gridBuckets = [];
                        let pixelX = 0;
                        for (let x = 0; x < gridSize; x++) {
                            let innerGridWidth = Math.floor(cachedImage.img.width / gridSize);
                            if (x != 0 && x != (gridSize - 1)) {
                                innerGridWidth = Math.ceil(cachedImage.img.width / gridSize);
                            }
                            let gridBucketTop = [];
                            let gridBucketBottom = [];
                            for (let x2 = 0; x2 < innerGridWidth; x2++) {
                                for (let t = 0; t < edgeThickness; t++) {
                                    let top = edgeRGB['top'][pixelX][t];
                                    let bottom = edgeRGB['bottom'][pixelX][t];
                                    gridBucketTop.push({
                                        position: pixelX,
                                        layer: t,
                                        edge: 'top',
                                        r: top.r,
                                        g: top.g,
                                        b: top.b,
                                    });
                                    gridBucketBottom.push({
                                        position: pixelX,
                                        layer: t,
                                        edge: 'bottom',
                                        r: bottom.r,
                                        g: bottom.g,
                                        b: bottom.b,
                                    });
                                    context.fillStyle = "rgb(" + top.r + ", " + top.g + ", " + top.b + ")";
                                    context.fillRect((0 + pixelX * debugSize) + (debugSpace * x) + (imageIndex * cachedImage.img.width * debugSize) + (imageIndex * (debugSpace + 1)), (200 + 0 * debugSize) + (debugSpace * 0) + (t * debugSize), debugSize, debugSize);
                                    context.fillStyle = "rgb(" + bottom.r + ", " + bottom.g + ", " + bottom.b + ")";
                                    context.fillRect((0 + pixelX * debugSize) + (debugSpace * x) + (imageIndex * cachedImage.img.width * debugSize) + (imageIndex * (debugSpace + 1)), (200 + cachedImage.img.height * debugSize) + (debugSpace * 0) - (t * debugSize), debugSize, debugSize);
                                }
                                pixelX++;
                            }
                            gridBuckets.push({
                                position: x,
                                edge: 'top',
                                gridBucket: gridBucketTop,
                                avgColor: {
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                },
                                avgColorKey: ""
                            });
                            gridBuckets.push({
                                position: x,
                                edge: 'bottom',
                                gridBucket: gridBucketBottom,
                                avgColor: {
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                },
                                avgColorKey: ""
                            });
                        }
                        let pixelY = 0;
                        pixelX--;
                        for (let y = 0; y < gridSize; y++) {
                            let innerGridHeight = Math.floor(cachedImage.img.height / gridSize);
                            if (y != 0 && y != (gridSize - 1)) {
                                innerGridHeight = Math.ceil(cachedImage.img.height / gridSize);
                            }
                            let gridBucketLeft = [];
                            let gridBucketRight = [];
                            for (let y2 = 0; y2 < innerGridHeight; y2++) {
                                for (let t = 0; t < edgeThickness; t++) {
                                    let left = edgeRGB['left'][pixelY][t];
                                    let right = edgeRGB['right'][pixelY][t];
                                    gridBucketLeft.push({
                                        position: pixelY,
                                        edge: 'left',
                                        layer: t,
                                        r: left.r,
                                        g: left.g,
                                        b: left.b,
                                    });
                                    gridBucketRight.push({
                                        position: pixelY,
                                        edge: 'right',
                                        layer: t,
                                        r: right.r,
                                        g: right.g,
                                        b: right.b,
                                    });
                                    context.fillStyle = "rgb(" + left.r + ", " + left.g + ", " + left.b + ")";
                                    context.fillRect((0 + 0 * debugSize) + (debugSpace * 0) + (imageIndex * cachedImage.img.width * debugSize) + (imageIndex * (debugSpace + 1)) + (t * debugSize), (200 + pixelY * debugSize) + (debugSpace * pixelY), debugSize, debugSize);
                                    context.fillStyle = "rgb(" + right.r + ", " + right.g + ", " + right.b + ")";
                                    context.fillRect((0 + pixelX * debugSize) + (debugSpace * x) + (imageIndex * cachedImage.img.width * debugSize) + (imageIndex * (debugSpace + 1)) - (t * debugSize), (200 + pixelY * debugSize) + (debugSpace * pixelY), debugSize, debugSize);
                                }
                                pixelY++;
                            }
                            gridBuckets.push({
                                position: y,
                                edge: 'left',
                                gridBucket: gridBucketLeft,
                                avgColor: {
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                },
                                avgColorKey: ""
                            });
                            gridBuckets.push({
                                position: y,
                                edge: 'right',
                                gridBucket: gridBucketRight,
                                avgColor: {
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                },
                                avgColorKey: ""
                            });
                        }
                        imageIndex++;
                        cachedImage.gridBuckets = calculateAverageGridBuckets(gridBuckets);
                    });
                    let colorKeyLookupToSocket = this.getColorKeyLookupToSocket(imageCache, maxBuckets, socketKeys, context);
                    let namedEdges = {};
                    imageCache.forEach((cachedImage) => {
                        let rows = [];
                        cachedImage.gridBuckets.forEach((bucket) => {
                            if (rows[bucket.edge] == undefined) {
                                rows[bucket.edge] = [];
                            }
                            rows[bucket.edge][bucket.position] = colorKeyLookupToSocket[bucket.avgColorKey];
                        });
                        namedEdges[cachedImage.name] = rows;
                    });
                    tiles.forEach((tile) => {
                        if (namedEdges[tile.name] == undefined) {
                            return;
                        }
                        let edges = namedEdges[tile.name];
                        tile.socket = {
                            "top": edges['top'].join(""),
                            "bottom": [...edges['bottom']].reverse().join(""),
                            "left": [...edges['left']].reverse().join(""),
                            "right": edges['right'].join("")
                        };
                    });
                }
                else if (generator.type == "pixels") {
                    imageCache.forEach((cachedImage) => {
                        let dataRGB = this.imageToRGB(cachedImage.img);
                        let gridBuckets = [];
                        let pixelY = 0;
                        for (let y = 0; y < gridSize; y++) {
                            let innerGridHeight = Math.floor(cachedImage.img.height / gridSize);
                            if (y != 0 && y != (gridSize - 1)) {
                                innerGridHeight = Math.ceil(cachedImage.img.height / gridSize);
                            }
                            let pixelX = 0;
                            let storedPixelY = pixelY;
                            for (let x = 0; x < gridSize; x++) {
                                let innerGridWidth = Math.floor(cachedImage.img.width / gridSize);
                                if (x != 0 && x != (gridSize - 1)) {
                                    innerGridWidth = Math.ceil(cachedImage.img.width / gridSize);
                                }
                                let gridBucket = [];
                                let storedPixelX = pixelX;
                                pixelY = storedPixelY;
                                for (let y2 = 0; y2 < innerGridHeight; y2++) {
                                    pixelX = storedPixelX;
                                    for (let x2 = 0; x2 < innerGridWidth; x2++) {
                                        gridBucket.push({
                                            x: pixelX,
                                            y: pixelY,
                                            r: dataRGB[pixelX + pixelY * cachedImage.img.width].r,
                                            g: dataRGB[pixelX + pixelY * cachedImage.img.width].g,
                                            b: dataRGB[pixelX + pixelY * cachedImage.img.width].b,
                                        });
                                        //debug
                                        context.fillStyle = "rgb(" + dataRGB[pixelX + pixelY * cachedImage.img.width].r + ", " + dataRGB[pixelX + pixelY * cachedImage.img.width].g + ", " + dataRGB[pixelX + pixelY * cachedImage.img.width].b + ")";
                                        context.fillRect((0 + pixelX * debugSize) + (debugSpace * x) + (imageIndex * cachedImage.img.width * debugSize) + (imageIndex * (debugSpace + 1)), (200 + pixelY * debugSize) + (debugSpace * y), debugSize, debugSize);
                                        pixelX++;
                                    }
                                    pixelY++;
                                }
                                gridBuckets.push({
                                    x: x,
                                    y: y,
                                    gridBucket,
                                    avgColor: {
                                        r: 0,
                                        g: 0,
                                        b: 0,
                                    },
                                    avgColorKey: ""
                                });
                            }
                        }
                        imageIndex++;
                        cachedImage.gridBuckets = calculateAverageGridBuckets(gridBuckets);
                    });
                    let colorKeyLookupToSocket = this.getColorKeyLookupToSocket(imageCache, maxBuckets, socketKeys, context);
                    let namedRows = {};
                    imageCache.forEach((cachedImage) => {
                        let rows = [];
                        cachedImage.gridBuckets.forEach((bucket) => {
                            if (rows[bucket.y] == undefined) {
                                rows[bucket.y] = [];
                            }
                            rows[bucket.y][bucket.x] = colorKeyLookupToSocket[bucket.avgColorKey];
                        });
                        namedRows[cachedImage.name] = rows;
                    });
                    tiles.forEach((tile) => {
                        if (namedRows[tile.name] == undefined) {
                            return;
                        }
                        let rows = namedRows[tile.name];
                        tile.socket = {
                            "top": rows[0].join(""),
                            "bottom": [...rows[rows.length - 1]].reverse().join(""),
                            "left": rows.reduce((a, b) => b[0] + a, ""),
                            "right": rows.reduce((a, b) => a + b[b.length - 1], "")
                        };
                    });
                }
            }
        }
        return tiles;
    }
    getColorKeyLookupToSocket(imageCache, maxBuckets, socketKeys, debugContext) {
        let colorBucketToSocket = [];
        let maxDistanceIndexes = [];
        let avgColorsKeys = imageCache.map(cache => cache.gridBuckets.map((gridBucket) => gridBucket.avgColorKey)).flat();
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
            };
        });
        let uniqueAvgColorsHsv = uniqueAvgColors.map((color) => {
            return {
                hsv: this.rgb2hsv(color),
                rgbKey: color.key
            };
        });
        let distancesLookup = [];
        for (let color1index = 0; color1index < uniqueAvgColors.length; color1index++) {
            for (let color2index = color1index + 1; color2index < uniqueAvgColors.length; color2index++) {
                if (color1index == color2index)
                    continue;
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
        let lookupDistance = (color1index, color2index) => {
            if (color1index == color2index)
                return 0;
            if (color1index < color2index) {
                return distancesLookup[color1index][color2index].distance;
            }
            else {
                return distancesLookup[color2index][color1index].distance;
            }
        };
        maxBuckets = Math.min(maxBuckets, uniqueAvgColors.length);
        if (maxBuckets == 1) {
            colorBucketToSocket.push([0]);
            maxDistanceIndexes.push(0);
        }
        if (maxBuckets > 1) {
            let maxPair = [...distancesLookup.flat()]
                .sort((a, b) => a.distance - b.distance)
                .slice(-1)[0];
            colorBucketToSocket.push([maxPair.color1index]);
            colorBucketToSocket.push([maxPair.color2index]);
            maxDistanceIndexes.push(maxPair.color1index);
            maxDistanceIndexes.push(maxPair.color2index);
            for (var loop = 3; loop <= maxBuckets; loop++) {
                let maxDistanceCompare = 0;
                let maxDistanceNewIndex = -1;
                for (let i = 0; i < uniqueAvgColors.length; i++) {
                    if (maxDistanceIndexes.includes(i))
                        continue;
                    let newDistance = Math.sqrt(maxDistanceIndexes.reduce((sum, index) => sum += Math.pow(lookupDistance(index, i), 2), 0));
                    if (newDistance > maxDistanceCompare) {
                        maxDistanceCompare = newDistance;
                        maxDistanceNewIndex = i;
                    }
                }
                maxDistanceIndexes.push(maxDistanceNewIndex);
                colorBucketToSocket.push([maxDistanceNewIndex]);
            }
        }
        for (let i = 0; i < uniqueAvgColors.length; i++) {
            if (maxDistanceIndexes.includes(i))
                continue;
            let arr = [];
            for (var j = 0; j < maxDistanceIndexes.length; j++) {
                arr.push({
                    "index": j,
                    "distance": lookupDistance(maxDistanceIndexes[j], i)
                });
            }
            let sorted = arr.sort((a, b) => a.distance - b.distance);
            colorBucketToSocket[sorted[0].index].push(i);
        }
        // debug avgColors
        for (let i = 0; i < uniqueAvgColors.length; i++) {
            let color = uniqueAvgColors[i];
            debugContext.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
            debugContext.fillRect(20 * i, 0, 20, 20);
        }
        //debug buckets
        colorBucketToSocket.forEach((bucket, bucketIndex) => {
            bucket.forEach((index, i) => {
                let color = uniqueAvgColors[index];
                debugContext.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
                debugContext.fillRect(20 * i, (30 * bucketIndex) + 30, 20, 20);
            });
        });
        let colorKeyLookupToSocket = {};
        for (var i = 0; i < colorBucketToSocket.length; i++) {
            let colorBucket = colorBucketToSocket[i];
            for (let j = 0; j < colorBucket.length; j++) {
                let colorIndex = colorBucket[j];
                let color = uniqueAvgColors[colorIndex];
                colorKeyLookupToSocket[color.key] = socketKeys[i];
            }
        }
        return colorKeyLookupToSocket;
    }
    ;
    hsvdistance(color1hsv, color2hsv) {
        let hbias = 4.0;
        let sbias = 4.0;
        let vbias = 1;
        //let hbias = 7.0;
        //let sbias = 1.0;
        //let vbias = 1;
        let hdiff = Math.min(Math.abs(color1hsv.h - color2hsv.h), Math.abs(color1hsv.h - color2hsv.h + (color1hsv.h < color2hsv.h ? -360.0 : 360.0))); // * 1.2;
        let sdiff = Math.abs(color1hsv.s - color2hsv.s);
        let vdiff = Math.abs(color1hsv.v - color2hsv.v);
        let distance = Math.sqrt(Math.pow(hdiff * hbias, 2) + Math.pow(sdiff * sbias, 2) + Math.pow(vdiff * vbias, 2));
        return distance;
    }
    rgb2hsv(c) {
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff;
        rabs = c.r / 255;
        gabs = c.g / 255;
        babs = c.b / 255;
        h = 0;
        v = Math.max(rabs, gabs, babs),
            diff = v - Math.min(rabs, gabs, babs);
        let diffc = (c) => (v - c) / 6 / diff + 1 / 2;
        let percentRoundFn = (num) => Math.round(num * 100) / 100;
        if (diff == 0) {
            h = s = 0;
        }
        else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);
            if (rabs === v) {
                h = bb - gg;
            }
            else if (gabs === v) {
                h = (1 / 3) + rr - bb;
            }
            else if (babs === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            }
            else if (h > 1) {
                h -= 1;
            }
        }
        return {
            h: Math.round(h * 360),
            s: percentRoundFn(s * 100),
            v: percentRoundFn(v * 100)
        };
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
    mapSetConfigToPieces(set, pieces) {
        Object.entries(set).forEach((value) => {
            let pieceName = value[0];
            let properties = value[1];
            let piece = pieces.find(x => x.name == pieceName);
            if (properties.rotations != undefined) {
                piece.rotations = properties.rotations;
            }
            if (properties.weight != undefined) {
                piece.weight = properties.weight;
            }
            if (properties.edgeblacklist != undefined) {
                piece.edgeblacklist = properties.edgeblacklist;
            }
            if (properties.minimum != undefined) {
                piece.minimum = properties.minimum;
            }
            if (properties.maximum != undefined) {
                piece.maximum = properties.maximum;
            }
        });
    }
    mapPieces(pieces, set) {
        return pieces.reduce((piecesMap, piece) => {
            if (set[piece.name] == undefined) {
                return piecesMap;
            }
            let pieceSockets = piece.socket;
            piece.socketmatching = {};
            piece.blacklistedNeighbors = {};
            this.tileCounters[piece.name] = { minimum: piece.minimum, maximum: piece.maximum, count: 0 };
            piece.rotations.forEach((rotation) => {
                let socketMatchObject = {};
                let blacklistedNeighbors = {};
                let innerRotation = rotation;
                //TODO: Fix grid fixes and innerRotation
                if (rotation == 2) {
                    innerRotation = 3;
                }
                else if (rotation == 3) {
                    innerRotation = 5;
                }
                Object.keys(_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction).forEach((direction, index) => {
                    if (!isNaN(Number(direction)))
                        return;
                    if (direction == 'grid')
                        return;
                    if (direction == 'grid2')
                        return;
                    let directionsCount = (Object.keys(_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction).length / 2);
                    let directionIndex = _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[direction];
                    let rotationMoved = (directionIndex - innerRotation + directionsCount) % directionsCount;
                    if ((_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved] == 'grid' || _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved] == 'grid2') && innerRotation == 1) {
                        rotationMoved = (rotationMoved - 1 + directionsCount) % directionsCount;
                    }
                    else if ((_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved] == 'grid' || _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved] == 'grid2') && innerRotation == 5) {
                        rotationMoved = (rotationMoved + 1 + directionsCount) % directionsCount;
                    }
                    let flipped = directionIndex >= (directionsCount / 2);
                    let sockets = pieceSockets[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved]];
                    (Array.isArray(sockets) ? sockets : [sockets]).forEach((socket) => {
                        (socketMatchObject[direction] || (socketMatchObject[direction] = [])).push(flipped ? socket.split("").reverse().join("") : socket);
                    });
                });
                if (this.config.gridSize > 0) {
                    var gridSockets = pieceSockets[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction.grid]];
                    var gridSockets2 = pieceSockets[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction.grid2]];
                    socketMatchObject[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction.grid]] = Array.isArray(gridSockets) ? gridSockets : [gridSockets];
                    socketMatchObject[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction.grid2]] = Array.isArray(gridSockets2) ? gridSockets2 : [gridSockets2];
                }
                if (piece.blacklist) {
                    Object.entries(piece.blacklist).forEach((blacklist) => {
                        let blackListDirection = blacklist[0];
                        let blackListValue = blacklist[1];
                        let blackListIndex = _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[blackListDirection];
                        let directionsCount = (Object.keys(_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction).length / 2);
                        let rotationBlacklistingIndex = (blackListIndex + rotation) % directionsCount; // Fix rotation pointing at innerRotation instead?
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
    }
    mapSocketBuckets(mappedPieces) {
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
        return socketBuckets;
    }
    mapPiecesMap(mappedPieces, set, socketBuckets) {
        return Object.entries(mappedPieces).reduce((piecesMap, piecePair) => {
            //TODO: Fix grid fixes and innerRotation
            let piece = piecePair[1];
            if (set[piece.name] == undefined) {
                return piecesMap;
            }
            if (piece.rotations == undefined) {
                piece.rotations = [0];
            }
            piece.rotations.forEach((rotation) => {
                var _a, _b;
                let innerRotation = rotation;
                if (rotation == 2) {
                    innerRotation = 3;
                }
                else if (rotation == 3) {
                    innerRotation = 5;
                }
                let pieceName = piece.name + "_" + rotation;
                let validNeighbors = {
                    top: [],
                    right: [],
                    bottom: [],
                    left: [],
                    grid: [],
                    grid2: []
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
                let edgeBlackList = null;
                if (piece.edgeblacklist) {
                    edgeBlackList = piece.edgeblacklist.map((direction) => {
                        //TODO: Fix grid fixes and innerRotation
                        let dir = _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[direction];
                        if (direction == 'grid')
                            return;
                        if (direction == 'grid2')
                            return;
                        let directionsCount = (Object.keys(_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction).length / 2);
                        let rotationMoved = (dir + innerRotation) % directionsCount;
                        if ((_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved] == 'grid' || _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved] == 'grid2') && innerRotation == 1) {
                            rotationMoved = (rotationMoved + 1) % directionsCount;
                        }
                        else if ((_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved] == 'grid' || _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved] == 'grid2') && innerRotation == 5) {
                            rotationMoved = (rotationMoved - 1) % directionsCount;
                        }
                        return _Direction__WEBPACK_IMPORTED_MODULE_0__.Direction[rotationMoved];
                    });
                }
                piecesMap[pieceName] = new _PieceObject__WEBPACK_IMPORTED_MODULE_1__.PieceObject(piece.name + "_" + rotation, piece.name, rotation, validNeighbors, edgeBlackList, weight, piece.socketmatching[rotation], piece.minimum, piece.maximum);
            });
            return piecesMap;
        }, {});
    }
    async initTileData() {
        let pieces = this.wfcData.tilePieces[this.config.tileName];
        let sets = this.wfcData.tileSets[this.config.tileName];
        let currentSet = sets[this.config.set];
        this.mapSetConfigToPieces(currentSet, pieces);
        let mappedPieces = this.mapPieces(pieces, currentSet);
        let socketBuckets = this.mapSocketBuckets(mappedPieces);
        this.piecesMap = this.mapPiecesMap(mappedPieces, currentSet, socketBuckets);
        return true;
    }
    reset() {
        //this.tileCounters = {};
        let piecesKeys = Object.keys(this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };
        let useEdgeSocket = false;
        let edgeSockets = {};
        if (this.config.edgeSocket != '') {
            useEdgeSocket = true;
            edgeSockets = {
                "top": this.config.edgeSocket,
                "left": this.config.edgeSocket.split("").reverse().join(""),
                "bottom": this.config.edgeSocket,
                "right": this.config.edgeSocket.split("").reverse().join("")
            };
        }
        this.tiles = [];
        for (let x = this.minX; x < this.maxX; x++) {
            if (this.tiles[x] == undefined) {
                this.tiles[x] = this.startingRow(x, startingTile, useEdgeSocket, edgeSockets);
            }
        }
        //console.log('this.tiles', this.tiles);
        Object.entries(this.tileCounters).forEach((value) => {
            let numbers = value[1];
            numbers.count = 0;
        });
    }
    startingCell(x, y, startingTile, useEdgeSocket, edgeSockets) {
        var edges = [];
        if (x == this.minX)
            edges.push('left');
        if (y == this.minY)
            edges.push('top');
        if (x == this.maxX - 1)
            edges.push('right');
        if (y == this.maxY - 1)
            edges.push('bottom');
        if (edges.length > 0) {
            let validPieces = startingTile.validPieces.filter((pieceName) => {
                let piece = this.piecesMap[pieceName];
                let allow = true;
                if (useEdgeSocket) {
                    allow = edges.every(edge => piece.sockets[edge].includes(edgeSockets[edge]));
                }
                if (piece.edgeblacklist) {
                    return !edges.some(v => piece.edgeblacklist.includes(v)) && allow;
                }
                else {
                    return  true && allow;
                }
            });
            return {
                position: { x: x, y: y },
                validPieces: validPieces
            };
        }
        else {
            return {
                position: { x: x, y: y },
                validPieces: [...startingTile.validPieces]
            };
        }
    }
    startingRow(x, startingTile, useEdgeSocket, edgeSockets) {
        let row = [];
        for (let y = this.minY; y < this.maxY; y++) {
            if (row[y] == undefined) {
                row[y] = this.startingCell(x, y, startingTile, useEdgeSocket, edgeSockets);
            }
        }
        return row;
    }
    expand() {
        this.minX = -this.config.offsetX || 0;
        this.minY = -this.config.offsetY || 0;
        this.maxX = this.config.tilesWidth - (this.config.offsetX || 0);
        this.maxY = this.config.tilesHeight - (this.config.offsetY || 0);
        let piecesKeys = Object.keys(this.piecesMap);
        let startingTile = {
            validPieces: piecesKeys,
        };
        let useEdgeSocket = false;
        let edgeSockets = {};
        if (this.config.edgeSocket != '') {
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
        let newCells = [];
        for (let x = this.minX; x < this.maxX; x++) {
            if (this.tiles[x] == undefined) {
                //Entire row is undefined
                this.tiles[x] = this.startingRow(x, startingTile, useEdgeSocket, edgeSockets);
                Object.keys(this.tiles[x]).forEach((yKey) => {
                    let y = parseInt(yKey);
                    newCells.push({
                        x: x,
                        y: y,
                        tile: this.tiles[x][y]
                    });
                });
            }
            else {
                for (let y = this.minY; y < this.maxY; y++) {
                    if (this.tiles[x][y] == undefined) {
                        //Cell is undefined
                        this.tiles[x][y] = this.startingCell(x, y, startingTile, useEdgeSocket, edgeSockets);
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
	"./Happyland.json": "./src/metadata/render/Happyland.json",
	"./Knots.json": "./src/metadata/render/Knots.json",
	"./Rooms.json": "./src/metadata/render/Rooms.json",
	"./Sudoku.json": "./src/metadata/render/Sudoku.json",
	"./Summer.json": "./src/metadata/render/Summer.json",
	"./TmwDesertSpacing.json": "./src/metadata/render/TmwDesertSpacing.json"
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
	"./Happyland.json": "./src/metadata/sets/Happyland.json",
	"./Knots.json": "./src/metadata/sets/Knots.json",
	"./Rooms.json": "./src/metadata/sets/Rooms.json",
	"./Sudoku.json": "./src/metadata/sets/Sudoku.json",
	"./Summer.json": "./src/metadata/sets/Summer.json",
	"./TmwDesertSpacing.json": "./src/metadata/sets/TmwDesertSpacing.json"
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
	"./Happyland.json": "./src/metadata/tiles/Happyland.json",
	"./Knots.json": "./src/metadata/tiles/Knots.json",
	"./Rooms.json": "./src/metadata/tiles/Rooms.json",
	"./Sudoku.json": "./src/metadata/tiles/Sudoku.json",
	"./Summer.json": "./src/metadata/tiles/Summer.json",
	"./TmwDesertSpacing.json": "./src/metadata/tiles/TmwDesertSpacing.json"
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
module.exports = JSON.parse('[{"name":"bridge","imgsrc":"bridge.png","color":"orange"},{"name":"ground","imgsrc":"ground.png","color":"green"},{"name":"river","imgsrc":"river.png","color":"blue"},{"name":"riverturn","imgsrc":"riverturn.png","color":"blue"},{"name":"road","imgsrc":"road.png","color":"lightgreen"},{"name":"roadturn","imgsrc":"roadturn.png","color":"lightgreen"},{"name":"t","imgsrc":"t.png","color":"lightgreen"},{"name":"tower","imgsrc":"tower.png","color":"darkgrey"},{"name":"wall","imgsrc":"wall.png","color":"lightgrey"},{"name":"wallriver","imgsrc":"wallriver.png","color":"lightgrey"},{"name":"wallroad","imgsrc":"wallroad.png","color":"lightgrey"}]');

/***/ }),

/***/ "./src/metadata/render/Circles.json":
/*!******************************************!*\
  !*** ./src/metadata/render/Circles.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"b_half","imgsrc":"b_half.png","color":"white"},{"name":"b_i","imgsrc":"b_i.png","color":"black"},{"name":"b_quarter","imgsrc":"b_quarter.png","color":"grey"},{"name":"b","imgsrc":"b.png","color":"black"},{"name":"w_half","imgsrc":"w_half.png","color":"white"},{"name":"w_i","imgsrc":"w_i.png","color":"white"},{"name":"w_quarter","imgsrc":"w_quarter.png","color":"lightgrey"},{"name":"w","imgsrc":"w.png","color":"white"}]');

/***/ }),

/***/ "./src/metadata/render/Circuit.json":
/*!******************************************!*\
  !*** ./src/metadata/render/Circuit.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bridge","imgsrc":"bridge.png","color":"lightgrey"},{"name":"connection","imgsrc":"connection.png","color":"grey"},{"name":"dskew","imgsrc":"dskew.png","color":"lightgreen"},{"name":"skew","imgsrc":"skew.png","color":"lightgreen"},{"name":"substrate","imgsrc":"substrate.png","color":"darkgreen"},{"name":"t","imgsrc":"t.png","color":"lightgreen"},{"name":"track","imgsrc":"track.png","color":"lightgreen"},{"name":"transition","imgsrc":"transition.png","color":"lightgrey"},{"name":"turn","imgsrc":"turn.png","color":"lightgreen"},{"name":"viad","imgsrc":"viad.png","color":"darkgrey"},{"name":"vias","imgsrc":"vias.png","color":"darkgrey"},{"name":"wire","imgsrc":"wire.png","color":"lightgray"},{"name":"component","imgsrc":"component.png","color":"black"},{"name":"corner","imgsrc":"corner.png","color":"darkgreen"}]');

/***/ }),

/***/ "./src/metadata/render/FloorPlan.json":
/*!********************************************!*\
  !*** ./src/metadata/render/FloorPlan.json ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"div","imgsrc":"div.png","color":"grey"},{"name":"divt","imgsrc":"divt.png","color":"grey"},{"name":"divturn","imgsrc":"divturn.png","color":"grey"},{"name":"door","imgsrc":"door.png","color":"grey"},{"name":"empty","imgsrc":"empty.png","color":"white"},{"name":"floor","imgsrc":"floor.png","color":"lightgrey"},{"name":"glass","imgsrc":"glass.png","color":"#373737"},{"name":"halfglass","imgsrc":"halfglass.png","color":"#373737"},{"name":"halfglass2","imgsrc":"halfglass2.png","color":"#373737"},{"name":"in","imgsrc":"in.png","color":"black"},{"name":"out","imgsrc":"out.png","color":"black"},{"name":"stairs","imgsrc":"stairs.png","color":"blue"},{"name":"table","imgsrc":"table.png","color":"lightblue"},{"name":"vent","imgsrc":"vent.png","color":"cyan"},{"name":"w","imgsrc":"w.png","color":"black"},{"name":"wall","imgsrc":"wall.png","color":"black"},{"name":"walldiv","imgsrc":"walldiv.png","color":"black"},{"name":"window","imgsrc":"window.png","color":"#373737"}]');

/***/ }),

/***/ "./src/metadata/render/Happyland.json":
/*!********************************************!*\
  !*** ./src/metadata/render/Happyland.json ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"set2_000_000_000_000","imgsrc":"set2/0.png"},{"name":"set2_000_000_001_100","imgsrc":"set2/0-0-001-100.png"},{"name":"set2_000_001_111_100","imgsrc":"set2/0-001-1-100.png"},{"name":"set2_000_001_100_000","imgsrc":"set2/0-001-100-0.png"},{"name":"set2_001_111_111_100","imgsrc":"set2/001-1-1-100.png"},{"name":"set2_001_111_100_000","imgsrc":"set2/001-1-100-0.png"},{"name":"set2_001_100_000_000","imgsrc":"set2/001-100-0-0.png"},{"name":"set2_001_100_001_100","imgsrc":"set2/001-100-001-100.png"},{"name":"set2_111_111_111_111","imgsrc":"set2/1.png"},{"name":"set2_111_111_100_001","imgsrc":"set2/1-1-100-001.png"},{"name":"set2_111_100_000_001","imgsrc":"set2/1-100-0-001.png"},{"name":"set2_111_100_001_111","imgsrc":"set2/1-100-001-1.png"},{"name":"set2_100_000_000_001","imgsrc":"set2/100-0-0-001.png"},{"name":"set2_100_000_001_111","imgsrc":"set2/100-0-001-1.png"},{"name":"set2_100_001_111_111","imgsrc":"set2/100-001-1-1.png"},{"name":"set2_100_001_100_001","imgsrc":"set2/100-001-100-001.png"},{"name":"set3_000_000_000_000","imgsrc":"set3/000_000_000_000.png"},{"name":"set3_000_000_001_100","imgsrc":"set3/000_000_001_100.png"},{"name":"set3_000_000_022_220","imgsrc":"set3/000_000_022_220.png"},{"name":"set3_000_001_100_000","imgsrc":"set3/000_001_100_000.png"},{"name":"set3_000_001_111_100","imgsrc":"set3/000_001_111_100.png"},{"name":"set3_000_021_122_220","imgsrc":"set3/000_021_122_220.png"},{"name":"set3_000_022_220_000","imgsrc":"set3/000_022_220_000.png"},{"name":"set3_000_022_221_120","imgsrc":"set3/000_022_221_120.png"},{"name":"set3_000_022_222_220","imgsrc":"set3/000_022_222_220.png"},{"name":"set3_001_100_000_000","imgsrc":"set3/001_100_000_000.png"},{"name":"set3_001_100_001_100","imgsrc":"set3/001_100_001_100.png"},{"name":"set3_001_111_100_000","imgsrc":"set3/001_111_100_000.png"},{"name":"set3_001_111_111_100","imgsrc":"set3/001_111_111_100.png"},{"name":"set3_021_111_122_220","imgsrc":"set3/021_111_122_220.png"},{"name":"set3_021_120_022_220","imgsrc":"set3/021_120_022_220.png"},{"name":"set3_021_122_220_000","imgsrc":"set3/021_122_220_000.png"},{"name":"set3_021_122_221_120","imgsrc":"set3/021_122_221_120.png"},{"name":"set3_021_122_222_220","imgsrc":"set3/021_122_222_220.png"},{"name":"set3_022_220_000_000","imgsrc":"set3/022_220_000_000.png"},{"name":"set3_022_220_021_120","imgsrc":"set3/022_220_021_120.png"},{"name":"set3_022_220_022_220","imgsrc":"set3/022_220_022_220.png"},{"name":"set3_022_221_111_120","imgsrc":"set3/022_221_111_120.png"},{"name":"set3_022_221_120_000","imgsrc":"set3/022_221_120_000.png"},{"name":"set3_022_221_122_220","imgsrc":"set3/022_221_122_220.png"},{"name":"set3_022_222_220_000","imgsrc":"set3/022_222_220_000.png"},{"name":"set3_022_222_221_120","imgsrc":"set3/022_222_221_120.png"},{"name":"set3_022_222_222_220","imgsrc":"set3/022_222_222_220.png"},{"name":"set3_100_000_000_001","imgsrc":"set3/100_000_000_001.png"},{"name":"set3_100_000_001_111","imgsrc":"set3/100_000_001_111.png"},{"name":"set3_100_001_100_001","imgsrc":"set3/100_001_100_001.png"},{"name":"set3_100_001_111_111","imgsrc":"set3/100_001_111_111.png"},{"name":"set3_111_100_000_001","imgsrc":"set3/111_100_000_001.png"},{"name":"set3_111_100_001_111","imgsrc":"set3/111_100_001_111.png"},{"name":"set3_111_111_100_001","imgsrc":"set3/111_111_100_001.png"},{"name":"set3_111_111_111_111","imgsrc":"set3/111_111_111_111.png"},{"name":"set3_111_111_122_221","imgsrc":"set3/111_111_122_221.png"},{"name":"set3_111_120_022_221","imgsrc":"set3/111_120_022_221.png"},{"name":"set3_111_122_220_021","imgsrc":"set3/111_122_220_021.png"},{"name":"set3_111_122_221_111","imgsrc":"set3/111_122_221_111.png"},{"name":"set3_111_122_222_221","imgsrc":"set3/111_122_222_221.png"},{"name":"set3_120_000_022_221","imgsrc":"set3/120_000_022_221.png"},{"name":"set3_120_021_122_221","imgsrc":"set3/120_021_122_221.png"},{"name":"set3_120_022_220_021","imgsrc":"set3/120_022_220_021.png"},{"name":"set3_120_022_221_111","imgsrc":"set3/120_022_221_111.png"},{"name":"set3_120_022_222_221","imgsrc":"set3/120_022_222_221.png"},{"name":"set3_122_220_000_021","imgsrc":"set3/122_220_000_021.png"},{"name":"set3_122_220_021_111","imgsrc":"set3/122_220_021_111.png"},{"name":"set3_122_220_022_221","imgsrc":"set3/122_220_022_221.png"},{"name":"set3_122_221_111_111","imgsrc":"set3/122_221_111_111.png"},{"name":"set3_122_221_120_021","imgsrc":"set3/122_221_120_021.png"},{"name":"set3_122_221_122_221","imgsrc":"set3/122_221_122_221.png"},{"name":"set3_122_222_220_021","imgsrc":"set3/122_222_220_021.png"},{"name":"set3_122_222_221_111","imgsrc":"set3/122_222_221_111.png"},{"name":"set3_122_222_222_221","imgsrc":"set3/122_222_222_221.png"},{"name":"set3_220_000_000_022","imgsrc":"set3/220_000_000_022.png"},{"name":"set3_220_000_021_122","imgsrc":"set3/220_000_021_122.png"},{"name":"set3_220_000_022_222","imgsrc":"set3/220_000_022_222.png"},{"name":"set3_220_021_111_122","imgsrc":"set3/220_021_111_122.png"},{"name":"set3_220_021_122_222","imgsrc":"set3/220_021_122_222.png"},{"name":"set3_220_022_220_022","imgsrc":"set3/220_022_220_022.png"},{"name":"set3_220_022_221_122","imgsrc":"set3/220_022_221_122.png"},{"name":"set3_220_022_222_222","imgsrc":"set3/220_022_222_222.png"},{"name":"set3_221_111_100_022","imgsrc":"set3/221_111_100_022.png"},{"name":"set3_221_111_111_122","imgsrc":"set3/221_111_111_122.png"},{"name":"set3_221_111_122_222","imgsrc":"set3/221_111_122_222.png"},{"name":"set3_221_120_000_022","imgsrc":"set3/221_120_000_022.png"},{"name":"set3_221_120_021_122","imgsrc":"set3/221_120_021_122.png"},{"name":"set3_221_120_022_222","imgsrc":"set3/221_120_022_222.png"},{"name":"set3_221_122_220_022","imgsrc":"set3/221_122_220_022.png"},{"name":"set3_221_122_221_122","imgsrc":"set3/221_122_221_122.png"},{"name":"set3_221_122_222_222","imgsrc":"set3/221_122_222_222.png"},{"name":"set3_222_220_000_022","imgsrc":"set3/222_220_000_022.png"},{"name":"set3_222_220_021_122","imgsrc":"set3/222_220_021_122.png"},{"name":"set3_222_220_022_222","imgsrc":"set3/222_220_022_222.png"},{"name":"set3_222_221_111_122","imgsrc":"set3/222_221_111_122.png"},{"name":"set3_222_221_120_022","imgsrc":"set3/222_221_120_022.png"},{"name":"set3_222_221_122_222","imgsrc":"set3/222_221_122_222.png"},{"name":"set3_222_222_220_022","imgsrc":"set3/222_222_220_022.png"},{"name":"set3_222_222_221_122","imgsrc":"set3/222_222_221_122.png"},{"name":"set3_222_222_222_222","imgsrc":"set3/222_222_222_222.png"}]');

/***/ }),

/***/ "./src/metadata/render/Knots.json":
/*!****************************************!*\
  !*** ./src/metadata/render/Knots.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"corner","imgsrc":"corner.png","color":"#c0ffc0"},{"name":"cross","imgsrc":"cross.png","color":"#00ff00"},{"name":"empty","imgsrc":"empty.png","color":"#c0c0c0"},{"name":"line","imgsrc":"line.png","color":"#51ff51"},{"name":"t","imgsrc":"t.png","color":"#c0e6c0"}]');

/***/ }),

/***/ "./src/metadata/render/Rooms.json":
/*!****************************************!*\
  !*** ./src/metadata/render/Rooms.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"bend","imgsrc":"bend.png","color":"black"},{"name":"corner","imgsrc":"corner.png","color":"black"},{"name":"corridor","imgsrc":"corridor.png","color":"grey"},{"name":"door","imgsrc":"door.png","color":"grey"},{"name":"empty","imgsrc":"empty.png","color":"lightgrey"},{"name":"side","imgsrc":"side.png","color":"grey"},{"name":"t","imgsrc":"t.png","color":"lightgrey"},{"name":"turn","imgsrc":"turn.png","color":"grey"},{"name":"wall","imgsrc":"wall.png","color":"black"}]');

/***/ }),

/***/ "./src/metadata/render/Sudoku.json":
/*!*****************************************!*\
  !*** ./src/metadata/render/Sudoku.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"1","imgsrc":"1.png","color":"#c0ffc0"},{"name":"2","imgsrc":"2.png","color":"#00ff00"},{"name":"3","imgsrc":"3.png","color":"#c0c0c0"},{"name":"4","imgsrc":"4.png","color":"#51ff51"},{"name":"5","imgsrc":"5.png","color":"#c0e6c0"},{"name":"6","imgsrc":"6.png","color":"#c0e6c0"},{"name":"7","imgsrc":"7.png","color":"#c0e6c0"},{"name":"8","imgsrc":"8.png","color":"#c0e6c0"},{"name":"9","imgsrc":"9.png","color":"#c0e6c0"},{"name":"A","imgsrc":"A.png","color":"#c0e6c0"},{"name":"B","imgsrc":"B.png","color":"#c0e6c0"},{"name":"C","imgsrc":"C.png","color":"#c0e6c0"},{"name":"D","imgsrc":"D.png","color":"#c0e6c0"},{"name":"E","imgsrc":"E.png","color":"#c0e6c0"},{"name":"F","imgsrc":"F.png","color":"#c0e6c0"},{"name":"G","imgsrc":"G.png","color":"#c0e6c0"}]');

/***/ }),

/***/ "./src/metadata/render/Summer.json":
/*!*****************************************!*\
  !*** ./src/metadata/render/Summer.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"cliff 0","imgsrc":"cliff 0.png","color":"brown"},{"name":"cliff 1","imgsrc":"cliff 1.png","color":"brown"},{"name":"cliff 2","imgsrc":"cliff 2.png","color":"brown"},{"name":"cliff 3","imgsrc":"cliff 3.png","color":"brown"},{"name":"cliffcorner 0","imgsrc":"cliffcorner 0.png","color":"brown"},{"name":"cliffcorner 1","imgsrc":"cliffcorner 1.png","color":"brown"},{"name":"cliffcorner 2","imgsrc":"cliffcorner 2.png","color":"brown"},{"name":"cliffcorner 3","imgsrc":"cliffcorner 3.png","color":"brown"},{"name":"cliffturn 0","imgsrc":"cliffturn 0.png","color":"brown"},{"name":"cliffturn 1","imgsrc":"cliffturn 1.png","color":"brown"},{"name":"cliffturn 2","imgsrc":"cliffturn 2.png","color":"brown"},{"name":"cliffturn 3","imgsrc":"cliffturn 3.png","color":"brown"},{"name":"grass 0","imgsrc":"grass 0.png","color":"green"},{"name":"grasscorner 0","imgsrc":"grasscorner 0.png","color":"yellow"},{"name":"grasscorner 1","imgsrc":"grasscorner 1.png","color":"yellow"},{"name":"grasscorner 2","imgsrc":"grasscorner 2.png","color":"yellow"},{"name":"grasscorner 3","imgsrc":"grasscorner 3.png","color":"yellow"},{"name":"road 0","imgsrc":"road 0.png","color":"yellow"},{"name":"road 1","imgsrc":"road 1.png","color":"yellow"},{"name":"road 2","imgsrc":"road 2.png","color":"yellow"},{"name":"road 3","imgsrc":"road 3.png","color":"yellow"},{"name":"roadturn 0","imgsrc":"roadturn 0.png","color":"yellow"},{"name":"roadturn 1","imgsrc":"roadturn 1.png","color":"yellow"},{"name":"roadturn 2","imgsrc":"roadturn 2.png","color":"yellow"},{"name":"roadturn 3","imgsrc":"roadturn 3.png","color":"yellow"},{"name":"water_a 0","imgsrc":"water_a 0.png","color":"blue"},{"name":"water_b 0","imgsrc":"water_b 0.png","color":"blue"},{"name":"water_c 0","imgsrc":"water_c 0.png","color":"blue"},{"name":"watercorner 0","imgsrc":"watercorner 0.png","color":"darkblue"},{"name":"watercorner 1","imgsrc":"watercorner 1.png","color":"darkblue"},{"name":"watercorner 2","imgsrc":"watercorner 2.png","color":"darkblue"},{"name":"watercorner 3","imgsrc":"watercorner 3.png","color":"darkblue"},{"name":"waterside 0","imgsrc":"waterside 0.png","color":"darkblue"},{"name":"waterside 1","imgsrc":"waterside 1.png","color":"darkblue"},{"name":"waterside 2","imgsrc":"waterside 2.png","color":"darkblue"},{"name":"waterside 3","imgsrc":"waterside 3.png","color":"darkblue"},{"name":"waterturn 0","imgsrc":"waterturn 0.png","color":"cyan"},{"name":"waterturn 1","imgsrc":"waterturn 1.png","color":"cyan"},{"name":"waterturn 2","imgsrc":"waterturn 2.png","color":"cyan"},{"name":"waterturn 3","imgsrc":"waterturn 3.png","color":"cyan"}]');

/***/ }),

/***/ "./src/metadata/render/TmwDesertSpacing.json":
/*!***************************************************!*\
  !*** ./src/metadata/render/TmwDesertSpacing.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"000_000_000","imgsrc":"000_000_000.png"},{"name":"000_000_001","imgsrc":"000_000_001.png"},{"name":"000_000_100","imgsrc":"000_000_100.png"},{"name":"000_000_111","imgsrc":"000_000_111.png"},{"name":"000_033_032","imgsrc":"000_033_032.png"},{"name":"000_055_054","imgsrc":"000_055_054.png"},{"name":"000_0a0_000","imgsrc":"000_0a0_000.png"},{"name":"000_0b0_000","imgsrc":"000_0b0_000.png"},{"name":"000_0c0_000","imgsrc":"000_0c0_000.png"},{"name":"000_0d0_000","imgsrc":"000_0d0_000.png"},{"name":"000_0e0_000","imgsrc":"000_0e0_000.png"},{"name":"000_0f0_000","imgsrc":"000_0f0_000.png"},{"name":"000_0g0_000","imgsrc":"000_0g0_000.png"},{"name":"000_0h0_000","imgsrc":"000_0h0_000.png"},{"name":"000_330_230","imgsrc":"000_330_230.png"},{"name":"000_333_222","imgsrc":"000_333_222.png"},{"name":"000_550_450","imgsrc":"000_550_450.png"},{"name":"000_555_444","imgsrc":"000_555_444.png"},{"name":"001_000_000","imgsrc":"001_000_000.png"},{"name":"001_001_001","imgsrc":"001_001_001.png"},{"name":"001_001_111","imgsrc":"001_001_111.png"},{"name":"032_032_032","imgsrc":"032_032_032.png"},{"name":"032_033_000","imgsrc":"032_033_000.png"},{"name":"032_332_222","imgsrc":"032_332_222.png"},{"name":"054_054_054","imgsrc":"054_054_054.png"},{"name":"054_055_000","imgsrc":"054_055_000.png"},{"name":"054_554_444","imgsrc":"054_554_444.png"},{"name":"100_000_000","imgsrc":"100_000_000.png"},{"name":"100_100_100","imgsrc":"100_100_100.png"},{"name":"100_100_111","imgsrc":"100_100_111.png"},{"name":"111_000_000","imgsrc":"111_000_000.png"},{"name":"111_001_001","imgsrc":"111_001_001.png"},{"name":"111_100_100","imgsrc":"111_100_100.png"},{"name":"111_111_111","imgsrc":"111_111_111.png"},{"name":"222_222_222","imgsrc":"222_222_222.png"},{"name":"222_233_230","imgsrc":"222_233_230.png"},{"name":"222_332_032","imgsrc":"222_332_032.png"},{"name":"222_333_000","imgsrc":"222_333_000.png"},{"name":"230_230_230","imgsrc":"230_230_230.png"},{"name":"230_233_222","imgsrc":"230_233_222.png"},{"name":"230_330_000","imgsrc":"230_330_000.png"},{"name":"444_444_444","imgsrc":"444_444_444.png"},{"name":"444_455_450","imgsrc":"444_455_450.png"},{"name":"444_554_054","imgsrc":"444_554_054.png"},{"name":"444_555_000","imgsrc":"444_555_000.png"},{"name":"450_450_450","imgsrc":"450_450_450.png"},{"name":"450_455_444","imgsrc":"450_455_444.png"},{"name":"450_550_000","imgsrc":"450_550_000.png"}]');

/***/ }),

/***/ "./src/metadata/sets/Castle.json":
/*!***************************************!*\
  !*** ./src/metadata/sets/Castle.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"bridge":{},"ground":{},"river":{},"riverturn":{},"road":{},"roadturn":{},"t":{},"tower":{},"wall":{},"wallriver":{},"wallroad":{}},"grassytower":{"ground":{"weight":5},"road":{"weight":0.1},"roadturn":{"weight":0.1},"t":{"weight":0.01},"tower":{"weight":0.1},"wall":{},"wallroad":{"weight":0.1}},"onetower":{"bridge":{},"ground":{},"river":{},"riverturn":{},"road":{},"roadturn":{},"t":{},"tower":{"minimum":2,"maximum":4},"wall":{},"wallriver":{},"wallroad":{}}}');

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
module.exports = JSON.parse('{"all":{"bridge":{},"component":{},"connection":{},"corner":{},"dskew":{},"skew":{},"substrate":{},"t":{},"track":{},"transition":{},"turn":{},"viad":{},"vias":{},"wire":{}},"noic":{"bridge":{"weight":0.4},"component":{"weight":0},"connection":{"weight":0},"corner":{"weight":0},"dskew":{"weight":0.3},"skew":{"weight":0.3},"substrate":{"weight":5},"t":{"weight":1},"track":{"weight":1},"transition":{"weight":0.3},"turn":{"weight":1},"viad":{"weight":0.01},"vias":{"weight":0.1},"wire":{"weight":0}},"iconly":{"bridge":{"weight":0},"component":{"weight":2},"connection":{"weight":1},"corner":{"weight":1},"dskew":{"weight":0.5},"skew":{"weight":0.5},"substrate":{"weight":10},"t":{"weight":0.5},"track":{"weight":0.7},"transition":{"weight":0},"turn":{"weight":0.6},"viad":{"weight":0},"vias":{"weight":0.1},"wire":{"weight":0}},"edgeblacklist_all":{"bridge":{"edgeblacklist":["right","bottom","left","top"]},"component":{"edgeblacklist":["right","bottom","left","top"]},"connection":{"edgeblacklist":["top","bottom"]},"corner":{"edgeblacklist":["bottom","left"]},"dskew":{"edgeblacklist":["right","bottom","left","top"]},"skew":{"edgeblacklist":["top","right"]},"substrate":{},"t":{"edgeblacklist":["right","bottom","left"]},"track":{"edgeblacklist":["top","bottom"]},"transition":{"edgeblacklist":["top","bottom"]},"turn":{"edgeblacklist":["top","right"]},"viad":{"edgeblacklist":["right","left"]},"vias":{"edgeblacklist":["top"]},"wire":{"edgeblacklist":["right","left"]}},"two_small_ic":{"bridge":{},"component":{"minimum":2,"maximum":8},"connection":{},"corner":{"maximum":8,"weight":0.01},"dskew":{},"skew":{},"substrate":{},"t":{},"track":{},"transition":{},"turn":{},"viad":{},"vias":{},"wire":{}}}');

/***/ }),

/***/ "./src/metadata/sets/FloorPlan.json":
/*!******************************************!*\
  !*** ./src/metadata/sets/FloorPlan.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"div":{},"divt":{},"divturn":{},"door":{},"empty":{},"floor":{},"glass":{},"halfglass":{},"halfglass2":{},"in":{},"out":{},"stairs":{},"table":{},"vent":{},"w":{},"wall":{},"walldiv":{},"window":{}},"nooutdoor":{"div":{"weight":0.1},"divt":{"weight":0.1},"divturn":{"weight":1},"door":{"weight":0.1},"empty":{"weight":1},"floor":{"weight":5},"stairs":{"weight":0.1},"table":{"weight":0.1},"vent":{"weight":0.1}},"edgeblacklist_all":{"div":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"divt":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"divturn":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"door":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"empty":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"floor":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"glass":{"edgeblacklist":["right","left"],"weight":0.000001},"halfglass":{"edgeblacklist":["right","left"],"weight":0.000001},"halfglass2":{"edgeblacklist":["right","left"],"weight":0.000001},"in":{"edgeblacklist":["top","right","left","bottom"],"weight":0.000001},"out":{"edgeblacklist":["top","right"],"weight":0.000001},"stairs":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"table":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"vent":{"edgeblacklist":["right","bottom","left","top"],"weight":1000000},"w":{"edgeblacklist":["right","left"],"weight":0.000001},"wall":{"edgeblacklist":["right","left"],"weight":0.000001},"walldiv":{"edgeblacklist":["right","left","top"],"weight":0.000001},"window":{"edgeblacklist":["right","left"],"weight":0.000001}}}');

/***/ }),

/***/ "./src/metadata/sets/Happyland.json":
/*!******************************************!*\
  !*** ./src/metadata/sets/Happyland.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"set2":{"set2_000_000_000_000":{},"set2_000_000_001_100":{},"set2_000_001_111_100":{},"set2_000_001_100_000":{},"set2_001_111_111_100":{},"set2_001_111_100_000":{},"set2_001_100_000_000":{},"set2_001_100_001_100":{},"set2_111_111_111_111":{},"set2_111_111_100_001":{},"set2_111_100_000_001":{},"set2_111_100_001_111":{},"set2_100_000_000_001":{},"set2_100_000_001_111":{},"set2_100_001_111_111":{},"set2_100_001_100_001":{}},"set3":{"set3_000_000_000_000":{},"set3_000_000_001_100":{},"set3_000_000_022_220":{},"set3_000_001_100_000":{},"set3_000_001_111_100":{},"set3_000_021_122_220":{},"set3_000_022_220_000":{},"set3_000_022_221_120":{},"set3_000_022_222_220":{},"set3_001_100_000_000":{},"set3_001_100_001_100":{},"set3_001_111_100_000":{},"set3_001_111_111_100":{},"set3_021_111_122_220":{},"set3_021_120_022_220":{},"set3_021_122_220_000":{},"set3_021_122_221_120":{},"set3_021_122_222_220":{},"set3_022_220_000_000":{},"set3_022_220_021_120":{},"set3_022_220_022_220":{},"set3_022_221_111_120":{},"set3_022_221_120_000":{},"set3_022_221_122_220":{},"set3_022_222_220_000":{},"set3_022_222_221_120":{},"set3_022_222_222_220":{},"set3_100_000_000_001":{},"set3_100_000_001_111":{},"set3_100_001_100_001":{},"set3_100_001_111_111":{},"set3_111_100_000_001":{},"set3_111_100_001_111":{},"set3_111_111_100_001":{},"set3_111_111_111_111":{},"set3_111_111_122_221":{},"set3_111_120_022_221":{},"set3_111_122_220_021":{},"set3_111_122_221_111":{},"set3_111_122_222_221":{},"set3_120_000_022_221":{},"set3_120_021_122_221":{},"set3_120_022_220_021":{},"set3_120_022_221_111":{},"set3_120_022_222_221":{},"set3_122_220_000_021":{},"set3_122_220_021_111":{},"set3_122_220_022_221":{},"set3_122_221_111_111":{},"set3_122_221_120_021":{},"set3_122_221_122_221":{},"set3_122_222_220_021":{},"set3_122_222_221_111":{},"set3_122_222_222_221":{},"set3_220_000_000_022":{},"set3_220_000_021_122":{},"set3_220_000_022_222":{},"set3_220_021_111_122":{},"set3_220_021_122_222":{},"set3_220_022_220_022":{},"set3_220_022_221_122":{},"set3_220_022_222_222":{},"set3_221_111_100_022":{},"set3_221_111_111_122":{},"set3_221_111_122_222":{},"set3_221_120_000_022":{},"set3_221_120_021_122":{},"set3_221_120_022_222":{},"set3_221_122_220_022":{},"set3_221_122_221_122":{},"set3_221_122_222_222":{},"set3_222_220_000_022":{},"set3_222_220_021_122":{},"set3_222_220_022_222":{},"set3_222_221_111_122":{},"set3_222_221_120_022":{},"set3_222_221_122_222":{},"set3_222_222_220_022":{},"set3_222_222_221_122":{},"set3_222_222_222_222":{}}}');

/***/ }),

/***/ "./src/metadata/sets/Knots.json":
/*!**************************************!*\
  !*** ./src/metadata/sets/Knots.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"corner":{},"t":{},"cross":{},"line":{},"empty":{}},"nonempty":{"corner":{},"t":{},"cross":{},"line":{}},"onlycorners":{"corner":{}},"nocrossnoempty":{"corner":{},"t":{},"line":{}},"nocross":{"corner":{},"t":{},"line":{},"empty":{}},"onlyt":{"t":{}},"braided":{"line":{},"cross":{}},"cross":{"cross":{}},"crosst":{"cross":{},"t":{}},"cornert":{"corner":{},"t":{}},"linecorner":{"corner":{},"line":{}},"edgeblacklist_all":{"corner":{"edgeblacklist":["right","top"]},"t":{"edgeblacklist":["right","bottom","left"]},"cross":{"edgeblacklist":["right","bottom","top","left"]},"line":{"edgeblacklist":["right","left"]},"empty":{}},"edgeblacklist_nonempty":{"corner":{"edgeblacklist":["right","top"]},"t":{"edgeblacklist":["right","bottom","left"]},"cross":{"edgeblacklist":["right","bottom","top","left"]},"line":{"edgeblacklist":["right","left"]}},"edgeblacklist_nocrossnoempty":{"corner":{"edgeblacklist":["right","top"]},"t":{"edgeblacklist":["right","bottom","left"]},"line":{"edgeblacklist":["right","left"]}},"edgeblacklist_nocross":{"corner":{"edgeblacklist":["right","top"]},"t":{"edgeblacklist":["right","bottom","left"]},"line":{"edgeblacklist":["right","left"]},"empty":{}},"edgeblacklist_onlyt":{"corner":{"edgeblacklist":["right","top"],"weight":1e-7},"t":{"edgeblacklist":["right","bottom","left"],"weight":1000000}},"edgeblacklist_cross":{"corner":{"edgeblacklist":["right","top"],"weight":1e-7},"t":{"edgeblacklist":["right","bottom","left"],"weight":0.001},"cross":{"edgeblacklist":["right","bottom","top","left"],"weight":100000}},"edgeblacklist_crosst":{"corner":{"edgeblacklist":["right","top"],"weight":1e-7},"cross":{"edgeblacklist":["right","bottom","top","left"]},"t":{"edgeblacklist":["right","bottom","left"]}},"edgeblacklist_cornert":{"corner":{"edgeblacklist":["right","top"]},"t":{"edgeblacklist":["right","bottom","left"]}},"pyramid":{"cross":{"edgeblacklist":["right","bottom","top","left"]},"corner":{"edgeblacklist":["right","top"],"weight":1e-7},"line":{"edgeblacklist":["right","left"]}}}');

/***/ }),

/***/ "./src/metadata/sets/Rooms.json":
/*!**************************************!*\
  !*** ./src/metadata/sets/Rooms.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"bend":{},"corner":{},"corridor":{},"door":{},"empty":{},"side":{},"t":{},"turn":{},"wall":{}},"areas":{"bend":{"weight":0.1},"corner":{"weight":0.1},"corridor":{"weight":1},"door":{"weight":1},"empty":{"weight":10},"side":{"weight":0.1},"t":{"weight":0.1},"turn":{"weight":0.1},"wall":{"weight":10}}}');

/***/ }),

/***/ "./src/metadata/sets/Sudoku.json":
/*!***************************************!*\
  !*** ./src/metadata/sets/Sudoku.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"3x3":{"1":{},"2":{},"3":{},"4":{},"5":{},"6":{},"7":{},"8":{},"9":{}},"4x4":{"1":{},"2":{},"3":{},"4":{},"5":{},"6":{},"7":{},"8":{},"9":{},"A":{},"B":{},"C":{},"D":{},"E":{},"F":{},"G":{}}}');

/***/ }),

/***/ "./src/metadata/sets/Summer.json":
/*!***************************************!*\
  !*** ./src/metadata/sets/Summer.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"cliff 0":{},"cliff 1":{},"cliff 2":{},"cliff 3":{},"cliffcorner 0":{},"cliffcorner 1":{},"cliffcorner 2":{},"cliffcorner 3":{},"cliffturn 0":{},"cliffturn 1":{},"cliffturn 2":{},"cliffturn 3":{},"grass 0":{},"grasscorner 0":{},"grasscorner 1":{},"grasscorner 2":{},"grasscorner 3":{},"road 0":{},"road 1":{},"road 2":{},"road 3":{},"roadturn 0":{},"roadturn 1":{},"roadturn 2":{},"roadturn 3":{},"water_a 0":{},"water_b 0":{},"water_c 0":{},"watercorner 0":{},"watercorner 1":{},"watercorner 2":{},"watercorner 3":{},"waterside 0":{},"waterside 1":{},"waterside 2":{},"waterside 3":{},"waterturn 0":{},"waterturn 1":{},"waterturn 2":{},"waterturn 3":{}},"nocliff":{"grass 0":{},"grasscorner 0":{},"grasscorner 1":{},"grasscorner 2":{},"grasscorner 3":{},"road 0":{},"road 1":{},"road 2":{},"road 3":{},"roadturn 0":{},"roadturn 1":{},"roadturn 2":{},"roadturn 3":{},"water_a 0":{},"water_b 0":{},"water_c 0":{},"watercorner 0":{},"watercorner 1":{},"watercorner 2":{},"watercorner 3":{},"waterside 0":{},"waterside 1":{},"waterside 2":{},"waterside 3":{},"waterturn 0":{},"waterturn 1":{},"waterturn 2":{},"waterturn 3":{}},"nowater":{"cliff 0":{},"cliff 1":{},"cliff 2":{},"cliff 3":{},"cliffcorner 0":{},"cliffcorner 1":{},"cliffcorner 2":{},"cliffcorner 3":{},"cliffturn 0":{},"cliffturn 1":{},"cliffturn 2":{},"cliffturn 3":{},"grass 0":{},"grasscorner 0":{},"grasscorner 1":{},"grasscorner 2":{},"grasscorner 3":{},"road 0":{},"road 1":{},"road 2":{},"road 3":{},"roadturn 0":{},"roadturn 1":{},"roadturn 2":{},"roadturn 3":{}},"noroad":{"cliff 0":{},"cliff 1":{},"cliff 2":{},"cliff 3":{},"cliffcorner 0":{},"cliffcorner 1":{},"cliffcorner 2":{},"cliffcorner 3":{},"cliffturn 0":{},"cliffturn 1":{},"cliffturn 2":{},"cliffturn 3":{},"grass 0":{},"water_a 0":{},"water_b 0":{},"water_c 0":{},"watercorner 0":{},"watercorner 1":{},"watercorner 2":{},"watercorner 3":{},"waterside 0":{},"waterside 1":{},"waterside 2":{},"waterside 3":{},"waterturn 0":{},"waterturn 1":{},"waterturn 2":{},"waterturn 3":{}},"islands":{"cliff 0":{"edgeblacklist":["right","bottom","left","top"]},"cliff 1":{"edgeblacklist":["right","bottom","left","top"]},"cliff 2":{"edgeblacklist":["right","bottom","left","top"]},"cliff 3":{"edgeblacklist":["right","bottom","left","top"]},"cliffcorner 0":{"edgeblacklist":["right","bottom","left","top"]},"cliffcorner 1":{"edgeblacklist":["right","bottom","left","top"]},"cliffcorner 2":{"edgeblacklist":["right","bottom","left","top"]},"cliffcorner 3":{"edgeblacklist":["right","bottom","left","top"]},"cliffturn 0":{"edgeblacklist":["right","bottom","left","top"]},"cliffturn 1":{"edgeblacklist":["right","bottom","left","top"]},"cliffturn 2":{"edgeblacklist":["right","bottom","left","top"]},"cliffturn 3":{"edgeblacklist":["right","bottom","left","top"]},"grass 0":{"edgeblacklist":["right","bottom","left","top"]},"grasscorner 0":{"edgeblacklist":["right","bottom","left","top"]},"grasscorner 1":{"edgeblacklist":["right","bottom","left","top"]},"grasscorner 2":{"edgeblacklist":["right","bottom","left","top"]},"grasscorner 3":{"edgeblacklist":["right","bottom","left","top"]},"road 0":{"edgeblacklist":["right","bottom","left","top"]},"road 1":{"edgeblacklist":["right","bottom","left","top"]},"road 2":{"edgeblacklist":["right","bottom","left","top"]},"road 3":{"edgeblacklist":["right","bottom","left","top"]},"roadturn 0":{"edgeblacklist":["right","bottom","left","top"]},"roadturn 1":{"edgeblacklist":["right","bottom","left","top"]},"roadturn 2":{"edgeblacklist":["right","bottom","left","top"]},"roadturn 3":{"edgeblacklist":["right","bottom","left","top"]},"water_a 0":{},"water_b 0":{},"water_c 0":{},"watercorner 0":{"edgeblacklist":["right","bottom","left","top"]},"watercorner 1":{"edgeblacklist":["right","bottom","left","top"]},"watercorner 2":{"edgeblacklist":["right","bottom","left","top"]},"watercorner 3":{"edgeblacklist":["right","bottom","left","top"]},"waterside 0":{"edgeblacklist":["right","bottom","left"]},"waterside 1":{"edgeblacklist":["bottom","left","top"]},"waterside 2":{"edgeblacklist":["right","left","top"]},"waterside 3":{"edgeblacklist":["bottom","left","top"]},"waterturn 0":{"edgeblacklist":["left","bottom"]},"waterturn 1":{"edgeblacklist":["right","bottom"]},"waterturn 2":{"edgeblacklist":["right","top"]},"waterturn 3":{"edgeblacklist":["left","top"]}}}');

/***/ }),

/***/ "./src/metadata/sets/TmwDesertSpacing.json":
/*!*************************************************!*\
  !*** ./src/metadata/sets/TmwDesertSpacing.json ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"all":{"000_000_000":{},"000_000_001":{},"000_000_100":{},"000_000_111":{},"000_033_032":{},"000_055_054":{},"000_0a0_000":{},"000_0b0_000":{},"000_0c0_000":{},"000_0d0_000":{},"000_0e0_000":{},"000_0f0_000":{},"000_0g0_000":{},"000_0h0_000":{},"000_330_230":{},"000_333_222":{},"000_550_450":{},"000_555_444":{},"001_000_000":{},"001_001_001":{},"001_001_111":{},"032_032_032":{},"032_033_000":{},"032_332_222":{},"054_054_054":{},"054_055_000":{},"054_554_444":{},"100_000_000":{},"100_100_100":{},"100_100_111":{},"111_000_000":{},"111_001_001":{},"111_100_100":{},"111_111_111":{},"222_222_222":{},"222_233_230":{},"222_332_032":{},"222_333_000":{},"230_230_230":{},"230_233_222":{},"230_330_000":{},"444_444_444":{},"444_455_450":{},"444_554_054":{},"444_555_000":{},"450_450_450":{},"450_455_444":{},"450_550_000":{}}}');

/***/ }),

/***/ "./src/metadata/tiles/Castle.json":
/*!****************************************!*\
  !*** ./src/metadata/tiles/Castle.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"Castle","socketGenerator":{"type":"pixelsedge","settings":{"gridSize":7,"buckets":6}}},"tiles":[{"name":"bridge","rotations":[0,1],"weight":2,"socket":{"top":"010","right":"020","bottom":"010","left":"020"}},{"name":"ground","rotations":[0],"weight":3,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"river","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"riverturn","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"road","rotations":[0,1],"weight":3,"socket":{"top":"020","right":"000","bottom":"020","left":"000"}},{"name":"roadturn","rotations":[0,1,2,3],"weight":1,"socket":{"top":"020","right":"020","bottom":"000","left":"000"}},{"name":"t","rotations":[0,1,2,3],"weight":2,"socket":{"top":"000","right":"020","bottom":"020","left":"020"}},{"name":"tower","rotations":[0,1,2,3],"weight":1,"socket":{"top":["030"],"right":["030"],"bottom":["000"],"left":["000"]},"blacklist":{"bottom":{"tower":[0,1,2,3],"wall":[1,3]},"right":{"tower":[0,1,2,3],"wall":[0,2]},"top":{"tower":[0,1,2,3],"wall":[1,3]},"left":{"tower":[0,1,2,3],"wall":[0,2]}}},{"name":"wall","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"000","bottom":"030","left":"000"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}},{"name":"wallriver","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"010","bottom":"030","left":"010"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}},{"name":"wallroad","rotations":[0,1],"weight":1,"socket":{"top":"030","right":"020","bottom":"030","left":"020"},"blacklist":{"left":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]},"right":{"wall":[0],"wallriver":[0],"wallroad":[0],"tower":[0,1,2,3]}}}]}');

/***/ }),

/***/ "./src/metadata/tiles/Circles.json":
/*!*****************************************!*\
  !*** ./src/metadata/tiles/Circles.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"Circle","socketGenerator":{"type":"pixelsedge","settings":{}}},"tiles":[{"name":"b_half","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"011","bottom":"111","left":"110"}},{"name":"b_i","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"010","bottom":"000","left":"010"}},{"name":"b_quarter","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"000","bottom":"111","left":"111"}},{"name":"b","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"w_half","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"100","bottom":"000","left":"001"}},{"name":"w_i","rotations":[0,1],"weight":1,"socket":{"top":"111","right":"101","bottom":"111","left":"101"}},{"name":"w_quarter","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"111","bottom":"000","left":"000"}},{"name":"w","rotations":[0],"weight":1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}}]}');

/***/ }),

/***/ "./src/metadata/tiles/Circuit.json":
/*!*****************************************!*\
  !*** ./src/metadata/tiles/Circuit.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"Circuit","socketGenerator":{"type":"pixels","settings":{}}},"tiles":[{"name":"bridge","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"020","bottom":"010","left":"020"}},{"name":"connection","rotations":[0,1,2,3],"weight":3,"socket":{"top":"010","right":"003","bottom":"333","left":"300"},"blacklist":{"bottom":{"connection":[2]}}},{"name":"dskew","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"010","bottom":"010","left":"010"}},{"name":"skew","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"substrate","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"t","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"010","bottom":"010","left":"010"}},{"name":"track","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"transition","rotations":[0,1,2,3],"weight":1,"socket":{"top":"020","right":"000","bottom":"010","left":"000"}},{"name":"turn","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"viad","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"010","bottom":"000","left":"010"}},{"name":"vias","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"000","left":"000"}},{"name":"wire","rotations":[0,1],"weight":1,"socket":{"top":"000","right":"020","bottom":"000","left":"020"}},{"name":"component","rotations":[0],"weight":1,"socket":{"top":"333","right":"333","bottom":"333","left":"333"}},{"name":"corner","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"000","bottom":"003","left":"300"}}]}');

/***/ }),

/***/ "./src/metadata/tiles/FloorPlan.json":
/*!*******************************************!*\
  !*** ./src/metadata/tiles/FloorPlan.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"FloorPlan","socketGenerator":{"type":"pixels","settings":{"gridSize":9,"buckets":4}}},"tiles":[{"name":"div","rotations":[0,1],"weight":0.5,"socket":{"top":"111","right":"121","bottom":"111","left":"121"}},{"name":"divt","rotations":[0,1,2,3],"weight":0.5,"socket":{"top":"111","right":"121","bottom":"121","left":"121"}},{"name":"divturn","rotations":[0,1,2,3],"weight":0.5,"socket":{"top":"121","right":"121","bottom":"111","left":"111"}},{"name":"door","rotations":[0,1,2,3],"weight":0.2,"socket":{"top":"111","right":"121","bottom":"111","left":"121"}},{"name":"empty","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"floor","rotations":[0],"weight":3,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"glass","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"130","bottom":"000","left":"031"}},{"name":"halfglass","rotations":[0,1,2,3],"weight":0.3,"socket":{"top":"111","right":"130","bottom":"000","left":"021"}},{"name":"halfglass2","rotations":[0,1,2,3],"weight":0.3,"socket":{"top":"111","right":"120","bottom":"000","left":"031"}},{"name":"in","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"120","left":"021"}},{"name":"out","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"021","right":"120","bottom":"000","left":"000"}},{"name":"stairs","rotations":[0,1,2,3],"weight":0.2,"socket":{"top":"111","right":"121","bottom":"222","left":"121"}},{"name":"table","rotations":[0],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"vent","rotations":[0],"weight":0.1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"w","rotations":[0,1,2,3],"weight":0.1,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}},{"name":"wall","rotations":[0,1,2,3],"weight":0.25,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}},{"name":"walldiv","rotations":[0,1,2,3],"weight":0.25,"socket":{"top":"121","right":"120","bottom":"000","left":"021"}},{"name":"window","rotations":[0,1,2,3],"weight":0.05,"socket":{"top":"111","right":"120","bottom":"000","left":"021"}}]}');

/***/ }),

/***/ "./src/metadata/tiles/Happyland.json":
/*!*******************************************!*\
  !*** ./src/metadata/tiles/Happyland.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"Happyland","socketGenerator":{"type2":"name","settings2":{"namingtype":"border","regex":"set[0-9]+_(?<top>[0-9]+)_(?<right>[0-9]+)_(?<bottom>[0-9]+)_(?<left>[0-9]+)"},"type":"pixelsedge","settings":{}}},"tiles":[{"name":"set2_000_000_000_000","rotations":[0],"weight":1},{"name":"set2_000_000_001_100","rotations":[0],"weight":1},{"name":"set2_000_001_111_100","rotations":[0],"weight":1},{"name":"set2_000_001_100_000","rotations":[0],"weight":1},{"name":"set2_001_111_111_100","rotations":[0],"weight":1},{"name":"set2_001_111_100_000","rotations":[0],"weight":1},{"name":"set2_001_100_000_000","rotations":[0],"weight":1},{"name":"set2_001_100_001_100","rotations":[0],"weight":1},{"name":"set2_111_111_111_111","rotations":[0],"weight":1},{"name":"set2_111_111_100_001","rotations":[0],"weight":1},{"name":"set2_111_100_000_001","rotations":[0],"weight":1},{"name":"set2_111_100_001_111","rotations":[0],"weight":1},{"name":"set2_100_000_000_001","rotations":[0],"weight":1},{"name":"set2_100_000_001_111","rotations":[0],"weight":1},{"name":"set2_100_001_111_111","rotations":[0],"weight":1},{"name":"set2_100_001_100_001","rotations":[0],"weight":1},{"name":"set3_000_000_000_000","rotations":[0],"weight":1},{"name":"set3_000_000_001_100","rotations":[0],"weight":1},{"name":"set3_000_000_022_220","rotations":[0],"weight":1},{"name":"set3_000_001_100_000","rotations":[0],"weight":1},{"name":"set3_000_001_111_100","rotations":[0],"weight":1},{"name":"set3_000_021_122_220","rotations":[0],"weight":1},{"name":"set3_000_022_220_000","rotations":[0],"weight":1},{"name":"set3_000_022_221_120","rotations":[0],"weight":1},{"name":"set3_000_022_222_220","rotations":[0],"weight":1},{"name":"set3_001_100_000_000","rotations":[0],"weight":1},{"name":"set3_001_100_001_100","rotations":[0],"weight":1},{"name":"set3_001_111_100_000","rotations":[0],"weight":1},{"name":"set3_001_111_111_100","rotations":[0],"weight":1},{"name":"set3_021_111_122_220","rotations":[0],"weight":1},{"name":"set3_021_120_022_220","rotations":[0],"weight":1},{"name":"set3_021_122_220_000","rotations":[0],"weight":1},{"name":"set3_021_122_221_120","rotations":[0],"weight":1},{"name":"set3_021_122_222_220","rotations":[0],"weight":1},{"name":"set3_022_220_000_000","rotations":[0],"weight":1},{"name":"set3_022_220_021_120","rotations":[0],"weight":1},{"name":"set3_022_220_022_220","rotations":[0],"weight":1},{"name":"set3_022_221_111_120","rotations":[0],"weight":1},{"name":"set3_022_221_120_000","rotations":[0],"weight":1},{"name":"set3_022_221_122_220","rotations":[0],"weight":1},{"name":"set3_022_222_220_000","rotations":[0],"weight":1},{"name":"set3_022_222_221_120","rotations":[0],"weight":1},{"name":"set3_022_222_222_220","rotations":[0],"weight":1},{"name":"set3_100_000_000_001","rotations":[0],"weight":1},{"name":"set3_100_000_001_111","rotations":[0],"weight":1},{"name":"set3_100_001_100_001","rotations":[0],"weight":1},{"name":"set3_100_001_111_111","rotations":[0],"weight":1},{"name":"set3_111_100_000_001","rotations":[0],"weight":1},{"name":"set3_111_100_001_111","rotations":[0],"weight":1},{"name":"set3_111_111_100_001","rotations":[0],"weight":1},{"name":"set3_111_111_111_111","rotations":[0],"weight":1},{"name":"set3_111_111_122_221","rotations":[0],"weight":1},{"name":"set3_111_120_022_221","rotations":[0],"weight":1},{"name":"set3_111_122_220_021","rotations":[0],"weight":1},{"name":"set3_111_122_221_111","rotations":[0],"weight":1},{"name":"set3_111_122_222_221","rotations":[0],"weight":1},{"name":"set3_120_000_022_221","rotations":[0],"weight":1},{"name":"set3_120_021_122_221","rotations":[0],"weight":1},{"name":"set3_120_022_220_021","rotations":[0],"weight":1},{"name":"set3_120_022_221_111","rotations":[0],"weight":1},{"name":"set3_120_022_222_221","rotations":[0],"weight":1},{"name":"set3_122_220_000_021","rotations":[0],"weight":1},{"name":"set3_122_220_021_111","rotations":[0],"weight":1},{"name":"set3_122_220_022_221","rotations":[0],"weight":1},{"name":"set3_122_221_111_111","rotations":[0],"weight":1},{"name":"set3_122_221_120_021","rotations":[0],"weight":1},{"name":"set3_122_221_122_221","rotations":[0],"weight":1},{"name":"set3_122_222_220_021","rotations":[0],"weight":1},{"name":"set3_122_222_221_111","rotations":[0],"weight":1},{"name":"set3_122_222_222_221","rotations":[0],"weight":1},{"name":"set3_220_000_000_022","rotations":[0],"weight":1},{"name":"set3_220_000_021_122","rotations":[0],"weight":1},{"name":"set3_220_000_022_222","rotations":[0],"weight":1},{"name":"set3_220_021_111_122","rotations":[0],"weight":1},{"name":"set3_220_021_122_222","rotations":[0],"weight":1},{"name":"set3_220_022_220_022","rotations":[0],"weight":1},{"name":"set3_220_022_221_122","rotations":[0],"weight":1},{"name":"set3_220_022_222_222","rotations":[0],"weight":1},{"name":"set3_221_111_100_022","rotations":[0],"weight":1},{"name":"set3_221_111_111_122","rotations":[0],"weight":1},{"name":"set3_221_111_122_222","rotations":[0],"weight":1},{"name":"set3_221_120_000_022","rotations":[0],"weight":1},{"name":"set3_221_120_021_122","rotations":[0],"weight":1},{"name":"set3_221_120_022_222","rotations":[0],"weight":1},{"name":"set3_221_122_220_022","rotations":[0],"weight":1},{"name":"set3_221_122_221_122","rotations":[0],"weight":1},{"name":"set3_221_122_222_222","rotations":[0],"weight":1},{"name":"set3_222_220_000_022","rotations":[0],"weight":1},{"name":"set3_222_220_021_122","rotations":[0],"weight":1},{"name":"set3_222_220_022_222","rotations":[0],"weight":1},{"name":"set3_222_221_111_122","rotations":[0],"weight":1},{"name":"set3_222_221_120_022","rotations":[0],"weight":1},{"name":"set3_222_221_122_222","rotations":[0],"weight":1},{"name":"set3_222_222_220_022","rotations":[0],"weight":1},{"name":"set3_222_222_221_122","rotations":[0],"weight":1},{"name":"set3_222_222_222_222","rotations":[0],"weight":1}]}');

/***/ }),

/***/ "./src/metadata/tiles/Knots.json":
/*!***************************************!*\
  !*** ./src/metadata/tiles/Knots.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"Knots","socketGenerator":{"type":"pixels","settings":{"gridSize":3,"buckets":2}}},"tiles":[{"name":"corner","rotations":[0,1,2,3],"weight":1},{"name":"cross","rotations":[0,1],"weight":1},{"name":"empty","rotations":[0],"weight":1},{"name":"line","rotations":[0,1],"weight":1},{"name":"t","rotations":[0,1,2,3],"weight":1}]}');

/***/ }),

/***/ "./src/metadata/tiles/Rooms.json":
/*!***************************************!*\
  !*** ./src/metadata/tiles/Rooms.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"Rooms","socketGenerator":{"type":"pixels","settings":{"gridSize":3,"buckets":2}}},"tiles":[{"name":"bend","rotations":[0,1,2,3],"weight":1,"socket":{"top":"100","right":"001","bottom":"111","left":"111"}},{"name":"corner","rotations":[0,1,2,3],"weight":1,"socket":{"top":"001","right":"100","bottom":"000","left":"000"}},{"name":"corridor","rotations":[0,1],"weight":1,"socket":{"top":"010","right":"000","bottom":"010","left":"000"}},{"name":"door","rotations":[0,1,2,3],"weight":1,"socket":{"top":"111","right":"100","bottom":"010","left":"001"}},{"name":"empty","rotations":[0],"weight":1,"socket":{"top":"111","right":"111","bottom":"111","left":"111"}},{"name":"side","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"001","bottom":"111","left":"100"}},{"name":"t","rotations":[0,1,2,3],"weight":1,"socket":{"top":"000","right":"010","bottom":"010","left":"010"}},{"name":"turn","rotations":[0,1,2,3],"weight":1,"socket":{"top":"010","right":"010","bottom":"000","left":"000"}},{"name":"wall","rotations":[0],"weight":1,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}}]}');

/***/ }),

/***/ "./src/metadata/tiles/Sudoku.json":
/*!****************************************!*\
  !*** ./src/metadata/tiles/Sudoku.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"1","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"1":[0]},"right":{"1":[0]},"top":{"1":[0]},"left":{"1":[0]},"grid":{"1":[0]}}},{"name":"2","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"2":[0]},"right":{"2":[0]},"top":{"2":[0]},"left":{"2":[0]},"grid":{"2":[0]}}},{"name":"3","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"3":[0]},"right":{"3":[0]},"top":{"3":[0]},"left":{"3":[0]},"grid":{"3":[0]}}},{"name":"4","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"4":[0]},"right":{"4":[0]},"top":{"4":[0]},"left":{"4":[0]},"grid":{"4":[0]}}},{"name":"5","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"5":[0]},"right":{"5":[0]},"top":{"5":[0]},"left":{"5":[0]},"grid":{"5":[0]}}},{"name":"6","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"6":[0]},"right":{"6":[0]},"top":{"6":[0]},"left":{"6":[0]},"grid":{"6":[0]}}},{"name":"7","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"7":[0]},"right":{"7":[0]},"top":{"7":[0]},"left":{"7":[0]},"grid":{"7":[0]}}},{"name":"8","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"8":[0]},"right":{"8":[0]},"top":{"8":[0]},"left":{"8":[0]},"grid":{"8":[0]}}},{"name":"9","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"9":[0]},"right":{"9":[0]},"top":{"9":[0]},"left":{"9":[0]},"grid":{"9":[0]}}},{"name":"A","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"A":[0]},"right":{"A":[0]},"top":{"A":[0]},"left":{"A":[0]},"grid":{"A":[0]}}},{"name":"B","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"B":[0]},"right":{"B":[0]},"top":{"B":[0]},"left":{"B":[0]},"grid":{"B":[0]}}},{"name":"C","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"C":[0]},"right":{"C":[0]},"top":{"C":[0]},"left":{"C":[0]},"grid":{"C":[0]}}},{"name":"D","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"D":[0]},"right":{"D":[0]},"top":{"D":[0]},"left":{"D":[0]},"grid":{"D":[0]}}},{"name":"E","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"E":[0]},"right":{"E":[0]},"top":{"E":[0]},"left":{"E":[0]},"grid":{"E":[0]}}},{"name":"F","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"F":[0]},"right":{"F":[0]},"top":{"F":[0]},"left":{"F":[0]},"grid":{"F":[0]}}},{"name":"G","rotations":[0],"weight":1,"socket":{"top":"0","right":"0","bottom":"0","left":"0","grid":"0","grid2":"0"},"blacklist":{"bottom":{"G":[0]},"right":{"G":[0]},"top":{"G":[0]},"left":{"G":[0]},"grid":{"G":[0]}}}]');

/***/ }),

/***/ "./src/metadata/tiles/Summer.json":
/*!****************************************!*\
  !*** ./src/metadata/tiles/Summer.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"Summer","socketGenerator":{"type":"pixelsedge","settings":{}}},"tiles":[{"name":"cliff 0","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"040","bottom":"000","left":"040"}},{"name":"cliff 1","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"040","left":"000"}},{"name":"cliff 2","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"030","bottom":"000","left":"030"}},{"name":"cliff 3","rotations":[0],"weight":0.1,"socket":{"top":"030","right":"000","bottom":"030","left":"000"}},{"name":"cliffcorner 0","rotations":[0],"weight":0.1,"socket":{"top":"030","right":"030","bottom":"000","left":"000"}},{"name":"cliffcorner 1","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"000","left":"030"}},{"name":"cliffcorner 2","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"000","bottom":"030","left":"040"}},{"name":"cliffcorner 3","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"040","bottom":"040","left":"000"}},{"name":"cliffturn 0","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"040","bottom":"000","left":"000"}},{"name":"cliffturn 1","rotations":[0],"weight":0.1,"socket":{"top":"040","right":"000","bottom":"000","left":"040"}},{"name":"cliffturn 2","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"000","bottom":"030","left":"030"}},{"name":"cliffturn 3","rotations":[0],"weight":0.1,"socket":{"top":"000","right":"030","bottom":"030","left":"000"}},{"name":"grass 0","rotations":[0],"weight":2,"socket":{"top":"000","right":"000","bottom":"000","left":"000"}},{"name":"grasscorner 0","rotations":[0],"weight":0.4,"socket":{"top":"110","right":"011","bottom":"111","left":"111"}},{"name":"grasscorner 1","rotations":[0],"weight":0.4,"socket":{"top":"011","right":"111","bottom":"111","left":"110"}},{"name":"grasscorner 2","rotations":[0],"weight":0.4,"socket":{"top":"111","right":"111","bottom":"110","left":"011"}},{"name":"grasscorner 3","rotations":[0],"weight":0.4,"socket":{"top":"111","right":"110","bottom":"011","left":"111"}},{"name":"road 0","rotations":[0],"weight":0.7,"socket":{"top":"111","right":"110","bottom":"000","left":"011"}},{"name":"road 1","rotations":[0],"weight":0.7,"socket":{"top":"110","right":"000","bottom":"011","left":"111"}},{"name":"road 2","rotations":[0],"weight":0.7,"socket":{"top":"000","right":"011","bottom":"111","left":"110"}},{"name":"road 3","rotations":[0],"weight":0.7,"socket":{"top":"011","right":"111","bottom":"110","left":"000"}},{"name":"roadturn 0","rotations":[0],"weight":0.2,"socket":{"top":"011","right":"110","bottom":"000","left":"000"}},{"name":"roadturn 1","rotations":[0],"weight":0.2,"socket":{"top":"110","right":"000","bottom":"000","left":"011"}},{"name":"roadturn 2","rotations":[0],"weight":0.2,"socket":{"top":"000","right":"000","bottom":"011","left":"110"}},{"name":"roadturn 3","rotations":[0],"weight":0.2,"socket":{"top":"000","right":"011","bottom":"110","left":"000"}},{"name":"water_a 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"water_b 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"water_c 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"222","left":"222"}},{"name":"watercorner 0","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"230","bottom":"000","left":"000"}},{"name":"watercorner 1","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"000","bottom":"000","left":"032"}},{"name":"watercorner 2","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"000","bottom":"032","left":"230"}},{"name":"watercorner 3","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"032","bottom":"230","left":"000"}},{"name":"waterside 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"230","bottom":"000","left":"032"}},{"name":"waterside 1","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"000","bottom":"032","left":"222"}},{"name":"waterside 2","rotations":[0],"weight":0.3,"socket":{"top":"000","right":"032","bottom":"222","left":"230"}},{"name":"waterside 3","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"222","bottom":"230","left":"000"}},{"name":"waterturn 0","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"222","bottom":"230","left":"032"}},{"name":"waterturn 1","rotations":[0],"weight":0.3,"socket":{"top":"222","right":"230","bottom":"032","left":"222"}},{"name":"waterturn 2","rotations":[0],"weight":0.3,"socket":{"top":"230","right":"032","bottom":"222","left":"222"}},{"name":"waterturn 3","rotations":[0],"weight":0.3,"socket":{"top":"032","right":"222","bottom":"222","left":"230"}}]}');

/***/ }),

/***/ "./src/metadata/tiles/TmwDesertSpacing.json":
/*!**************************************************!*\
  !*** ./src/metadata/tiles/TmwDesertSpacing.json ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"metadata":{"name":"TmwDesertSpacing","socketGenerator":{"type2":"name","settings2":{"namingtype":"rows","regex":"(.{3})_(.{3})_(.{3})"},"type":"pixelsedge","settings":{}}},"tiles":[{"name":"000_000_000","rotations":[0],"weight":1},{"name":"000_000_001","rotations":[0],"weight":1},{"name":"000_000_100","rotations":[0],"weight":1},{"name":"000_000_111","rotations":[0],"weight":1},{"name":"000_033_032","rotations":[0],"weight":1},{"name":"000_055_054","rotations":[0],"weight":1},{"name":"000_0a0_000","rotations":[0],"weight":1},{"name":"000_0b0_000","rotations":[0],"weight":1},{"name":"000_0c0_000","rotations":[0],"weight":1},{"name":"000_0d0_000","rotations":[0],"weight":1},{"name":"000_0e0_000","rotations":[0],"weight":1},{"name":"000_0f0_000","rotations":[0],"weight":1},{"name":"000_0g0_000","rotations":[0],"weight":1},{"name":"000_0h0_000","rotations":[0],"weight":1},{"name":"000_330_230","rotations":[0],"weight":1},{"name":"000_333_222","rotations":[0],"weight":1},{"name":"000_550_450","rotations":[0],"weight":1},{"name":"000_555_444","rotations":[0],"weight":1},{"name":"001_000_000","rotations":[0],"weight":1},{"name":"001_001_001","rotations":[0],"weight":1},{"name":"001_001_111","rotations":[0],"weight":1},{"name":"032_032_032","rotations":[0],"weight":1},{"name":"032_033_000","rotations":[0],"weight":1},{"name":"032_332_222","rotations":[0],"weight":1},{"name":"054_054_054","rotations":[0],"weight":1},{"name":"054_055_000","rotations":[0],"weight":1},{"name":"054_554_444","rotations":[0],"weight":1},{"name":"100_000_000","rotations":[0],"weight":1},{"name":"100_100_100","rotations":[0],"weight":1},{"name":"100_100_111","rotations":[0],"weight":1},{"name":"111_000_000","rotations":[0],"weight":1},{"name":"111_001_001","rotations":[0],"weight":1},{"name":"111_100_100","rotations":[0],"weight":1},{"name":"111_111_111","rotations":[0],"weight":1},{"name":"222_222_222","rotations":[0],"weight":1},{"name":"222_233_230","rotations":[0],"weight":1},{"name":"222_332_032","rotations":[0],"weight":1},{"name":"222_333_000","rotations":[0],"weight":1},{"name":"230_230_230","rotations":[0],"weight":1},{"name":"230_233_222","rotations":[0],"weight":1},{"name":"230_330_000","rotations":[0],"weight":1},{"name":"444_444_444","rotations":[0],"weight":1},{"name":"444_455_450","rotations":[0],"weight":1},{"name":"444_554_054","rotations":[0],"weight":1},{"name":"444_555_000","rotations":[0],"weight":1},{"name":"450_450_450","rotations":[0],"weight":1},{"name":"450_455_444","rotations":[0],"weight":1},{"name":"450_550_000","rotations":[0],"weight":1}]}');

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
/* harmony import */ var _WFCTiles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WFCTiles */ "./src/WFCTiles.ts");
/* harmony import */ var _WFCRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WFCRender */ "./src/WFCRender.ts");
/* harmony import */ var _WFCTextRender__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WFCTextRender */ "./src/WFCTextRender.ts");
/* harmony import */ var _WFCRunner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WFCRunner */ "./src/WFCRunner.ts");




window.getWFCRender = function getWFCRender(canvasId) {
    return new _WFCRender__WEBPACK_IMPORTED_MODULE_1__.WFCRender(canvasId);
};
window.getWFCTextRender = function getWFCTextRender(canvasId) {
    return new _WFCTextRender__WEBPACK_IMPORTED_MODULE_2__.WFCTextRender(canvasId);
};
window.getWFC = function getWFC() {
    return new _WFCTiles__WEBPACK_IMPORTED_MODULE_0__.WFCTiles();
};
window.getWFCRunner = function getWFCRunner(config, wfc) {
    return new _WFCRunner__WEBPACK_IMPORTED_MODULE_3__.WFCRunner(config, wfc);
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map