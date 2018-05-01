// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGame = function(data){
    // state initialization
    console.log('current state: game - move using w a s d');
    self = abstractState();
    self.role = data.role;
    self.hostName = data.host;
    self.hostActive = data.hostActive;
    self.joinName = data.join;
    self.joinActive = data.joinActive;
    self.counter = data.counter;
    self.players = [ {}, {} ];
    for (var i = 0; i < 2; i++){
        self.players[i].translation = [data.playerData[i].x, data.playerData[i].y, 0.0];
        self.players[i].roll = data.playerData[i].roll;
        self.players[i].rotation = data.playerData[i].rotation;
    }
    self.starPos = [data.starData[0].x, data.starData[0].y, -100.0];
    self.pressed = [false, false, false, false];
    /*self.translation = [screen.w * 0.35, screen.h * 0.35, 0.0];
    self.rotation = Math.random() * 2 * Math.PI;
    self.roll = 0.0;*/
    
    // init ship shape
    self.createObject('ship', 'ship', 'ship');
    // init exhaust shape
    self.createObject('exhaust', 'exhaust', 'exhaust');
    // init star shape
    self.createObject('star', 'spaceBody', 'star');
    
    // init projection and view matrices used throughout this roomState
    mat4.ortho(self.projMatrix, -screen.w / 2.0, screen.w / 2.0, 
               screen.h / 2.0, -screen.h / 2.0, 0, 1000);
    mat4.lookAt(self.viewMatrix, [screen.w / 2.0, screen.h / 2.0, 200], 
                [screen.w / 2.0, screen.h / 2.0, 0], [0, 1, 0]);
    self.lightSource = new Float32Array(self.starPos);
    self.lightSource[2] = 40.0;
    self.ambientColor = new Float32Array([0.6, 0.6, 0.6]);
    self.directedColor = new Float32Array([0.9, 0.9, 0.9]);
    
    self.handleStatePackage = function(data){
        if (!('hostActive' in data)) attrMissing('hostActive', 'gameState', data);
        else if (!('joinActive' in data)) attrMissing('joinActive', 'gameState', data);
        else{
            self.hostActive = data.hostActive;
            self.joinActive = data.joinActive;
            self.counter = data.counter;
            if ('starData' in data && data.stars.length > 0){
                self.starPos[0] = data.stars[0].x;
                self.starPos[1] = data.stars[0].y;
            }
            if ('playerData' in data){
                for (var i = 0; i < 2; i++){
                    self.players[i].translation = [data.playerData[i].x, data.playerData[i].y, 0.0];
                    self.players[i].roll = data.playerData[i].roll;
                    self.players[i].rotation = data.playerData[i].rotation;
                }
            }
        }
    };
    
    
    self.step = function(){
        socket.emit('gameCommand', {
            arrUp: self.pressed[0],
            arrDown: self.pressed[1],
            arrLeft: self.pressed[2],
            arrRight: self.pressed[3]
        });
    };
    
    self.draw = function(){
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        
        // draw star
        mat4.fromTranslation(self.tranMatrix, self.starPos);
        mat4.rotate(self.tranMatrix, self.tranMatrix, Math.PI, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);
        self.objs.star.draw();

        for (var i = 0; i < 2; i++){
            // draw ship
            mat4.fromTranslation(self.tranMatrix, self.players[i].translation);
            mat4.rotate(self.tranMatrix, self.tranMatrix, self.players[i].roll,
                        [Math.cos(self.players[i].rotation), Math.sin(self.players[i].rotation), 0.0]);
            mat4.rotate(self.tranMatrix, self.tranMatrix, self.players[i].rotation, [0.0, 0.0, 1.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
            mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);
            self.objs.ship.draw();

            // draw exhaust
            if (self.pressed[1]){
                mat4.fromTranslation(self.tranMatrix, self.players[i].translation);
                mat4.rotate(self.tranMatrix, self.tranMatrix, self.players[i].roll,
                            [Math.cos(self.players[i].rotation), Math.sin(self.players[i].rotation), 0.0]);
                mat4.rotate(self.tranMatrix, self.tranMatrix, self.players[i].rotation, [0.0, 0.0, 1.0]);
                mat4.invert(self.normMatrix, self.tranMatrix);
                mat4.transpose(self.normMatrix, self.normMatrix);
                mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
                // make exhaust position relative to the ship position
                mat4.translate(self.tranMatrix, self.tranMatrix, [-180, 0.0, 0.0]);
                self.objs.exhaust.draw();
            }
        }
    };
    
    // on key down callback
    self.onKeyDown = function(event){
        if (event.key === 'w' && !self.pressed[0]) self.pressed[0] = true;
        if (event.key === 's' && !self.pressed[1]) self.pressed[1] = true;
        if (event.key === 'a' && !self.pressed[2]) self.pressed[2] = true;
        if (event.key === 'd' && !self.pressed[3]) self.pressed[3] = true;
    };
    
    // on key up callback
    self.onKeyUp = function(event){
        if (event.key === 'w' && self.pressed[0]) self.pressed[0] = false;
        if (event.key === 's' && self.pressed[1]) self.pressed[1] = false;
        if (event.key === 'a' && self.pressed[2]) self.pressed[2] = false;
        if (event.key === 'd' && self.pressed[3]) self.pressed[3] = false;
    };
    
    var superFinish = self.finish;
    self.finish = function(){ 
        logMsg('game state finished');
        superFinish();
    };
    
    return self;
};
