// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for changing username

var queries = require('./queries');

var verificationWithEmail = function(connection, username, hash, callback) {
    if (callback) callback("Success");
}

module.exports = verificationWithEmail;
