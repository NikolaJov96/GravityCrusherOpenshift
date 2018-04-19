// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing one game room

var RoomStateLoading = require('./room-state-loading.js');

module.exports = function(name, host, joinName, map){
    var self = {
        name: name,
        host: host,
        joinName: joinName,
        join: null,
        joined: false  // has player2 joined the game room
    };
    self.state = RoomStateLoading(self);

    self.step = function(){
        var ret = self.state.step();
        if (ret.action === 'nextState') self.state = ret.nextState(self);
        else if (ret.action === 'gameFinished') return true;  // remove game room

        return false;  // game room is stil active
    };

    self.playerJoined = function(join){
        if (join) self.p2 = join;
        self.joined = true;
    }

    return self;
};
