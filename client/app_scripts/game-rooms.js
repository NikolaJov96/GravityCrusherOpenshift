// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game-rooms' page

var table = document.getElementById('roomsTable');
var tableBody = document.getElementById('roomsTableBody');
var noRooms = document.getElementById('noRooms');

var drawTable = function(rooms){
    if (rooms.length === 0) noRooms.style.display = 'inline';
    else{
        var innerTable = '';
        for (var i in rooms){
            innerTable += 
`
<tr>
    <td scope="row">` + rooms[i].name + `</td>
    <td>` + rooms[i].host + `</td>
    <td>` + rooms[i].map + `</td>
    <td><button onclick="choseRoom('` + rooms[i].name + `', 'watch');" type="button" class="btn btn-secondary">Watch</button></td>
    <td><button onclick="choseRoom('` + rooms[i].name + `', 'play');" type="button" class="btn btn-primary">Play</button></td>
    <td>Enabled</td>
</tr>
`;
        }
        table.style.display = 'table';
        tableBody.innerHTML = innerTable;
    }
};

initCallback = function(data){
    if (!('payload' in data)) attrMissing('payload', 'initCallback', data);
    else if (!('rooms' in data.payload)) attrMissing('rooms', 'initCallback.playload', data.payload);
    else{
        drawTable(data.payload.rooms);
    }
};
if (initCallbackData) initCallback(initCallbackData);

socket.on('gameRoomsUpdate', function(data){
    if (!('rooms' in data)) attrMissing('rooms', 'gameRoomsUpdate', data);
    else{
        noRooms.style.display = 'none';
        drawTable(data.rooms);
    }
    /*if ('added' in data){
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
    }*/
});

// send create room request
var choseRoom = function(name, action){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    var selectGameRoomPkg = {
        roomName:name,
        action:action
    };
    socket.emit('selectGameRoom', selectGameRoomPkg);
    logMsg('Game room sellection requested.');
};

// document.getElementById('playGame').onclick = choseRoom;

socket.on('selectGameRoomResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'selectGameRoomResponse', data);
    
    if (data.status === 'Success'){ logMsg('On selectGameRoomResponse - success'); window.location = 'game'; }
    else if (data.status === 'PlayerSlotTaken') logMsg('On selectGameRoomResponse - player slot taken');
    else if (data.status === 'InvalidRoom') logMsg('On selectGameRoomResponse - invalid room');
    else if (data.status === 'JoinDenied') logMsg('On selectGameRoomResponse - another player is required to join');
    else logMsg('On selectGameRoomResponse - unknown error: ' + data.status);
});
