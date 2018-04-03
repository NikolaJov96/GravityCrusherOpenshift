// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateLoading = function(){
    // state initialization 
    self = {
        vertexBufferObject: gl.createBuffer(),
        indexBufferObject: gl.createBuffer()
    };
    
    gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBufferObject);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexBufferObject);

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
    
    gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.ship.vert), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.ship.ind), gl.STATIC_DRAW);
    
    self.draw = function(){
        // draw welcome message
        gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBufferObject);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexBufferObject);

        var projMatrix = new Float32Array(16);
        var viewMatrix = new Float32Array(16);
        var transMatrix = new Float32Array(16);
        mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
        mat4.fromTranslation(transMatrix, [0, 0, 0.0]);
        mat4.lookAt(viewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);

        transMatrix = mat4.mul(transMatrix, viewMatrix, transMatrix);
        transMatrix = mat4.mul(transMatrix, projMatrix, transMatrix);

        gl.uniformMatrix4fv(matTransformationUniformLocation, gl.FALSE, transMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
    };


    self.finish = function(){
       // free buffers 
        gl.deleteBuffer(self.vertexBufferObject);
        gl.deleteBuffer(self.indexBufferObject);
    };
    
    return self;
};