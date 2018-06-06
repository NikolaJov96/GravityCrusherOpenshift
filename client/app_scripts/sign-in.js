// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'sign-in' page

var account = document.getElementById('account');
var pass = document.getElementById('pass');
var submitBtn = document.getElementById('submitBtn');
var errorLabel = document.getElementById('errorLabel');

// send sign in request
submitBtn.onclick = function(){
    errorLabel.innerHTML = '';
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (account.value.length === 0){
        errorLabel.innerHTML = 'Account field is empty';
        logMsg('Account field empti.');
    }else if (pass.value.length === 0){
        errorLabel.innerHTML = 'Password field is empty';
        logMsg('Password field empti.');
    }else{
        var signInPkg = {
            'account':account.value,
            'password':pass.value
        };
        var url = new URL(window.location.href);
        var confirmCode = url.searchParams.get('cc');
        if (confirmCode) signInPkg.confirmCode = confirmCode;
        socket.emit('signIn', signInPkg);
        logMsg('SignIn requested.');
    }
    return false;
};

socket.on('signInResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'signInResponse', data);
    
    if (data.status === 'Success'){
        if (!('token' in data)) attrMissing('token', 'signInResponse', data);
        setCookie('token', data.token, 10);
        errorLabel.style.color = 'green';
        errorLabel.innerHTML = 'Success, welcome!';
        logMsg('On signInResponse - success');
        window.location = 'index';
    }else if (data.status === 'UserNotRegistered'){
        errorLabel.innerHTML = 'Incorrect account or password';
        logMsg('On signInResponse - account not registered');
        pass.value = '';
        account.select();
        account.focus();
    }else if (data.status === 'PasswordNoMatch'){
        errorLabel.innerHTML = 'Incorrect account or password';
        logMsg('On signInResponse - wrong password');
        pass.value = '';
        pass.focus();
    }else if (data.status === 'UserBanned'){
        if (!('bann' in data)) attrMissing('bann', 'signInResponse', data);
        else{
            errorLabel.innerHTML = 'Your account is banned until ' + data.bann;
            logMsg('On signInResponse - user is banned until ' + data.bann);
            pass.value = '';
            pass.focus();
        }
    }else if (data.status === 'UserNotConfirmed'){
        errorLabel.innerHTML = 'We could not activate your new account, check your email for the activation link!';
        logMsg('On signInResponse - could not acrivate the account.');
        pass.value = '';
    }else logMsg('On signInResponse - unknown error: ' + data.status);
});
