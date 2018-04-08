// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Texture preload function and list of available textures for preload

var preloadTextures = function(){
    Object.keys(shapeTextures).forEach(function(key, index){
        shapeTextures[key] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, shapeTextures[key]);
        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(samplerUniformLocation, 0);
        gl.texImage2D(gl.TEXTURE_2D, texParams.level, texParams.internalFormat,
                      texParams.width, texParams.height, texParams.border, 
                      texParams.srcFormat, texParams.srcType, texParams.pixel);
        const image = new Image();
        image.onload = function(){
            gl.bindTexture(gl.TEXTURE_2D, shapeTextures[key]);
            gl.texImage2D(gl.TEXTURE_2D, texParams.level, texParams.internalFormat, 
                          texParams.srcFormat, texParams.srcType, image);
            gl.generateMipmap(gl.TEXTURE_2D);
        };
        image.src = 'app_scripts/game/res/' + key + '.png';
    });
};

// list of existing textures, resource files are expected to have the same name and png extension
shapeTextures.ship = null;
shapeTextures.exhaust = null;
