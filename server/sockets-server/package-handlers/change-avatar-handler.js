// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Handler accepting new user avatar

var fs = require('fs');
var uuidv1 = require('uuid/v1');
var db = require('../../sql-server/database-interface.js');

module.exports = function(socket){ return function(data) {
    if (data.img) {
        logMsg('New avatar for the user: ' + socket.user.name);
        socket.user.interaction = true;

        db.getAvatar(socket.user.name, function(status, oldFilename){
            newFilename = uuidv1();
            db.changeAvatar(socket.user.name, newFilename, function(status){
                if (status === 'Success') {
                    fs.writeFile('server/sockets-server/avatars/' + newFilename + '.png', data.img, 'binary', function(err){
                        if (err){
                            socket.emit('changeAvatarResponse', { status: 'CannotSave' });
                        } else {
                            if (oldFilename !== 'default'){
                                fs.unlink('server/sockets-server/avatars/' + oldFilename + '.png');
                            }
                            socket.emit('changeAvatarResponse', { status: 'Success' });
                        }
                        console.log('File saved.');
                    });
                } else {
                    socket.emit('changeAvatarResponse', { 'status': status} );
                }
            });
        });
    }
}};
