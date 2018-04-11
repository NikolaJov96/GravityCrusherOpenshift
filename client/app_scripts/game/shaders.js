// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Source code of vertex and buffer shaders
// Vertex shader: program that calculates exact location of each vertex that is 
//                requested to be drawn, depending on transformation matrices
// Fragment shader: program that calculates exact color of each pixel on the screen 

var shaders = {
    vertexShaderText: [
        'precision mediump float;',
        '',
        'attribute vec3 vertPosition;',
        'attribute vec3 vertNormal;',
        'attribute vec2 textCoord;',
        '',
        'uniform mat4 projMatrix;',
        'uniform mat4 viewMatrix;',
        'uniform mat4 normMatrix;',
        'uniform mat4 tranMatrix;',
        '',
        'varying highp vec2 textureCoord;',
        'varying highp vec3 lighting;',
        '',
        'void main()',
        '{',
        '    gl_Position = projMatrix * viewMatrix * tranMatrix * vec4(vertPosition, 1.0);',
        '    textureCoord = textCoord;',
        '',
        '    // Apply lighting effect',
        '    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);',
        '    //highp vec3 ambientLight = vec3(1.0, 1.0, 1.0);',
        '    highp vec3 directionalLightColor = vec3(1, 1, 1);',
        '    highp vec3 directionalVector = normalize(vec3(0.0, 0.0, 1.0));',
        '    highp vec4 transformedNormal = normMatrix * vec4(vertNormal, 1.0);',
        '    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);',
        '    lighting = ambientLight + (directionalLightColor * directional);',
        '}'
    ].join('\n'),
    fragmentShaderText: [
        'precision mediump float;',
        '',
        'varying highp vec2 textureCoord;',
        'varying highp vec3 lighting;',
        '',
        'uniform sampler2D sampler;',
        '',
        'void main()',
        '{',
        '    highp vec4 pixelColor = texture2D(sampler, textureCoord);',
        '    gl_FragColor = vec4(pixelColor.rgb * lighting, pixelColor.a);',
        '}'
    ].join('\n')
};
