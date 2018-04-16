// Owner: Nikola Jovanivic (NikolaJov96)

// Summary: Class representing one game room

var RoomStateLoading = function(gameRoom){
    var self = {
        room: gameRoom
    };
    
    self.step = function(){
        var ret = { action: null };
        return ret;
    };
    
    return self;
};