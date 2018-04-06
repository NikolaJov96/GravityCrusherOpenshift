// Owner: Filip Mandic (mandula8)

// Summary: Database object methods to work with database

var database = function() {

    var insertUserQuery = require('./db-interface-impl/insert-new-user');
    var confirmUserQuery = require('./db-interface-impl/confirm-user');
	var selectingSalt = require('./db-interface-impl/selecting-salt');
    var changePasswordQuery = require('./db-interface-impl/change-password');
    var changeUsernameQuery = require('./db-interface-impl/change-username');
    var passwordRecoveryRequest = require('./db-interface-impl/create-password-recovery');
    var mysql = require('mysql');

    /*
    methods = {
        connection : connectToDB
    }
    */
	methods = {
        connection : mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'filman26',
            database: 'psi'
        })
    }

    //-------------------------------------------------------------------------
    //---------------methods---------------------------------------------------

    methods.createNewUser = function(email, username, passwordHash,
        passwordSalt, confirmationCode, callback) {

        insertUserQuery(methods.connection, username, email,
            passwordHash, passwordSalt, confirmationCode, callback);
	};

    methods.confirmUser = function(username, confirmationCode, callback) {

        confirmUserQuery(methods.connection, username, confirmationCode, callback);
    };

	methods.getSaltByUsername = function(username, callback) {

		selectingSalt(methods.connection, username, callback);
    };

    methods.changePassword = function(username, oldHash, newHash, newSalt, callback) {

        changePasswordQuery(methods.connection, username, oldHash, newHash, newSalt, callback);
    };

    methods.changeUsername = function(oldUsername, newUsername, hash, callback) {

        changeUsernameQuery(methods.connection, oldUsername, newUsername, hash, callback);
    };

    methods.createPasswordRecoveryRequest = function(email, requestCode, callback) {

        passwordRecoveryRequest(methods.connection, email, requestCode, callback);
    };

    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------

    methods.connection.connect(function(error) {
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
