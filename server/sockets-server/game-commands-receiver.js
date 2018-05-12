// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler for clienet sockets during game

module.exports = function(socket){ return function(data){
    // to frequent to print each time
    // console.log('Game commands handler: Data: ');
    // console.log(data);

    for (var i in serverState.gameRooms) {
        if (socket.user.name === serverState.gameRooms[i].host.name) {
            serverState.gameRooms[i].hostCommand = data;
        }
        else if ((serverState.gameRooms[i].join) && (socket.user.name === serverState.gameRooms[i].joinName)) {
            serverState.gameRooms[i].joinCommand = data;
        }
    }
}};
