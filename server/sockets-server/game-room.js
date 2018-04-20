// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing one game room

var RoomStateLoading = require('./room-state-loading.js');

module.exports = function(name, host, joinName, map){
    var self = {
        name: name,
        host: host,
        joinName: joinName,
        join: null,
    };
    self.state = RoomStateLoading(self);

    self.step = function(){
        var ret = self.state.step();
        if (ret.action === 'nextState') self.state = ret.nextState(self);
        else if (ret.action === 'gameFinished') return true;  // remove game room

        return false;  // game room is stil active
    };

    return self;
};
