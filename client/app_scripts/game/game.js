// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game' page

var chatBtn = document.getElementById('chatBtn');
var chatText = document.getElementById('chatText');
var chatBody = document.getElementById('chatBody');

document.onkeydown = function(event){
    if (roomState) roomState.onKeyDown(event);
};

document.onkeyup = function(event){
    if (roomState) roomState.onKeyUp(event);
};

document.onkeypress = function(event){
    if (roomState) roomState.onKeyPress(event);
};

initCallback = function(data){
    if (!('payload' in data)) attrMissing('payload', 'initCallback', data);
    else if (!('state' in data.payload)) attrMissing('state', 'initCallback.playload', data.payload);
    else if (!('messages' in data.payload)) attrMissing('messages', 'initCallback.playload', data.payload);
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
        
        chatBody.innerHTML += data.payload.messages;
        chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
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

socket.on('gameState', function(data){
    if (roomState) roomState.handleStatePackage(data);
});

chatBtn.onclick = function(){
    if (chatText.value.length > 0){
        logMsg('Chat message sent: ' + chatText.value);
        socket.emit('sendMessage', { text: chatText.value });
        chatText.value = '';
        chatText.focus();
    }
};

socket.on('broadcastResponse', function(data){
    if (!('text' in data)) attrMissing('text', 'broadcastResponse', data);
    else{
        var scroll = false;
        if (chatBody.scrollTop === chatBody.scrollHeight - chatBody.clientHeight) scroll = true;
        
        chatBody.innerHTML += data.text;
        
        if (scroll) chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
    }
});
