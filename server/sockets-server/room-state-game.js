// Owner: Filip Mandic (mandula8)

// Summary: Class representing game room in game state

var RoomStateGameEnd = require('./room-state-game-end.js');

module.exports = function(gameRoom){
    var self = {
        room: gameRoom
    };
    
    console.log('Room ' + self.room.name + ' is in game state.');

    self.step = function(){
        var ret = { action: null };
        return ret;
    };

    return self;
};
