// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Definitions of global game variables and aabstract room state class

// current room state
var roomState = null;

// roomState classes forward declarations
var StateLoading = null;
var StateGame = null;
var StateGameEnd = null;

// JSON of all existing object shapes
var objectShapes = {};

// JSON of all game textures
var shapeTextures = {};

// locations of shader uniform matrix arguments
var matProjectionUniformLocation = null;
var matViewUniformLocation = null;
var matTranslationUniformLocation = null;
var matRotationUniformLocation = null;
var matScalingUniformLocation = null;

// abstract room state class
var abstractState = function(){
    self = {
        objs: {},
        tranMatrix: new Float32Array(16),
        rotaMatrix: new Float32Array(16),
        scalMatrix: new Float32Array(16)
    };
    
    // frees all webgl buffers of defined objects
    self.deleteObjects = function(object){
        Object.keys(self.objs).forEach(function(key, index){
            gl.deleteBuffer(self.objs[key].VBO);
            gl.deleteBuffer(self.objs[key].IBO);
        });
    };
    
    // configure new object and add it to the objs
    self.createObject = function(name, shape, texture){ 
        self.objs[name] = {
            VBO: gl.createBuffer(),
            IBO: gl.createBuffer(),
            texture: texture,
            // define how vertex buffer contents are interpreted by shader programs
            positionAttribLocation: gl.getAttribLocation(program, 'vertPosition'),
            coordAttribLocation: gl.getAttribLocation(program, 'textCoord')
        };
        
        // function binding shape buffers for configuration or drawing
        self.objs[name].bind = function(){
            gl.bindBuffer(gl.ARRAY_BUFFER, self.objs[name].VBO);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.objs[name].IBO);
            gl.bindTexture(gl.TEXTURE_2D, shapeTextures[self.objs[name].texture]);
            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(samplerUniformLocation, 0);
            gl.vertexAttribPointer(
                self.objs[name].positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 
                5 * Float32Array.BYTES_PER_ELEMENT, 0
            );
            gl.vertexAttribPointer(
                self.objs[name].coordAttribLocation, 2, gl.FLOAT, gl.FALSE, 
                5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT
            );
        };
        self.objs[name].bind();

        // load data into buffers
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes[shape].vert), gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes[shape].ind), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(self.objs[name].positionAttribLocation);
        gl.enableVertexAttribArray(self.objs[name].coordAttribLocation);
    };
    
    // screen rendering
    self.draw = function(){};
    
    // on key down callback, returns next state constructor, or null
    self.onKeyDown = function(event){ return null; };
    
    // on key up callback, returns next state constructor, or null
    self.onKeyUp = function(event){ return null; };

    // to be called by main loop when exiting current room state
    // call before discarding room state object
    self.finish = function(){ self.deleteObjects(); };
    
    return self;
};
