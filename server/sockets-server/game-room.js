// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing one game room

var RoomStateLoading = require('./room-state-loading.js');

module.exports = function(name, host, gamePublic, joinName, map, roomPublic, chatEnabled){
    var self = {
        name: name,
        host: host,
        gamePublic: gamePublic,
        joinName: joinName,
        map: map,
        roomPublic: roomPublic,
        chatEnabled: chatEnabled,
        hostName: host.name,
        join: null,
        spectators: [],
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
            for (i in self.spectators){
                if (self.spectators[i].page === 'Game'){
                    // chage to spectator user
                    self.spectators[i].socket.emit('initRoomState', self.state.initResponse(self.join));
                }
            }
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
            if (self.host && self.host.page === 'Game') self.host.socket.emit('broadcastResponse', { text: text });
            if (self.join && self.join.page === 'Game') self.join.socket.emit('broadcastResponse', { text: text });
            for (i in self.spectators){
                if (self.spectators[i].page === 'Game') 
                    self.spectators[i].socket.emit('broadcastResponse', { text: text });
            }
        }

        return false;  // game room is stil active
    };

    self.containsUserBind = function(user){
        if (user.name === self.hostName) return true;
        if (user.name === self.joinName) return true;
        return false;
    };
    
    self.containsUserActive = function(user){
        if (self.host && user.name === self.hostName) return true;
        if (self.join && user.name === self.joinName) return true;
        return false;
    };

    self.getMessages = function(){
        var text = '';
        for (var i in self.messages) text += self.messages[i].sender + ':  ' + self.messages[i].text + '</br>';
        return text;
    }

    return self;
};
