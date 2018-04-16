// Owner: Nikola Jovanovic (NikolaJov96)
// Author(s): Andrija Cicovic (cicovic-andrija)

// init http server
var serv = require('http').createServer(function(req, res){});
// init socket.io listerer on the server
var io = require('socket.io')(serv);
var appConfig = require('../../app-config.js');

serv.listen(appConfig.socketsServerPort);

var requestPackages = require('./request-packages.js');

cache = require('./token-cache.js');

// on new connection
io.on('connection', function(socket){
    console.log('New socket connected.');

    for (var i in requestPackages){
        socket.on(requestPackages[i].id, require(requestPackages[i].file)(socket));
    }
});

console.log('Socket.io request listener set up.');

