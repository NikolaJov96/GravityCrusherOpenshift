// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler neccesary for creating new room

var db = require('../sql-server/database-interface.js');

module.exports = function(socket){ return function(data){
    console.log('Create room req: Data: ');
    console.log(data);

    db.checkIfUserExists(data.opponent, function(socket, data) { return function(status) {
            console.log(status);
            if (status == 'UsernameNotExists') socket.emit('createGameRoomResponse', { status: 'InvalidOpponent' });
            else {
                var newRoom = require('./game-room.js')(data.name, 'player host', data.opponent, data.gameMap);
                serverState.gameRooms.push(newRoom);

                socket.emit('createGameRoomResponse', { status: 'Success' });
            }
        };
    }(socket, data));
}};
