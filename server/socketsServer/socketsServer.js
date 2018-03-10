// author: Nikola Jovanovic

// init http server
var serv = require('http').createServer(function(req, res){});
// init socket.io listerer on the server
var io = require('socket.io')(serv);

serv.listen(8001);

// on new connection
io.on('connection', function(socket){
	console.log('New connection.');
	
	// demo listener
	socket.on('message', function(data){
		socket.emit('message', 'hi');
	});
});

console.log('Socket.io request listener set up.');
