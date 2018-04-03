// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Initialization of webgl and main game loop

var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('webgl');

gl.clearColor(0.7, 0.7, 0.7, 1.0);
gl.enable(gl.DEPTH_TEST);

// shader initialization
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, shaders.vertexShader);
gl.shaderSource(fragmentShader, shaders.fragmentShader);

// shader programs are compiled each time the application is loaded
// on the computer because it optimizes graphical performance for 
// the graphics hardware available
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

// linking uniform matrix locations to the program in use
matProjectionUniformLocation = gl.getUniformLocation(program, 'projMatrix');
matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
matTranslationUniformLocation = gl.getUniformLocation(program, 'tranMatrix');
matRotationUniformLocation = gl.getUniformLocation(program, 'rotaMatrix');
matScalingUniformLocation = gl.getUniformLocation(program, 'scalMatrix');

// room state init and the main loop
roomState = StateLoading();

setInterval(function(){
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    // drawFunctions[roomState]();
    roomState.draw();
}, 40);