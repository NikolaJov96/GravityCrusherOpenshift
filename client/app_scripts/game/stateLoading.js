// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateLoading = function(){
    self = {};
    self.draw = function(){
        // draw welcome message
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.ship.vert), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.ship.ind), gl.STATIC_DRAW);

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

    self.init = function(){
        // buffer initialization
    };

    self.finish = function(){
       // free buffers 
    };
    
    return self;
};