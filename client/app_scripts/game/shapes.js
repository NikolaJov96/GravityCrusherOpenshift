// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Definitions of object shapes

objectShapes.ship = {
    vert:[
        0.5, 0.0, 0.0,      0.5, 0.0,
        -0.5, 0.5, 0.0,     1.0, 1.0,
        -0.5, -0.5, 0.0,    0.0, 1.0
    ],
    ind:[0, 1, 2]
};

objectShapes.exhaust = {
    vert:[
        0.3, 0.1, 0.0,      0.0, 0.0,
        -0.3, -0.1, 0.0,    1.0, 1.0,
        0.3, -0.1, 0.0,     1.0, 0.0,
        -0.3, 0.1, 0.0,     0.0, 1.0
    ],
    ind:[
        0, 1, 2,
        0, 1, 3
    ]
};
