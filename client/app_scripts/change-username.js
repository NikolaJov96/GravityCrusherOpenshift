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
        logMsg('Username update requested.');
    }
};

socket.on('updateAccountResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'updateAccountResponse', data);
    
    if (data.status === 'Success'){ 
        logMsg('On updateAccountResponse - success'); 
        setTimeout(function(){ window.location = '/my-profile'; }, 2000);
    }else logMsg('On updateAccountResponse - unknown error: ' + data.status);
});
