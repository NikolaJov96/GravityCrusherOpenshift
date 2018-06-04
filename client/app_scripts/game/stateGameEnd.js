// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGameEnd = function(data){
    // state initialization
    console.log('current state: game end');
    self = abstractState();
    self.role = data.role;
    self.hostName = data.host;
    self.hostActive = data.hostActive;
    self.joinName = data.join;
    self.joinActive = data.joinActive;
    self.winner = data.winner;
    
    // init ship shape
    self.createObject('ship', 'ship', 'ship');
    self.createObject('shipg', 'ship', 'ship-g');
    self.createObject('shipr', 'ship', 'ship-r');
    
    // UI update
    surrenderBtn.innerHTML = 'Return to web site';
    surrenderBtn.onclick = function(){
        window.location = 'index';
    };
    
    // init projection and view matrices used throughout this roomState
    mat4.ortho(self.projMatrix, -screen.w / 2.0, screen.w / 2.0, 
               screen.h / 2.0, -screen.h / 2.0, 0, 1000);
    mat4.lookAt(self.viewMatrix, [screen.w / 2.0, screen.h / 2.0, 200], 
                [screen.w / 2.0, screen.h / 2.0, 0], [0, 1, 0]);
    self.lightSource = new Float32Array([screen.w, screen.h, 500.0]);
    self.ambientColor = new Float32Array([0.5, 0.5, 0.5]);
    self.directedColor = new Float32Array([0.5, 0.5, 0.5]);
    
    self.handleStatePackage = function(data){
        if ('redirect' in data) window.location = 'index';
            
        else if (!('hostActive' in data)) attrMissing('hostActive', 'gameState', data);
        else if (!('joinActive' in data)) attrMissing('joinActive', 'gameState', data);
        else{
            self.hostActive = data.hostActive;
            self.joinActive = data.joinActive;
        }
    };
    
    self.draw = function(){
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        
        // draw host ship
        mat4.fromTranslation(self.tranMatrix, [screen.w * 0.33, screen.h * 0.5, 0.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, 0, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        if (self.winner === 'host') mat4.scale(self.tranMatrix, self.tranMatrix, [1.2, 1.2, 1.2]);
        else mat4.scale(self.tranMatrix, self.tranMatrix, [0.5, 0.5, 0.5]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);
        if (self.role === 'host') self.objs.shipg.draw();
        else self.objs.shipr.draw();
        
        // draw host ship active indicator
        if (self.hostActive){
            mat4.fromTranslation(self.tranMatrix, [screen.w * 0.33, screen.h * 0.9, 0.0]);
            mat4.rotate(self.tranMatrix, self.tranMatrix, -Math.PI / 2.0, [0.0, 0.0, 1.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [0.3, 0.3, 0.3]);
            self.objs.ship.draw();
        }
        
        // draw join ship
        mat4.fromTranslation(self.tranMatrix, [screen.w * 0.66, screen.h * 0.5, 0.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, Math.PI, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        if (self.winner === 'join') mat4.scale(self.tranMatrix, self.tranMatrix, [1.2, 1.2, 1.2]);
        else mat4.scale(self.tranMatrix, self.tranMatrix, [0.5, 0.5, 0.5]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);
        if (self.role === 'join') self.objs.shipg.draw();
        else self.objs.shipr.draw();
        
        // draw join ship active indicator
        if (self.joinActive){
            mat4.fromTranslation(self.tranMatrix, [screen.w * 0.66, screen.h * 0.9, 0.0]);
            mat4.rotate(self.tranMatrix, self.tranMatrix, -Math.PI / 2.0, [0.0, 0.0, 1.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [0.3, 0.3, 0.3]);
            self.objs.ship.draw();
        }
    };
    
    var superFinish = self.finish;
    self.finish = function(){ 
        logMsg('game-end state finished');
        superFinish();
    };
    
    return self;
};
