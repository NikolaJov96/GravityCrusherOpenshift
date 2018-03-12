// author: Nikola Jovanovic

// listener processing http get requests
var httpListener = require('./server/httpServer/httpServer.js')(__dirname);

// listener processing socket.io requests 
var socketsListener = require('./server/socketsServer/socketsServer.js');
