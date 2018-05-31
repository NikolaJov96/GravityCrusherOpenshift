// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for password recovery requests.

var crypto = require('crypto');
var util = require('util');
var nodemailer = require('nodemailer');
var uuidv1 = require('uuid/v1');
var emailServiceConfiguration = require('../email-service-conf.js');
var appConfig = require('../../../app-config.js');
var db = require('../../sql-server/database-interface.js');

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
    link: %s://%s/reset-password?rc=%s
    `;

module.exports = function(socket){ return function(data){
    logMsg("Password recovery req: EMAIL:" + data.email);

    var requestCode = uuidv1();
    db.createPasswordRecoveryRequest(data.email, requestCode,
        function(status, username){
            logMsg('    STATUS: ' + status);
            if (status === 'Success'){
                logMsg('Attempting to send a password recovery e-mail to ' + data.email + '...');

                passwordRecoveryMailOptions.to = data.email;
                passwordRecoveryMailOptions.text =
                    util.format(passwordRecoveryMailTextFormat,
                                username,
                                appConfig.webAppProtocol,
                                appConfig.domainName,
                                requestCode);
                transporter.sendMail(passwordRecoveryMailOptions,
                    function(error, info){
                        if (error){
                            logMsg(error);
                        } else {
                            logMsg('Email sent to: ' + data.email);
                        }
                    }
                );
            }
            socket.emit('passwordRecoveryResponse', {status: status});
        }
    );

};};

