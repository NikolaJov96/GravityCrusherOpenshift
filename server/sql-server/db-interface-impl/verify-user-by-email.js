// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for verification of user while sign up with email

var queries = require('./queries');

const RESULT = 0;

var bannCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which checks if user is banned failed!\n");
        console.log(error);
    }
    else {
        if (!!rows.length) {
            if (info.callback) info.callback("UserBanned");
        }
        else {
            if (info.callback) info.callback("Success");
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
                info.connection.query(queries.checkIfUserIsBanned, [rows[RESULT].id], bannCheckCallback(info));
            }
            else {
                if (info.callback) info.callback("PasswordNoMatch");
            }
        }
        else if (info.callback) info.callback("UserNotRegistered");
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
