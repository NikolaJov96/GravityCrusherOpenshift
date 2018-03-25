// Nikola Jovanovic (NikolaJov96)

var account = document.getElementById('account');
var pass = document.getElementById('pass');
var submitBtn = document.getElementById('submitBtn');


// setter for specific cookie
var setCookie = function(name, value, days){
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


// send login request
submitBtn.onclick = function(){
    if (account.value.length === 0) logMsg('Account field empti.');
    else if (pass.value.length === 0) logMsg('Password field empti.');
    else {
        var updateAccountPkg = {
            'account':userId,
            'password':pass.value
        };
        if (false) updateAccountPkg.activationKey = '';
        socket.emit('signIn', updateAccountPkg);
        logMsg('SignIn requested.');
    }
}


socket.on('signInResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'updateAccountResponse', data);
    
    if (data.status === 0){
        if (!('token' in data)) attrMissing('token', 'updateAccountResponse', data);
        setCookie('token', data.token, 10);
        logMsg("On updateAccountResponse - success");
    } else if (data.status === 1){
        logMsg("On updateAccountResponse - wrong password");
    } else {
        logMsg("On updateAccountResponse - unknown error");
    }
});

