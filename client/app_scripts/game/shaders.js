// Nikola Jovanovic (NikolaJov96)

// Source code of vertex and buffer shaders

var shaders = {
    vertexShader:[
        'precision mediump float;',
        '',
        'attribute vec3 vertPosition;',
        'attribute vec4 vertColor;',
        '',
        'varying vec4 fragColor;',
        '',
        'uniform mat4 transMatrix;',
        '',
        'void main()',
        '{',
        '    fragColor = vertColor;',
        '    gl_Position = transMatrix * vec4(vertPosition, 1.0);',
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
