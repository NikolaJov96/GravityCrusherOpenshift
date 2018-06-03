// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'sign-up' page

var newUsername = document.getElementById('username');
var email = document.getElementById('email');
var pass1 = document.getElementById('pass1');
var pass2 = document.getElementById('pass2');
var submitBtn = document.getElementById('submitBtn');
var errorLabel = document.getElementById('errorLabel');

pass1.onkeypress = function(){ colorPassword(pass1); };
pass2.onkeypress = function(){ colorPassword(pass2); };

// send signup request
submitBtn.onclick = function(){
    errorLabel.innerHTML = '';
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    var usernameVal = validityCheck.username(newUsername.value);
    var emailVal = validityCheck.email(email.value);
    if (usernameVal === 1){
        errorLabel.innerHTML = 'Username too short';
        logMsg('Username too short.');
        newUsername.focus();
    }else if (usernameVal === 2){
        errorLabel.innerHTML = 'Username too long';
        logMsg('Username too long.');
        newUsername.focus();
    }else if (usernameVal > 2){
        errorLabel.innerHTML = 'Invalid char: ' + String.fromCharCode(usernameVal);
        logMsg('Invalid char: ' + String.fromCharCode(usernameVal) + '.');
        newUsername.focus();
    }else if (emailVal === 1){
        errorLabel.innerHTML = 'Email field empty';
        logMsg('Email field empti.');
        email.focus();
    }else if (emailVal === 2){
        errorLabel.innerHTML = 'Email format incorrect';
        logMsg('Email format incorrect.');
        email.focus();
    }else if (pass1.value.length === 0){
        errorLabel.innerHTML = 'Password field 1 empti';
        logMsg('Password field 1 empti.');
        pass1.focus();
    }else if (pass2.value.length === 0){
        errorLabel.innerHTML = 'Password field 2 empti';
        logMsg('Password field 2 empti.');
        pass2.focus();
    }else if (pass1.value !== pass2.value){
        errorLabel.innerHTML = 'Passwords do not match';
        logMsg('Passwords do not match.');
        pass1.value = '';
        pass2.value = '';
        pass1.focus();
    }else{
        var signUpPkg = {
            'username':newUsername.value,
            'email':email.value,
            'password':pass1.value
        };
        socket.emit('signUp', signUpPkg);
        logMsg('SignUp requested.');
    }
    return false;
};

socket.on('signUpResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'signUpResponse', data);
    
    if (data.status === 'Success'){
        errorLabel.style.color = 'green';
        errorLabel.innerHTML = 'Welcome, check your email for activation link!';
        logMsg('On signUpResponse - success, check your e-mail');
    }else if (data.status === 'UsernameTaken'){
        errorLabel.innerHTML = 'Chosen username is taken';
        logMsg('On signUpResponse - username taken');
        newUsername.select();
        newUsername.focus();
    }else if (data.status === 'EmailTaken'){
        errorLabel.innerHTML = 'Email is taken';
        logMsg('On signUpResponse - e-mail taken');
        email.select();
        email.focus();
    }else logMsg('On signUpResponse - unknown error');
});
