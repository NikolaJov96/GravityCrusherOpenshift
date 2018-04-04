// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for confirming user

var queries = require('./queries');

var deleteFromUserNotConfirmedCallback = function(info) { return function(error, rows, fields) {
    if (!!error) throw error;
    else if (info.callback) info.callback("SUCCESS");
}}

var getConfirmCodeCallback = function(info) { return function(error, rows, fields) {
    if (!!error) throw error;
    else {
        if (rows[0].confirm_code === info.confirmationCode) {
            info.connection.query(queries.deleteFromUserNotConfirmed, [info.id],
                deleteFromUserNotConfirmedCallback(info));
        }
        else if (info.callback) info.callback("InvalidConfirmationCode");
    }
}}

var userIsNotConfirmedCallback = function(info) { return function(error, rows, fields) {
    if (!!error) throw error;
    else {
        if (!!rows.length) {
            info.connection.query(queries.getConfirmCode, [info.id], getConfirmCodeCallback(info)); 
        }
        else if (info.callback) info.callback("UserAlreadyConfirmed");
    }
}}

var usernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) throw error;
    else {
        if (!!rows.length) {
            info.id = rows[0].id;
            info.connection.query(queries.checkIsNotConfirm, [info.id], userIsNotConfirmedCallback(info));
        }
        else if (info.callback) info.callback("UserNotRegistered");
    }
}}

//sredjeno na dole

var confirmUser = function(connection, username, confirmationCode, callback) {

    info = {
        connection: connection,
        username: username,
        confirmationCode: confirmationCode,
        callback: callback
    }

    info.connection.query(queries.checkIfUsernameExists, [info.username], usernameCheckCallback(info));
}

module.exports = confirmUser;

//"SELECT * FROM user_not_confirmed WHERE id_not_confirmed = " + parseInt(info.id), userIsNotConfirmedCallback(info)
