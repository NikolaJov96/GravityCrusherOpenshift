// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing game room in loading state

var RoomStateGame = require('./room-state-game.js');

module.exports = function(gameRoom){
    var self = {
        room: gameRoom,
        counter: 10 * 1000 / serverState.frameTime,
        activared: false
    };
    
    console.log('Room ' + self.room.name + ' is in loading state.');

    self.step = function(){
        var ret = { action: null };
        
        if (self.room.joined) self.activared = true;
        if (self.activared){
            if (--self.counter === 0){
                ret.action = 'nextState';
                ret.nextState = RoomStateGame;
                console.log('Room ' + self.room.name + ' finished loading state.');
            }
        }
        
        return ret;
    };

    return self;
};
