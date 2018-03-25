// Nikola Jovanovic (NikolaJov96)

var oldPass = document.getElementById('oldPass');
var newPass1 = document.getElementById('pass1');
var newPass2 = document.getElementById('pass2');
var submitBtn = document.getElementById('submitBtn');


// send change password request
submitBtn.onclick = function(){
    if (newPass1.value !== newPass2.value) logMsg('Passwords not matching.');
    else if (oldPass.value.length === 0) logMsg('Password field 1 empti.');
    else if (newPass1.value.length === 0) logMsg('Password field 2 empti.');
    else if (newPass2.value.length === 0) logMsg('Password field 3 empti.');
    else {
        var updateAccountPkg = {
            'userId':userId,
            'oldPassword':oldPass.value,
            'newPassword':newPass1.value
        };
        socket.emit('updateAccount', updateAccountPkg);
        logMsg('Password update requested.');
    }
}


socket.on('updateAccountResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'updateAccountResponse', data);
    
    if (data.status === 0){
        if (!('username' in data)) attrMissing('username', 'updateAccountResponse', data);
        username = data.username;
        logMsg("On updateAccountResponse - success");
    } else if (data.status === 1){
        logMsg("On updateAccountResponse - wrong password");
    } else {
        logMsg("On updateAccountResponse - unknown error");
    }
});

