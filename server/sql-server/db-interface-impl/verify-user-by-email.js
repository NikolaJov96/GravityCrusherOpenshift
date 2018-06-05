// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for verification of user while sign up with email

var queries = require('./queries');
var updateToken = require('./token-updating-submodule');

const RESULT = 0;

var adminCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which checks if user is banned failed!\n");
        console.log(error);
    }
    else {
        var admin = false;
        if (!!rows.length) admin = true;
        if (info.callback) info.callback("Success", null, admin);
    }
}}

var bannCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which checks if user is banned failed!\n");
        console.log(error);
    }
    else {
        if (!!rows.length) {
            if (info.callback) info.callback("UserBanned", rows[RESULT].bann_date, null);
        }
        else {
            info.connection.query(queries.checkIfAdminExists, [info.id], adminCheckCallback(info));
        }
    }
}}

var emailCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which search for username failed!\n");
        console.log(error);
    }
    else {
        if (!!rows.length) {
            if (rows[RESULT].password_hash === info.hash) {
                info.id = rows[RESULT].id;
                info.connection.query(queries.checkIfUserIsBanned, [info.id], bannCheckCallback(info));
            }
            else {
                updateToken(info.connection, info.id);
                if (info.callback) info.callback("PasswordNoMatch", null, null);
            }
        }
        else if (info.callback) info.callback("UserNotRegistered", null, null);
    }
}}

var changePasswordQuery = function(connection, email, hash, callback) {
    info = {
        connection: connection,
        email: email,
        hash: hash,
        callback: callback
    }

    info.connection.query(queries.checkIfEmailExists, [info.email], emailCheckCallback(info));
}

module.exports = changePasswordQuery;
