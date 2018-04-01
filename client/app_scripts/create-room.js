// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'create-room' page

var roomName = document.getElementById('roomName');
var submitBtn = document.getElementById('submitBtn');

// send create room request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (roomName.value.length === 0) logMsg('Room name field empti.');
    else {
        var createGameRoomPkg = {
            name:roomName.value,
            opponent:'',
            chatEnabled:true,
            spectatorsEnabled:true,
            gameMap:0
        };
        socket.emit('createGameRoom', createGameRoomPkg);
        logMsg('Game room creation requested.');
    }
}

socket.on('createGameRoomResponse', function(data){
    if (!('status' in data)) 
        attrMissing('status', 'createGameRoomResponse', data);
    
    if (data.status === 0){
        logMsg("On createGameRoomResponse - success");
        window.location = 'game';
    } else if (data.status === 1)
        logMsg("On createGameRoomResponse - invalid opponent");
    else logMsg("On createGameRoomResponse - unknown error");
});
