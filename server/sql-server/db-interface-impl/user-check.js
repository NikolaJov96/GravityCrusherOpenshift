// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for checking if username exists

var queries = require('./queries');

const RESULT = 0;

var callbackQuery = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which search in user for username failed!\n");
            console.log(error);
        }
        else {
            if (!!rows.length) {
                if (info.callback) info.callback("Success");
            } else if (info.callback) info.callback("UsernameNotExists");
        }
}}

var userCheckQuery = function(connection, username, callback) {

    info = {
        connection : connection,
        username : username,
        callback : callback
    }
    info.connection.query(queries.searchInUserByUsername, [info.username], callbackQuery(info));
}

module.exports = userCheckQuery;
