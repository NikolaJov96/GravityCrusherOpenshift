// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for selecting salt with username passed

var queries = require('./queries');

const RESULT = 0;

var callbackQuery = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which finds username by token code failed!\n");
            throw error;
        }
        else {
            if (!!rows.length) {
                if (info.callback) info.callback("Success", rows[RESULT].username);
            }
            else if (info.callback) info.callback("TokenNoMatch", null);
        }
}}

var getUsernameByTokenCode = function(connection, token, callback) {

    info = {
        connection : connection,
        token : token,
        callback : callback
    }
    info.connection.query(queries.findUsernameByTokenCode, [info.token], callbackQuery(info));
}

module.exports = getUsernameByTokenCode;
