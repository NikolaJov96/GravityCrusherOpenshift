// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Source code of vertex and buffer shaders
// Vertex shader: program that calculates exact location of each vertex that is 
//                requested to be drawn, depending on other arguments
// Fragment shader: program that calculates exact color of each pixel on the screen 

var shaders = {
    vertexShader:[
        'precision mediump float;',
        '',
        'attribute vec3 vertPosition;',
        'attribute vec4 vertColor;',
        '',
        'varying vec4 fragColor;',
        '',
        'uniform mat4 projMatrix;',
        'uniform mat4 viewMatrix;',
        'uniform mat4 tranMatrix;',
        'uniform mat4 rotaMatrix;',
        'uniform mat4 scalMatrix;',
        '',
        'void main()',
        '{',
        '    fragColor = vertColor;',
        '    gl_Position = projMatrix * viewMatrix * tranMatrix * rotaMatrix * scalMatrix * vec4(vertPosition, 1.0);',
        '}'
    ].join('\n'),
    fragmentShader:[
        'precision mediump float;',
        '',
        'varying vec4 fragColor;',
        '',
        'void main()',
        '{',
        '    gl_FragColor = fragColor;',
        '}'
    ].join('\n')
}
