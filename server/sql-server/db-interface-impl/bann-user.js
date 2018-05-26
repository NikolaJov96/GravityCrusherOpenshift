// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for inserting new token by sending username

var queries = require('./queries');

const RESULT = 0;

var bannUserCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which insert user into bann table failed!\n");
        console.log(error);
    }
    else {
        if (info.callback) info.callback("Success");
    }
}}


var usernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which checks if username exists failed!\n");
        console.log(error);
    }
    else {
        if (!!rows.length) {
            info.id = rows[RESULT].id;
            info.connection.query(queries.bannUser,
                [info.id, info.bannDate], bannUserCallback(info));
        }
        else if (info.callback) info.callback("UserNotFound");
    }
}}

var bannUserModule = function(connection, username, bannDate, callback) {

    info = {
        connection: connection,
        username: username,
        bannDate: bannDate,
        callback: callback
    }

    info.connection.query(queries.searchInUserByUsername, [info.username], usernameCheckCallback(info));
}

module.exports = bannUserModule;
