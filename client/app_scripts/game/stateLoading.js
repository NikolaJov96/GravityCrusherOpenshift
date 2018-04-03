// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateLoading = function(){
    // state initialization 
    self = {
        // buffer that contains three coordinates and four color values for each shape vertex
        vertexBufferObject: gl.createBuffer(),
        // buffer that contains blocks of three vertex indices, representing triangle to draw
        indexBufferObject: gl.createBuffer(),
        tranMatrix: new Float32Array(16),
        rotaMatrix: new Float32Array(16),
        scalMatrix: new Float32Array(16),
        translation: Math.random() + 1.0,
        rotation: Math.random() * 2 * Math.PI
    };
    
    // bind buffers for the only shape used
    gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBufferObject);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexBufferObject);

    // define how vertex buffer contents are interpreted by shader programs
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
    
    // load shape data into buffers
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.ship.vert), gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.ship.ind), gl.STATIC_DRAW);
    
    // init projection and view matrices used throughout this roomState
    var projMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
    mat4.lookAt(viewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(matProjectionUniformLocation, gl.FALSE, projMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    
    self.draw = function(){
        // only one shape used, so just bind it once
        gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBufferObject);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexBufferObject);
        
        // draw larger triangle
        mat4.fromTranslation(self.tranMatrix, [self.translation, 0.0, 0.0]);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0])

        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
        gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw smaller triangle
        mat4.fromTranslation(self.tranMatrix, [0.0, 0.0, 0.0]);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 0.0]);
        mat4.fromScaling(self.scalMatrix, [0.2, 0.2, 0.2])

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