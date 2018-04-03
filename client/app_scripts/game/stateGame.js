// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGame = function(){
    // state initialization 
    self = {
        ship: {
            VBO: gl.createBuffer(),
            IBO: gl.createBuffer()
        },
        exhaust: {
            VBO: gl.createBuffer(),
            IBO: gl.createBuffer()
        },
        tranMatrix: new Float32Array(16),
        rotaMatrix: new Float32Array(16),
        scalMatrix: new Float32Array(16),
        translation: Math.random() + 1.0,
        rotation: Math.random() * 2 * Math.PI
    };
    
    // init ship shape
    { 
        // define how vertex buffer contents are interpreted by shader programs
        self.ship.positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        self.ship.colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        
        // function binding ship buffers for configuration or drawing
        self.ship.bind = function(){
            gl.bindBuffer(gl.ARRAY_BUFFER, self.ship.VBO);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.ship.IBO);
            gl.vertexAttribPointer(
                self.ship.positionAttribLocation,
                3,
                gl.FLOAT,
                gl.FALSE,
                7 * Float32Array.BYTES_PER_ELEMENT,
                0
            );
            gl.vertexAttribPointer(
                self.ship.colorAttribLocation,
                4,
                gl.FLOAT,
                gl.FALSE,
                7 * Float32Array.BYTES_PER_ELEMENT,
                3 * Float32Array.BYTES_PER_ELEMENT
            );
        };
        self.ship.bind();

        // load data into buffers
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.ship.vert), gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.ship.ind), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(self.ship.positionAttribLocation);
        gl.enableVertexAttribArray(self.ship.colorAttribLocation);
    }
    
    // init exhaust shape
    {
        // define how vertex buffer contents are interpreted by shader programs
        self.exhaust.positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        self.exhaust.colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        
        // function binding exhaust buffers for configuration or drawing
        self.exhaust.bind = function(){
            gl.bindBuffer(gl.ARRAY_BUFFER, self.exhaust.VBO);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.exhaust.IBO);
            gl.vertexAttribPointer(
                self.exhaust.positionAttribLocation,
                3,
                gl.FLOAT,
                gl.FALSE,
                7 * Float32Array.BYTES_PER_ELEMENT,
                0
            );
            gl.vertexAttribPointer(
                self.exhaust.colorAttribLocation,
                4,
                gl.FLOAT,
                gl.FALSE,
                7 * Float32Array.BYTES_PER_ELEMENT,
                3 * Float32Array.BYTES_PER_ELEMENT
            );
        };
        self.exhaust.bind();
        
        // load data into buffers
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.exhaust.vert), gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.exhaust.ind), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(self.exhaust.positionAttribLocation);
        gl.enableVertexAttribArray(self.exhaust.colorAttribLocation);
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
        self.ship.bind();
        
        mat4.fromTranslation(self.tranMatrix, [self.translation, 0.0, 0.0]);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0])

        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
        gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw exhaust
        self.exhaust.bind();
        
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