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
        if (targetRoom.joinName === socket.user.name){
            targetRoom.join = socket.user;
            targetRoom.joined = true;

            socket.emit('selectGameRoomResponse', { status: 'Success' });
        }
        else socket.emit('selectGameRoomResponse', { status: 'JoinDenied' });  // another player is bound to join
    } 
    else socket.emit('selectGameRoomResponse', { status: 'InvalidRoom' });
}};
