// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Initialization of webgl and main game loop

var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('webgl');

// default values used as parameters when loading an image as a texture
var texParams = {
    level: 0,
    internalFormat: gl.RGBA,
    width: 1,
    height: 1,
    border: 0,
    srcFormat: gl.RGBA,
    srcType: gl.UNSIGNED_BYTE,
    pixel: new Uint8Array([0, 0, 255, 255])  // opaque blue
};

gl.clearColor(0.3, 0.3, 0.3, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.BLEND);
gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

// shader initialization
shaders.vertexShader = gl.createShader(gl.VERTEX_SHADER);
shaders.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(shaders.vertexShader, shaders.vertexShaderText);
gl.shaderSource(shaders.fragmentShader, shaders.fragmentShaderText);

// shader programs are compiled each time the application is loaded
//   on the computer because it optimizes graphical performance for 
//   the graphics hardware available
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

// use compiled glsl (gl shader language) program for graphics rendering
gl.useProgram(program);

// linking uniform matrix and texture sampler locations to the program in use
matProjectionUniformLocation = gl.getUniformLocation(program, 'projMatrix');
matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
matTranslationUniformLocation = gl.getUniformLocation(program, 'tranMatrix');
matRotationUniformLocation = gl.getUniformLocation(program, 'rotaMatrix');
matScalingUniformLocation = gl.getUniformLocation(program, 'scalMatrix');
matOriginUniformLocation = gl.getUniformLocation(program, 'origMatrix');
samplerUniformLocation = gl.getUniformLocation(program, 'smpler');

// room init and the main loop
preloadTextures();
roomState = StateLoading();

var mainLoop = function(){
    roomState.step();
    roomState.draw();
    window.requestAnimationFrame(mainLoop);
};
window.requestAnimationFrame(mainLoop);
