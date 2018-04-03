// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Initialization of webgl and main game loop

var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('webgl');

gl.clearColor(0.1, 0.1, 0.1, 1.0);
gl.enable(gl.DEPTH_TEST);

// shader initialization
shaders.vertexShader = gl.createShader(gl.VERTEX_SHADER);
shaders.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(shaders.vertexShader, shaders.vertexShaderText);
gl.shaderSource(shaders.fragmentShader, shaders.fragmentShaderText);

// shader programs are compiled each time the application is loaded
// on the computer because it optimizes graphical performance for 
// the graphics hardware available
gl.compileShader(shaders.vertexShader);
if (!gl.getShaderParameter(shaders.vertexShader, gl.COMPILE_STATUS)) 
    console.log(gl.getShaderInfoLog(shaders.vertexShader));
gl.compileShader(shaders.fragmentShader);
if (!gl.getShaderParameter(shaders.fragmentShader, gl.COMPILE_STATUS)) 
    console.log(gl.getShaderInfoLog(shaders.fragmentShader));

var program = gl.createProgram();
gl.attachShader(program, shaders.vertexShader);
gl.attachShader(program, shaders.fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.log(gl.getProgramInfoLog(program));
gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) console.log(gl.getProgramInfoLog(program));

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
    roomState.draw();
}, 40);
