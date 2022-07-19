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

[
    {
        'name': 'corner',
        'imgsrc': 'corner.png',
        'rotations': [0,1,2,3],
        'valid': {
            'top': [
                {key: 'corner', rotations: [1, 2]},
                {key: 't', rotations: [0, 1, 3]},
                {key: 'cross', rotations: [0, 1, 2, 3]},
                {key: 'line', rotations: [1,3]},
            ],
            'right': [
                {key: 'corner', rotations: [2, 3]},
                {key: 't', rotations: [0, 1, 2]},
                {key: 'cross', rotations: [0, 1, 2, 3]},
                {key: 'line', rotations: [0,2]},
            ],
            'bottom': [
                {key: 'corner', rotations: [1, 2]},
                {key: 't', rotations: [0]},
                {key: 'line', rotations: [0,2]},
                {key: 'empty', rotations: [0,1,2,3]},
            ],
            'left': [
                {key: 'corner', rotations: [2, 3]},
                {key: 't', rotations: [1]},
                {key: 'line', rotations: [1,3]},
                {key: 'empty', rotations: [0,1,2,3]},
            ]
        }
    },
    {
        'name': 'cross',
        'imgsrc': 'cross.png',
        'rotations': [0,1,2,3],
        'valid': {
            'top': [
                {key: 'corner', rotations: [1, 2]},
                {key: 't', rotations: [0, 1, 3]},
                {key: 'cross', rotations: [0, 1, 2, 3]},
                {key: 'line', rotations: [1,3]},
            ],
            'right': [
                {key: 'corner', rotations: [2, 3]},
                {key: 't', rotations: [0, 1, 2]},
                {key: 'cross', rotations: [0, 1, 2, 3]},
                {key: 'line', rotations: [0,2]},
            ],
            'bottom': [
                {key: 'corner', rotations: [0, 3]},
                {key: 't', rotations: [1, 2, 3]},
                {key: 'cross', rotations: [0, 1, 2, 3]},
                {key: 'line', rotations: [1,3]},
            ],
            'left': [
                {key: 'corner', rotations: [0, 1]},
                {key: 't', rotations: [0, 2, 3]},
                {key: 'cross', rotations: [0, 1, 2, 3]},
                {key: 'line', rotations: [0,2]},
            ]
        }
    },
    {
        'name': 'empty',
        'imgsrc': 'empty.png',
        'rotations': [0,1,2,3],
        'valid': {
            'top': [
                {key: 'corner', rotations: [0, 3]},
                {key: 't', rotations: [2]},
                {key: 'line', rotations: [0,2]},
                {key: 'empty', rotations: [0,1,2,3]},
            ],
            'right': [
                {key: 'corner', rotations: [0, 1]},
                {key: 't', rotations: [3]},
                {key: 'line', rotations: [1,3]},
                {key: 'empty', rotations: [0,1,2,3]},
            ],
            'bottom': [
                {key: 'corner', rotations: [1, 2]},
                {key: 't', rotations: [0]},
                {key: 'line', rotations: [0,2]},
                {key: 'empty', rotations: [0,1,2,3]},
            ],
            'left': [
                {key: 'corner', rotations: [2, 3]},
                {key: 't', rotations: [1]},
                {key: 'line', rotations: [1,3]},
                {key: 'empty', rotations: [0,1,2,3]},
            ]
        }
    },
    {
        'name': 'line',
        'imgsrc': 'line.png',
        'rotations': [0,1,2,3],
        'valid': {
            'top': [
                {key: 'corner', rotations: [0, 3]},
                {key: 't', rotations: [2]},
                {key: 'line', rotations: [0,2]},
                {key: 'empty', rotations: [0,1,2,3]},
            ],
            'right': [
                {key: 'corner', rotations: [2, 3]},
                {key: 't', rotations: [0, 1, 2]},
                {key: 'cross', rotations: [0, 1,2,3]},
                {key: 'line', rotations: [0,2]},
            ],
            'bottom': [
                {key: 'corner', rotations: [1, 2]},
                {key: 't', rotations: [0]},
                {key: 'line', rotations: [0,2]},
                {key: 'empty', rotations: [0,1,2,3]},
            ],
            'left': [
                {key: 'corner', rotations: [0, 1]},
                {key: 't', rotations: [0, 2, 3]},
                {key: 'cross', rotations: [0, 1,2,3]},
                {key: 'line', rotations: [0,2]},
            ]
        }
    },
    {
        'name': 't',
        'imgsrc': 't.png',
        'rotations': [0,1,2,3],
        'valid': {
            'top': [
                {key: 'corner', rotations: [0, 3]},
                {key: 't', rotations: [2]},
                {key: 'line', rotations: [0,2]},
                {key: 'empty', rotations: [0,1,2,3]},
            ],
            'right': [
                {key: 'corner', rotations: [2, 3]},
                {key: 't', rotations: [0, 1, 2]},
                {key: 'cross', rotations: [0, 1,2,3]},
                {key: 'line', rotations: [0,2]},
            ],
            'bottom': [
                {key: 'corner', rotations: [0, 3]},
                {key: 't', rotations: [1, 2, 3]},
                {key: 'cross', rotations: [0, 1,2,3]},
                {key: 'line', rotations: [1,3]},
            ],
            'left': [
                {key: 'corner', rotations: [0, 1]},
                {key: 't', rotations: [0, 2, 3]},
                {key: 'cross', rotations: [0, 1,2,3]},
                {key: 'line', rotations: [0,2]},
            ]
        }
    },
    ]