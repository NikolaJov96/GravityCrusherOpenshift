// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for sign up (registration) requests.

var crypto = require('crypto');
var util = require('util');
var nodemailer = require('nodemailer');
var hashing = require('../hashing.js');
var emailServiceConfiguration = require('../email-service-conf.js');
var appConfig = require('../../../app-config.js');
var db = require('../../sql-server/database-interface.js');

var transporter = nodemailer.createTransport(emailServiceConfiguration);

var registrationMailOptions = {
    from: 'gravitycrusher.psi@gmail.com',
    to: '',
    subject: 'GravityCrusher - Confirm registration',
    text: ''
};

var registrationMailTextFormat =
    `
    Hello %s,

    You are just one step away from successful registration. Please
    click on the link below to complete the registration process:
    %s://%s/sign-in?cc=%s

    Please, do not reply to this e-mail. This is an automated message.
    Have a nice day.
    `;

function generateConfirmationCode(){
    return crypto.randomBytes(16).toString('hex');
};

module.exports = function(socket){ return function(data){
    logMsg('Registration req: USERNAME:' + data.username +' EMAIL:' + data.email);
    socket.user.interaction = true;

    var saltedHash = hashing.saltAndCalculateHash(data.password, appConfig.passwordHashAlgorithm);
    var confirmationCode = generateConfirmationCode();
    db.createNewUser(
        data.email,
        data.username,
        saltedHash.hash,
        saltedHash.salt,
        confirmationCode,
        // callback function
        function(status, email, username, confirmationCode){
            if (status === 'Success') {
                logMsg('Attempting to send a registration e-mail to ' + email + '...');

                registrationMailOptions.to = email;
                registrationMailOptions.text =
                    util.format(registrationMailTextFormat,
                                username,
                                appConfig.webAppProtocol,
                                appConfig.domainName,
                                confirmationCode);

                transporter.sendMail(registrationMailOptions, function(error, info){
                    logMsg('err: ' + error);
                    if (error){
                        db.clearUser(email, function(){
                            logMsg('Email error, user removed');
                            socket.emit('signUpResponse', {'status': 'CanNotSendEmail'});
                        });
                    } else {
                        logMsg('Email sent to: ' + email);
                        logMsg('    STATUS: Success');
                        socket.emit('signUpResponse', {'status': 'Success'});
                    }
                });
            }
        }
    );
};};
