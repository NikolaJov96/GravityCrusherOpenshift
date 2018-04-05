// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'forgot-password' page

var email = document.getElementById('email');
var submitBtn = document.getElementById('submitBtn');

// password reset request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    var emailVal = validityCheck.email(email.value);
    if (emailVal === 1){ logMsg('Email field empti.'); email.focus(); }
    else if (emailVal === 2){ logMsg('Email format incorrect.'); email.focus(); }
    else {
        var passwordRecoveryPkg = {
            'email':email.value
        };
        socket.emit('passwordRecovery', passwordRecoveryPkg);
        logMsg('Password recovery requested.');
    }
};

socket.on('passwordRecoveryResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'passwordRecoveryResponse', data);
    
    if (data.status === 'Success') logMsg('On passwordRecoveryResponse - success, check your e-mail');
    else if (data.status === 1) logMsg('On passwordRecoveryResponse - e-mail invalid');
    else logMsg('On passwordRecoveryResponse - unknown error: ' + data.status);
});
