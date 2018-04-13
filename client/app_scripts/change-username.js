// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'change-username' page

var newUseraname = document.getElementById('username');
var submitBtn = document.getElementById('submitBtn');

// password reset request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    var usernameVal = validityCheck.username(newUseraname.value);
    if (usernameVal === 1){ logMsg('Username too short.'); newUsername.focus(); }
    else if (usernameVal === 2){ logMsg('Username too long.'); newUsername.focus(); }
    else if (usernameVal > 2)
        { logMsg('Invalid char: ' + String.fromCharCode(usernameVal) + '.'); newUsername.focus(); }
    else {
        var updateAccountPkg = {
            'oldUsername':username,
            'newUsername':newUseraname.value
        };
        socket.emit('updateAccount', updateAccountPkg);
        logMsg('Password update requested.');
    }
};

// socket.on('passwordRecoveryResponse', callback) already defined in 'change-password'

/*socket.on('passwordRecoveryResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'passwordRecoveryResponse', data);
    
    if (data.status === 'Success') logMsg('On passwordRecoveryResponse - success, check your e-mail');
    else if (data.status === 1) logMsg('On passwordRecoveryResponse - e-mail invalid');
    else logMsg('On passwordRecoveryResponse - unknown error: ' + data.status);
});*/
