// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGame = function(){
    // state initialization 
    self = {
        shipVBO: gl.createBuffer(),
        shipIBO: gl.createBuffer(),
        shipPositionAttribLocation: null,
        shipColorAttribLocation: null,
        exhaustVBO: gl.createBuffer(),
        exhaustIBO: gl.createBuffer(),
        exhaustPositionAttribLocation: null,
        exhaustColorAttribLocation: null,
        tranMatrix: new Float32Array(16),
        rotaMatrix: new Float32Array(16),
        scalMatrix: new Float32Array(16),
        translation: Math.random() + 1.0,
        rotation: Math.random() * 2 * Math.PI
    };
    
    // init ship shape
    {
        // bind and load ship buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, self.shipVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.ship.vert), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.shipIBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.ship.ind), gl.STATIC_DRAW);

        // define how vertex buffer contents are interpreted by shader programs
        self.shipPositionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        gl.enableVertexAttribArray(self.shipPositionAttribLocation);
        self.shipColorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        gl.enableVertexAttribArray(self.shipColorAttribLocation);
    }
    
    // init exhaust shape
    {
        // bind and load exhaust buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, self.exhaustVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.exhaust.vert), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.exhaustIBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.exhaust.ind), gl.STATIC_DRAW);

        // define how vertex buffer contents are interpreted by shader programs
        self.exhaustPositionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        gl.enableVertexAttribArray(self.exhaustPositionAttribLocation);
        self.exhaustColorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        gl.enableVertexAttribArray(self.exhaustColorAttribLocation);
    }
    
    // init projection and view matrices used throughout this roomState
    var projMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
    mat4.lookAt(viewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(matProjectionUniformLocation, gl.FALSE, projMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    
    self.draw = function(){
        // draw ship
        gl.bindBuffer(gl.ARRAY_BUFFER, self.shipVBO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.shipIBO);
        gl.vertexAttribPointer(
            self.shipPositionAttribLocation,
            3,
            gl.FLOAT,
            gl.FALSE,
            7 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        gl.vertexAttribPointer(
            self.shipColorAttribLocation,
            4,
            gl.FLOAT,
            gl.FALSE,
            7 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );
        
        mat4.fromTranslation(self.tranMatrix, [self.translation, 0.0, 0.0]);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0])

        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
        gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw exhaust
        gl.bindBuffer(gl.ARRAY_BUFFER, self.exhaustVBO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.exhaustIBO);
        gl.vertexAttribPointer(
            self.exhaustPositionAttribLocation,
            3,
            gl.FLOAT,
            gl.FALSE,
            7 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        gl.vertexAttribPointer(
            self.exhaustColorAttribLocation,
            4,
            gl.FLOAT,
            gl.FALSE,
            7 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );
        
        mat4.fromTranslation(self.tranMatrix, [0.0, 0.0, 0.0]);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 0.0]);
        mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0])

        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
        gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.exhaust.ind.length, gl.UNSIGNED_SHORT, 0);
    };
    
    // on key down callback, returns next state constructor, or null
    self.onKeyDown = function(event){
        return null;
    };
    
    // on key up callback, returns next state constructor, or null
    self.onKeyUp = function(event){
        if (event.keyCode === ' '.charCodeAt()) return StateGameEnd;
        return null;
    };

    self.finish = function(){
       // free buffers 
        gl.deleteBuffer(self.shipVBO);
        gl.deleteBuffer(self.shipIBO);
        gl.deleteBuffer(self.exhaustVBO);
        gl.deleteBuffer(self.exhaustIBO);
    };
    
    return self;
};