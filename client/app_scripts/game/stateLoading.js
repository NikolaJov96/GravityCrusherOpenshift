// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateLoading = function(){
    // state initialization
    console.log('current state: game loading - press space');
    self = abstractState();
    self.pressed = [false, false, false, false];
    self.translation = canvas.width * 0.6 + Math.random() * canvas.width * 0.2;
    self.rotation = Math.random() * 2 * Math.PI;
    
    // init ship shape
    self.createObject('ship', 'ship', 'ship');
    
    // init projection and view matrices used throughout this roomState
    var projMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var lightSource = new Float32Array([0.0, 0.0, 500.0]);
    mat4.ortho(projMatrix, -canvas.width / 2.0, canvas.width / 2.0, 
               canvas.height / 2.0, -canvas.height / 2.0, 0, 1000);
    mat4.lookAt(viewMatrix, [canvas.width / 2.0, canvas.height / 2.0, 200], 
                [canvas.width / 2.0, canvas.height / 2.0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(programInfo.matProjUnifLoc, gl.FALSE, projMatrix);
    gl.uniformMatrix4fv(programInfo.matViewUnifLoc, gl.FALSE, viewMatrix);
    gl.uniform3fv(programInfo.lightSourceUnifLoc, lightSource);
    
    self.draw = function(){
        if (!shapeTextures.allTexturesLoaded) return;
        
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        
        // draw 1st ship
        self.objs.ship.bind();
        
        mat4.fromTranslation(self.tranMatrix, [self.translation, canvas.height * 0.6, 0.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);

        gl.uniformMatrix4fv(programInfo.matTranUnifLoc, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(programInfo.matNormUnifLoc, gl.FALSE, self.normMatrix);
 
        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
        
        // draw 2nd ship
        self.objs.ship.bind();
        
        mat4.fromTranslation(self.tranMatrix, [canvas.width / 2.0, canvas.height * 0.6, 0.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [0.4, 0.4, 0.4]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);

        gl.uniformMatrix4fv(programInfo.matTranUnifLoc, gl.FALSE, self.tranMatrix);
        gl.uniformMatrix4fv(programInfo.matNormUnifLoc, gl.FALSE, self.normMatrix);
 
        gl.drawElements(gl.TRIANGLES, objectShapes.ship.ind.length, gl.UNSIGNED_SHORT, 0);
    };
    
    // on key up callback, returns next state constructor, or null
    self.onKeyUp = function(event){
        if (event.keyCode === ' '.charCodeAt()) return StateGame;
        return null;
    };
    
    return self;
};
