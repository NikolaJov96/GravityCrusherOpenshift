// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'create-room' page

var roomName = document.getElementById('roomName');
var submitBtn = document.getElementById('submitBtn');
var opponent = document.getElementById('inputPlayer2Name');
var map = document.getElementById('map');

// send create room request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (roomName.value.length === 0){ logMsg('Room name field empti.'); roomName.focus(); }
    else if (opponent.value.length === 0){ logMsg('Opponent name field empti.'); opponent.focus(); }
    else {
        var createGameRoomPkg = {
            name:roomName.value,
            opponent:opponent.value,
            chatEnabled:true,
            spectatorsEnabled:true,
            gameMap:map.value
        };
        socket.emit('createGameRoom', createGameRoomPkg);
        logMsg('Game room creation requested.');
    }
};

socket.on('createGameRoomResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'createGameRoomResponse', data);
    
    if (data.status === 'Success'){ logMsg('On createGameRoomResponse - success'); window.location = 'game'; }
    else if (data.status === 'InvalidOpponent'){
        logMsg('On createGameRoomResponse - invalid opponent');
        opponent.select();
        opponent.focus();
    }else logMsg('On createGameRoomResponse - unknown error: ' + data.status);
});
