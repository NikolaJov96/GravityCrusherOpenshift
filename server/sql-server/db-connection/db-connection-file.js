//Owner: Filip Mandic

//Summary: This file is confidental. It contains password and other informations necessary for database connection.
//It should not be on online repository!

//instructions:
//in folder sql-server create a folder named db-connection
//put file db-connection-file.js in folder db-connection
//check if this file is in git ignore, if it is not, do git pull!
//after git pull, if this file is not mentioned in git ignore, report that to owner or team leader


var databaseConnectionInfo = {
    host: 'mysql://psi:3306/',
    user: 'root',
    password: '1234',
    database: 'psi'
}

module.exports = databaseConnectionInfo;
