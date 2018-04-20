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

// function initalizing new state, as requested by the server
socket.on('initState', function(data){
    if (data.state === 'loading'){
        logMsg('init loading state');
        roomState.finish();
        roomState = StateLoading(data);
    }else if (data.state === 'game'){
        logMsg('init game state');
        roomState.finish();
        roomState = StateGame(data);
    }else if (data.state === 'gameEnd'){
        logMsg('init game end state');
        roomState.finish();
        roomState = StateGameEnd(data);
    }
});

