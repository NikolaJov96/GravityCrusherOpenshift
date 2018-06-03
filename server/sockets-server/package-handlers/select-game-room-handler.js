// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: This file contains handler neccesary joining the game room

module.exports = function(socket){ return function(data){
    logMsg('Select room req: Name: ' + data.roomName + ' action: ' + data.action);
    socket.user.interaction = true;
    
    var targetRoom = null;
    for (i in serverState.gameRooms) 
        if (serverState.gameRooms[i].name === data.roomName) 
            targetRoom = serverState.gameRooms[i];
    if (!targetRoom){
        socket.emit('selectGameRoomResponse', { status: 'InvalidRoom' });
        return;
    }
    
    var activeRoom = null;
    for (i in serverState.gameRooms){
        if (serverState.gameRooms[i].containsUserActive(socket.user)){
            activeRoom = serverState.gameRooms[i];
            break;
        }
    }
    if (activeRoom){
        if (activeRoom.name == targetRoom.name){
            socket.emit('selectGameRoomResponse', { status: 'Success' });
            return;
        } else {
            socket.emit('selectGameRoomResponse', { status: 'BindToAnotherRoom' });
            return;
        }
    }
    
    if (targetRoom){
        var i = targetRoom.spectators.length;
        while (i--){
            if (targetRoom.spectators[i].name === socket.user.name){
                targetRoom.spectators.splice(i, 1);
            }
        }
        
        if (data.action === 'watch'){
            if (targetRoom.joinName === socket.user.name){
                socket.emit('selectGameRoomResponse', { status: 'MustPlay' });
            } else if (targetRoom.roomPublic) {
                targetRoom.spectators.push(socket.user);
                socket.emit('selectGameRoomResponse', { status: 'Success' });
            } else {
                socket.emit('selectGameRoomResponse', { status: 'JoinDenied' });
            }
        } else if (data.action === 'play') {
            if (targetRoom.join && !targetRoom.containsUserBind(socket.user)){
                logMsg("taken: " + targetRoom.joinName + " from: " + socket.user.name);
                socket.emit('selectGameRoomResponse', { status: 'PlaceTaken' });
            } else if (targetRoom.gamePublic || targetRoom.containsUserBind(socket.user)){
                socket.emit('selectGameRoomResponse', { status: 'Success' });
                if (targetRoom.containsUserBind(socket.user)){
                    if (targetRoom.joinName === socket.user.name){
                        targetRoom.join = socket.user;
                    } else {
                        targetRoom.host = socket.user;
                    }
                } else {
                    targetRoom.join = socket.user;
                    targetRoom.joinName = socket.user.name;
                    for (var user in serverState.users){
                        if (serverState.users[user].page === 'GameRooms'){
                            serverState.users[user].socket.emit('gameRoomsUpdate', {
                                rooms: require('../rooms-to-display.js')(serverState.users[user])
                            });
                        }
                    }
                }
            } else {
                socket.emit('selectGameRoomResponse', { status: 'JoinDenied' });
            }
        } else {
            socket.emit('selectGameRoomResponse', { status: 'BadAction' });
        }
    } 
    else socket.emit('selectGameRoomResponse', { status: 'InvalidRoom' });
}};
