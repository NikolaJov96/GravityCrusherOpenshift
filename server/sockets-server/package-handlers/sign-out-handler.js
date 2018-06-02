// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for sign out requests.

var db = require('../../sql-server/database-interface.js');

module.exports = function(socket){ return function(data){
    logMsg('Sign out req: TOKEN:' + data.token);
    socket.user.interaction = true;

    if (data.disable){
        db.deactivateAccount(data.token, function(status, userSessionTokens){
            if (status === 'Success'){
                serverState.removeUser(data.token, userSessionTokens);
            }

            logMsg('    STATUS:' + status);
            socket.emit('signOutResponse', {'status':status, 'deactivated':true});
        });
        
    } else {
        db.removeToken(data.token, function(status){
            if (status === 'Success'){
                serverState.removeUser(data.token, [data.token]);
            }

            logMsg('    STATUS:' + status);
            socket.emit('signOutResponse', {'status':status, 'deactivated':false});
        });
    }
};};

