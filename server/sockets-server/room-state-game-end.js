// Owner: Filip Mandic (mandula8)

// Summary: Class representing game room in game end state

module.exports = function(gameRoom){
    var self = {
        room: gameRoom
    };

    logMsg('Room ' + self.room.name + ' is in game-end state.');

    self.initResponse = function(user){ 
        var ret = {
            state: 'game-end',
            role: 'spec',
            host: self.room.hostName,
            hostActive: (self.room.host && self.room.host.page === 'Game' ? true : false),
            join: (self.room.joinName),
            joinActive: (self.room.join && self.room.join.page === 'Game' ? true : false),
            winner: self.room.winner
        };
        if (user.name === self.room.hostName){
            ret.role = 'host';
        } else if (user.name === self.room.joinName){
            ret.role = 'join';
        }
        return ret;
    };

    self.step = function(){
        var ret = { action: null };
        
        if (self.room.host && self.room.host.page !== 'Game') self.room.host = null;
        if (self.room.join && self.room.join.page !== 'Game') self.room.join = null;
        
        var gameState = {
            hostActive: ((self.room.host && self.room.host.page === 'Game') ? true : false),
            joinActive: ((self.room.join && self.room.join.page === 'Game') ? true : false)
        };
        if (self.room.host && self.room.host.page === 'Game'){
            self.room.host.socket.emit('gameState', gameState);
        }
        if (self.room.join && self.room.join.page === 'Game'){
            self.room.join.socket.emit('gameState', gameState);
        }
        for (i in self.room.spectators){
            if (self.room.spectators[i].page === 'Game'){
                self.room.spectators[i].socket.emit('gameState', gameState);
            }
        }
        
        if (!self.room.host && !self.room.join){
            ret.action = 'gameFinished';
            logMsg('Room ' + self.room.name + ' is finished.');
        }
        
        return ret;
    };

    return self;
};
