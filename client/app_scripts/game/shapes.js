// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Definitions of object shapes
//   vertex format: x coord, y coord, z coord, x coord in texture, y coord in texture
//   inddex format: 1st, 2nd, 3rd vertex forming a triangle

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
