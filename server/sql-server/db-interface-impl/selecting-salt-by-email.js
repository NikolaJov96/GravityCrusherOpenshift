// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for selecting salt

var queries = require('./queries');

const RESULT = 0;

var callbackQuery = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which gets password salt failed!\n");
            throw error;
        }
        else {
            if (!!rows.length) {
                if (info.callback) info.callback("Success", rows[RESULT].password_salt);
            }
            else if (info.callback) info.callback("UserNotRegistered", null);
        }
}}

var getSaltByUsernameQuery = function(connection, email, callback) {

    info = {
        connection : connection,
        email : email,
        callback : callback
    }
    info.connection.query(queries.checkIfEmailExists, [info.email], callbackQuery(info));
}

module.exports = getSaltByUsernameQuery;
