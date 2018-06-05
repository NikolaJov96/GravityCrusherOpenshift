// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game' page

var chatBody = document.getElementById('chatBody');
var chatBtn = document.getElementById('chatBtn');
var chatText = document.getElementById('chatText');
var chatDiv = document.getElementById('chatDiv');
var surrenderBtn = document.getElementById('surrenderBtn');
var ovarlay = document.getElementById('ovarlay');

document.onkeydown = function(event){
    if (roomState) roomState.onKeyDown(event);
};

document.onkeyup = function(event){
    if (roomState) roomState.onKeyUp(event);
};

document.onkeypress = function(event){
    if (roomState) roomState.onKeyPress(event);
};

var banOverlay = function(username){
    overlay.classList.remove("d-none");
};

var addMessages = function(messages){
    for (i in messages){
        if (admin){
            chatBody.innerHTML +=
                '<p onclick="banOverlay(\'' + messages[i].sender +
                    '\');" style="cursor: pointer; display:inline; margin:0;">' + messages[i].sender +
                '</p>:  <p style="display:inline; margin:0;">' + messages[i].text +
                '</p></br>';
        }else{
            chatBody.innerHTML += '<p style="display:inline; margin:0;">' + messages[i].sender +
                ':  ' + messages[i].text + '</p></br>';
        }
    }
};

initCallback = function(data){
    if ('payload' in data && 'redirect' in data.payload && data.payload.redirect){
        window.location = 'index';
        return;
    }
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
        
        if (signedIn) chatDiv.classList.remove('d-none');
        
        addMessages(data.payload.messages);
        chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
        
        logMsg('Role: ' + data.payload.role);
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
    return false;
};

surrenderBtn.onclick = function(){
    window.location = 'index';
};

socket.on('broadcastResponse', function(data){
    if (!('msgArr' in data)) attrMissing('messages', 'broadcastResponse', data);
    else{
        var scroll = false;
        if (chatBody.scrollTop === chatBody.scrollHeight - chatBody.clientHeight) scroll = true;
        
        addMessages(data.msgArr);
        
        if (scroll) chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
    }
});
