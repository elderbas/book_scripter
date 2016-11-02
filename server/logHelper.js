// logHelper.js
let _ = require('lodash')
let fs = require('fs')


let logValueFormatters = (logVarName) => {
  switch (logVarName) {
    case 'googleMetaDataResponse': {
      return (annotation) => {
        // remove unused metadata
        annotation.language = undefined
        _.forEach(annotation.sentences, (sentence) => {
          sentence.beginOffset = undefined
        })
        _.forEach(annotation.tokens, (token) => {
          token.text.beginOffset = undefined
          token.dependencyEdge.headTokenIndex = undefined
          token.lemma = undefined
        })
        return annotation
      }
    }
    default: {
      return _.identity
    }
  }
}

module.exports = (logVarName) => {
  let logValueFormatter = logValueFormatters(logVarName)
  return (valToLog) => {
    if (process.env.NODE_ENV === 'development' && _.get(global, `log.${logVarName}`)) {
      fs.writeFileSync(`${_serverDir_}/log/${logVarName}.log`, JSON.stringify(logValueFormatter(valToLog), null, 4) + '\n\n')
    }
  }
}

