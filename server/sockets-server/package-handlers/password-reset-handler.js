// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definition for reset password requests.

var hashing = require('../hashing.js');
var appConfig = require('../../../app-config.js');
var db = require('../../sql-server/database-interface.js');

module.exports = function(socket){ return function(data) {
    logMsg('Password reset req: REQUEST CODE:' + data.requestCode + ' NEW PASSWORD:' + data.password);

    var newSaltedHash = hashing.saltAndCalculateHash(data.password, appConfig.passwordHashAlgorithm);
    db.resetPassword(data.requestCode, newSaltedHash.hash, newSaltedHash.salt,
        function(status){
            logMsg('    STATUS:' + status);
            socket.emit('passwordResetResponse', {'status':status});
        }
    );
};};

