// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'chage-password' page

var oldPass = document.getElementById('oldPass');
var newPass1 = document.getElementById('pass1');
var newPass2 = document.getElementById('pass2');
var submitBtn = document.getElementById('submitBtn');

oldPass.onkeypress = function(){ colorPassword(oldPass); };
newPass1.onkeypress = function(){ colorPassword(newPass1); };
newPass2.onkeypress = function(){ colorPassword(newPass2); };

// send change password request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (oldPass.value.length === 0){ logMsg('Password field 1 empti.'); oldPass.focus(); }
    else if (newPass1.value.length === 0){ logMsg('Password field 2 empti.'); newPass1.focus(); }
    else if (newPass2.value.length === 0){ logMsg('Password field 3 empti.'); newPass2.focus(); }
    else if (newPass1.value !== newPass2.value){
        logMsg('Passwords not matching.');
        newPass1.value = '';
        newPass2.value = '';
        newPass1.focus();
    }else{
        var updateAccountPkg = {
            'oldUsername':username,
            'oldPassword':oldPass.value,
            'newPassword':newPass1.value
        };
        socket.emit('updateAccount', updateAccountPkg);
        logMsg('Password update requested.');
    }
    return false;
};

socket.on('updateAccountResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'updateAccountResponse', data);
    
    if (data.status === 'Success'){ 
        logMsg('On updateAccountResponse - success');
        setTimeout(function(){ window.location = '/my-profile'; }, 2000);
    }else if (data.status === 'PasswordNoMatch'){
        logMsg('On updateAccountResponse - wrong password');
        oldPass.value = '';
        newPass1.value = '';
        newPass2.value = '';
        oldPass.focus();
    }else logMsg('On updateAccountResponse - unknown error: ' + data.status);
});
