// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: State class representing loading roomState

StateGame = function(data){
    // state initialization
    console.log('current state: game - press space or arrows');
    self = abstractState();
    self.pressed = [false, false, false, false];
    self.translation = [screen.w * 0.35, screen.h * 0.35, 0.0];
    self.rotation = Math.random() * 2 * Math.PI;
    self.roll = 0.0;
    self.starPos = [screen.w * 0.4, screen.h * 0.45, -100.0];
    
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
    
    self.step = function(){
        if (self.pressed[0]){
            //self.rotation = (self.rotation - 0.03) % (2 * Math.PI);
            self.roll += 0.015;
            if (self.roll > 0.5) self.roll = 0.5;
        }
        if (self.pressed[1]) {
            self.translation[0] += 5 * Math.cos(self.rotation);
            self.translation[1] += 5 * Math.sin(self.rotation);
        }
        if (self.pressed[2]){
            //self.rotation = (self.rotation + 0.03 + 2 * Math.PI) % (2 * Math.PI);
            self.roll -= 0.015;
            if (self.roll < -0.5) self.roll = -0.5;
        }
        // if (self.pressed[3]) mat4.translate(self.translation, self.translation, [0.1, 0.0, 0.0]);
        if (!self.pressed[0] && !self.pressed[2]){
            if (self.roll < 0) self.roll += 0.015;
            else if (self.roll > 0) self.roll -= 0.015;
        }
        self.rotation = (self.rotation - self.roll / 10.0 + 2 * Math.PI) % (2 * Math.PI);
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

        
        // draw ship
        mat4.fromTranslation(self.tranMatrix, self.translation);
        mat4.rotate(self.tranMatrix, self.tranMatrix, self.roll,
                    [Math.cos(self.rotation), Math.sin(self.rotation), 0.0]);
        mat4.rotate(self.tranMatrix, self.tranMatrix, self.rotation, [0.0, 0.0, 1.0]);
        mat4.invert(self.normMatrix, self.tranMatrix);
        mat4.transpose(self.normMatrix, self.normMatrix);
        mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
        mat4.translate(self.tranMatrix, self.tranMatrix, [0, 0, 0]);
        self.objs.ship.draw();
        
        // draw exhaust
        if (self.pressed[1]){
            mat4.fromTranslation(self.tranMatrix, self.translation);
            mat4.rotate(self.tranMatrix, self.tranMatrix, self.roll,
                        [Math.cos(self.rotation), Math.sin(self.rotation), 0.0]);
            mat4.rotate(self.tranMatrix, self.tranMatrix, self.rotation, [0.0, 0.0, 1.0]);
            mat4.invert(self.normMatrix, self.tranMatrix);
            mat4.transpose(self.normMatrix, self.normMatrix);
            mat4.scale(self.tranMatrix, self.tranMatrix, [1.0, 1.0, 1.0]);
            // make exhaust position relative to the ship position
            mat4.translate(self.tranMatrix, self.tranMatrix, [-180, 0.0, 0.0]);
            self.objs.exhaust.draw();
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
