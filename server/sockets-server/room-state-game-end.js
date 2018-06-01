// Owner: Filip Mandic (mandula8)

// Summary: Class representing game room in game end state

module.exports = function(gameRoom){
    var self = {
        room: gameRoom
    };

    logMsg('Room ' + self.room.name + ' is in game-end state.');

    self.initResponse = function(user){ 
        var ret = {
            state: 'game-end',
            role: 'spec',
            host: self.room.host.name,
            hostActive: (self.room.host.page === 'Game' ? true : false),
            join: (self.room.joinName),
            joinActive: (self.room.join.page === 'Game' ? true : false),
            winner: self.room.winner
        };
        if (user.name === self.room.host.name){
            ret.role = 'host';
        } else if (user.name === self.room.joinName){
            ret.role = 'join';
        }
        return ret;
    };

    self.step = function(){
        var ret = { action: null };
        
        if (self.room.host.page !== 'Game' && self.room.join.page !== 'Game'){
            ret.action = 'gameFinished';
            logMsg('Room ' + self.room.name + ' is finished.');
        }
        
        return ret;
    };

    return self;
};
