// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Definition and methods for working with token cache.

var tokenCache = {}; // token:username dictionary

tokenCache.cacheToken = function(token, username){
    tokenCache[token] = username;
};

tokenCache.invalidateToken = function(token){
    console.log(tokenCache);
    delete tokenCache[token];
};

tokenCache.containsKey = function(token){
    return token in tokenCache;
};

tokenCache.lookupUsername = function(token){
    return tokenCache[token];
};

module.exports = tokenCache;
