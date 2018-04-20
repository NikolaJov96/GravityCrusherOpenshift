// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: function returning array of rooms to be forwarded to the specific user

module.exports = function(user){
    var rooms = []
    for (var i in serverState.gameRooms){
        rooms.push({
            name: serverState.gameRooms[i].name,
            host: serverState.gameRooms[i].host.name,
            map: serverState.gameRooms[i].map,
        });
    }
    return rooms;
}