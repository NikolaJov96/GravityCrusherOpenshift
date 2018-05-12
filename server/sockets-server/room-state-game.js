// Owner: Filip Mandic (mandula8)

// Summary: Class representing game room in game state

var RoomStateGameEnd = require('./room-state-game-end.js');

const width = 1280;
const height = 760;
const speed = 1;

module.exports = function(gameRoom){
    var self = {
        room: gameRoom,
        counter: 3 * 60 * 1000 / serverState.frameTime,
        players: [ {}, {} ],
        stars: [ { x: width / 2.0, y: height / 2.0 } ]
    };
    
    for (var i = 0; i < 2; i++){
        self.players[i].x = (i === 0 ? 0 : width);
        self.players[i].y = (i === 0 ? 0 : height);
        self.players[i].rotation = (i === 0 ? 0 : 2 * Math.PI);
        self.players[i].roll = 0.0;
        self.players[i].arrUp = false;
        self.players[i].arrDown = false;
        self.players[i].arrLeft = false;
        self.players[i].arrRight = false;
    }
    
    console.log('Room ' + self.room.name + ' is in game state.');

    self.initResponse = function(user){
        return {
            state: 'game',
            roll: ((user.name === self.room.host.name) ? 'host' : 'join'),
            host: self.room.host.name,
            hostActive: (self.room.host.page === 'Game' ? true : false),
            join: self.room.joinName,
            joinActive: (self.room.join.page === 'Game' ? true : false),
            playerData: self.players,
            starData: self.stars
        };
    };
    
    self.step = function(){
        var ret = { action: null };
        
        var comms = [ self.room.hostCommand, self.room.joinCommand ];
        for (var i in comms){
            if ('arrUp' in comms[i]) self.players[i].arrUp = comms[i].arrUp;
            if ('arrDown' in comms[i]) self.players[i].arrDown = comms[i].arrDown;
            if ('arrLeft' in comms[i]) self.players[i].arrLeft = comms[i].arrLeft;
            if ('arrRight' in comms[i]) self.players[i].arrRight = comms[i].arrRight;
        }
        
        for (var i = 0; i < 2; i++){
            if (self.players[i].arrLeft){
                self.players[i].roll += 0.015;
                if (self.players[i].roll > 0.5) self.players[i].roll = 0.5;
            }
            if (self.players[i].arrUp) {
                self.players[i].x += 5 * Math.cos(self.players[i].rotation);
                self.players[i].y += 5 * Math.sin(self.players[i].rotation);
            }
            if (self.players[i].arrRight){
                self.players[i].roll -= 0.015;
                if (self.players[i].roll < -0.5) self.players[i].roll = -0.5;
            }
            if (!self.players[i].arrLeft && !self.players[i].arrRight){
                if (self.players[i].roll < 0) self.players[i].roll += 0.015;
                else if (self.players[i].roll > 0) self.players[i].roll -= 0.015;
            }
            self.players[i].rotation = 
                (self.players[i].rotation - self.players[i].roll / 10.0 + 2 * Math.PI) % (2 * Math.PI);
        }
        
        var gameState = {
            hostActive: (self.room.host.page === 'Game' ? true : false),
            joinActive: (self.room.join.page === 'Game' ? true : false),
            counter: self.counter * serverState.frameTime / 1000,
            playerData: self.players
        };
        if (self.room.host.page === 'Game'){
            self.room.host.socket.emit('gameState', gameState);
        }
        if (self.room.join.page === 'Game'){
            self.room.join.socket.emit('gameState', gameState);
        }
        
        var distSq = (self.players[0].x - self.players[1].x) * (self.players[0].x - self.players[1].x) +
           (self.players[0].y - self.players[1].y) * (self.players[0].y - self.players[1].y);
        if (distSq < 300){
            ret.action = 'nextState';
            ret.nextState = RoomStateGameEnd;
            console.log('Room ' + self.room.name + ' game state finished.');
        }
        
        return ret;
    };

    return self;
};

