// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing one game room

var RoomStateLoading = require('./room-state-loading.js');

module.exports = function(name, host, joinName, map, visible){
    var self = {
        name: name,
        host: host,
        joinName: joinName,
        map: map,
        join: null,
        visible: visible,
        messages: [],
        newMessages: [],
        hostCommand: {},
        joinCommand: {},
        winner: ''
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

        self.hostCommand = {};
        self.joinCommand = {};

        var text = '';
        for (var i in self.newMessages){
            self.messages.push(self.newMessages[i]);
            text += self.newMessages[i].sender + ':  ' + self.newMessages[i].text + '</br>'
        }
        self.newMessages = [];
        if (text.length > 0){
            if (self.host.page === 'Game') self.host.socket.emit('broadcastResponse', { text: text });
            if (self.join && self.join.page === 'Game') self.join.socket.emit('broadcastResponse', { text: text });
        }

        return false;  // game room is stil active
    };

    self.containsUser = function(user){
        if (user.name === self.host.name) return true;
        if (self.join && user.name === self.join.name) return true;
        return false;
    };

    self.getMessages = function(){
        var text = '';
        for (var i in self.messages) text += self.messages[i].sender + ':  ' + self.messages[i].text + '</br>';
        return text;
    }

    return self;
};
