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

var callbackFront = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which finds better ranged users count failed!\n");
            throw error;
        }
        else {
            for(var key in rows[RESULT]) info.frontUsersCount = rows[RESULT][key];
            info.backUsersCount = info.activeUsersCount - info.frontUsersCount - 1;

            var offset = 0;
            var half = parseInt(info.rowCount / 2, 10);

            if ((info.frontUsersCount > half) && (info.backUsersCount > half))
                offset = info.frontUsersCount - half;
            else if (info.backUsersCount <= half)
                    offset = info.frontUsersCount - info.rowCount + info.backUsersCount + 1;

            info.connection.query(queries.selectStatisticsWithUsername,
                [offset, info.metric, info.rowCount, offset], callbackTableToPass(info));
        }
}}

var callbackActiveUsers = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which finds users count failed!\n");
            throw error;
        }
        else {
            for(var key in rows[RESULT]) info.activeUsersCount = rows[RESULT][key];

            if (info.activeUsersCount <= info.rowCount) {
                //pozovi upit koji odmah izvrsi dohvatanje rezultata sa offsetom 0
                info.connection.query(queries.selectStatisticsWithUsername,
                    [START_OFFSET, info.metric, info.rowCount, START_OFFSET], callbackTableToPass(info));
            }
            else {
                info.connection.query(queries.getActiveUsersInFrontCount,
                    [info.metric, info.columnValue], callbackFront(info));
            }
        }
}}

var selectCallbackQuery = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which search for users statistics failed!\n");
            throw error;
        }
        else {
            if (!!rows.length) {
                for(var key in rows[0]) info.columnValue = rows[0][key];

                info.connection.query(queries.getActiveUsersCount,
                    [], callbackActiveUsers(info));
            }
            else if (info.callback) info.callback("NothingFound", null, null);
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

    info.connection.query(queries.selectUsersStatistics, [metric, info.data.username], selectCallbackQuery(info));
}

module.exports = getStatisticsModule;
