// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Definition and methods for working with token cache.

var User = function(name, socket, isGuest){
    var self = {
        name: name,
        socket: socket,
        isGuest: isGuest
    };
    
    return self;
};

var TokenCache = function(){
    var self = {
        cache: {}  // token:user map
    };

    self.cacheToken = function(token, user){ self.cache[token] = user; };
    self.invalidateToken = function(token){ if (token in self.cache) delete self.cache[token]; };
    self.containsKey = function(token){ return token in self.cache; };
    self.lookupUser = function(token){ return self.cache[token]; };
    self.updateSocket = function(token, socket){ socket.user = self.cache[token]; };

    return self;
};

var StateObject = function(){
    var self = {
        tokenCache: TokenCache(),
        users: {},
        gameRooms: []
    };
    
    self.addUser = function(token, username, socket, isGuest){
        var newUser = User(username, socket, isGuest);
        self.users[username] = newUser;
        self.tokenCache.cacheToken(token, newUser);
        socket.user = newUser;
    };
    
    self.renameUser = function(socket, newUsername){
        if (socket.user){
            var user = self.users[socket.user.name];
            delete self.users[socket.user.name];
            socket.user.name = newUsername;
            self.users[socket.user.name] = user;
        }else{
            console.log('No user connected to the scoket!');
        }
    };
    
    self.removeUser = function(token, tokensToDelete){
        var user = self.tokenCache.lookupUser(token);
        delete self.users[user.name];
        for (delToken in tokensToDelete){
            console.log('delToken: ' + delToken);
            console.log(tokensToDelete);
            serverState.tokenCache.invalidateToken(tokensToDelete[delToken]);
        }
    };

    return self;
};

module.exports = StateObject;
