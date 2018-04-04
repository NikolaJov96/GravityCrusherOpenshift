
var queries = require('./queries');

var insertNotConfirmedUserCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        info.connection.rollback(function() {
            throw error;
        });
    }
    else {
        info.connection.commit(function(error) {
            if (error) {
                info.connection.rollback(function() {
                    throw error;
                });
            }
            else info.callCreateNewUser("SUCCESS");
        });
    }
}}

var insertIntoUser = function(info) { return function(error, rows, fields) {
    if (!!error){
        info.connection.rollback(function() {
            throw error;
        });
    }
    else {
        info.connection.query(queries.insertNotConfirmedUser,
            [info.username, info.confirmationCode], insertNotConfirmedUserCallback(info));
    }
}}

var usernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) throw error;
    else {
        if (!rows.length) {
            info.connection.beginTransaction(function(error) {
                if (!!error) { throw error; }
                info.connection.query(queries.insertUser,
                    [info.username, info.email, info.passwordHash, info.passwordSalt], insertIntoUser(info));
            });
        }
        else info.callCreateNewUser("UsernameTaken");
    }
}}

var emailCheckcallback = function(info) { return function(error, rows, fields) {
    if (!!error) throw error;
    else {
        if (!rows.length) info.connection.query(queries.checkIfUsernameExists, [info.username], usernameCheckCallback(info));
        else info.callCreateNewUser("EmailTaken");
    }
}}

var createNewUser = function(connection, username, email,
     passwordHash, passwordSalt, confirmationCode, callCreateNewUser) {

    info = {
        connection: connection,
        username: username,
        email:email,
        passwordHash:passwordHash,
        passwordSalt: passwordSalt,
        confirmationCode: confirmationCode,
        callCreateNewUser: callCreateNewUser
    }

    info.connection.query(queries.checkIfEmailExists, [info.email], emailCheckcallback(info));
}

module.exports = createNewUser;
