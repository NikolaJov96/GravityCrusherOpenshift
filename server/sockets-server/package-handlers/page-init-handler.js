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
            response.payload = "redirect";
            for (var i in serverState.gameRooms){
                if (serverState.gameRooms[i].containsUserBind(user)){
                    if (serverState.gameRooms[i].joinName === user.name) serverState.gameRooms[i].join = user;
                    else if (serverState.gameRooms[i].hostName === user.name) serverState.gameRooms[i].host = user;
                    response.payload = serverState.gameRooms[i].state.initResponse(user);
                    response.payload.messages = serverState.gameRooms[i].getMessages();
                    logMsg('    page: Game, play');
                    break;
                } else {
                    var specFound = false;
                    for (j in serverState.gameRooms[i].spectators){
                        if (serverState.gameRooms[i].spectators[j].name === user.name){
                            specFound = true;
                            break;
                        }
                    }
                    if (specFound){
                        response.payload = serverState.gameRooms[i].state.initResponse(user);
                        response.payload.messages = serverState.gameRooms[i].getMessages();
                        logMsg('    page: Game, spectate');
                    }
                }
                // allow user to watch and bound it to the room until socket connection break
            }
        } else if (data.page === 'GameRooms'){
            var room = null;
            for (var i in serverState.gameRooms){
                if (serverState.gameRooms[i].containsUserActive(user)){
                    room = serverState.gameRooms[i];
                    break;
                }
            }
            if (room){
                logMsg('    page: GameRooms, redirect to the game');
                response.payload = { redirect: true };
            } else {
                logMsg('    page: GameRooms');
                response.payload = { redirect: false, rooms: require('../rooms-to-display.js')(user) };
            }
        } else if (data.page === 'CreateRoom'){
            var room = null;
            for (var i in serverState.gameRooms){
                if (serverState.gameRooms[i].containsUserActive(user)){
                    room = serverState.gameRooms[i];
                    break;
                }
            }
            if (room){
                logMsg('    page: CreateRoom, redirect to the game');
                response.payload = { redirect: true };
            } else {
                response.payload = { redirect: false };
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
                    logMsg('    page: Statistics');
                    socket.emit('pageInitResponse', response);
                });
            return;
        }
        user.socket.emit('pageInitResponse', response);
    };
    
    logMsg('Page init. req: TOKEN:' + data.token + ' page: ' + data.page);
    if (socket.user) socket.user.interaction = true;

    var response = {
        'status': null,
        'signedIn': false,
        'username': null,
        'debugMode': debugMode,
    };

    if (!('token' in data) || data.token === ''){
        // gen temp guest user
        user = genTempUser(socket, data.page);
        response.token = user.name;
        response.status = 'Success';
        logMsg('Init handler, new temp user, token: ' + user.name);
        genPayload(data, user, response);
    } else {
        logMsg('token: ' + data.token)
        if (serverState.tokenCache.containsKey(data.token)){
            serverState.tokenCache.updateSocket(data.token, socket);
            serverState.tokenCache.lookupUser(data.token).page = data.page;
            var user = serverState.tokenCache.lookupUser(data.token);
            response.status = 'Success';
            if (!user.isGuest){
                response.username = user.name;
                response.signedIn = true;
            } else {
                response.token = data.token;
            }
            logMsg('Init handler, cache token match, user ' + user.name);
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
                        logMsg('Init handler, db token match, user ' + user.name);
                    } else {
                        // gen temp guest user
                        user = genTempUser(socket, data.page);
                        response.status = 'Success';
                        response.token = user.name;
                        logMsg('Init handler, new temp user, token: ' + user.name);
                    }
                    genPayload(data, user, response);
                }
            );
        }
    }
    
};};
