// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for page initialization requests.

var db = require('../../sql-server/database-interface.js');

module.exports = function(socket){ return function(data) {
    var genTempUser = function(socket, page){
        // user name is equal to the token
        var token = require('uuid/v1')(); // generates an unique string
        var newUser = serverState.addUser(token, token, socket, page, true);
        return newUser;
    };
    
    var genPayload = function(data, user, response){
        if (data.page === 'Game'){
            for (var i in serverState.gameRooms){
                if (serverState.gameRooms[i].containsUser(user)){
                    response.payload = serverState.gameRooms[i].state.initResponse(user);
                    response.payload.messages = serverState.gameRooms[i].getMessages();
                    console.log('    page: Game, approved');
                    break;
                }
            }
            console.log('    page: Game, no game assigneg to the user');
        } else if (data.page === 'GameRooms'){
            var room = null;
            for (var i in serverState.gameRooms){
                if (serverState.gameRooms[i].containsUser(user)){
                    room = serverState.gameRooms[i];
                    break;
                }
            }
            if (room){
                console.log('    page: GameRooms, redirect to the game');
                response.payload = { redirect: true };
            } else {
                console.log('    page: GameRooms');
                response.payload = { redirect: false, rooms: require('../rooms-to-display.js')(user) };
            }
        } else if (data.page === 'Statistics'){
            var res = db.getStatisticsForPosition('Games Won', serverState.initStatNumber, 0,
                function(status, table, maxRow) {
                    response.payload = {
                        metrics: serverState.statisticsColumns,
                        default: 'Games Won',
                        data: table,
                        maxRow: maxRow
                    };
                    console.log('    page: Statistics');
                    socket.emit('pageInitResponse', response);
                });
            return;
        }
        user.socket.emit('pageInitResponse', response);
    };
    
    console.log('Page init. req: TOKEN:' + data.token + ' page: ' + data.page);

    var response = {
        'status': null,
        'signedIn': false,
        'username': null,
        'debugMode': true,
    };

    if (!('token' in data) || data.token === ''){
        // gen temp guest user
        user = genTempUser(socket, data.page);
        response.token = user.name;
        response.status = 'Success';
        console.log('Init handler, new temp user, token: ' + user.name);
        genPayload(data, user, response);
    } else {
        console.log('token: ' + data.token)
        if (serverState.tokenCache.containsKey(data.token)){
            serverState.tokenCache.updateSocket(data.token, socket);
            serverState.tokenCache.lookupUser(data.token).page = data.page;
            var user = serverState.tokenCache.lookupUser(data.token);
            response.status = 'Success';
            response.username = user.name;
            response.signedIn = true;
            console.log('Init handler, cache token match, user ' + user.name);
            genPayload(data, user, response);
        } else {
            db.getUsernameByToken(data.token,
                function(status, username){
                    var user = null;
                    if (status === 'Success'){
                        response.status = status;
                        response.username = username;
                        response.signedIn = true;
                        user = serverState.addUser(data.token, username, socket, data.page, false);
                        console.log('Init handler, db token match, user ' + user.name);
                    } else {
                        // gen temp guest user
                        user = genTempUser(socket, data.page);
                        response.status = 'Success';
                        response.token = user.name;
                        console.log('Init handler, new temp user, token: ' + user.name);
                    }
                    genPayload(data, user, response);
                }
            );
        }
    }
    
};};
