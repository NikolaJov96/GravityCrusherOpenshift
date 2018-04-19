// Owner: Filip Mandic (mandula8)

// Summary: Database object methods to work with database

var database = function() {

    var insertUserQuery = require('./db-interface-impl/insert-new-user');
	var selectingSaltByUsername = require('./db-interface-impl/selecting-salt-by-username');
    var selectingSaltByEmail = require('./db-interface-impl/selecting-salt-by-email');
    var changePasswordQuery = require('./db-interface-impl/change-password');
    var changeUsernameQuery = require('./db-interface-impl/change-username');
    var passwordRecoveryRequest = require('./db-interface-impl/create-password-recovery');
    var insertingTokenByUsername = require('./db-interface-impl/insert-token-by-username');
    var insertingTokenByEmail = require('./db-interface-impl/insert-token-by-email');
    var verifyingUserByUsername = require('./db-interface-impl/verify-user-by-username');
    var verifyingUserByEmail = require('./db-interface-impl/verify-user-by-email');
    var verifyingRegByUsername = require('./db-interface-impl/verify-registration-by-username');
    var verifyingRegByEmail = require('./db-interface-impl/verify-registration-by-email');
    var selectingUsernameWithTokenCode = require('./db-interface-impl/finding-username-with-token-code');
    var removingUsernameToken = require('./db-interface-impl/remove-token');
    var resetPasswordModule = require('./db-interface-impl/reset-password');
    var deactivateAccountModule = require('./db-interface-impl/deactivate-account');
    var userCheckModule = require('./db-interface-impl/user-check');
    var mysql = require('mysql');

    /*
    methods = {
        connection : connectToDB
    }
    */
	connectionInfo = require('./db-connection/db-connection-file');
    methods = {
        connection : mysql.createConnection({
            host: connectionInfo.host,
            user: connectionInfo.user,
            password: connectionInfo.password,
            database: connectionInfo.database
        })
    }
    //-----------------------------------------------------------------------------------------------------------------
    //---------------methods-------------------------------------------------------------------------------------------

    methods.createNewUser = function(email, username, passwordHash,
        passwordSalt, confirmationCode, callback) {

        insertUserQuery(methods.connection, username, email,
            passwordHash, passwordSalt, confirmationCode, callback);
	};

	methods.getSaltByUsername = function(username, callback) {

		selectingSaltByUsername(methods.connection, username, callback);
    };

    methods.changePassword = function(username, oldHash, newHash, newSalt, callback) {

        changePasswordQuery(methods.connection, username, oldHash, newHash, newSalt, callback);
    };

    methods.changeUsername = function(oldUsername, newUsername, callback) {

        changeUsernameQuery(methods.connection, oldUsername, newUsername, callback);
    };

    methods.createPasswordRecoveryRequest = function(email, requestCode, callback) {

        passwordRecoveryRequest(methods.connection, email, requestCode, callback);
    };

    methods.getSaltByEmail = function(email, callback) {

        selectingSaltByEmail(methods.connection, email, callback);
    }

    methods.assignTokenByUsername = function(username, token, callback) {

        insertingTokenByUsername(methods.connection, username, token, callback);
    }

    methods.assignTokenByEmail = function(email, token, callback) {

        insertingTokenByEmail(methods.connection, email, token, callback);
    }

    methods.verifyUserByUsername = function(username, hash, callback) {

        verifyingUserByUsername(methods.connection, username, hash, callback);
    }

    methods.verifyUserByEmail = function(email, hash, callback) {

        verifyingUserByEmail(methods.connection, email, hash, callback);
    }

    methods.verifyRegistrationByUsername = function(username, confirmCode, callback) {

        verifyingRegByUsername(methods.connection, username, confirmCode, callback);
    }

    methods.verifyRegistrationByEmail = function(email, confirmCode, callback) {

        verifyingRegByEmail(methods.connection, email, confirmCode, callback);
    }

    methods.getUsernameByToken = function(token, callback) {

        selectingUsernameWithTokenCode(methods.connection, token, callback);
    }

    methods.removeToken = function(token, callback) {

        removingUsernameToken(methods.connection, token, callback);
    }

    methods.resetPassword = function(requestCode, newHash, newSalt, callback) {

        resetPasswordModule(methods.connection, requestCode, newHash, newSalt, callback);
    }

    methods.deactivateAccount = function(token, callback) {

        deactivateAccountModule(methods.connection, token, callback);
    }

    methods.checkIfUserExists = function(username, callback) {

        userCheckModule(methods.connection, username, callback);
    }

    //-----------------------------------------------------------------------------------------------------------------

    methods.disconnect = function() {
        methods.connection.end();
        console.log("Object is no longer connected to database");
    }

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------

    methods.connection.connect(function(error) {
        if (!!error) {
            console.log('Error: connection to the database failed!');
        }
        else {
            console.log('Connected to database');
        }
    });

   	return methods;
}

module.exports = database();
