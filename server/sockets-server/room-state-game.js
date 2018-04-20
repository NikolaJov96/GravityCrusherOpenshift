// Owner: Filip Mandic (mandula8)

// Summary: Class representing game room in game state

var RoomStateGameEnd = require('./room-state-game-end.js');

module.exports = function(gameRoom){
    var self = {
        room: gameRoom
    };
    
    console.log('Room ' + self.room.name + ' is in game state.');
    
    self.initResponse = function(user){ 
        return {
            state: 'game',
            roll: (user.isGuest ? 'join' : 'host'),
            host: self.room.host.name,
            hostActive: (self.room.host.page === 'Game' ? true : false),
            join: (self.room.joinName),
            joinActive: ((self.room.join && self.room.join.page === 'Game') ? true : false)
        };
    }
    
    self.step = function(){
        var ret = { action: null };
        return ret;
    };

    return self;
};
