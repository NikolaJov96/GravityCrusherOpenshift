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

            var outputResult = [];
            for(var i in rows) {
                outputResult[i] = {
                    rank: rows[i].row,
                    username:  rows[i].username,
                    'Games Played': rows[i].games_played_count,
                    'Games Won': rows[i].games_won_count,
                    'Games Won Percentage': (rows[i].games_played_count != 0) ?
                        (rows[i].games_won_count / rows[i].games_played_count * 100) : (0),
                }
            }

            for(var i in outputResult)
            {

                for(var key in outputResult[i])
                    console.log(outputResult[i][key]);
                console.log();
            }

            var maxRow = rows[rows.length - 1].row - rows[0].row + 1;

            if (info.callback) info.callback("Success", outputResult, maxRow);
        }
}}

var selectCallbackQuery = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which search for users statistics failed!\n");
            throw error;
        }
        else {
            for(var key in rows[RESULT]) info.activeUsersCount = rows[RESULT][key];

            console.log(info.start);

            if(info.start <= 0 || info.activeUsersCount <= info.rowCount) info.start = 0;
            else info.start--;

            if ((info.start > info.activeUsersCount - info.rowCount) && (info.activeUsersCount > info.rowCount))
                    info.start = info.activeUsersCount - info.rowCount;

            console.log(info.start + "   " + info.metric + "   " + info.rowCount + "   " + info.start);
            info.connection.query(queries.selectStatistics,
                [info.start, info.metric, info.rowCount, info.start], callbackTableToPass(info));
        }
}}

var getStatisticsModule = function(connection, metric, rowCount, start, statNamesToColumns, callback) {

    info = {
        connection : connection,
        metric : statNamesToColumns[metric],
        rowCount : rowCount,
        start : start,
        callback : callback
    }

    info.connection.query(queries.getActiveUsersCount, [], selectCallbackQuery(info));
}

module.exports = getStatisticsModule;
