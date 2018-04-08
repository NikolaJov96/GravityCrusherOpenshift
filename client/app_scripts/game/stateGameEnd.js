// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGameEnd = function(){
    // state initialization
    console.log('current state: game end');
    self = {
        ship: {
            VBO: gl.createBuffer(),
            IBO: gl.createBuffer(),
            texture: 'ship'
        },
        tranMatrix: new Float32Array(16),
        rotaMatrix: new Float32Array(16),
        scalMatrix: new Float32Array(16),
        pressed: [false, false, false, false],
        translation: Math.random() + 1,
        rotation: Math.random() * 2 * Math.PI
    };
    
    self.deleteObject = function(object){
        gl.deleteBuffer(object.VBO);
        gl.deleteBuffer(object.IBO);
    }
    
    // init ship shape
    { 
        // define how vertex buffer contents are interpreted by shader programs
        self.ship.positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        self.ship.colorAttribLocation = gl.getAttribLocation(program, 'textCoord');
        
        // function binding ship buffers for configuration or drawing
        self.ship.bind = function(){
            gl.bindBuffer(gl.ARRAY_BUFFER, self.ship.VBO);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.ship.IBO);
            gl.bindTexture(gl.TEXTURE_2D, shapeTextures[self.ship.texture]);
            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(samplerUniformLocation, 0);
            gl.vertexAttribPointer(
                self.ship.positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 
                5 * Float32Array.BYTES_PER_ELEMENT, 0
            );
            gl.vertexAttribPointer(
                self.ship.colorAttribLocation, 2, gl.FLOAT, gl.FALSE, 
                5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT
            );
        };
        self.ship.bind();

        // load data into buffers
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.ship.vert), gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.ship.ind), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(self.ship.positionAttribLocation);
        gl.enableVertexAttribArray(self.ship.colorAttribLocation);
    }
    
    // init projection and view matrices used throughout this roomState
    var projMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
    mat4.lookAt(viewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(matProjectionUniformLocation, gl.FALSE, projMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    
    self.draw = function(){
        // draw 1st ship
        self.ship.bind();
        
        mat4.fromTranslation(self.tranMatrix, [self.translation, 0.5, 0.0]);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0]);

        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
        gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw 2nd ship
        self.ship.bind();
        
        mat4.fromTranslation(self.tranMatrix, [0.0, 0.5, 0.0]);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 0.0]);
        mat4.fromScaling(self.scalMatrix, [0.2, 0.2, 0.2]);

        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
        gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
    };
    
    // on key down callback, returns next state constructor, or null
    self.onKeyDown = function(event){
        return null;
    };
    
    // on key up callback, returns next state constructor, or null
    self.onKeyUp = function(event){
        if (event.keyCode === ' '.charCodeAt()) return StateLoading;
        return null;
    };

    self.finish = function(){
       // free buffers 
        gl.deleteBuffer(self.vertexBufferObject);
        gl.deleteBuffer(self.indexBufferObject);
    };
    
    return self;
};
