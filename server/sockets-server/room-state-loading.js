// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing game room in loading state

var RoomStateGame = require('./room-state-game.js');

module.exports = function(gameRoom){
    var self = {
        room: gameRoom,
        counter: 10 * 1000 / serverState.frameTime,
        activated: false,
        hostReady: false,
        joinReady: false
    };

    console.log('Room ' + self.room.name + ' is in loading state.');

    self.initResponse = function(user){
        return {
            state: 'loading',
            role: ((user.name === self.room.host.name) ? 'host' : 'join'),
            host: self.room.host.name,
            hostActive: (self.room.host.page === 'Game' ? true : false),
            hostReady: self.hostReady,
            join: (self.room.joinName),
            joinActive: ((self.room.join && self.room.join.page === 'Game') ? true : false),
            joinReady: self.joinReady,
            counter: self.counter * serverState.frameTime / 1000
        };
    };

    self.step = function(){
        var ret = { action: null };

        if (self.room.hostCommand){
            var comm = self.room.hostCommand;
            // console.log(comm);
            if ('ready' in comm) self.hostReady = comm.ready;
        }
        if (self.room.joinCommand){
            var comm = self.room.joinCommand;
            // console.log(comm);
            if ('ready' in comm) self.joinReady = comm.ready;
        }

        var gameState = {
            hostReady: self.hostReady,
            hostActive: (self.room.host.page === 'Game' ? true : false),
            joinReady: self.joinReady,
            joinActive: ((self.room.join && self.room.join.page === 'Game') ? true : false),
            counter: self.counter * serverState.frameTime / 1000
        };
        if (self.room.host.page === 'Game'){
            self.room.host.socket.emit('gameState', gameState);
        }
        if (self.room.join && self.room.join.page === 'Game'){
            self.room.join.socket.emit('gameState', gameState);
        }

        if (self.room.join && self.room.join.page === 'Game' && self.room.host.page === 'Game') self.activated = true;
        if (self.activated){
            if (--self.counter === 0){
                ret.action = 'nextState';
                ret.nextState = RoomStateGame;
                console.log('Room ' + self.room.name + ' finished loading state.');
            }
        }
        if (self.hostReady && self.joinReady){
            ret.action = 'nextState';
            ret.nextState = RoomStateGame;
            console.log('Room ' + self.room.name + ' players ready.');
        }

        return ret;
    };

    return self;
};
