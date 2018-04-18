// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for sign out requests.

var db = require('../sql-server/database-interface.js');

module.exports = function(socket){ return function(data){
    console.log('Sign out req: TOKEN:' + data.token);

    if (data.disable){
        db.deactivateAccount(data.token, function(status, userSessionTokens){
            if (status === 'Success'){
                serverState.removeUser(data.token, userSessionTokens);
            }

            console.log('    STATUS:' + status);
            socket.emit('signOutResponse', {'status':status, 'deactivated':true});
        });
        
    } else {
        db.removeToken(data.token, function(status){
            if (status === 'Success'){
                serverState.removeUser(data.token, [data.token]);
            }

            console.log('    STATUS:' + status);
            socket.emit('signOutResponse', {'status':status, 'deactivated':false});
        });
    }
};};

