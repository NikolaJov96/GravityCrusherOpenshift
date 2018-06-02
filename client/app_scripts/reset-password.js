// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'reset-password' page

var newPass1 = document.getElementById('pass1');
var newPass2 = document.getElementById('pass2');
var submitBtn = document.getElementById('submitBtn');
var errorLabel = document.getElementById('errorLabel');

newPass1.onkeypress = function(){ colorPassword(newPass1); };
newPass2.onkeypress = function(){ colorPassword(newPass2); };

// send change password request
submitBtn.onclick = function(){
    errorLabel.innerHTML = '';
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (newPass1.value.length === 0){
        errorLabel.innerHTML = 'Password field 1 empti';
        logMsg('Password field 1 empti.');
        newPass1.focus();
    }else if (newPass2.value.length === 0){
        errorLabel.innerHTML = 'Password field 2 empti';
        logMsg('Password field 2 empti.');
        newPass2.focus();
    }else if (newPass1.value !== newPass2.value){
        errorLabel.innerHTML = 'Passwords not matching';
        logMsg('Passwords not matching.');
        newPass1.value = '';
        newPass2.value = '';
        newPass1.focus();
    }else{
        var url = new URL(window.location.href);
        var requestCode = url.searchParams.get('rc');
        if (!requestCode){
            requestCode = '';
        }
        
        var passwordResetPkg = {
            'requestCode':requestCode,
            'password':newPass1.value,
        };
        socket.emit('passwordReset', passwordResetPkg);
        logMsg('Password reset requested with requestCode: ' + requestCode);
    }
    return false;
};

socket.on('passwordResetResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'passwordResetResponse', data);
    
    if (data.status === 'Success'){
        errorLabel.style.color = 'green';
        errorLabel.innerHTML = 'Success';
        logMsg('On passwordResetResponse - success');
        setTimeout(function(){ window.location = '/sign-in'; }, 2000);
    }else if (data.status === 'RequestCodeNoMatch'){
        errorLabel.innerHTML = 'Reset code not matched';
        logMsg('On passwordResetResponse - request code not matched');
        newPass1.value = '';
        newPass2.value = '';
    }else logMsg('On passwordResetResponse - unknown error: ' + data.status);
});

