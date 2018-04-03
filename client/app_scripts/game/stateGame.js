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
        pressed: [false, false, false, false],
        translation: [Math.random(), Math.random(), 0.0],
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
        // TODO: move to step method
        if (self.pressed[0]) self.rotation = (self.rotation + 0.1) % (2 * Math.PI);
        if (self.pressed[1]) {
            self.translation[0] += 0.08 * Math.cos(self.rotation);
            self.translation[1] += 0.08 * Math.sin(self.rotation);
        }
        if (self.pressed[2]) self.rotation = (self.rotation - 0.1) % (2 * Math.PI);
        // if (self.pressed[3]) mat4.translate(self.translation, self.translation, [0.1, 0.0, 0.0]);
        
        // draw ship
        self.ship.bind();
        
        mat4.fromTranslation(self.tranMatrix, self.translation);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0]);

        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
        gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw exhaust
        if (self.pressed[1] || self.pressed[3]){
            self.exhaust.bind();

            mat4.fromTranslation(self.tranMatrix, self.translation);
            mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 1.0]);
            mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0]);

            mat4.translate(self.scalMatrix, self.scalMatrix, [-0.9, 0.0, 0.0]);

            gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
            gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
            gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);

            gl.drawElements(gl.TRIANGLES, objectShapes.exhaust.ind.length, gl.UNSIGNED_SHORT, 0);
        }
    };
    
    // on key down callback, returns next state constructor, or null
    self.onKeyDown = function(event){
        if (event.keyCode === 37) self.pressed[0] = true; // l
        if (event.keyCode === 38) self.pressed[1] = true; // u
        if (event.keyCode === 39) self.pressed[2] = true; // r
        if (event.keyCode === 40) self.pressed[3] = true; // d
        return null;
    };
    
    // on key up callback, returns next state constructor, or null
    self.onKeyUp = function(event){
        if (event.keyCode === ' '.charCodeAt()) return StateGameEnd;
        if (event.keyCode === 37) self.pressed[0] = false; // l
        if (event.keyCode === 38) self.pressed[1] = false; // u
        if (event.keyCode === 39) self.pressed[2] = false; // r
        if (event.keyCode === 40) self.pressed[3] = false; // d
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
