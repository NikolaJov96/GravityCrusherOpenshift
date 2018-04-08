// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'game' page

// canvas was already accessed in previous script
// var elem = document.getElementById('elem');

document.onkeydown = function(event){
    var newState = roomState.onKeyDown(event);
    if (newState){
        roomState.finish();
        roomState = newState();
    }
}

document.onkeyup = function(event){
    var newState = roomState.onKeyUp(event);
    if (newState){
        roomState.finish();
        roomState = newState();
    }
}
