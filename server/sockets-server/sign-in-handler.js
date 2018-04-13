// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for sign in requests.

var uuidv1 = require('uuid/v1');
var appConfig = require('../../app-config.js')
var hashing = require('./hashing.js');
var db = require('../sql-server/database-interface.js');

// data = {account, password, activationKey?}
module.exports = function(socket){ return function(data){
    console.log('New sign in request: ' + data.account);

    var method = {};
    // if user tried to sign in using email
    if(data.account.indexOf('@') > -1){
        method.getSalt = db.getSaltByEmail;
        method.verifyUser = db.verifyUserByEmail;
        method.assignToken = db.assignTokenByEmail;
        method.verifyRegistration = db.verifyRegistrationByEmail;
    } else { // username
        method.getSalt = db.getSaltByUsername;
        method.verifyUser = db.verifyUserByUsername;
        method.assignToken = db.assignTokenByUsername;
        method.verifyRegistration = db.verifyRegistrationByUsername;
    }

    method.getSalt(data.account,
        function(status, salt){
            if (status !== 'Success') socket.emit('signInResponse', {'status':status});
            else {
                var hash = hashing.calculateHash(data.password, salt, appConfig.passwordHashAlgorithm);
                method.verifyUser(data.account, hash,
                    function(status){
                        if (status !== 'Success') socket.emit('signInResponse', {'status':status});
                        else {
                            var token = uuidv1(); // generates an unique string
                            method.assignToken(data.account, token,
                                function(status){
                                    if (status !== 'Success') socket.emit('signInResponse', {'status':status});
                                    else {
                                        var confirmCode = '';
                                        if ('confirmCode' in data){
                                            confirmCode = data.confirmCode;
                                        }
                                        method.verifyRegistration(data.account, confirmCode,
                                            function(status){
                                                if (status !== 'Success')
                                                    socket.emit('signInResponse', {'status'}:status);
                                                else
                                                    socket.emit('signInResponse', {'status':status, 'token':token});
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
};};

