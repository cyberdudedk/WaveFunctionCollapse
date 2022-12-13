class WFC {
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

        const queryParams = new URLSearchParams(window.location.search);
        this.tileName = queryParams.get('tile') ?? this.tileName;
        this.set = queryParams.get('set') ?? this.set;
        this.maxRetryCount = parseInt((queryParams.get('maxRetryCount') ?? this.maxRetryCount) as string);
        this.maxDepth =  parseInt((queryParams.get('maxDepth') ?? this.maxDepth) as string);
        this.tileScaleHeight =  parseInt((queryParams.get('tileScale') ?? this.tileScaleHeight) as string);
        this.tileScaleWidth =  parseInt((queryParams.get('tileScale') ?? this.tileScaleWidth) as string);
        this.fast = !!parseInt((queryParams.get('fast') ?? this.fast) as string);
        this.runSpeed =  parseInt((queryParams.get('runSpeed') ?? this.runSpeed) as string);
        this.runLoop =  parseInt((queryParams.get('runLoop') ?? this.runLoop) as string);
        this.tilesHeight =  parseInt((queryParams.get('tilesHeight') ?? this.tilesHeight) as string);
        this.tilesWidth =  parseInt((queryParams.get('tilesWidth') ?? this.tilesWidth) as string);
        this.superImposed =  parseInt((queryParams.get('superImposed') ?? this.superImposed) as string);
        this.useMouse = !!parseInt((queryParams.get('useMouse') ?? this.useMouse) as string);

        this.halfScaleHeight = this.tileScaleHeight / 2;
        this.halfScaleWidth = this.tileScaleWidth / 2;
        canvas.height = this.tilesHeight * this.tileScaleHeight;
        canvas.width = this.tilesWidth * this.tileScaleWidth;
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

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
            'Circles': {
                all: {
                    "b_half": { }, 
                    "b_i": { }, 
                    "b_quarter": { }, 
                    "b": { }, 
                    "w_half": { }, 
                    "w_i": { }, 
                    "w_quarter": { },
                    "w": { },
                },
                large: {
                    "b_quarter": { }, 
                    "w_quarter": { },
                },
                largeandsolid: {
                    "b_quarter": { }, 
                    "b": { }, 
                    "w_quarter": { },
                    "w": { },
                },
                nosolid: {
                    "b_half": { }, 
                    "b_i": { }, 
                    "b_quarter": { }, 
                    "w_half": { }, 
                    "w_i": { }, 
                    "w_quarter": { },
                }
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
            },
            'Rooms': {
                all: {
                    "bend": { }, 
                    "corner": { }, 
                    "corridor": { }, 
                    "door": { }, 
                    "empty": { }, 
                    "side": { }, 
                    "t": { },
                    "turn": { },
                    "wall": { },
                }
            },
            'FloorPlan': {
                all: {
                    "div": {},
                    "divt": {},
                    "divturn": {},
                    "door": {},
                    "empty": {},
                    "floor": {},
                    "glass": {},
                    "halfglass": {},
                    "halfglass2": {},
                    "in": {},
                    "out": {},
                    "stairs": {},
                    "table": {},
                    "vent": {},
                    "w": {},
                    "wall": {},
                    "walldiv": {},
                    "window": {},
                }
            },
            'Summer': {
                all: {
                    "cliff 0": {},
                    "cliff 1": {},
                    "cliff 2": {},
                    "cliff 3": {},
                    "cliffcorner 0": {},
                    "cliffcorner 1": {},
                    "cliffcorner 2": {},
                    "cliffcorner 3": {},
                    "cliffturn 0": {},
                    "cliffturn 1": {},
                    "cliffturn 2": {},
                    "cliffturn 3": {},
                    "grass 0": {},
                    "grasscorner 0": {},
                    "grasscorner 1": {},
                    "grasscorner 2": {},
                    "grasscorner 3": {},
                    "road 0": {},
                    "road 1": {},
                    "road 2": {},
                    "road 3": {},
                    "roadturn 0": {},
                    "roadturn 1": {},
                    "roadturn 2": {},
                    "roadturn 3": {},
                    "water_a 0": {},
                    "water_b 0": {},
                    "water_c 0": {},
                    "watercorner 0": {},
                    "watercorner 1": {},
                    "watercorner 2": {},
                    "watercorner 3": {},
                    "waterside 0": {},
                    "waterside 1": {},
                    "waterside 2": {},
                    "waterside 3": {},
                    "waterturn 0": {},
                    "waterturn 1": {},
                    "waterturn 2": {},
                    "waterturn 3": {},
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
                    },
                    'blacklist': {
                        'bottom': {'connection':[2]},
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
                    'rotations': [0, 1, 2, 3],
                    'weight': 1,
                    'socket': {
                        'top': ['030'],
                        'right': ['030'],
                        'bottom': ['000'],
                        'left': ['000']
                    },
                    "blacklist": {
                        "bottom": {"tower": [0, 1, 2, 3], "wall": [1,3]},
                        "right": {"tower": [0, 1, 2, 3], "wall": [0,2]},
                        "top": {"tower": [0, 1, 2, 3], "wall": [1,3]},
                        "left": {"tower": [0, 1, 2, 3], "wall": [0,2]},
                    }
                },
                {
                    'name': 'wall',
                    'imgsrc': 'wall.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '030',
                        'right': '000',
                        'bottom': '030',
                        'left': '000'
                    },
                    "blacklist": {
                        "left": {"wall": [0], "wallriver": [0], "wallroad": [0], "tower": [0, 1, 2, 3]},
                        "right": {"wall": [0], "wallriver": [0], "wallroad": [0], "tower": [0, 1, 2, 3]},
                    }
                },
                {
                    'name': 'wallriver',
                    'imgsrc': 'wallriver.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '030',
                        'right': '010',
                        'bottom': '030',
                        'left': '010'
                    },
                    "blacklist": {
                        "left": {"wall": [0], "wallriver": [0], "wallroad": [0], "tower": [0, 1, 2, 3]},
                        "right": {"wall": [0], "wallriver": [0], "wallroad": [0], "tower": [0, 1, 2, 3]},
                    }
                },
                {
                    'name': 'wallroad',
                    'imgsrc': 'wallroad.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '030',
                        'right': '020',
                        'bottom': '030',
                        'left': '020'
                    },
                    "blacklist": {
                        "left": {"wall": [0], "wallriver": [0], "wallroad": [0], "tower": [0, 1, 2, 3]},
                        "right": {"wall": [0], "wallriver": [0], "wallroad": [0], "tower": [0, 1, 2, 3]},
                    }
                },
            ],
            'Circles': [
                {
                    'name': 'b_half',
                    'imgsrc': 'b_half.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '011',
                        'bottom': '111',
                        'left': '110'
                    },
                },
                {
                    'name': 'b_i',
                    'imgsrc': 'b_i.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '010',
                        'bottom': '000',
                        'left': '010'
                    },
                },
                {
                    'name': 'b_quarter',
                    'imgsrc': 'b_quarter.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '111',
                        'left': '111'
                    },
                },
                {
                    'name': 'b',
                    'imgsrc': 'b.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '000',
                        'left': '000'
                    },
                },
                {
                    'name': 'w_half',
                    'imgsrc': 'w_half.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '100',
                        'bottom': '000',
                        'left': '001'
                    },
                },
                {
                    'name': 'w_i',
                    'imgsrc': 'w_i.png',
                    'rotations': [0,1],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '101',
                        'bottom': '111',
                        'left': '101'
                    },
                },
                {
                    'name': 'w_quarter',
                    'imgsrc': 'w_quarter.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '111',
                        'bottom': '000',
                        'left': '000'
                    },
                },
                {
                    'name': 'w',
                    'imgsrc': 'w.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '111',
                        'bottom': '111',
                        'left': '111'
                    },
                },
            ],
            'Rooms': [
                {
                    'name': 'bend',
                    'imgsrc': 'bend.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '100',
                        'right': '001',
                        'bottom': '111',
                        'left': '111'
                    }
                },
                {
                    'name': 'corner',
                    'imgsrc': 'corner.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '001',
                        'right': '100',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'corridor',
                    'imgsrc': 'corridor.png',
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
                    'name': 'door',
                    'imgsrc': 'door.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '100',
                        'bottom': '010',
                        'left': '100'
                    }
                },
                {
                    'name': 'empty',
                    'imgsrc': 'empty.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '111',
                        'bottom': '111',
                        'left': '111'
                    }
                },
                {
                    'name': 'side',
                    'imgsrc': 'side.png',
                    'rotations': [0,1,2,3],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '001',
                        'bottom': '111',
                        'left': '100'
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
                    'name': 'wall',
                    'imgsrc': 'wall.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '000',
                        'left': '000'
                    }
                },
            ],
            'FloorPlan': [
                {
                    'name': 'div',
                    'imgsrc': 'div.png',
                    'rotations': [0,1],
                    'weight': .5,
                    'socket': {
                        'top': '111',
                        'right': '121',
                        'bottom': '111',
                        'left': '121'
                    }
                },
                {
                    'name': 'divt',
                    'imgsrc': 'divt.png',
                    'rotations': [0,1,2,3],
                    'weight': .5,
                    'socket': {
                        'top': '111',
                        'right': '121',
                        'bottom': '121',
                        'left': '121'
                    }
                },
                {
                    'name': 'divturn',
                    'imgsrc': 'divturn.png',
                    'rotations': [0,1,2,3],
                    'weight': .5,
                    'socket': {
                        'top': '121',
                        'right': '121',
                        'bottom': '111',
                        'left': '111'
                    }
                },
                {
                    'name': 'door',
                    'imgsrc': 'door.png',
                    'rotations': [0,1,2,3],
                    'weight': .2,
                    'socket': {
                        'top': '111',
                        'right': '121',
                        'bottom': '111',
                        'left': '121'
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
                    'name': 'floor',
                    'imgsrc': 'floor.png',
                    'rotations': [0],
                    'weight': 3,
                    'socket': {
                        'top': '111',
                        'right': '111',
                        'bottom': '111',
                        'left': '111'
                    }
                },
                {
                    'name': 'glass',
                    'imgsrc': 'glass.png',
                    'rotations': [0,1,2,3],
                    'weight': .1,
                    'socket': {
                        'top': '111',
                        'right': '130',
                        'bottom': '000',
                        'left': '031'
                    }
                },
                {
                    'name': 'halfglass',
                    'imgsrc': 'halfglass.png',
                    'rotations': [0,1,2,3],
                    'weight': .3,
                    'socket': {
                        'top': '111',
                        'right': '130',
                        'bottom': '000',
                        'left': '021'
                    }
                },
                {
                    'name': 'halfglass2',
                    'imgsrc': 'halfglass2.png',
                    'rotations': [0,1,2,3],
                    'weight': .3,
                    'socket': {
                        'top': '111',
                        'right': '120',
                        'bottom': '000',
                        'left': '031'
                    }
                },
                {
                    'name': 'in',
                    'imgsrc': 'in.png',
                    'rotations': [0,1,2,3],
                    'weight': .1,
                    'socket': {
                        'top': '111',
                        'right': '111',
                        'bottom': '120',
                        'left': '021'
                    }
                },
                {
                    'name': 'out',
                    'imgsrc': 'out.png',
                    'rotations': [0,1,2,3],
                    'weight': .1,
                    'socket': {
                        'top': '021',
                        'right': '120',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'stairs',
                    'imgsrc': 'stairs.png',
                    'rotations': [0,1,2,3],
                    'weight': .2,
                    'socket': {
                        'top': '111',
                        'right': '121',
                        'bottom': '222',
                        'left': '121'
                    }
                },
                {
                    'name': 'table',
                    'imgsrc': 'table.png',
                    'rotations': [0],
                    'weight': .1,
                    'socket': {
                        'top': '111',
                        'right': '111',
                        'bottom': '111',
                        'left': '111'
                    }
                },
                {
                    'name': 'vent',
                    'imgsrc': 'vent.png',
                    'rotations': [0],
                    'weight': .1,
                    'socket': {
                        'top': '111',
                        'right': '111',
                        'bottom': '111',
                        'left': '111'
                    }
                },
                {
                    'name': 'w',
                    'imgsrc': 'w.png',
                    'rotations': [0,1,2,3],
                    'weight': .1,
                    'socket': {
                        'top': '111',
                        'right': '120',
                        'bottom': '000',
                        'left': '021'
                    }
                },
                {
                    'name': 'wall',
                    'imgsrc': 'wall.png',
                    'rotations': [0,1,2,3],
                    'weight': .25,
                    'socket': {
                        'top': '111',
                        'right': '120',
                        'bottom': '000',
                        'left': '021'
                    }
                },
                {
                    'name': 'walldiv',
                    'imgsrc': 'walldiv.png',
                    'rotations': [0,1,2,3],
                    'weight': .25,
                    'socket': {
                        'top': '121',
                        'right': '120',
                        'bottom': '000',
                        'left': '021'
                    }
                },
                {
                    'name': 'window',
                    'imgsrc': 'window.png',
                    'rotations': [0,1,2,3],
                    'weight': .05,
                    'socket': {
                        'top': '111',
                        'right': '120',
                        'bottom': '000',
                        'left': '021'
                    }
                },
            ],
            //Grass = 0
            //Road = 1
            //Water = 2
            //small Cliff = 3
            //large Cliff = 4
            'Summer': [
                {
                    'name': 'cliff 0',
                    'imgsrc': 'cliff 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '040',
                        'bottom': '000',
                        'left': '040'
                    }
                },
                {
                    'name': 'cliff 1',
                    'imgsrc': 'cliff 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '040',
                        'right': '000',
                        'bottom': '040',
                        'left': '000'
                    }
                },
                {
                    'name': 'cliff 2',
                    'imgsrc': 'cliff 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '030',
                        'bottom': '000',
                        'left': '030'
                    }
                },
                {
                    'name': 'cliff 3',
                    'imgsrc': 'cliff 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '030',
                        'right': '000',
                        'bottom': '030',
                        'left': '000'
                    }
                },            
                {
                    'name': 'cliffcorner 0',
                    'imgsrc': 'cliffcorner 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '030',
                        'right': '030',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'cliffcorner 1',
                    'imgsrc': 'cliffcorner 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '040',
                        'right': '000',
                        'bottom': '000',
                        'left': '030'
                    }
                },
                {
                    'name': 'cliffcorner 2',
                    'imgsrc': 'cliffcorner 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '030',
                        'left': '040'
                    }
                },
                {
                    'name': 'cliffcorner 3',
                    'imgsrc': 'cliffcorner 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '040',
                        'bottom': '030',
                        'left': '000'
                    }
                },
                {
                    'name': 'cliffturn 0',
                    'imgsrc': 'cliffturn 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '040',
                        'right': '040',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'cliffturn 1',
                    'imgsrc': 'cliffturn 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '040',
                        'right': '000',
                        'bottom': '000',
                        'left': '040'
                    }
                },
                {
                    'name': 'cliffturn 2',
                    'imgsrc': 'cliffturn 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '030',
                        'left': '030'
                    }
                },
                {
                    'name': 'cliffturn 3',
                    'imgsrc': 'cliffturn 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '030',
                        'bottom': '030',
                        'left': '000'
                    }
                },
                {
                    'name': 'grass 0',
                    'imgsrc': 'grass 0.png',
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
                    'name': 'grasscorner 0',
                    'imgsrc': 'grasscorner 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '110',
                        'right': '011',
                        'bottom': '111',
                        'left': '111'
                    }
                },
                {
                    'name': 'grasscorner 1',
                    'imgsrc': 'grasscorner 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '011',
                        'right': '111',
                        'bottom': '111',
                        'left': '110'
                    }
                },
                {
                    'name': 'grasscorner 2',
                    'imgsrc': 'grasscorner 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '111',
                        'bottom': '110',
                        'left': '011'
                    }
                },
                {
                    'name': 'grasscorner 3',
                    'imgsrc': 'grasscorner 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '110',
                        'bottom': '011',
                        'left': '111'
                    }
                },
                {
                    'name': 'road 0',
                    'imgsrc': 'road 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '111',
                        'right': '110',
                        'bottom': '000',
                        'left': '011'
                    }
                },
                {
                    'name': 'road 1',
                    'imgsrc': 'road 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '110',
                        'right': '000',
                        'bottom': '011',
                        'left': '111'
                    }
                },
                {
                    'name': 'road 2',
                    'imgsrc': 'road 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '011',
                        'bottom': '111',
                        'left': '110'
                    }
                },
                {
                    'name': 'road 3',
                    'imgsrc': 'road 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '011',
                        'right': '111',
                        'bottom': '110',
                        'left': '000'
                    }
                },
                {
                    'name': 'roadturn 0',
                    'imgsrc': 'roadturn 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '011',
                        'right': '110',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'roadturn 1',
                    'imgsrc': 'roadturn 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '110',
                        'right': '000',
                        'bottom': '000',
                        'left': '011'
                    }
                },
                {
                    'name': 'roadturn 2',
                    'imgsrc': 'roadturn 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '011',
                        'left': '110'
                    }
                },
                {
                    'name': 'roadturn 3',
                    'imgsrc': 'roadturn 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '011',
                        'bottom': '110',
                        'left': '000'
                    }
                },
                {
                    'name': 'water_a 0',
                    'imgsrc': 'water_a 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '222',
                        'right': '222',
                        'bottom': '222',
                        'left': '222'
                    }
                },
                {
                    'name': 'water_b 0',
                    'imgsrc': 'water_b 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '222',
                        'right': '222',
                        'bottom': '222',
                        'left': '222'
                    }
                },
                {
                    'name': 'water_c 0',
                    'imgsrc': 'water_c 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '222',
                        'right': '222',
                        'bottom': '222',
                        'left': '222'
                    }
                },
                {
                    'name': 'watercorner 0',
                    'imgsrc': 'watercorner 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '032',
                        'right': '230',
                        'bottom': '000',
                        'left': '000'
                    }
                },
                {
                    'name': 'watercorner 1',
                    'imgsrc': 'watercorner 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '230',
                        'right': '000',
                        'bottom': '000',
                        'left': '032'
                    }
                },
                {
                    'name': 'watercorner 2',
                    'imgsrc': 'watercorner 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '000',
                        'bottom': '032',
                        'left': '230'
                    }
                },
                {
                    'name': 'watercorner 3',
                    'imgsrc': 'watercorner 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '032',
                        'bottom': '230',
                        'left': '000'
                    }
                },
                {
                    'name': 'waterside 0',
                    'imgsrc': 'waterside 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '222',
                        'right': '230',
                        'bottom': '000',
                        'left': '032'
                    }
                },
                {
                    'name': 'waterside 1',
                    'imgsrc': 'waterside 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '230',
                        'right': '000',
                        'bottom': '032',
                        'left': '222'
                    }
                },
                {
                    'name': 'waterside 2',
                    'imgsrc': 'waterside 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '000',
                        'right': '032',
                        'bottom': '222',
                        'left': '230'
                    }
                },
                {
                    'name': 'waterside 3',
                    'imgsrc': 'waterside 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '032',
                        'right': '222',
                        'bottom': '230',
                        'left': '000'
                    }
                },
                {
                    'name': 'waterturn 0',
                    'imgsrc': 'waterturn 0.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '222',
                        'right': '222',
                        'bottom': '230',
                        'left': '032'
                    }
                },
                {
                    'name': 'waterturn 1',
                    'imgsrc': 'waterturn 1.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '222',
                        'right': '230',
                        'bottom': '032',
                        'left': '222'
                    }
                },
                {
                    'name': 'waterturn 2',
                    'imgsrc': 'waterturn 2.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '230',
                        'right': '032',
                        'bottom': '222',
                        'left': '222'
                    }
                },
                {
                    'name': 'waterturn 3',
                    'imgsrc': 'waterturn 3.png',
                    'rotations': [0],
                    'weight': 1,
                    'socket': {
                        'top': '032',
                        'right': '222',
                        'bottom': '222',
                        'left': '230'
                    }
                },
            ]
        };


        this.pieces = tilePieces[this.tileName];
        this.sets = tileSets[this.tileName];
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
                        //let socketMatchInnerValue: string = socket[1];
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
            (a,x) => {
                return Array.from({length:this.tilesHeight}, (b, y) => {
                  return {
                    position: {x: x, y: y},
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