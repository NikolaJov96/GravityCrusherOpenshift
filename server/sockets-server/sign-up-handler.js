// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definitions for sign up (registration) requests.

var crypto = require('crypto');
var util = require('util');
var nodemailer = require('nodemailer');
var emailServiceConfiguration = require('./email-service-conf.js');
var appConfig = require('../../app-config.js');

function sha512(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        hash: value,
    };
};

function saltAndHashPassword(password){
    var salt = crypto.randomBytes(128).toString('hex');
    var hashedPassword = sha512(password, salt);

    return hashedPassword;
};

function generateConfirmationCode() {
    return crypto.randomBytes(16).toString('hex');
};

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
    %s://%s/sign-ip/?cc=%s

    Please, do not reply to this e-mail. This is an automated message.
    Have a nice day.
    `;

// dummy implementation of createNewUser - TO BE REMOVED
function createNewUser(email, username, hash, salt, confrCode, callback){
    if (callback != null){
        callback("Success", email, username, confrCode);
    }
}

module.exports = function(socket){
    return function(data){
        var passwordHash = saltAndHashPassword(data.password);
        var confirmationCode = generateConfirmationCode();

        console.log("New registration request: "+data.username+"#"+data.email);

        createNewUser(  data.email,
                        data.username,
                        passwordHash.hash,
                        passwordHash.salt,
                        confirmationCode,
                        function(status, email, username, confirmationCode){ // callback function
                            if (status === "Success") {
                                registrationMailOptions.to = email;
                                registrationMailOptions.text = util.format(registrationMailTextFormat,
                                                                           username,
                                                                           appConfig.webAppProtocol,
                                                                           appConfig.domainName,
                                                                           confirmationCode);

                                transporter.sendMail(registrationMailOptions, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent to: ' + email);
                                    }
                                });
                            }

                            if (socket != null){
                                socket.emit('signUpResponse', {status: 0});
                            }
                        }
        );
    };
};