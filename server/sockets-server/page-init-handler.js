// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions page initialization requests.

var db = require('../sql-server/database-interface.js');

var sessionCache = {}; // token:username dictionary

module.exports = function(socket){ return function(data) {
    var response = {
        'status': null,
        'loggedIn': false,
        'username': null,
        'debugMode': false,
    };

    if (!('token' in data)) socket.emit('pageInitResponse', response);
    else {
        var token = data.token;
        if (token in sessionCache){
            response.status = 'Success';
            response.username = sessionCache.token;
            response.loggedIn = true;
            socket.emit('pageInitResponse', response);
        } else {
            db.getUsernameByToken(token,
                function(status, username){
                    response.status = status;
                    if (status === 'Success'){
                        response.username = username;
                        response.loggedIn = true;
                        sessionCache.token = username;
                    }
                    socket.emit('pageInitResponse', response);
                }
            );
        }
    }
};};

