// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game-rooms' page

// send create room request
var choseRoom = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    var selectGameRoomPkg = {
        roomName:'room',
        action:'play'
    };
    socket.emit('selectGameRoom', selectGameRoomPkg);
    logMsg('Game room sellection requested.');
};

document.getElementById('playGame').onclick = choseRoom;

socket.on('openRoomsStateUpdate', function(data){
    if ('added' in data){
        for (var room in data.added){
            // add rows to rooms table
            logMsg('Room added: ' + room);
        }
    }
    if ('removed' in data){
        for (var room in data.removed){
            // remove rows from rooms table
            logMsg('Room removed: ' + room);
        }
    }
    if ('slotTaken' in data){
        for (var room in data.slotTaken){
            // disable Play button
            logMsg('Room slotTaken: ' + room);
        }
    }
});

socket.on('selectGameRoomResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'selectGameRoomResponse', data);
    
    if (data.status === 'Success'){ logMsg('On selectGameRoomResponse - success'); window.location = 'game'; }
    else if (data.status === 'PlayerSlotTaken') logMsg('On selectGameRoomResponse - player slot taken');
    else if (data.status === 'InvalidRoom') logMsg('On selectGameRoomResponse - invalid room');
    else if (data.status === 'JoinDenied') logMsg('On selectGameRoomResponse - another player is required to join');
    else logMsg('On selectGameRoomResponse - unknown error: ' + data.status);
});
