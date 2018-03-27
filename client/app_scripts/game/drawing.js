// Nikola Jovanovic (NikolaJov96)

// Initialization of webgl

var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('webgl');

var vertexShaderText = [
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
].join('\n');

var fragmentShaderText = [
'precision mediump float;',
'',
'varying vec4 fragColor;',
'',
'void main()',
'{',
'    gl_FragColor = fragColor;',
'}'
].join('\n');

gl.clearColor(0.7, 0.7, 0.7, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);

gl.clearColor(0.7, 0.7, 0.7, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);

var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderText);
gl.shaderSource(fragmentShader, fragmentShaderText);

gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(vertexShader));
    // return;
}
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(fragmentShader));
    // return;
}

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert(gl.getProgramInfoLog(program));
    // return;
}

gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    alert(gl.getProgramInfoLog(program));
    // return;
}

gl.useProgram(program);

var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
gl.vertexAttribPointer(
    positionAttribLocation,
    3,
    gl.FLOAT,
    gl.FALSE,
    7 * Float32Array.BYTES_PER_ELEMENT,
    0
);
gl.vertexAttribPointer(
    colorAttribLocation,
    4,
    gl.FLOAT,
    gl.FALSE,
    7 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT
);

gl.enableVertexAttribArray(positionAttribLocation);
gl.enableVertexAttribArray(colorAttribLocation);

matTransformationUniformLocation = gl.getUniformLocation(program, 'transMatrix');

// main loop
setTimeout(function(){
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    drawFunctions[roomState]();
}, 40);