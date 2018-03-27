// Nikola Jovanovic (NikolaJov96)

// Definitions of global game variables

// 0 - loading | 1 - running | 2 - game ended
var roomState = 0

// list of all needed data for each roomState
var stateData = [{}, {}, {}];

// list of callbacks for each roomState
var drawFunctions = [null, null, null];

// list of init functions for each roomState
var initFunctions = [null, null, null];

// list of finishing functions for each roomState
var finishFunctions = [null, null, null];

// JSON of all existing object shapes
var objectShapes = {}

// 
var matTransformationUniformLocation = null;
var vertexBufferObject = null;
var indexBufferObject = null;
