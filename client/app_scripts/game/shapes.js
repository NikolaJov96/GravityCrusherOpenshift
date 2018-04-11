// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Definitions of object shapes
//   vertex format: 
//     x, y and z vertex coord,
//     x, y and z directions of vertex normal vector (used for lighting)
//     x and y vertex position in texture
//   inddex format: 1st, 2nd, 3rd vertex forming a triangle

objectShapes.ship = {
    vert: [
        140, 0.0, 0.0,      0.1, 0.3, 1.0,      0.5, 0.0,
        -100, 100, 0.0,     0.1, 0.3, 1.0,      1.0, 1.0,
        -100, 33, 30,       0.1, 0.3, 1.0,      0.66, 1.0,

        140, 0.0, 0.0,      0.3, 0.0, 1.0,      0.5, 0.0,
        -100, 33, 30,       0.3, 0.0, 1.0,      0.66, 1.0,
        -100, -33, 30,      0.3, 0.0, 1.0,      0.33, 1.0,

        140, 0.0, 0.0,      0.1, -0.3, 1.0,     0.5, 0.0,
        -100, -33, 30,      0.1, -0.3, 1.0,     0.33, 1.0,
        -100, -100, 0.0,    0.1, -0.3, 1.0,     0.0, 1.0
    ],
    ind: [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ]
};

objectShapes.exhaust = {
    vert: [
        60, 25, 0.0,      0.0, 0.0, 1.0,    0.0, 0.0,
        -60, -25, 0.0,    0.0, 0.0, 1.0,    1.0, 1.0,
        60, -25, 0.0,     0.0, 0.0, 1.0,    1.0, 0.0,
        -60, 25, 0.0,     0.0, 0.0, 1.0,    0.0, 1.0
    ],
    ind: [
        0, 1, 2,
        0, 1, 3
    ]
};

objectShapes.spaceBody = {
    vert: [
        50, 50, 0.0,      0.0, 0.0, 1.0,    0.0, 0.0,
        -50, -50, 0.0,    0.0, 0.0, 1.0,    1.0, 1.0,
        50, -50, 0.0,     0.0, 0.0, 1.0,    0.0, 1.0,
        -50, 50, 0.0,     0.0, 0.0, 1.0,    1.0, 0.0
    ],
    ind: [
        0, 1, 2,
        0, 1, 3
    ]
};
