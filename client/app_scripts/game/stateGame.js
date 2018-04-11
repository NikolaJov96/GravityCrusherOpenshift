// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGame = function(){
    // state initialization
    console.log('current state: game - press space or arrows');
    self = abstractState();
    self.pressed = [false, false, false, false];
    self.translation = [canvas.width * 0.35, canvas.height * 0.35, 0.0];
    self.rotation = Math.random() * 2 * Math.PI;
    
    // init ship shape
    self.createObject('ship', 'ship', 'ship');
    // init exhaust shape
    self.createObject('exhaust', 'exhaust', 'exhaust');
    // init star shape
    self.createObject('star', 'spaceBody', 'star');
    
    // init projection and view matrices used throughout this roomState
    var projMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var lightSource = new Float32Array([canvas.width / 2.0, canvas.height / 2.0, 200.0]);
    mat4.ortho(projMatrix, -canvas.width / 2.0, canvas.width / 2.0, 
               canvas.height / 2.0, -canvas.height / 2.0, 0, 1000);
    mat4.lookAt(viewMatrix, [canvas.width / 2.0, canvas.height / 2.0, 200], 
                [canvas.width / 2.0, canvas.height / 2.0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(programInfo.matProjUnifLoc, gl.FALSE, projMatrix);
    gl.uniformMatrix4fv(programInfo.matViewUnifLoc, gl.FALSE, viewMatrix);
    gl.uniform3fv(programInfo.lightSourceUnifLoc, lightSource);
    
    self.step = function(){
        if (self.pressed[0]) self.rotation = (self.rotation - 0.03) % (2 * Math.PI);
        if (self.pressed[1]) {
            self.translation[0] += 5 * Math.cos(self.rotation);
            self.translation[1] += 5 * Math.sin(self.rotation);
        }
        if (self.pressed[2]) self.rotation = (self.rotation + 0.03 + 2 * Math.PI) % (2 * Math.PI);
        // if (self.pressed[3]) mat4.translate(self.translation, self.translation, [0.1, 0.0, 0.0]);
    };
    
    self.draw = function(){
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        
        // draw star
        self.objs.star.bind();
        
        mat4.fromTranslation(self.tranMatrix, [canvas.width / 2.0, canvas.height / 2.0, -1.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, 0.0, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);

        gl.uniformMatrix4fv(programInfo.matTranUnifLoc, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(programInfo.matNormUnifLoc, gl.FALSE, self.normMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.spaceBody.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw ship
        self.objs.ship.bind();
        
        mat4.fromTranslation(self.tranMatrix, self.translation);
        mat4.rotate(self.tranMatrix, self.tranMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);

        gl.uniformMatrix4fv(programInfo.matTranUnifLoc, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(programInfo.matNormUnifLoc, gl.FALSE, self.normMatrix);

        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw exhaust
        if (self.pressed[1]){
            self.objs.exhaust.bind();

            mat4.fromTranslation(self.tranMatrix, self.translation);
            mat4.rotate(self.tranMatrix, self.tranMatrix, self.rotation, [0.0, 0.0, 1.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
            // make exhaust position relative to the ship position
            mat4.translate(self.tranMatrix, self.tranMatrix, [-180, 0.0, 0.0]);

            gl.uniformMatrix4fv(programInfo.matTranUnifLoc, gl.FALSE, self.tranMatrix);
            gl.uniformMatrix4fv(programInfo.matNormUnifLoc, gl.FALSE, self.normMatrix);

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
