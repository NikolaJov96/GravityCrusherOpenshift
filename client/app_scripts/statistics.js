// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'statistics' page

var table = document.getElementById('statTable');
var dropDown = document.getElementById('dropDown');

var columns = [];
var defaultColumn = '';

var drawTable = function(rows){
    var innerTable = '<thead><tr><th scope="col">Rank</th><th scope="col">Palyer Name</th>';

    for (var i in columns) innerTable += '<th scope="col">' + columns[i] + '</th>';
    innerTable += '</tr></thead><tbody>';
    for (var i in rows){
        innerTable +=
`
<tr>
    <td scope="row">` + rows[i].rank + `</td>
    <td>` + rows[i].username + `</td>
    <td>` + rows[i].gold + `</td>
    <td>` + rows[i].win8 + `</td>
    <td>` + rows[i].kills + `</td>
    <td>` + rows[i].gamesPlayed + `</td>
</tr>`;
    }
    innerTable += '</tbody>';
    table.innerHTML = innerTable;
};

initCallback = function(data){
    if (!('payload' in data)) attrMissing('payload', 'initCallback', data);
    else if (!('metrics' in data.payload)) attrMissing('metrics', 'initCallback.playload', data.payload);
    else if (!('default' in data.payload)) attrMissing('default', 'initCallback.playload', data.payload);
    else if (!('data' in data.payload)) attrMissing('data', 'initCallback.playload', data.payload);
    else{
        columns = data.payload.metrics;
        defaultColumn = data.payload.default;
        drawTable(data.payload.data);
        table.style.display = 'table';
        var text = '';
        for (var i in data.payload.metrics){
            text += '<option' + (data.payload.metrics[i] == defaultColumn ? ' selected="selected"' : '') +
                '>' + data.payload.metrics[i] + '</option>';
        }
        dropDown.innerHTML = text;
        dropDown.style.display = 'inline';
    }
};
if (initCallbackData) initCallback(initCallbackData);

socket.on('gameRoomsUpdate', function(data){
    if (!('rooms' in data)) attrMissing('rooms', 'gameRoomsUpdate', data);
    else{
        drawTable(data.rooms);
    }
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
