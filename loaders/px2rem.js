let css = require('css');// It can turn CSS source code into an abstract syntax tree
const pxRegExp = /\b(\d+(\.\d+)?)px\b/;

class Px2rem {
    constructor(config) {
        this.config = config;
    }
    generateRem(csstext) {
        const processRules = (rules) => {
            for (let i = 0; i < rules.length; i++) {
                let rule = rules[i];
                let declarations = rule.declarations;
                for (let j = 0; j < declarations.length; j++) {
                    let declaration = declarations[j];
                    if(declaration.type === 'declaration' && pxRegExp.test(declaration.value)){
                        declaration.value = this._getCalcValue('rem', declaration.value)
                    }
                }
            }
        }


        let astObj = css.parse(csstext);
        processRules(astObj.stylesheet.rules);
        return css.stringify(astObj);
    }

    _getCalcValue(type, value){
        let {remUnit, remPrecision} = this.config;
        return value.replace(pxRegExp, (_, $1) => {
            let value = (parseFloat($1) / remUnit).toFixed(remPrecision); // Convert it to a number and divide it by the REM value
            return value + type;
        })
    }
}

module.exports = Px2rem;