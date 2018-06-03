// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: function hadling chat messages inside the rooms

module.exports = function(socket){ return function(data){
    logMsg('Send message req: Text: ' + data.text);
    socket.user.interaction = true;
    if (socket.user.isGuest) return;
    
    var room = null;
    for (i in serverState.gameRooms){
        if (serverState.gameRooms[i].containsUser(socket.user)){
            room = serverState.gameRooms[i];
            break;
        }
        for (j in serverState.gameRooms[i].spectators){
            if (serverState.gameRooms[i].spectators[j].name === socket.user.name){
                room = serverState.gameRooms[i];
                break;
            }
        }
    }
    if (room) room.newMessages.push({ sender: socket.user.name, text: data.text });
}};
