// Nikola Jovanovic (NikolaJov96)

// Definitions needed for loading roomState
// Include before scripts for runing the game and game end

drawFunctions[0] = function(){
    // draw welcome message
    var data = stateData[0];
    gl.bindBuffer(gl.ARRAY_BUFFER, data.shipVertexBufferObject);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, data.shipIndexBufferObject);
	
	var projMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var transMatrix = new Float32Array(16);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
	alert(gameState.shipPosX);
	mat4.fromTranslation(transMatrix, 
		[gameState.shipPosX, gameState.shipPosY, 0.0]);
	mat4.lookAt(viewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);
	
	transMatrix = mat4.mul(transMatrix, viewMatrix, transMatrix);
	transMatrix = mat4.mul(transMatrix, projMatrix, transMatrix);
	
	gl.uniformMatrix4fv(matTransformationUniformLocation, gl.FALSE, transMatrix);
	
	gl.drawElements(gl.TRIANGLES, shipIndices.length, gl.UNSIGNED_SHORT, 0);
};

initFunctions[0] = function(){
    // buffer initialization
    var data = stateData[0];
    data.shipVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, data.shipVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectShapes.ship.vert), gl.STATIC_DRAW);
    data.shipIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, data.shipIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectShapes.ship.ind), gl.STATIC_DRAW);
};

finishFunctions[0] = function(){
   // free buffers 
};
