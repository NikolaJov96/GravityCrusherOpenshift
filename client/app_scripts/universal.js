// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization needed for all client pages

// sign out button handler
var signoutBtn = document.getElementById('signoutBtn');

signoutBtn.onclick = function(){
    var signOutPkg = {
        'token':getCookie('token'),
        'disable':false
    };
    socket.emit('signOut', signOutPkg);
    logMsg('Sign-out requested.');
};

// sign out response callback
socket.on('signOutResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'updateAccountResponse', data);
    
    if (data.status === 'Success'){ 
        logMsg('On signOutResponse - success'); 
        setCookie('token', '', 0);
        window.location = '/'; 
    }else if (data.status === 'TokenNoMatch') logMsg('On signOutResponse - invalid token');
    else logMsg('On signOutResponse - unknown error: ' + data.status);
});
