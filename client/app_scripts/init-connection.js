// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Universal script placed in header of all client files.
// Initializes socket connection and fetches session data.

// functions that chech validity of input fields
var validityCheck  = {
    username: function(entry){
        // too short
        if (entry.length < 3) return 1;
        // too long
        if (entry.length > 25) return 2;
        // invalid char
        if (entry.indexOf('@') > -1) return '@'.charCodeAt(0);
        // ok
        return 0;
    },
    password: function(entry){
        if (entry.length === 0) return 0.0;
        
        var level = entry.length;
        // check for digit
        if (! /[0-9]/.test(entry)) level *= 0.8;
        // check for upper case letter
        if (! /[A-Z]/.test(entry)) level *= 0.8;
        // check for lower case letter
        if (! /[a-z]/.test(entry)) level *= 0.8;
        // check for non leter and non digit char
        if (! /[^0-9A-Za-z]/.test(entry)) level *= 0.8;
        // level above 7.0 is considered strong
        return level;
    },
    email: function(entry){
        // email is empty
        if (entry.length === 0) return 1;
        // invalid email
        if (! /@/.test(entry)) return 2;
        // ok
        return 0;
    }
};

var colorPassword = function(field){
    var level = validityCheck.password(field.value);
    if (level < 4.0){
        field.style.color = 'red';
    }else if (level < 5.0){
        field.style.color = 'orange';
    }else if (level < 6.0){
        field.style.color = 'cyan';
    }else if (level < 7.0){
        field.style.color = 'blue';
    }else{
        field.style.color = 'green';
    }
}

// session data
var signedIn = false;
var username = '';
var debugMode = true;
var initCallback = null;

// request socket connection
var socket = io('localhost:8001');

// setter for specific cookie
var setCookie = function(name, value, days){
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

// getter for specific cookie
var getCookie = function(name){
    var name = name + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
    }
    return '';
};

// console log wrapper
var logMsg = function(msg){
    if (debugMode) console.log(msg);
};

// missing attribute log message
var attrMissing = function(attr, pack, data){
    if (debugMode){
        console.log('Attribute "' + attr + '" missing from package "' +
                    pack + '", data contents:');
        console.log(data);
    }
};

// when connection is established send init package
socket.on('connect', function(){
    var pageInitPkg = {
        'page':pageName,
        'token':getCookie('token')
    };
    socket.emit('pageInit', pageInitPkg);
    logMsg('Socket connected.');
});

// accept page init respose 
socket.on('pageInitResponse', function(data){
    if ('signedIn' in data) signedIn = data.signedIn;
    else attrMissing('signedIn', 'pageInitResponse', data);
    if ('username' in data) username = data.username;
    else attrMissing('username', 'pageInitResponse', data);
    if ('debugMode' in data) debugMode = data.debugMode;
    else attrMissing('debugMode', 'pageInitResponse', data);
    logMsg('Page init response received.');
    logMsg('Sign in status: ' + data.signedIn);
    logMsg('Username: ' + data.username);
    if (!signedIn){
        setCookie('token', '', 0);
        logMsg('Login denied, token deleted.');
    }
    if (initCallback) initCallback(data);
});
