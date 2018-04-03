// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game' page

// canvas was already accessed in previous script
// var elem = document.getElementById('elem');

// send change password request
/*submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (oldPass.value.length === 0) logMsg('Password field 1 empti.');
    else if (newPass1.value.length === 0) logMsg('Password field 2 empti.');
    else if (newPass2.value.length === 0) logMsg('Password field 3 empti.');
    else if (newPass1.value !== newPass2.value) logMsg('Passwords not matching.');
    else {
        var updateAccountPkg = {
            'username':username,
            'oldPassword':oldPass.value,
            'newPassword':newPass1.value
        };
        socket.emit('updateAccount', updateAccountPkg);
        logMsg('Password update requested.');
    }
}*/

document.onkeydown = function(event){
    var newState = roomState.onKeyDown(event);
    if (newState){
        roomState.finish();
        roomState = newState();
    }
}

document.onkeyup = function(event){
    var newState = roomState.onKeyUp(event);
    if (newState){
        roomState.finish();
        roomState = null;
        roomState = newState();
    }
}

/*socket.on('updateAccountResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'updateAccountResponse', data);
    
    if (data.status === 'Success'){
        if (!('username' in data)) attrMissing('username', 'updateAccountResponse', data);
        username = data.username;
        logMsg('On updateAccountResponse - success');
    } else if (data.status === 'PasswordNoMatch') logMsg('On updateAccountResponse - wrong password');
    else logMsg('On updateAccountResponse - unknown error');
});*/
