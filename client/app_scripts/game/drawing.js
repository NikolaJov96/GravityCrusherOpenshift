// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Initialization of webgl

var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('webgl');

gl.clearColor(0.7, 0.7, 0.7, 1.0);
// gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);

// gl.clearColor(0.7, 0.7, 0.7, 1.0);
// gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);

// shader initialization
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, shaders.vertexShader);
gl.shaderSource(fragmentShader, shaders.fragmentShader);

gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
    console.log(gl.getShaderInfoLog(vertexShader));

gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    console.log(gl.getShaderInfoLog(fragmentShader));

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.log(gl.getProgramInfoLog(program));

gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
    console.log(gl.getProgramInfoLog(program));

gl.useProgram(program);

vertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
indexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);

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
roomState = StateLoading();

setTimeout(function(){
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    // drawFunctions[roomState]();
    roomState.draw();
}, 40);