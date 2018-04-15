// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Definition and methods for working with token cache.

var tokenCache = {}; // token:username dictionary

module.exports = {
    cacheToken: function(token, username){
        tokenCache.token = username;
    },
    invalidateToken: function(token){
        delete tokenCache.token;
    },
    containsKey: function(token){
        return token in tokenCache;
    },
    lookupUsername: function(token){
        return tokenCache.token;
    },
};

