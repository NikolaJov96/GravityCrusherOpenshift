// Owner: Nikola Jovanovic (NikolaJov96)
// Author(s): Andrija Cicovic (cicovic-andrija)

// init http server
var serv = require('http').createServer(function(req, res){});
// init socket.io listerer on the server
var io = require('socket.io')(serv);

serv.listen(8001);

var requestPackages = require('./request-packages.js');

// on new connection
io.on('connection', function(socket){
	console.log('New connection.');

	for (var i in requestPackages){
		socket.on(requestPackages[i].id, require(requestPackages[i].file));
	}
});

console.log('Socket.io request listener set up.');
