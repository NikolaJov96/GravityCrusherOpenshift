// Owner: Filip Mandic (mandula8)

// Summary: Class representing game room in game state

module.exports = function(gameRoom){
    var self = {
        room: gameRoom
    };

    self.step = function(){
        var ret = { action: null };
        return ret;
    };

    return self;
};
