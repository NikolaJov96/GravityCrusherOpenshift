// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for password recovery requests.

var crypto = require('crypto');

function generateRequestCode(){
    return crypto.randomBytes(16).toString('hex');
}

// dummy implementation - TO BE REMOVED

module.exports = function(socker){ return function(data){
    console.log("New password recovery request: "+data.email);

    var requestCode = generateRequestCode();
    createPasswordRecoveryRequest();

};};