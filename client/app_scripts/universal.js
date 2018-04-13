// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization needed for all client pages

// logout button handler
var logoutBtn = document.getElementById('logoutBtn');

logoutBtn.onclick = function(){
    var signOutPkg = {
        'token':getCookie('token')
    };
    socket.emit('signOut', signOutPkg);
    logMsg('Sign-out requested.');
};

// logout response callback
socket.on('signOutResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'updateAccountResponse', data);
    
    if (data.status === 'Success'){ logMsg('On signOutResponse - success'); window.location = '/'; } 
    else if (data.status === 'TokenNoMatch') logMsg('On signOutResponse - invalid token');
    else logMsg('On signOutResponse - unknown error: ' + data.status);
});
