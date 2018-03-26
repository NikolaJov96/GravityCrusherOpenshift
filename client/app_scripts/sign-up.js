// Nikola Jovanovic (NikolaJov96)

var newUsername = document.getElementById('username');
var email = document.getElementById('email');
var pass1 = document.getElementById('pass1');
var pass2 = document.getElementById('pass2');
var submitBtn = document.getElementById('submitBtn');


// send signup request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (newUsername.value.length === 0) logMsg('Username field empti.');
    else if (email.value.length === 0) logMsg('Email field empti.');
    else if (pass1.value.length === 0) logMsg('Password field 1 empti.');
    else if (pass2.value.length === 0) logMsg('Password field 2 empti.');
    else if (pass1.value !== pass2.value) logMsg('Passwords do not match.');
    else {
        var signUpPkg = {
            'username':newUsername.value,
            'email':email.value,
            'password':pass1.value
        };
        socket.emit('signUp', signUpPkg);
        logMsg('SignUp requested.');
    }
}


socket.on('signUpResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'signUpResponse', data);
    
    if (data.status === 0){
        logMsg("On signUpResponse - success, check your e-mail");
    } else if (data.status === 1){
        logMsg("On signUpResponse - username taken");
    } else if (data.status === 2){
        logMsg("On signUpResponse - e-mail taken");
    } else {
        logMsg("On signUpResponse - unknown error");
    }
});

