// Owner: Nikola Jovanovic (NikolaJov96)

// Summary: Texture preload function and list of available textures for preload

var preloadTextures = function(){
    var loaded = 0;
    for (var i in textureList){
        shapeTextures[textureList[i]] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, shapeTextures[textureList[i]]);
        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(programInfo.samplerUnifLoc, 0);
        gl.texImage2D(gl.TEXTURE_2D, texParams.level, texParams.internalFormat,
                      texParams.width, texParams.height, texParams.border, 
                      texParams.srcFormat, texParams.srcType, texParams.pixel);
        const image = new Image();
        image.onload = function(ind){
            return function(){
                gl.bindTexture(gl.TEXTURE_2D, shapeTextures[textureList[ind]]);
                gl.texImage2D(gl.TEXTURE_2D, texParams.level, texParams.internalFormat, 
                              texParams.srcFormat, texParams.srcType, image);
                gl.generateMipmap(gl.TEXTURE_2D);
                loaded += 1;
                if (loaded >= textureList.length) shapeTextures.allTexturesLoaded = true;
                
            };
        }(i);
        image.src = 'app_scripts/game/res/' + textureList[i] + '.png';
    };
};

// list of existing textures, resource files are expected to have the same name and png extension
shapeTextures.allTexturesLoaded = false;
var textureList = [ 'ship', 'ship-r', 'ship-g', 'exhaust', 'star' ];
