// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Universal script placed in header of all client files.
// Initializes socket connection and fetches session data.

// session data
var loggedIn = false;
var userId = -1;
var username = '';
var debugMode = true;

// request socket connection
var socket = io('localhost:8001');

// getter for specific cookie
var getCookie = function(name){
    var name = name + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(name) === 0) 
            return cookie.substring(name.length, cookie.length);
    }
    return '';
}

// console log wrapper
var logMsg = function(msg){
    if (debugMode) console.log(msg);
}

// missing attribute log message
var attrMissing = function(attr, pack, data){
    if (debugMode){
        console.log('Attribute "' + attr + '" missing from package "' +
                    pack + '", data contents:');
        console.log(data);
    }
}

// when connection is established send init package
socket.on('connect', function(){
    var pageInitPkg = {
        'page':document.title,
        'token':getCookie('token')
    };
    socket.emit('pageInit', pageInitPkg);
    logMsg('Socket connected.');
});

// accept page init respose 
socket.on('pageInitResponse', function(data){
    if ('loggedIn' in data) loggedIn = data.loggedIn;
    else attrMissing('loggedIn', 'pageInitResponse', data);
    if ('userId' in data) userId = data.userId;
    else attrMissing('userId', 'pageInitResponse', data);
    if ('username' in data) username = data.username;
    else attrMissing('username', 'pageInitResponse', data);
    if ('debugMode' in data) debugMode = data.debugMode;
    else attrMissing('debugMode', 'pageInitResponse', data);
    logMsg('Page init response received.');
    logMsg('login status: ' + data.loggedIn);
    logMsg('Username: ' + data.username);
});
