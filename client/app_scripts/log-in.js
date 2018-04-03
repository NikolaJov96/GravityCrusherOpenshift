// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'log-in' page

var account = document.getElementById('account');
var pass = document.getElementById('pass');
var submitBtn = document.getElementById('submitBtn');

// setter for specific cookie
var setCookie = function(name, value, days){
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

// send login request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (account.value.length === 0) logMsg('Account field empti.');
    else if (pass.value.length === 0) logMsg('Password field empti.');
    else {
        var logInPkg = {
            'account':account.value,
            'password':pass.value
        };
        var url = new URL(window.location.href);
        var key = url.searchParams.get('activationKey');
        if (key) logInPkg.activationKey = key;
        socket.emit('signIn', logInPkg);
        logMsg('SignIn requested.');
    }
};

socket.on('signInResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'signInResponse', data);
    
    if (data.status === 'Success'){
        if (!('token' in data)) attrMissing('token', 'signInResponse', data);
        setCookie('token', data.token, 10);
        logMsg('On signInResponse - success');
    } else if (data.status === 1) logMsg('On signInResponse - wrong password');
    else logMsg('On signInResponse - unknown error: ' + data.status);
});
