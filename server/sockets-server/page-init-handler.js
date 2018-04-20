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
        // guest user
        response.status = 'Success';
        console.log('    STATUS 1:' + response.status + ' USERNAME:' + response.username +
                ' SIGNEDIN:' + response.signedIn);
        socket.emit('pageInitResponse', response);
    }
    else {
        var token = data.token;
        console.log('token: ' + token)
        if (serverState.tokenCache.containsKey(token)){
            serverState.tokenCache.updateSocket(token, socket);
            serverState.tokenCache.lookupUser(token).page = data.page;
            
            var user = serverState.tokenCache.lookupUser(token);
            response.status = 'Success';
            response.username = user.name;
            response.signedIn = true;
            if (data.page === 'Game'){
                for (var i in serverState.gameRooms){
                    if (serverState.gameRooms[i].containsUser(user)){
                        response.payload = serverState.gameRooms[i].state.initResponse(user);
                        break;
                    }
                }
            }
            else if (data.page === 'GameRooms'){
                response.payload = { rooms: [] };
                for (var i in serverState.gameRooms){
                    response.payload.rooms.push({
                        name: serverState.gameRooms[i].name,
                        host: serverState.gameRooms[i].host.name,
                        map: serverState.gameRooms[i].map,
                    });
                }
            }

            console.log('    STATUS 2:Success USERNAME:' + response.username + ' SIGNEDIN:' + response.signedIn);
            socket.emit('pageInitResponse', response);
        } else {
            db.getUsernameByToken(token,
                function(status, username){
                    response.status = status;
                    if (status === 'Success'){
                        response.username = username;
                        response.signedIn = true;
                        serverState.addUser(token, username, socket, data.page, true);
                    }
                    console.log('    STATUS 3:' + response.status + ' USERNAME:' + response.username +
                            ' SIGNEDIN:' + response.signedIn);
                    socket.emit('pageInitResponse', response);
                }
            );
        }
    }
};};

