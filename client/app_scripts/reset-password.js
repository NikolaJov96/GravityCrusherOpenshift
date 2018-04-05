// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'reset-password' page

var newPass1 = document.getElementById('pass1');
var newPass2 = document.getElementById('pass2');
var submitBtn = document.getElementById('submitBtn');

newPass1.onkeypress = function(){ colorPassword(newPass1); };
newPass2.onkeypress = function(){ colorPassword(newPass2); };

// send change password request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (newPass1.value.length === 0){ logMsg('Password field 1 empti.'); newPass1.focus(); }
    else if (newPass2.value.length === 0){ logMsg('Password field 2 empti.'); newPass2.focus(); }
    else if (newPass1.value !== newPass2.value){
        logMsg('Passwords not matching.');
        newPass1.value = '';
        newPass2.value = '';
        newPass1.focus();
    }else{
        var url = new URL(window.location.href);
        var token = url.searchParams.get('token');
        if (!token){
            logMsg('No HTTP GET parameter \'token\'');
            return;
        }
        
        var passwordResetPkg = {
            'token':token,
            'password':newPass1.value,
        };
        socket.emit('passwordReset', passwordResetPkg);
        logMsg('Password reset requested with token: ' + token);
    }
};

socket.on('passwordResetResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'passwordResetResponse', data);
    
    if (data.status === 'Success') logMsg('On passwordResetResponse - success');
    else logMsg('On passwordResetResponse - unknown error: ' + data.status);
});
