// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for deleting token from table

var queries = require('./queries');

const RESULT = 0;

var requestDeleteCallback = function(info) { return function(error, rows, fields) {
    if (!!error) {
        info.connection.rollback(function() {
            console.log("error: query that deletes request failed!\n");
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
                if (info.callback) info.callback("Success");
            }
        });
    }
}}


var changeInfoInUserCallback = function(info) { return function(error, rows, fields) {
    if (!!error){
        info.connection.rollback(function() {
            console.log("error: query that changes hash and salt failed, transaction rollback!\n");
            throw error;
        });
    }
    else {
        info.connection.query(queries.deleteFromPasswordReset, [info.user_id], requestDeleteCallback(info));
    }
}}

var selectIdCallbackQuery = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which finds user by confirm code failed!\n");
            throw error;
        }
        else {
            if (!!rows.length) {
                info.user_id = rows[RESULT].user_id;
                info.connection.beginTransaction(function(error) {
                    if (!!error) {
                        console.log("error: transaction failed to be started!\n");
                        throw error;
                    }
                    info.connection.query(queries.setNewPasswordAndSalt,
                        [info.newHash, info.newSalt, info.user_id], changeInfoInUserCallback(info));
                });

            }
            else if (info.callback) info.callback("RequestCodeNoMatch");
        }
}}

var resetPasswordModule = function(connection, requestCode, newHash, newSalt, callback) {

    info = {
        connection : connection,
        requestCode : requestCode,
        newHash : newHash,
        newSalt : newSalt,
        callback : callback
    }
    info.connection.query(queries.selectUserByConfirmCode, [info.requestCode], selectIdCallbackQuery(info));
}

module.exports = resetPasswordModule;
