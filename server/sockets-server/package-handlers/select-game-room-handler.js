// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: This file contains handler neccesary joining the game room

module.exports = function(socket){ return function(data){
    console.log('Select room req: Name: ' + data.roomName + ' action: ' + data.action);
    
    var targetRoom = null;
    for (i in serverState.gameRooms) 
        if (serverState.gameRooms[i].name === data.roomName) 
            targetRoom = serverState.gameRooms[i];
    
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
            if (targetRoom.join){
                socket.emit('selectGameRoomResponse', { status: 'PlaceTaken' });
            } else if (targetRoom.gamePublic || targetRoom.joinName === socket.user.name){
                targetRoom.join = socket.user;
                targetRoom.joinName = socket.user.name;
                socket.emit('selectGameRoomResponse', { status: 'Success' });
                for (var user in serverState.users){
                    if (serverState.users[user].page === 'GameRooms'){
                        serverState.users[user].socket.emit('gameRoomsUpdate', {
                            rooms: require('../rooms-to-display.js')(serverState.users[user])
                        });
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
