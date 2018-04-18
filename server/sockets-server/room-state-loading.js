// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing one game room

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
