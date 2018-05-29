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
serverState = require('./state-object.js')(frameTime);

// on new connection
io.on('connection', function(socket){
    console.log('New socket connected.');
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
        if (done) serverState.gameRooms.splice(i, 1);
    }
    
    telemetry.endIterationn();
}, frameTime);

setInterval(function(){
    // check accounts waiting to be activated for timeout
    // check banned users for ban timeout
    // check token timeouts
    // remove long inactive temporary accounts
}, 1000 * 60 * 60);  // run every hour
