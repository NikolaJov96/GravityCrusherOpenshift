// author: Nikola Jovanovic (NikolaJov96)

// listener processing http get requests
require('./server/http-server/http-server.js')(__dirname);

// listener processing socket.io requests
require('./server/sockets-server/sockets-server.js');
