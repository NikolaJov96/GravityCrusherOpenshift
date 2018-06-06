// Owner: Nikola Jovanovic (NikolaJov96)
// Author(s): Andrija Cicovic (cicovic-andrija)

// init http server
var serv = require('http').createServer(function(req, res){});
// init socket.io listerer on the server
var io = require('socket.io')(serv);
var appConfig = require('../../app-config.js');

serv.listen(appConfig.socketsServerPort);

var requestPackages = require('./request-packages.js');

const frameTime = 40;  // run every 40ms (25fps)
// global state object
serverState = require('./state-object.js')(frameTime);

// global log function
debugMode = true;
logMsg = function(msg){
    if (debugMode) console.log(msg);
}

// on new connection
io.on('connection', function(socket){
    logMsg('New socket connected.');
    socket.user = null;

    for (var i in requestPackages){
        socket.on(requestPackages[i].id, require(requestPackages[i].file)(socket));
    }
    socket.on('disconnect', function(){ return function(){
        if (socket.user){
            socket.user.socket = null;
            socket.user.page = '';
        }
    };}(socket));
});

console.log('Socket.io request listener set up.');

// server loop stepping all active game rooms
const telemetryIterTime = 30;  // get telemetry every X seconds
const telemetryVerbose = true;  // print telemetry to console
const telemetry = require('./telemetry.js')(telemetryIterTime, frameTime, telemetryVerbose);

setInterval(function(){
    telemetry.startIteration();

    var i = serverState.gameRooms.length;
    while (i--){
        var done = serverState.gameRooms[i].step();
        if (done){
            serverState.gameRooms.splice(i, 1);
            for (var user in serverState.users){
                if (serverState.users[user].socket && serverState.users[user].page === 'GameRooms'){
                    serverState.users[user].socket.emit('gameRoomsUpdate', {
                        rooms: require('./rooms-to-display.js')(serverState.users[user])
                    });
                }
            }
        }
    }

    telemetry.endIterationn();
}, frameTime);

var db = require('../sql-server/database-interface.js');

setInterval(function(){
    // check accounts waiting to be activated for timeout
    db.removeOldNotConfirmedUsers();
    // check banned users for ban timeout
    db.removeOldBanns(null);
    // check token timeouts
    db.removeOldTokens(null);
    // remove long inactive accounts from memory
    for (var name in serverState.users){
        if (!serverState.users[name].socket){
            if (serverState.users[name].interaction){
                serverState.users[name].interaction = false;
            } else {
                serverState.tokenCache.removeToken(name);
                delete serverState.users[name];
                logMsg('User ' + name + ' removed from memory.');
            }
        }
    }
}, 1000 * 60 * 60);  // run every hour
