// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for confirming user

var queries = require('./queries');

const RESULT = 0;

var insertIntoStatisticsCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        info.connection.rollback(function() {
            console.log("error: query which insertes user into statistics table failed, transaction rollback!\n");
            throw error;
        });
    }
    else {
        info.connection.commit(function(error) {
            if (!!error) {
                info.connection.rollback(function() {
                    console.log("error: transaction could not be commited, transaction rollback!\n");
                    throw error;
                });
            }
            else {
                if (info.callback) info.callback("Success", info.username);
            }
        });
    }
}}

var deleteFromUserNotConfirmedCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        info.connection.rollback(function() {
            console.log("error: query which deletes user from not confirmed table failed, transaction rollback!\n");
            throw error;
        });
    }
    else info.connection.query(queries.insertUserInStatistics, [info.id], insertIntoStatisticsCallback(info));
}}

var userCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which gets confirm code failed!\n");
        throw error;
    }
    else {
        if (!!rows.length) {
            if (rows[RESULT].confirm_code === info.confirmationCode) {
                info.connection.beginTransaction(function(error) {
                    if (!!error) {
                        console.log("error: transaction failed to be started!\n");
                        throw error;
                    }
                    info.connection.query(queries.deleteFromUserNotConfirmed, [info.id],
                        deleteFromUserNotConfirmedCallback(info));
                });
            }
            else if (info.callback) info.callback("InvalidConfirmationCode", info.username);
        }
        else if (info.callback) info.callback("UserAlreadyConfirmed", info.username);
    }
}}

var usernameCheckCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        console.log("error: query which search for username failed!\n");
        throw error;
    }
    else {
        if (!!rows.length) {
            info.id = rows[RESULT].id;
            info.connection.query(queries.seachInUserNotCnfirmed, [info.id], userCheckCallback(info));
        }
        else if (info.callback) info.callback("UserNotRegistered", info.username);
    }
}}

var confirmUser = function(connection, username, confirmationCode, callback) {

    info = {
        connection: connection,
        username: username,
        confirmationCode: confirmationCode,
        callback: callback
    }

    info.connection.query(queries.searchInUserByUsername, [info.username], usernameCheckCallback(info));
}

module.exports = confirmUser;
