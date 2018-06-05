// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler that handles requests for banning user

var db = require('../../sql-server/database-interface.js');

//TODO: different bann periods

const milisInDay = 86400000;
const DAYS_TO_BANN = 7;

module.exports = function(socket){ return function(data){
    logMsg('Bann user req: Data: ');
    logMsg(data);

    var bannToDate = new Date();
    bannToDate.setDate(bannToDate.getDate() + DAYS_TO_BANN);
    db.bannUser(data.opponent, function(socket, data) { return function(status, bannDate) {
            socket.emit('bannUserResponse', { status: status, bannTimeEnd: bannDate });
        }
    }(socket, data));
}};
