// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: function returning array of available rooms to be forwarded to the specific user

module.exports = function(user){
    var rooms = []
    // add rooms where player is invited
    for (var i in serverState.gameRooms){
        if (serverState.gameRooms[i].joinName === user.name){
            rooms.push({
                name: serverState.gameRooms[i].name,
                host: serverState.gameRooms[i].host.name,
                map: serverState.gameRooms[i].map,
                canPlay: (serverState.gameRooms[i].join ? false : true)
            });
        }
    }
    // add other rooms
    for (var i in serverState.gameRooms){
        if (serverState.gameRooms[i].roomPublic && 
            serverState.gameRooms[i].joinName !== user.name){
            rooms.push({
                name: serverState.gameRooms[i].name,
                host: serverState.gameRooms[i].host.name,
                map: serverState.gameRooms[i].map,
                canPlay: (serverState.gameRooms[i].join || !serverState.gameRooms[i].gamePublic ? false : true)
            });
        }
    }
    return rooms;
}
