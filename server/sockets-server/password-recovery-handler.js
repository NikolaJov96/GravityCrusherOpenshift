// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for password recovery requests.

var crypto = require('crypto');
var util = require('util');
var nodemailer = require('nodemailer');
var emailServiceConfiguration = require('./email-service-conf.js');
var appConfig = require('../../app-config.js');
var db = require('../sql-server/database-interface.js');

var transporter = nodemailer.createTransport(emailServiceConfiguration);

var passwordRecoveryMailOptions = {
    from: 'gravitycrusher.psi@gmail.com',
    to: '',
    subject: 'GravityCrusher - Password recovery',
    text: ''
};

var passwordRecoveryMailTextFormat =
    `
    Hello %s,

    In order to complete your password recovery request, click on the following
    link: %s://%s/reset-password?u=%s&rc=%s
    `;

function generateRequestCode(){
    return crypto.randomBytes(16).toString('hex');
};

module.exports = function(socket){ return function(data){
    console.log("New password recovery request: "+data.email);

    var requestCode = generateRequestCode();
    db.createPasswordRecoveryRequest(data.email, requestCode,
        function(status, username){
            if (status === 'Success'){
                passwordRecoveryMailOptions.to = data.email;
                passwordRecoveryMailOptions.text =
                    util.format(passwordRecoveryMailTextFormat,
                                username,
                                appConfig.webAppProtocol,
                                appConfig.domainName,
                                username,
                                requestCode);
                transporter.sendMail(passwordRecoveryMailOptions,
                    function(error, info){
                        if (error){
                            console.log(error);
                        } else {
                            console.log('Email sent to: ' + data.email);
                        }
                    }
                );
            }
            socket.emit('passwordRecoveryResponse', {status: status});
        }
    );

};};
