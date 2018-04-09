// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for changing username

var queries = require('./queries');

const RESULT = 0;

var changeUsernameCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which checks inserts new username failed\n");
        throw error;
    }
    else if (info.callback) info.callback("Success");
}}

var newUsernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which checks if newUsername is used failed!\n");
        throw error;
    }
    else {
        if (!rows.length) {
            if (info.extractedPassword === info.passwordHash) {
                info.connection.query(queries.setNewUsername,
                    [info.newUsername, info.id], changeUsernameCallback(info));
            }
            else if (info.callback) info.callback("PasswordNoMatch");
        }
        else if (info.callback) info.callback("UsernameTaken");
    }
}}

var oldUsernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which checks if oldUsername is used failed!\n");
        throw error;
    }
    else {
        if (!!rows.length) {
            info.extractedPassword = rows[0].password_hash;
            info.id = rows[RESULT].id;
            info.connection.query(queries.checkIfUsernameExists,
                [info.newUsername], newUsernameCheckCallback(info));
        }
        else if (info.callback) info.callback("UserNotRegistered");
    }
}}

var changeUsername = function(connection, oldUsername, newUsername, hash, callback) {

    info = {
        connection: connection,
        oldUsername: oldUsername,
        newUsername: newUsername,
        passwordHash: hash,
        callback: callback
    }

    info.connection.query(queries.checkIfUsernameExists, [info.oldUsername], oldUsernameCheckCallback(info));
}

module.exports = changeUsername;
