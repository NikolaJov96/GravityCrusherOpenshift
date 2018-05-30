// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game-rooms' page

var roomName = document.getElementById('roomName');
var table = document.getElementById('roomsTable');
var tableBody = document.getElementById('roomsTableBody');
var noRooms = document.getElementById('noRooms');

var rooms = [];

var drawTable = function(){
    var innerTable = '';
    for (var i in rooms){
        if (rooms[i].name.toLowerCase().indexOf(roomName.value.toLowerCase()) < 0 &&
           rooms[i].host.toLowerCase().indexOf(roomName.value.toLowerCase()) < 0 &&
           rooms[i].map.toLowerCase().indexOf(roomName.value.toLowerCase()) < 0) continue;
        innerTable +=
`
<tr>
    <td scope="row">` + rooms[i].name + `</td>
    <td>` + rooms[i].host + `</td>
    <td>` + rooms[i].map + `</td>
    <td><button onclick="choseRoom('` + rooms[i].name + `', 'watch');" type="button" class="btn btn-success"` +
        (rooms[i].canWatch ? '' : ' disabled') + `>Watch</button></td>
    <td><button onclick="choseRoom('` + rooms[i].name + `', 'play');"  type="button" class="btn btn-danger" ` +
        (rooms[i].canPlay  ? '' : ' disabled') + `>Play</button></td>
    <td>Enabled</td>
</tr>
`;
    }
    if (innerTable.length > 0){
        noRooms.style.display = 'none';
        table.style.display = 'table';
        tableBody.innerHTML = innerTable;
    }else{
        noRooms.style.display = 'inline';
        table.style.display = 'none';
    }
};

initCallback = function(data){
    if (!('payload' in data)) attrMissing('payload', 'initCallback', data);
    else if (!('redirect' in data.payload)) attrMissing('redirect', 'initCallback.playload', data.payload);
    else{
        if (data.payload.redirect){
            window.location = 'game';
        }else{
            if (!('rooms' in data.payload)) attrMissing('rooms', 'initCallback.playload', data.payload);
            else{
                rooms = data.payload.rooms;
                drawTable();
            }
        }
    }
};
if (initCallbackData) initCallback(initCallbackData);

roomName.onchange = drawTable;

socket.on('gameRoomsUpdate', function(data){
    logMsg('Game rooms update.');
    if (!('rooms' in data)) attrMissing('rooms', 'gameRoomsUpdate', data);
    else{
        //noRooms.style.display = 'none';
        rooms = data.rooms;
        drawTable();
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

socket.on('selectGameRoomResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'selectGameRoomResponse', data);
    
    if (data.status === 'Success'){ logMsg('On selectGameRoomResponse - success'); window.location = 'game'; }
    else if (data.status === 'PlayerSlotTaken') logMsg('On selectGameRoomResponse - player slot taken');
    else if (data.status === 'InvalidRoom') logMsg('On selectGameRoomResponse - invalid room');
    else if (data.status === 'JoinDenied') logMsg('On selectGameRoomResponse - another player is required to join');
    else if (data.status === 'PlaceTaken') logMsg('On selectGameRoomResponse - another player took the place');
    else logMsg('On selectGameRoomResponse - unknown error: ' + data.status);
});
