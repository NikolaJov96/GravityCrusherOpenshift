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

// locations of shader arguments
var programInfo = {};

// abstract room state class
var abstractState = function(){
    self = {
        objs: {},
        projMatrix: new Float32Array(16),
        viewMatrix: new Float32Array(16),
        lightSource: new Float32Array(3),
        ambientColor: new Float32Array(3),
        directedColor: new Float32Array(3),
        tranMatrix: new Float32Array(16),
        normMatrix: new Float32Array(16)
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
            texture: texture
        };
        
        // function binding shape buffers for configuration or drawing
        self.objs[name].bind = function(){
            gl.bindBuffer(gl.ARRAY_BUFFER, self.objs[name].VBO);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.objs[name].IBO);
            gl.bindTexture(gl.TEXTURE_2D, shapeTextures[self.objs[name].texture]);
            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(programInfo.samplerUnifLoc, 0);
            gl.vertexAttribPointer(
                programInfo.posAttribLoc, 3, gl.FLOAT, gl.FALSE, 
                8 * Float32Array.BYTES_PER_ELEMENT, 0
            );
            gl.vertexAttribPointer(
                programInfo.normalAttribLoc, 3, gl.FLOAT, gl.FALSE, 
                8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT
            );
            gl.vertexAttribPointer(
                programInfo.coordAttribLoc, 2, gl.FLOAT, gl.FALSE, 
                8 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT
            );
        };
        // function drawing shape to the screen, assuming previously correctly 
        //   calculated all existing shader uniform attributes
        self.objs[name].draw = function(){
            self.objs[name].bind();
            
            gl.uniformMatrix4fv(programInfo.matProjUnifLoc, gl.FALSE, self.projMatrix);
            gl.uniformMatrix4fv(programInfo.matViewUnifLoc, gl.FALSE, self.viewMatrix);
            gl.uniform3fv(programInfo.lightSourceUnifLoc, self.lightSource);
            gl.uniform3fv(programInfo.ambientColorUnifLoc, self.ambientColor);
            gl.uniform3fv(programInfo.directedColorUnifLoc, self.directedColor);
            gl.uniformMatrix4fv(programInfo.matTranUnifLoc, gl.FALSE, self.tranMatrix);
            gl.uniformMatrix4fv(programInfo.matNormUnifLoc, gl.FALSE, self.normMatrix);

            gl.drawElements(gl.TRIANGLES, objectShapes[shape].ind.length, gl.UNSIGNED_SHORT, 0);
        }
        
        self.objs[name].bind();

        // load data into buffers
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes[shape].vert), gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes[shape].ind), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(programInfo.posAttribLoc);
        gl.enableVertexAttribArray(programInfo.normalAttribLoc);
        gl.enableVertexAttribArray(programInfo.coordAttribLoc);
    };
    
    // callback to be called when socket package is received
    self.handleSocketPackage = function(name, data){};
    
    // function for stepping client state (only game mechanics unrelated tasks)
    self.step = function(){};
    
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
