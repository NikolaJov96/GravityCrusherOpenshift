// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler for clienet sockets during game

var db = require('../sql-server/database-interface.js');

module.exports = function(socket){ return function(data){
    console.log('Game commands handler: Data: ');
    console.log(data);

    for (var i in serverState.gameRooms) {
        if (socket.user.name === serverState.gameRooms[i].host) {
            serverState.gameRooms[i].hostCommand = data;
        }
        else if ((serverState.gameRooms[i].join) && (socket.user.name === serverState.gameRooms[i].joinName)) {
                serverState.gameRooms[i].joinCommand = data;
        }
    }
}};
