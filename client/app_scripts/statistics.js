// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'statistics' page

var table = document.getElementById('statTable');
var dropDown = document.getElementById('dropDown');

var columns = [];
var selectedColumn = '';
var startIndex = 0;
var maxRow = 0;
var findMe = false;

var drawTable = function(rows){
    var innerTable = '<thead>';

    for (var i in columns) innerTable += '<th scope="col">' + columns[i] + '</th>';
    innerTable += '</tr></thead><tbody>';
    startIndex = rows[0][columns[0]];
    for (var i in rows){
        innerTable += '<tr>';
        for (var j in columns){
            innerTable += '<td ' + (i === 0 ? 'scope="row"' : '') + '>' + rows[i][columns[j]] + '</td>';
        }
        innerTable += '</tr>';
    }
    innerTable += '</tbody>';
    table.innerHTML = innerTable;
};

initCallback = function(data){
    if (!('payload' in data)) attrMissing('payload', 'initCallback', data);
    else if (!('metrics' in data.payload)) attrMissing('metrics', 'initCallback.payload', data.payload);
    else if (!('default' in data.payload)) attrMissing('default', 'initCallback.payload', data.payload);
    else if (!('data' in data.payload)) attrMissing('data', 'initCallback.payload', data.payload);
    else if (!('maxRow' in data.payload)) attrMissing('maxRow', 'initCallback.payload', data.payload);
    else{
        columns = data.payload.metrics;
        selectedColumn = data.payload.default;
        maxRow = data.payload.maxRow;
        drawTable(data.payload.data);
        table.style.display = 'table';
        var text = '';
        for (var i in data.payload.metrics){
            if (i < 2) continue;
            text += '<option' + (data.payload.metrics[i] == selectedColumn ? ' selected="selected"' : '') +
                '>' + data.payload.metrics[i] + '</option>';
        }
        dropDown.innerHTML = text;
        dropDown.style.display = 'inline';
    }
};
if (initCallbackData) initCallback(initCallbackData);

socket.on('getStatisticsResponse', function(data){
    if (!('status' in data)) attrMissing('status', 'getStatisticsResponse', data);
    else {
        if (data.status === 'InvalidUser') logMsg('On getStatisticsResponse - invalid user');
        else {
            if (!('data' in data)) attrMissing('data', 'initCallback.payload', data);
            else if (!('maxRow' in data)) attrMissing('maxRow', 'initCallback.payload', data);
            else{
                maxRow = data.maxRow;
                drawTable(data.data);
                logMsg('Statistics updated.');
            }
        }
    }
});

dropDown.onchange = function(){
    selectedColumn = dropDown.value;
    if (findMe) getPlayerStats('');
    else getPositionStats(0);
}

var getPlayerStats = function(playerName){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }

    findMe = true;
    if (playerName.length === 0) playerName = username;
    var getStatisticsPkg = {
        metric: selectedColumn,
        mode: 'user',
        username: playerName,
        rowCount: 10
    };
    socket.emit('getStatistics', getStatisticsPkg);
    logMsg('Game statistics requested.');
};

var getPositionStats = function(delta){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }

    findMe = false;
    var getStatisticsPkg = {
        metric: selectedColumn,
        mode: 'position',
        startPosition: startIndex + delta,
        rowCount: 10
    };
    socket.emit('getStatistics', getStatisticsPkg);
    logMsg('Game statistics requested.');
};
