// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'create-room' page

var roomName = document.getElementById('roomName');
var gameReach = document.getElementById('gameReach');
var opponent = document.getElementById('inputPlayer2Name');
var map = document.getElementById('map');
var roomReach = document.getElementById('roomReach');
var submitBtn = document.getElementById('submitBtn');

// send create room request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (roomName.value.length === 0){ logMsg('Room name field empti.'); roomName.focus(); }
    else if (opponent.value.length === 0 && gameReach.value === 'Private Game'){
        logMsg('Opponent name field empti.'); opponent.focus();
    } else {
        var createGameRoomPkg = {
            name:roomName.value,
            gamePublic:(gameReach.value === 'Public Game' ? true : false),
            opponent:opponent.value,
            gameMap:map.value,
            roomPublic:(roomReach.value === 'Public Room' ? true : false),
            chatEnabled:true
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
