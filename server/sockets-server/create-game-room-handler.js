// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler neccesary for creating new room

module.exports = function(socket){ return function(data){
    console.log('Create room req: Data: ');
    console.log(data);

    // TODO: checks if user to join exists...
    var newRoom = require('./game-room.js')(data.name, 'player host', data.opponent, data.gameMap);

    serverState.gameRooms.push(newRoom);

    socket.emit('createGameRoomResponse', { status: 'Success' });
}};
