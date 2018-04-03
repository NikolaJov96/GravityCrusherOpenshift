// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Definitions of global game variables

// current room state
var roomState = null;

// roomState classes forward declarations
var StateLoading = null;
var StateGame = null;
var StateGameEnd = null;

// JSON of all existing object shapes
var objectShapes = {};

// locations of shader uniform matrix arguments
var matProjectionUniformLocation = null;
var matViewUniformLocation = null;
var matTranslationUniformLocation = null;
var matRotationUniformLocation = null;
var matScalingUniformLocation = null;
