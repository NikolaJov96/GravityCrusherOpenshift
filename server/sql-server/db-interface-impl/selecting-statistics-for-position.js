// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for deleting token from table

var queries = require('./queries');

const RESULT = 0;
const START_OFFSET = 0;

var callbackTableToPass = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which selects data failed!\n");
            throw error;
        }
        else {
            for(var i in rows)
                for(var key in rows[i])
                    console.log(rows[i][key]);

            var maxRow = rows[rows.length - 1].row - rows[0].row + 1;

            if (info.callback) info.callback("Success", rows, maxRow);
        }
}}

var selectCallbackQuery = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which search for users statistics failed!\n");
            throw error;
        }
        else {
            for(var key in rows[RESULT]) info.activeUsersCount = rows[RESULT][key];

            if(info.data.start <= 0) info.data.start = 0;
            else info.data.start--;

            if (info.data.start > info.activeUsersCount - info.rowCount)
                    info.data.start = info.activeUsersCount - info.rowCount;

            info.connection.query(queries.selectStatisticsWithUsername,
                [info.data.start, info.metric, info.rowCount, info.data.start], callbackTableToPass(info));
        }
}}

var getStatisticsModule = function(connection, metric, rowCount, data, callback) {

    info = {
        connection : connection,
        metric : metric,
        rowCount : rowCount,
        data : data,
        callback : callback
    }

    info.connection.query(queries.getActiveUsersCount, [], selectCallbackQuery(info));
}

module.exports = getStatisticsModule;
