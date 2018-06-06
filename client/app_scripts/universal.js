// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization needed for all client pages

// sign out button handler
var signinBtn = document.getElementById('signoutBtn');

var signupLi = document.getElementById('li-sign-up');
var signinLi = document.getElementById('li-sign-in');
var signoutLi = document.getElementById('li-sign-out');
var profileLi = document.getElementById('li-profile');
var navAvatar = document.getElementById('navAvatar');

var overlay = document.getElementById('overlay');
var sectionsNav = document.getElementById('sectionsNav');

// sign out request, response is defined in the init-connection
signoutBtn.onclick = function(){
    var signOutPkg = {
        'token':getCookie('token'),
        'disable':false
    };
    socket.emit('signOut', signOutPkg);
    logMsg('Sign-out requested.');
};

// show signin and signup, or sigout and profile links
universalCallback = function(){
    if (avatar){
        navAvatar.src = 'data:image/png;base64,' + avatar;
    }
    if (signedIn){
        signoutLi.classList.remove('d-none');
        profileLi.classList.remove('d-none');
        signupLi.classList.add('d-none');
        signinLi.classList.add('d-none');
    }
    setTimeout(function(){
        overlay.classList.add('d-none'); 
    }, 200);
};
if (callUniversalCallback) universalCallback();
