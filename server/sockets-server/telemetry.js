// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Class responsible for keeping telemetry

module.exports = function(interval, frameTime, verbose){
    var self = {
        interval: interval,
        frameTime: frameTime,
        verbose: verbose,
        maxCounter: interval * 1000 / frameTime,
        history: [],
        teleIterations: 0,
        accumulatedTime: 0.0,
        counter: 0
    };
    
    self.startIteration = function(){
        // round up last interval if the time has come
        if (self.counter++ === self.maxCounter){
            self.teleIterations++;
            var avrgIterTime = self.accumulatedTime / self.maxCounter;
            var interval = { 
                intervalTime: avrgIterTime,
                activeRooms: serverState.gameRooms.length,
                activeUsers: Object.keys(serverState.users).length
            };
            self.history.push(interval);
            if (self.verbose){
                console.log('Telemetry interval: ' + self.teleIterations);
                console.log(interval);
            }
            self.counter = 0;
            self.accumulatedTime = 0.0;
            self.maxRooms = 0;
        }
        
        // start new iteration
        self.startTime = process.hrtime();
    };
    
    self.endIterationn = function(){
        var diffTime = process.hrtime(self.startTime);
        self.accumulatedTime += diffTime[0] * 1e9 + diffTime[1];
    };
    
    return self;
};
