// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'create-room' page

var roomName = document.getElementById('roomName');
var gameReachIcon = document.getElementById('gameReachIcon');
var gameReach = document.getElementById('gameReach');
var opponentDiv = document.getElementById('opponentDiv');
var opponent = document.getElementById('inputPlayer2Name');
var map = document.getElementById('map');
var roomReachIcon = document.getElementById('roomReachIcon');
var roomReach = document.getElementById('roomReach');
var submitBtn = document.getElementById('submitBtn');

gameReach.value = 'Public Game';

initCallback = function(data){
    if (!('payload' in data)) attrMissing('payload', 'initCallback', data);
    else if (!('redirect' in data.payload)) attrMissing('redirect', 'initCallback.playload', data.payload);
    else{
        if (data.payload.redirect){
            window.location = 'game';
        }
    }
};
if (initCallbackData) initCallback(initCallbackData);

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
    return false;
};

// toggle opponent input and lock icon
gameReach.onchange = function(){
    if (gameReach.value === 'Public Game'){
        opponentDiv.classList.add('d-none');
        gameReachIcon.innerHTML = 'lock_open';
    }else{
        opponentDiv.classList.remove('bmd-form-group');
        opponentDiv.classList.remove('d-none');
        gameReachIcon.innerHTML = 'lock_outline';
    }
}

// toggle lock icon
roomReach.onchange = function(){
    if (roomReach.value === 'Public Room'){
        roomReachIcon.innerHTML = 'lock_open';
    }else{
        roomReachIcon.innerHTML = 'lock_outline';
    }
}

socket.on('createGameRoomResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'createGameRoomResponse', data);
    
    if (data.status === 'Success'){ logMsg('On createGameRoomResponse - success'); window.location = 'game'; }
    else if (data.status === 'InvalidOpponent'){
        logMsg('On createGameRoomResponse - invalid opponent');
        opponent.select();
        opponent.focus();
    }else if (data.status === 'AlreadyInGame') {
        logMsg('On createGameRoomResponse - user is already in the game');
    }else logMsg('On createGameRoomResponse - unknown error: ' + data.status);
});
