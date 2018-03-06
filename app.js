var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/index.html', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/create-room.html', function(req, res) {
	res.sendFile(__dirname + '/client/create-room.html');
});
app.get('/game-rooms.html', function(req, res) {
	res.sendFile(__dirname + '/client/game-rooms.html');
});
app.get('/about-us.html', function(req, res) {
	res.sendFile(__dirname + '/client/about-us.html');
});
app.get('/sign-up.html', function(req, res) {
	res.sendFile(__dirname + '/client/sign-up.html');
});
app.get('/log-in.html', function(req, res) {
	res.sendFile(__dirname + '/client/log-in.html');
});
app.get('/game.html', function(req, res) {
	res.sendFile(__dirname + '/client/game.html');
});

app.use(express.static(__dirname + '/client'));

app.listen(80);

console.log('Server started.');
