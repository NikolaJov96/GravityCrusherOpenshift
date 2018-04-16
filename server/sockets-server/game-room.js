// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing one game room

var RoomStateLoading = require('room-state-loading.js');

var GameRoom = function(name, host, join, map){
    var self = {
        name: name,
        p1: host,
        p2: join,
        joined: false,  // has player2 joined the game room
        state: RoomStateLoading(self)
    };
    
    self.step = function(){
        var ret = self.state.step();
        if (ret.action === 'nextState') self.state = ret.nextState();
        else if (ret.action === 'gameFinished') return true;  // remove game room

        return false;  // game room is stil active
    };
    
    self.playerJoined(join){
        if (join) self.p2 = join;
        self.joined = true;
    }
    
    return self;
};