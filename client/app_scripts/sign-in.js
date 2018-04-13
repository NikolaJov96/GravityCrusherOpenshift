// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'sign-in' page

var account = document.getElementById('account');
var pass = document.getElementById('pass');
var submitBtn = document.getElementById('submitBtn');

// send sign in request
submitBtn.onclick = function(){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    if (account.value.length === 0) logMsg('Account field empti.');
    else if (pass.value.length === 0) logMsg('Password field empti.');
    else {
        var signInPkg = {
            'account':account.value,
            'password':pass.value
        };
        var url = new URL(window.location.href);
        var confirmCode = url.searchParams.get('cc');
        if (confirmCode) signInPkg.confirmCode = confirmCode;
        socket.emit('signIn', signInPkg);
        logMsg('SignIn requested.');
    }
};

socket.on('signInResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'signInResponse', data);
    
    if (data.status === 'Success'){
        if (!('token' in data)) attrMissing('token', 'signInResponse', data);
        setCookie('token', data.token, 10);
        logMsg('On signInResponse - success');
        window.location = '/';
    }else if (data.status === 1) logMsg('On signInResponse - wrong password');
    else logMsg('On signInResponse - unknown error: ' + data.status);
});
