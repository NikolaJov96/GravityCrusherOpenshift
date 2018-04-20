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
    
    self.initResponse = function(user){
        return {
            state: 'loading',
            roll: (user.isGuest ? 'join' : 'host'),
            host: self.room.host.name,
            hostActive: (self.room.host.page === 'Game' ? true : false),
            join: (self.room.joinName),
            joinActive: ((self.room.join && self.room.join.page === 'Game') ? true : false),
            counter: self.counter * serverState.frameTime / 1000
        };
    };

    self.step = function(){
        var ret = { action: null };
        
        if (self.room.join && self.room.join.page === 'Game' && self.room.host.page === 'Game') self.activared = true;
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
