// Owner: Filip Mandic (mandula8)

// Summary: Database object methods to work with database

var database = function() {

    var insertUserQuery = require('./db-interface-impl/insert-new-user');
    var confirmUserQuery = require('./db-interface-impl/confirm-user');
	var selectingSalt = require('./db-interface-impl/selecting-salt');
    var changePasswordQuery = require('./db-interface-impl/change-password');
    var changeUsernameQuery = require('./db-interface-impl/change-username');
    var passwordRecoveryRequest = require('./db-interface-impl/create-password-recovery');

    /*
    methods = {
        connection : connectToDB
    }
    */
	connection = require('./db-connection/db-connection-file');
    methods = {}
    //-------------------------------------------------------------------------
    //---------------methods---------------------------------------------------

    methods.createNewUser = function(email, username, passwordHash,
        passwordSalt, confirmationCode, callback) {

        insertUserQuery(connection, username, email,
            passwordHash, passwordSalt, confirmationCode, callback);
	};

    methods.confirmUser = function(username, confirmationCode, callback) {

        confirmUserQuery(connection, username, confirmationCode, callback);
    };

	methods.getSaltByUsername = function(username, callback) {

		selectingSalt(connection, username, callback);
    };

    methods.changePassword = function(username, oldHash, newHash, newSalt, callback) {

        changePasswordQuery(connection, username, oldHash, newHash, newSalt, callback);
    };

    methods.changeUsername = function(oldUsername, newUsername, hash, callback) {

        changeUsernameQuery(connection, oldUsername, newUsername, hash, callback);
    };

    methods.createPasswordRecoveryRequest = function(email, requestCode, callback) {

        passwordRecoveryRequest(connection, email, requestCode, callback);
    };

    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------

    connection.connect(function(error) {
        if (!!error) {
            console.log('Error: connection to the database failed!\n');
        }
        else {
            console.log('Connected to database\n');
        }
    });

   	return methods;
}

module.exports = database();
