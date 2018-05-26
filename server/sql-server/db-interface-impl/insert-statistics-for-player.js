// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for verification of user while sign up with username

var queries = require('./queries');

const RESULT = 0;

var updateStatisticsCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which updates statistics failed!\n");
        console.log(error);
    }
    else {
            if (info.callback) info.callback("Success");
    }
}}

var usernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which search for username failed!\n");
        console.log(error);
    }
    else {
        if (!!rows.length) {
            if (info.outcome === 'Won')
                info.connection.query(queries.updateStatisticsWon, [rows[RESULT].id], updateStatisticsCallback(info));
            else {
                info.connection.query(queries.updateStatisticsLost, [rows[RESULT].id], updateStatisticsCallback(info));
        }}
        else if (info.callback) info.callback("UserNotFound");
    }
}}

var insertStatisticsModule = function(connection, username, outcome, callback) {
    info = {
        connection: connection,
        username: username,
        outcome: outcome,
        callback: callback
    }

    info.connection.query(queries.searchInUserByUsername, [info.username], usernameCheckCallback(info));
}

module.exports = insertStatisticsModule;
