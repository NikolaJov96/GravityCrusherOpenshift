// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for page initialization requests.

var db = require('../sql-server/database-interface.js');
var cache = require('./token-cache.js');

module.exports = function(socket){ return function(data) {
    console.log('Page init. req: TOKEN:' + data.token);

    var response = {
        'status': null,
        'loggedIn': false,
        'username': null,
        'debugMode': true,
    };

    if (!('token' in data) || data.token === ''){
        response.status = 'Success';
        console.log('    STATUS:' + response.status + ' USERNAME:' + response.username +
                ' LOGGEDIN:' + response.loggedIn);
        socket.emit('pageInitResponse', response);
    }
    else {
        var token = data.token;
        if (cache.containsKey(token)){
            response.status = 'Success';
            response.username = cache.lookupUsername(token);
            response.loggedIn = true;

            console.log('    STATUS:Success USERNAME:' + response.username + ' LOGGEDIN:' + response.loggedIn);
            socket.emit('pageInitResponse', response);
        } else {
            db.getUsernameByToken(token,
                function(status, username){
                    response.status = status;
                    if (status === 'Success'){
                        response.username = username;
                        response.loggedIn = true;
                        cache.cacheToken(token, username);
                    }
                    console.log('    STATUS:' + response.status + ' USERNAME:' + response.username +
                            ' LOGGEDIN:' + response.loggedIn);
                    socket.emit('pageInitResponse', response);
                }
            );
        }
    }
};};

