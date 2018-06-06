// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler for clienet sockets during game

module.exports = function(socket){ return function(data){
    // to frequent to print each time
    // logMsg('Game commands handler: Data: ');
    // logMsg(data);

    for (var i in serverState.gameRooms) {
        if (socket.user.name === serverState.gameRooms[i].hostName) {
            serverState.gameRooms[i].hostCommand = data;
        }
        else if ((serverState.gameRooms[i].join) && (socket.user.name === serverState.gameRooms[i].joinName)) {
            serverState.gameRooms[i].joinCommand = data;
        }
    }
}};
