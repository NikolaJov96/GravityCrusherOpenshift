// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definition for account update packages.

var hashing = require('./hashing.js');
var appConfig = require('../../app-config.js');

// dummy implementation, TO BE REMOVED
function getSaltByUsername(username, callback){
    if (callback != null){
        callback('Success', '1a2f3c221');
    }
};
// dummy implementation, TO BE REMOVED
function changePassword(username, oldHash, newHash, newSalt, callback){
    if (callback != null){
        callback('Success');
    }
};
// dummy implementation, TO BE REMOVED
function changeUsername(oldUsername, newUsername, hash, callback){
    if (callback != null){
        callback('Success');
    }
};

function handlePasswordChangeRequest(data, socket){
    console.log('New password change request: ' + data.oldUsername + '#' + data.oldPassword + '#' + data.newPassword);

    getSaltByUsername(data.oldUsername,
        function(status, salt){ // callback function
            if (status !== 'Success'){
                // emit error
            }
            else {
                var oldHash = hashing.calculateHash(data.oldPassword, salt, appConfig.passwordHashAlgorithm);
                var newSaltedHash = hashing.saltAndCalculateHash(data.newPassword, appConfig.passwordHashAlgorithm);
                changePassword(data.oldUsername, oldHash, newSaltedHash.hash, newSaltedHash.salt,
                    function(status){ // callback function
                        // emit status
                    }
                );
            }
        }
    );
};

function handleUsernameChangeRequest(data, socket){
    console.log('New username change request: ' + data.oldUsername + '#' + data.newUsername + '#' + data.oldPassword);

    getSaltByUsername(data.oldUsername,
        function(status, salt){ // callback function
            if (status !== 'Success'){
                // emit error
            }
            else {
                var hash = hashing.calculateHash(data.oldPassword, salt, appConfig.passwordHashAlgorithm);
                changeUsername(data.oldUsername, data.newUsername, hash,
                    function(status){//callback function
                        // emit status
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

