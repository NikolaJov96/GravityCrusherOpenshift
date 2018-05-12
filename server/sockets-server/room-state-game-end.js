// Owner: Filip Mandic (mandula8)

// Summary: Class representing game room in game end state

module.exports = function(gameRoom){
    var self = {
        room: gameRoom
    };

    console.log('Room ' + self.room.name + ' is in game-end state.');

    self.initResponse = function(user){ return null; }

    self.step = function(){
        var ret = { action: null };
        return ret;
    };

    return self;
};

