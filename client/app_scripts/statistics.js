// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Callbacks initialization for 'statistics' page

var table = document.getElementById('statTable');
var dropDown = document.getElementById('dropDown');

var columns = [];
var selectedColumn = '';
var startIndex = 0;
var findMe = false;

var drawTable = function(rows){
    var innerTable = '<thead>';

    for (var i in columns) innerTable += '<th scope="col">' + columns[i] + '</th>';
    innerTable += '</tr></thead><tbody>';
    startIndex = rows[0].rank;
    for (var i in rows){
        logMsg(rows[i]);
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
    else{
        columns = data.payload.metrics;
        selectedColumn = data.payload.default;
        drawTable(data.payload.data);
        table.style.display = 'table';
        var text = '';
        for (var i in data.payload.metrics){
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
            if (!('rooms' in data)) attrMissing('rooms', 'getStatisticsResponse', data);
            else{
                drawTable(data.rooms);
            }
        }
    }
});

var getPlayerStats = function(playerName){
    if (!socket.connected){ logMsg('Server not yet connected.'); return; }
    
    findMe = true;
    if (playerName.length === 0) playerName = username;
    var getStatisticsPkg = {
        metric: selectedColumn,
        mode: '',
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
        mode: '',
        startPosition: startIndex + delta,
        rowCount: 10
    };
    socket.emit('getStatistics', getStatisticsPkg);
    logMsg('Game statistics requested.');
};

