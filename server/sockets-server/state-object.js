// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Definition and methods for working with token cache.

var TokenCache = function(){
    var self = {
        cache: {}  // token:username map
    };
    
    self.cacheToken = function(token, username){ self.cache[token] = username; };
    self.invalidateToken = function(token){ delete self.cache[token]; };
    self.containsKey = function(token){ return token in self.cache; };
    self.lookupUsername = function(token){ return self.cache[token]; };
    self.renameUser = function(oldUsername, newUsername){
        for (var token in self.cache){
            if (self.cache[token] === oldUsername) self.cache[token] = newUsername;
        }
    };
    
    return self;
};

var StateObject = function(){
    var self = {
        tokenCache: TokenCache(),
        gameRooms: []
    };
    
    return self;
};

module.exports = StateObject;
