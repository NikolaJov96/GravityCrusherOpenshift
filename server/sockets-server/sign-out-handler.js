// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for sign out requests.

var db = require('../sql-server/database-interface.js');
var cache = require('./token-cache.js');

module.exports = function(socket){ return function(data){
    console.log('Sign out req: TOKEN:' + data.token);

    db.removeToken(data.token, function(status){
        if (status === 'Success' && cache.containsKey(data.token)){
            cache.invalidateToken(data.token);
        }

        console.log('    STATUS:' + status);
        socket.emit('signOutResponse', {'status':status});
    });
};};

