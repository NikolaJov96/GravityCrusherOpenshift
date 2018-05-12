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
                        response.payload.messages = serverState.gameRooms[i].getMessages();
                        break;
                    }
                }
            }
            else if (data.page === 'GameRooms'){
                var room = null;
                for (var i in serverState.gameRooms){
                    if (serverState.gameRooms[i].containsUser(user)){
                        room = serverState.gameRooms[i];
                        break;
                    }
                }
                if (room) response.payload = { redirect: true };
                else response.payload = { redirect: false, rooms: require('./rooms-to-display.js')(user) };
            }
            else if (data.page === 'Statistics'){
                response.payload = {
                    metrics: [ 'Gold', 'Win rate', 'Kills', 'Games Played' ],
                    default: 'Gold',
                    data: [
                        {
                            rank: 1,
                            username: 'user123',
                            gold: 123,
                            win8: 13,
                            kills: 0,
                            gamesPlayed: 15033
                        },
                        {
                            rank: 2,
                            username: 'killer',
                            gold: 999999,
                            win8: 100,
                            kills: 9999999,
                            gamesPlayed: 5789
                        }
                    ]
                };
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

