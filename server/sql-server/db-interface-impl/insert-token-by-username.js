// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for inserting new token by sending username

var queries = require('./queries');

const RESULT = 0;

var insertTokenCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which inserts new token failed!\n");
        throw error;
    }
    else {
        if (info.callback) info.callback("Success");
    }
}}

var usernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which checks if username exists failed!\n");
        throw error;
    }
    else {
        if (!!rows.length) {
            info.id = rows[RESULT].id;
            info.connection.query(queries.insertNewToken,
                [info.id, info.tokenCode], insertTokenCallback(info));
        }
        else if (info.callback) info.callback("UserNotRegistered");
    }
}}

var insertTokenByUsername = function(connection, username, tokenCode, callback) {

    info = {
        connection: connection,
        username: username,
        tokenCode: tokenCode,
        callback: callback
    }

    info.connection.query(queries.searchInUserByUsername, [info.username], usernameCheckCallback(info));
}

module.exports = insertTokenByUsername;
