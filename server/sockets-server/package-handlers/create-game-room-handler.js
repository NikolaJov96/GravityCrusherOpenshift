// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler neccesary for creating new room

var db = require('../../sql-server/database-interface.js');

module.exports = function(socket){ return function(data){
    logMsg('Create room req: Data: ');
    logMsg(data);
    socket.user.interaction = true;

    var locked = false;
    for (i in serverState.gameRooms){
        if (serverState.gameRooms[i].containsUserActive(socket.user)){
            locked = true;
        }
    }

    if (locked){
        socket.emit('createGameRoomResponse', { status: 'AlreadyInGame' });
    } else if (!data.gamePublic && data.opponent === socket.user.name){
        socket.emit('createGameRoomResponse', { status: 'InvalidOpponent' });
    } else {
            var freeName = true;
            for (var i in serverState.gameRooms){
                if (data.name === serverState.gameRooms[i].name) freeName = false;
            }
            if (freeName) {
                if (!data.gamePublic){
                db.checkIfUserExists(data.opponent, function(socket, data) { return function(status) {
                    if (status == 'UsernameNotExists'){
                        socket.emit('createGameRoomResponse', { status: 'InvalidOpponent' });
                    } else {
                        var newRoom = require('../game-room.js')(data.name, socket.user, data.gamePublic,
                                                                 data.opponent, data.gameMap, data.roomPublic, true);
                        serverState.gameRooms.push(newRoom);
                        for (var user in serverState.users){
                            if (serverState.users[user].socket && serverState.users[user].page === 'GameRooms'){
                                serverState.users[user].socket.emit('gameRoomsUpdate', {
                                    rooms: require('../rooms-to-display.js')(serverState.users[user])
                                });
                            }
                        }

                        socket.emit('createGameRoomResponse', { status: 'Success' });
                    }
                }; }(socket, data));
            } else {
                var newRoom = require('../game-room.js')(data.name, socket.user, data.gamePublic,
                                                         '', data.gameMap, data.roomPublic, true);

                serverState.gameRooms.push(newRoom);
                for (var user in serverState.users){
                    if (serverState.users[user].socket && serverState.users[user].page === 'GameRooms'){
                        serverState.users[user].socket.emit('gameRoomsUpdate', {
                            rooms: require('../rooms-to-display.js')(serverState.users[user])
                        });
                    }
                }

                socket.emit('createGameRoomResponse', { status: 'Success' });
            }
        }
        else socket.emit('createGameRoomResponse', { status: 'RoomNameTaken' });
    }
}};
