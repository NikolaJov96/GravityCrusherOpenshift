// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler that handle requests for game map names

var db = require('../../sql-server/database-interface.js');

module.exports = function(socket){ return function(data){
    logMsg('Game map names req: Data: ');
    logMsg(data);
    socket.user.interaction = true;

    db.selectObjectsOnMap(function(socket, data) { return function(status, maps) {
            socket.emit('bannUserResponse', { status: status, maps: maps });
        }
    }(socket, data));
}};
