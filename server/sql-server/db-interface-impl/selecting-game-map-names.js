// Owner: Filip Mandic (mandula8)

// Summary: Functions and callbacks for selecting all game map names

var queries = require('./queries');

const RESULT = 0;

var callbackQuery = function(info) { return function(error, rows, fields) {
        if (!!error) {
            console.log("error: query which search in user for username failed!\n");
            console.log(error);
        }
        else {
            if (!!rows.length) {

                var outputResult = [];
                for(var i in rows) {
                    outputResult[i] = {
                        'Name': rows[i].name
                    }

                }

                if (info.callback) info.callback("Success");

            } else if (info.callback) info.callback("NoMapsYET");
        }
}}

var selectingGameMapsModule = function(connection, callback) {

    info = {
        connection : connection,
        callback : callback
    }
    info.connection.query(queries.getAllMapsNames, [], callbackQuery(info));
}

module.exports = selectingGameMapsModule;
