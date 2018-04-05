// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'sign-up' page

var newUsername = document.getElementById('username');
var email = document.getElementById('email');
var pass1 = document.getElementById('pass1');
var pass2 = document.getElementById('pass2');
var submitBtn = document.getElementById('submitBtn');

pass1.onkeypress = function(){ colorPassword(pass1); };
pass2.onkeypress = function(){ colorPassword(pass2); };

// send signup request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    var usernameVal = validityCheck.username(newUsername.value);
    var emailVal = validityCheck.email(email.value);
    if (usernameVal === 1){ logMsg('Username too short.'); newUsername.focus(); }
    else if (usernameVal === 2){ logMsg('Username too long.'); newUsername.focus(); }
    else if (emailVal === 1){ logMsg('Email field empti.'); email.focus(); }
    else if (emailVal === 2){ logMsg('Email format incorrect.'); email.focus(); }
    else if (pass1.value.length === 0){ logMsg('Password field 1 empti.'); pass1.focus(); } 
    else if (pass2.value.length === 0){ logMsg('Password field 2 empti.'); pass2.focus(); }
    else if (pass1.value !== pass2.value){
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
};

socket.on('signUpResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'signUpResponse', data);
    
    if (data.status === 'Success') logMsg('On signUpResponse - success, check your e-mail');
    else if (data.status === 'UsernameTaken') logMsg('On signUpResponse - username taken');
    else if (data.status === 'EmailTaken') logMsg('On signUpResponse - e-mail taken');
    else logMsg('On signUpResponse - unknown error');
});
