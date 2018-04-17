// Owner: Nikola Jovanovic (NikolaJov96)
// Author(s): Andrija Cicovic (cicovic-andrija)

// init http server
var serv = require('http').createServer(function(req, res){});
// init socket.io listerer on the server
var io = require('socket.io')(serv);
var appConfig = require('../../app-config.js');

serv.listen(appConfig.socketsServerPort);

var requestPackages = require('./request-packages.js');

serverState = require('./state-object.js')();

// on new connection
io.on('connection', function(socket){
    console.log('New socket connected.');

    for (var i in requestPackages){
        socket.on(requestPackages[i].id, require(requestPackages[i].file)(socket));
    }
});

console.log('Socket.io request listener set up.');

// server loop stepping all active game rooms
const frameTime = 40;  // run every 40ms (25fps)

// timing telemetry
var accumulatedTime = 0.0;
var counter = 0;
const maxCounter = 60 * 1000 / frameTime;

setInterval(function(){
    var startTime = process.hrtime();
    var i = serverState.gameRooms.length;
    while (i--){
        var done = serverState.gameRooms[i].step();
        if (done) delete serverState.gameRooms[i];
    }
    var diffTime = process.hrtime(startTime);
    accumulatedTime += diffTime[0] * 1e9 + diffTime[1];
    if (++counter === maxCounter){
        console.log('Average game rooms step time: ' + accumulatedTime / maxCounter + ' ns');
        counter = 0;
        accumulatedTime = 0.0;
    }
}, frameTime);
