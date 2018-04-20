// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGameEnd = function(data){
    // state initialization
    console.log('current state: game end');
    self = abstractState();
    self.pressed = [false, false, false, false];
    self.translation = screen.w * 0.6 + Math.random() * screen.w * 0.2;
    self.rotation = Math.random() * 2 * Math.PI;
    
    // init ship shape
    self.createObject('ship', 'ship', 'ship');
    
    // init projection and view matrices used throughout this roomState
    mat4.ortho(self.projMatrix, -screen.w / 2.0, screen.w / 2.0, 
               screen.h / 2.0, -screen.h / 2.0, 0, 1000);
    mat4.lookAt(self.viewMatrix, [screen.w / 2.0, screen.h / 2.0, 200], 
                [screen.w / 2.0, screen.h / 2.0, 0], [0, 1, 0]);
    self.lightSource = new Float32Array([screen.w, screen.h, 500.0]);
    self.ambientColor = new Float32Array([0.5, 0.5, 0.5]);
    self.directedColor = new Float32Array([0.5, 0.5, 0.5]);
    
    self.draw = function(){
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        
        // draw 1st ship
        mat4.fromTranslation(self.tranMatrix, [self.translation, screen.h * 0.4, 0.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);
        self.objs.ship.draw();
        
        // draw 2nd ship
        mat4.fromTranslation(self.tranMatrix, [screen.w / 2.0, screen.h * 0.4, 0.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [0.2, 0.2, 0.2]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);
        self.objs.ship.draw();
    };
    
    var superFinish = self.finish;
    self.finish = function(){ 
        logMsg('game-end state finished');
        superFinish();
    };
    
    return self;
};
