// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'change-username' page

var newUsername = document.getElementById('username');
var submitBtn = document.getElementById('submitBtn');
var errorLabel = document.getElementById('errorLabel');

// password reset request
submitBtn.onclick = function(){
    errorLabel.innerHTML = '';
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    var usernameVal = validityCheck.username(newUsername.value);
    if (usernameVal === 1){
        errorLabel.innerHTML = 'Username too short';
        logMsg('Username too short.');
        newUsername.focus();
    }else if (usernameVal === 2){
        errorLabel.innerHTML = 'Username too long';
        logMsg('Username too long.');
        newUsername.focus();
    }else if (usernameVal > 2){
        errorLabel.innerHTML = 'Invalid char: ' + String.fromCharCode(usernameVal);
        logMsg('Invalid char: ' + String.fromCharCode(usernameVal) + '.');
        newUsername.focus(); 
    }else{
        var updateAccountPkg = {
            'oldUsername':username,
            'newUsername':newUsername.value
        };
        socket.emit('updateAccount', updateAccountPkg);
        logMsg('Username update requested.');
    }
    return false;
};

socket.on('updateAccountResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'updateAccountResponse', data);
    
    if (data.status === 'Success'){
        errorLabel.style.color = 'green';
        errorLabel.innerHTML = 'Success';
        logMsg('On updateAccountResponse - success'); 
        setTimeout(function(){ window.location = '/my-profile'; }, 2000);
    } else if (data.status === 'UsernameTaken'){
        errorLabel.innerHTML = 'Username taken';
        logMsg('On updateAccountResponse - username taken'); 
        newUsername.select();
        newUsername.focus();
    }else logMsg('On updateAccountResponse - unknown error: ' + data.status);
});
