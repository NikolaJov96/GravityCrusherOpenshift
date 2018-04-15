// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definition for reset password requests.

var hashing = require('./hashing.js');
var appConfig = require('../../app-config.js');
var db = require('../sql-server/database-interface.js');

function resetPassword(rc, hash, salt, callback){
    console.log(rc + ' ' + hash + ' ' + salt);
    callback('Success');
};

module.exports = function(socket){ return function(data) {
    console.log('Password reset req: REQUEST CODE:' + data.requestCode + ' NEW PASSWORD:' + data.password);

    var newSaltedHash = hashing.saltAndCalculateHash(data.password, appConfig.passwordHashAlgorithm);
    resetPassword(data.requestCode, newSaltedHash.hash, newSaltedHash.salt,
        function(status){
            console.log('    STATUS:' + status);
            socket.emit('passwordResetResponse', {'status':status});
        }
    );
};};

