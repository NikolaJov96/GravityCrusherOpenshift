// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for page initialization requests.

var db = require('../sql-server/database-interface.js');

module.exports = function(socket){ return function(data) {
    console.log('Page init. req: TOKEN:' + data.token + ' page: ' + data.page);

    var response = {
        'status': null,
        'signedIn': false,
        'username': null,
        'debugMode': true,
    };

    if (!('token' in data) || data.token === ''){
        response.status = 'Success';
        console.log('    STATUS:' + response.status + ' USERNAME:' + response.username +
                ' SIGNEDIN:' + response.signedIn);
        socket.emit('pageInitResponse', response);
    }
    else {
        var token = data.token;
        if (serverState.tokenCache.containsKey(token)){
            response.status = 'Success';
            response.username = serverState.tokenCache.lookupUsername(token);
            response.signedIn = true;

            console.log('    STATUS:Success USERNAME:' + response.username + ' SIGNEDIN:' + response.signedIn);
            socket.emit('pageInitResponse', response);
        } else {
            db.getUsernameByToken(token,
                function(status, username){
                    response.status = status;
                    if (status === 'Success'){
                        response.username = username;
                        response.signedIn = true;
                        serverState.tokenCache.cacheToken(token, username);
                    }
                    console.log('    STATUS:' + response.status + ' USERNAME:' + response.username +
                            ' SIGNEDIN:' + response.signedIn);
                    socket.emit('pageInitResponse', response);
                }
            );
        }
    }
};};

