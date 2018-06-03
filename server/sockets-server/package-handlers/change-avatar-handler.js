// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Handler accepting new user avatar

var fs = require('fs');
// var db = require('../../sql-server/database-interface.js');

module.exports = function(socket){ return function(data) {
    if (data.img) {
        logMsg('New avatar for the user: ' + socket.user.name);
        
        fs.writeFile('logo', data.img, 'binary', function(err){
            if (err){
                socket.emit('changeAvatarResponse', { status: 'CannotSave' });
            } else {
                socket.emit('changeAvatarResponse', { status: 'Success' });
            }
            console.log('File saved.');
        })
    }
}};
