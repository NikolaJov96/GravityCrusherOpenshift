// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for changing password

var queries = require('./queries');

const RESULT = 0;

var changePasswordCall = function(info) { return function(error, rows, fields) {
    console.log("poceo poslednji callback\n");
    if (!!error) {
        console.log("usao u error\n");
        info.connection.rollback(function() {
            console.log("error: query that inserts new hash and salt failed!\n");
            throw error;
        });
    }
    else {
        console.log("pred commit\n");
        info.connection.commit(function(error) {
            if (!!error) {
                info.connection.rollback(function() {
                    console.log("error: transaction could not be commited, transaction rollback!\n");
                    throw error;
                });
            }
            else {
                console.log("Stigao do callback-a\n");
                if (info.callback) info.callback("Success");
            }
        });
    }
}}

var usernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which search for username failed!\n");
        throw error;
    }
    else {
        if (!!rows.length) {
            if (rows[RESULT].password_hash === info.oldHash) {
                console.log("Prosao1\n");
                info.connection.beginTransaction(function(error) {
                    if (!!error) {
                        console.log("error: transaction failed to be started!\n");
                        throw error;
                    }
                    info.connection.query(queries.setNewPasswordAndSalt,
                        [info.newHash, info.newSalt, rows[RESULT].id], changePasswordCall(info));
                });
            }
            else if (info.callback) info.callback("PasswordNoMatch");
        }
        else if (info.callback) info.callback("UserNotRegistered");
    }
}}

var changePasswordQuery = function(connection, username, oldHash, newHash, newSalt, callback) {
    info = {
        connection: connection,
        username: username,
        oldHash: oldHash,
        newHash: newHash,
        newSalt: newSalt,
        callback: callback
    }

    info.connection.query(queries.checkIfUsernameExists, [info.username], usernameCheckCallback(info));
}

module.exports = changePasswordQuery;


//testirati ovo!!!
