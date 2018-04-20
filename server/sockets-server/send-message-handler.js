// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: function hadling chat messages inside the rooms

module.exports = function(socket){ return function(data){
    console.log('Send message req: Text: ' + data.text);
    
    var room = null;
    for (i in serverState.gameRooms){
        if (serverState.gameRooms[i].containsUser(socket.user)){
            room = serverState.gameRooms[i];
            break;
        }
    }
    if (room) room.newMessages.push({ sender: socket.user.name, text: data.text });
}};
