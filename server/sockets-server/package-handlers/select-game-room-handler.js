// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: This file contains handler neccesary joining the game room

module.exports = function(socket){ return function(data){
    console.log('Select room req: Name: ' + data.roomName + ' action: ' + data.action);
    
    // check if user is locked by some room
    
    var targetRoom = null;
    for (i in serverState.gameRooms) 
        if (serverState.gameRooms[i].name === data.roomName) 
            targetRoom = serverState.gameRooms[i];
    
    if (targetRoom){
        if (data.action === 'watch'){
            if (targetRoom.joinName === socket.user.name){
                socket.emit('selectGameRoomResponse', { status: 'MustPlay' });
            } else if (targetRoom.roomPublic) {
                var isSpec = false;
                for (i in targetRoom.spectators){
                    if (targetRoom.spectators[i].name === socket.user.name){
                        isSpec = true;
                    }
                }
                if (!isSpec){
                    targetRoom.spectators.push(socket.user);
                }
                socket.emit('selectGameRoomResponse', { status: 'Success' });
            } else {
                socket.emit('selectGameRoomResponse', { status: 'JoinDenied' });
            }
        } else if (data.action === 'play') {
            if (targetRoom.joinName === socket.user.name || targetRoom.gamePublic){
                targetRoom.join = socket.user;
                socket.emit('selectGameRoomResponse', { status: 'Success' });
            } else {
                socket.emit('selectGameRoomResponse', { status: 'JoinDenied' });
            }
        } else {
            socket.emit('selectGameRoomResponse', { status: 'BadAction' });
        }
    } 
    else socket.emit('selectGameRoomResponse', { status: 'InvalidRoom' });
}};
