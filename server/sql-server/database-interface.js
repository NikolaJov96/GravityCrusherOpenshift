// Owner: Filip Mandic (mandula8)

// Summary: Database object methods to work with database

var database = function() {

    var insertUserQuery = require('./db-interface-impl/insert-new-user');
    var confirmUserQuery = require('./db-interface-impl/confirm-user');
	var selectingSalt = require('./dbInterfaceImpl/selectingSalt');
	var mysql = require('mysql');

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

    methods.createNewUser = function(username, email, passwordHash,
        passwordSalt, confirmationCode, callback) {

        insertUserQuery(methods.connection, username, email,
            passwordHash, passwordSalt, confirmationCode, callback);
	};

    methods.confirmUser = function(username, confirmationCode, callback) {

        confirmUserQuery(methods.connection, username, confirmationCode, callback);
    };

	methods.getSaltByUsername(username, callback(status, salt)) {

		selectingSalt.getSaltByUsernameQuery(username, callback(status, salt));
    }

    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------

    methods.connection.connect(function(error) {
        if (!!error) {
            console.log('Error');
        }
        else {
            console.log('Connected');
        }
    });

   	return methods;
}

module.exports = database;
