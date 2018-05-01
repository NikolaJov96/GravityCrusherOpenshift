// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateLoading = function(data){
    // state initialization
    console.log('current state: game loading');
    self = abstractState();
    self.role = data.role;
    self.hostName = data.host;
    self.hostActive = data.hostActive;
    self.hostReady = data.hostReady;
    self.joinName = data.join;
    self.joinActive = data.joinActive;
    self.joinReady = data.joinReady;
    self.counter = data.counter;
    
    // init ship shape
    self.createObject('ship', 'ship', 'ship');
    
    // init projection and view matrices used throughout this roomState
    mat4.ortho(self.projMatrix, -screen.w / 2.0, screen.w / 2.0, 
               screen.h / 2.0, -screen.h / 2.0, 0, 1000);
    mat4.lookAt(self.viewMatrix, [screen.w / 2.0, screen.h / 2.0, 200], 
                [screen.w / 2.0, screen.h / 2.0, 0], [0, 1, 0]);
    self.lightSource = new Float32Array([0.0, 0.0, 500.0]);
    self.ambientColor = new Float32Array([0.5, 0.5, 0.5]);
    self.directedColor = new Float32Array([0.5, 0.5, 0.5]);
    
    self.handleStatePackage = function(data){
        if (!('hostActive' in data)) attrMissing('hostActive', 'gameState', data);
        else if (!('hostReady' in data)) attrMissing('hostReady', 'gameState', data);
        else if (!('joinActive' in data)) attrMissing('joinActive', 'gameState', data);
        else if (!('joinReady' in data)) attrMissing('joinReady', 'gameState', data);
        else{
            self.hostActive = data.hostActive;
            self.hostReady = data.hostReady;
            self.joinActive = data.joinActive;
            self.joinReady = data.joinReady;
            self.counter = data.counter;
        }
    };
    
    self.draw = function(){
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        
        // draw host ship
        mat4.fromTranslation(self.tranMatrix, [screen.w * 0.25, screen.h * 0.25, 0.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [0.4, 0.4, 0.4]);
        self.objs.ship.draw();
        
        // draw host ship active indicatior
        if (self.hostActive){
            mat4.fromTranslation(self.tranMatrix, [screen.w * 0.25, screen.h * 0.5, 0.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [0.4, 0.4, 0.4]);
            self.objs.ship.draw();
        }
        
        // draw host ship ready indicatior
        if (self.hostReady){
            mat4.fromTranslation(self.tranMatrix, [screen.w * 0.25, screen.h * 0.75, 0.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [0.4, 0.4, 0.4]);
            self.objs.ship.draw();
        }
        
        // draw join ship
        mat4.fromTranslation(self.tranMatrix, [screen.w * 0.75, screen.h * 0.25, 0.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, Math.PI, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [0.4, 0.4, 0.4]);
        self.objs.ship.draw();
        
        // draw join ship active indicator
        if (self.joinActive){
            mat4.fromTranslation(self.tranMatrix, [screen.w * 0.75, screen.h * 0.5, 0.0]);
            mat4.rotate(self.tranMatrix, self.tranMatrix, Math.PI, [0.0, 0.0, 1.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [0.4, 0.4, 0.4]);
            self.objs.ship.draw();
        }
        
        // draw join ship ready indicator
        if (self.joinReady){
            mat4.fromTranslation(self.tranMatrix, [screen.w * 0.75, screen.h * 0.75, 0.0]);
            mat4.rotate(self.tranMatrix, self.tranMatrix, Math.PI, [0.0, 0.0, 1.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [0.4, 0.4, 0.4]);
            self.objs.ship.draw();
        }
        
        // draw counter
        for (var i = 1; i < self.counter; i++){
            mat4.fromTranslation(self.tranMatrix, [screen.w * 0.5, screen.h * (i + 1) / 12.0, 0.0]);
            mat4.rotate(self.tranMatrix, self.tranMatrix, Math.PI * 1.5, [0.0, 0.0, 1.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [0.2, 0.2, 0.2]);
            self.objs.ship.draw();
        }
    };
    
    self.onKeyPress = function(event){
        // on space pressed change ready status
        if (event.key === ' '){
            if (self.role === 'host') socket.emit('gameCommand', { ready: (self.hostReady ? false : true) });
            else if (self.role === 'join') socket.emit('gameCommand', { ready: (self.joinReady ? false : true) });
            else logMsg('Undefined role: ' + self.role);
        }
    };
    
    var superFinish = self.finish;
    self.finish = function(){ 
        logMsg('loading state finished');
        superFinish();
    };
    
    return self;
};
