// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Handler definition for sign-up page.

var crypto = require('crypto');
var util = require('util');
var nodemailer = require('nodemailer');

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

var emailServiceConfiguration = require('./email-service-conf.js');
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
    http://localhost:8000/sign-up/?cc=%s

    Please, do not reply to this e-mail. This is an automated message.
    Have a nice day.
    `;

var onDatabaseResponse = function(status, email, username, confirmationCode){
    // if user is successfully registered send confirmation email
    if (status === "Success") {
        registrationMailOptions.to = email;
        registrationMailOptions.text =
            util.format(registrationMailTextFormat, username, confirmationCode);

        transporter.sendMail(registrationMailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    // send response to client
    // ???
};

// dummy implementation of createNewUser - TO BE REMOVED
function createNewUser(email, username, hash, salt, confrCode, callback){
    if (callback != null){
        callback("Success", email, username, confrCode);
    }
}

function signUpHandler(data){
    var passwordHash = saltAndHashPassword(data.password);
    var confirmationCode = generateConfirmationCode();

    console.log("New registration request: "+data.username+"#"+data.email);

    createNewUser(data.email, data.username, passwordHash.hash,
        passwordHash.salt, confirmationCode, onDatabaseResponse);
}

module.exports = signUpHandler;
