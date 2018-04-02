// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Hashing functions.

var crypto = require('crypto');
var appConfig = require('../../app-config.js');

function hash(password, salt, algorithm){
    var hash = crypto.createHmac(algorithm, salt);
    hash.update(password);
    return hash.digest('hex');
};

function saltAndHash(password, hashAlgorithm){
    var passwordSalt = crypto.randomBytes(appConfig.passwordSaltLengthInBytes).toString('hex');
    var saltedHash = hash(password, passwordSalt, hashAlgorithm);

    return {
        salt: passwordSalt,
        hash: saltedHash,
    };
};

module.exports = {
    calculateHash: hash,
    saltAndCalculateHash: saltAndHash,
};
