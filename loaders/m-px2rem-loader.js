// let Px2rem = require('px2rem');
let Px2rem = require('./px2rem');
// As long as the webpack package is installed, there will be the loader-utils package
let loaderUtils = require('loader-utils');

/**
 * Loader is actually a function, 
 * and the parameters are the contents of the previous loader 
 * or the source code of the module.
 * 
 * After being processed by the loader, the result is returned to the next loader or webpack
 */
function loader(source){
    // The parameter object configured by the user in webpack.config.js can be obtained through the getoptions method
    let options = loaderUtils.getOptions(this); // we can get { remUnit: 75, remPrecision: 8 }
    if(options.exclude && options.exclude.test(this.resource)){ // this.resource is the absolute path of the module currently being converted
        return source;
    }
    let px2rem = new Px2rem(options);
    let targetSource = px2rem.generateRem(source); // Get the compiled style with rem
    return targetSource
}

module.exports = loader;