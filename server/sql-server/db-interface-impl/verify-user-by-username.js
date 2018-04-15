// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for verification of user while sign up with username

var queries = require('./queries');

const RESULT = 0;

var usernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which search for username failed!\n");
        throw error;
    }
    else {
        if (!!rows.length) {
            if (rows[RESULT].password_hash === info.hash) {
                if (info.callback) info.callback("Success");
            }
            else {
                if (info.callback) info.callback("PasswordNoMatch");
            }
        }
        else if (info.callback) info.callback("UserNotRegistered");
    }
}}

var changePasswordQuery = function(connection, username, hash, callback) {
    info = {
        connection: connection,
        username: username,
        hash: hash,
        callback: callback
    }

    info.connection.query(queries.searchInUserByUsername, [info.username], usernameCheckCallback(info));
}

module.exports = changePasswordQuery;
