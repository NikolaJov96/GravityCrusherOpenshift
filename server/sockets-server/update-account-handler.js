// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definition for account update packages.

var hashing = require('./hashing.js');
var appConfig = require('../../app-config.js');
var db = require('../sql-server/database-interface.js');

function handlePasswordChangeRequest(data, socket){
    console.log('New password change request: ' + data.oldUsername + '#' + data.oldPassword + '#' + data.newPassword);

    db.getSaltByUsername(data.oldUsername,
        // callback function
        function(status, salt){
            if (status !== 'Success'){
                socket.emit('updateAccountResponse', {status: status});
            }
            else {
                var oldHash = hashing.calculateHash(data.oldPassword, salt, appConfig.passwordHashAlgorithm);
                var newSaltedHash = hashing.saltAndCalculateHash(data.newPassword, appConfig.passwordHashAlgorithm);
                db.changePassword(data.oldUsername, oldHash, newSaltedHash.hash, newSaltedHash.salt,
                    // callback function
                    function(status){
                        socket.emit('updateAccountResponse', {status: status});
                    }
                );
            }
        }
    );
};

function handleUsernameChangeRequest(data, socket){
    console.log('New username change request: ' + data.oldUsername + '#' + data.newUsername + '#' + data.oldPassword);

    db.getSaltByUsername(data.oldUsername,
        // callback function
        function(status, salt){
            if (status !== 'Success'){
                socket.emit('updateAccountResponse', {status: status});
            }
            else {
                var hash = hashing.calculateHash(data.oldPassword, salt, appConfig.passwordHashAlgorithm);
                db.changeUsername(data.oldUsername, data.newUsername, hash,
                    // callback function
                    function(status){
                        socket.emit('updateAccountResponse', {status: status});
                    }
                );
            }
        }
    );
};

module.exports = function(socket){ return function(data){
        if ('newPassword' in data){
            handlePasswordChangeRequest(data, socket);
        }
        else if ('newUsername' in data){
            handleUsernameChangeRequest(data, socket);
        }
        else {
            // emit error
        }
};};

