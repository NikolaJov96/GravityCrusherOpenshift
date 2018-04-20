// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game' page

document.onkeydown = function(event){
    var newState = roomState.onKeyDown(event);
    if (newState){
        roomState.finish();
        roomState = newState();
    }
};

document.onkeyup = function(event){
    var newState = roomState.onKeyUp(event);
    if (newState){
        roomState.finish();
        roomState = newState();
    }
};

initCallback = function(data){
    if (!('payload' in data)) attrMissing('payload', 'initCallback', data);
    else if (!('state' in data.payload)) attrMissing('state', 'initCallback.playload', data.payload);
    else {
        if (data.payload.state === 'loading'){
            logMsg('init loading state');
            if (roomState) roomState.finish();
            roomState = StateLoading(data.payload);
        }else if (data.payload.state === 'game'){
            logMsg('init game state');
            if (roomState) roomState.finish();
            roomState = StateGame(data.payload);
        }else if (data.payload.state === 'game-end'){
            logMsg('init game end state');
            if (roomState) roomState.finish();
            roomState = StateGameEnd(data.payload);
        }else logMsg('Undefined state: ' + data.payload.state);
    }
};
if (initCallbackData) initCallback(initCallbackData);

// function initalizing new state, as requested by the server
socket.on('initRoomState', function(data){
    if (!('state' in data)) attrMissing('state', 'initRoomState', data);
    else if (data.state === 'loading'){
        logMsg('init loading state');
        if (roomState) roomState.finish();
        roomState = StateLoading(data);
    }else if (data.state === 'game'){
        logMsg('init game state');
        if (roomState) roomState.finish();
        roomState = StateGame(data);
    }else if (data.state === 'game-end'){
        logMsg('init game end state');
        if (roomState) roomState.finish();
        roomState = StateGameEnd(data);
    }else logMsg('Undefined state: ' + data.state);
});

