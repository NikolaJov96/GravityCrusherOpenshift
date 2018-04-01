// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game-rooms' page

// send create room request
var choseRoom = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    var openRoomsSelectPkg = {
        roomId:123,
        action:0
    };
    socket.emit('openRoomsSelect', openRoomsSelectPkg);
    logMsg('Game room sellection requested.');
}

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

socket.on('openRoomsSelectResponse', function(data){
    if (!('status' in data)) 
        attrMissing('status', 'openRoomsSelectResponse', data);
    
    if (data.status === 0){
        logMsg("On openRoomsSelectResponse - success");
        window.location = 'game';
    } else if (data.status === 1)
        logMsg("On openRoomsSelectResponse - player slot taken");
    else if (data.status === 2)
        logMsg("On openRoomsSelectResponse - invalid room");
    else logMsg("On openRoomsSelectResponse - unknown error");
});
