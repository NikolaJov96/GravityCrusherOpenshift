// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Source code of vertex and buffer shaders
// Vertex shader: program that calculates exact location of each vertex that is 
//                requested to be drawn, depending on other arguments
// Fragment shader: program that calculates exact color of each pixel on the screen 

var shaders = {
    vertexShaderText:[
        'precision mediump float;',
        '',
        'attribute vec3 vertPosition;',
        'attribute vec2 textCoord;',
        '',
        'uniform mat4 projMatrix;',
        'uniform mat4 viewMatrix;',
        'uniform mat4 tranMatrix;',
        'uniform mat4 rotaMatrix;',
        'uniform mat4 scalMatrix;',
        '',
        'varying highp vec2 textureCoord;',
        '',
        'void main()',
        '{',
        '    gl_Position = projMatrix * viewMatrix * tranMatrix * rotaMatrix * scalMatrix * vec4(vertPosition, 1.0);',
        '    textureCoord = textCoord;',
        '}'
    ].join('\n'),
    fragmentShaderText:[
        'precision mediump float;',
        '',
        'varying highp vec2 textureCoord;',
        '',
        'uniform sampler2D sampler;',
        '',
        'void main()',
        '{',
        '    gl_FragColor = texture2D(sampler, textureCoord);',
        '}'
    ].join('\n')
};
