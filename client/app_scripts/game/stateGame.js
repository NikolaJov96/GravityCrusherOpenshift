// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGame = function(){
    // state initialization
    console.log('current state: game - press space or arrows');
    self = abstractState();
    self.pressed = [false, false, false, false];
    self.translation = [Math.random(), Math.random(), 0.0];
    self.rotation = Math.random() * 2 * Math.PI;
    
    // init ship shape
    self.createObject('ship', 'ship', 'ship');
    
    // init exhaust shape
    self.createObject('exhaust', 'exhaust', 'exhaust');
    
    // init projection and view matrices used throughout this roomState
    var projMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
    mat4.lookAt(viewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(matProjectionUniformLocation, gl.FALSE, projMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    
    self.step = function(){
        if (self.pressed[0]) self.rotation = (self.rotation + 0.1) % (2 * Math.PI);
        if (self.pressed[1]) {
            self.translation[0] += 0.08 * Math.cos(self.rotation);
            self.translation[1] += 0.08 * Math.sin(self.rotation);
        }
        if (self.pressed[2]) self.rotation = (self.rotation - 0.1) % (2 * Math.PI);
        // if (self.pressed[3]) mat4.translate(self.translation, self.translation, [0.1, 0.0, 0.0]);
    };
    
    self.draw = function(){
        // draw ship
        self.objs.ship.bind();
        
        mat4.fromTranslation(self.tranMatrix, self.translation);
        mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0]);
        mat4.identity(self.origMatrix);

        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
        gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);
        gl.uniformMatrix4fv(matOriginUniformLocation, gl.FALSE, self.origMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw exhaust
        if (self.pressed[1]){
            self.objs.exhaust.bind();

            mat4.fromTranslation(self.tranMatrix, self.translation);
            mat4.fromRotation(self.rotaMatrix, self.rotation, [0.0, 0.0, 1.0]);
            mat4.fromScaling(self.scalMatrix, [1.0, 1.0, 1.0]);
            // make exhaust position relative to the ship position
            mat4.fromTranslation(self.origMatrix, [-0.9, 0.0, 0.0]);

            gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, self.rotaMatrix);
            gl.uniformMatrix4fv(matTranslationUniformLocation, gl.FALSE, self.tranMatrix);
            gl.uniformMatrix4fv(matScalingUniformLocation, gl.FALSE, self.scalMatrix);
            gl.uniformMatrix4fv(matOriginUniformLocation, gl.FALSE, self.origMatrix);

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
    
    return self;
};
