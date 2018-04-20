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
        if (ret.action === 'nextState'){
            self.state = ret.nextState(self);
            if (self.host.socket && self.host.page === 'Game') 
                self.host.socket.emit('initRoomState', self.state.initResponse(self.host));
            if (self.join.socket && self.join.page === 'Game') 
                self.join.socket.emit('initRoomState', self.state.initResponse(self.join));
        }
        else if (ret.action === 'gameFinished') return true;  // remove game room

        return false;  // game room is stil active
    };
    
    self.containsUser = function(user){
        if (user.name === self.host.name) return true;
        if (self.join && user.name === self.join.name) return true;
        return false;
    };

    return self;
};
