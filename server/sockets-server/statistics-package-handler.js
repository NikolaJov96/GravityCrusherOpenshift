// Owner: Filip Mandic (mandula8)

// Summary: This file contains handler for getting statistics

//To ask Jovanovic - socket code string
//To ask Jovanovic - if data.data.username ili data.username

var db = require('../sql-server/database-interface.js');

var callbackFunction = function(socket, data) { return function(status, table, maxRow) {
    socket.emit('getStatisticsResponse', {status: status, table: table, maxRow: maxRow});
}}

module.exports = function(socket){ return function(data){
    console.log('Get statistics: Data: ');
    console.log(data);

    if (data.data.mode === 'user')
        db.getStatisticsForUser(data.metric, data.rowCount, data.data.username, callbackFunction(socket, data));
    else db.getStatisticsForPosition(data.metric, data.rowCount, data.data.start, callbackFunction(socket, data));
}
