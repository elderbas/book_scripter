// narrationTextToGCNLP.js
let _ = require('lodash')
let googleNarMatchers = require('./googleNarMatchers.js')
let googleMetaLog = require(`${_serverDir_}/logHelper.js`)('googleMetaDataResponse')
let fs = require('fs')
let NODE_ENV = _.get(process, 'env.NODE_ENV')
let googleCloudConfig = {};
if  (NODE_ENV !== 'test') {
  googleCloudConfig = require(`${_serverDir_}/config/googleCloudConfig.js`)
}


// return a name from googleCloudResponse
// it is not responsibility of this function to verify that name suggested is part of the characterProfile list
const narrationTextToGCNLP = (nonSingleSpacePatternArrangement, nonSingleSpacePreSnippetExtendedObj, googleCloudLanguage) => {
  return new Promise((fulfill, reject) => {
    let foundMatcher = _.find(googleNarMatchers, matcher => nonSingleSpacePatternArrangement.includes(matcher.arrangementTextMatcher))
    if (!foundMatcher) { return fulfill(null) }
    let preSnippetToAnalyze = foundMatcher.getNarrationTextOut(nonSingleSpacePreSnippetExtendedObj)
    let languageClient = googleCloudLanguage(NODE_ENV == 'test' ? {} : {
      projectId: googleCloudConfig.projectId,
      keyFilename: `${_serverDir_}/config/${googleCloudConfig.keyFileName}`
    })
    languageClient.annotate(preSnippetToAnalyze.text, {verbose: true}, (err, annotation) => {
      if (err) { return reject(err) }
      let namePredictionObj = null;
      googleMetaLog(annotation)
      for (let i = 0; i < foundMatcher.googleResponseRuleMatchers.length; i++) {
        if (namePredictionObj) { break }
        namePredictionObj = foundMatcher.googleResponseRuleMatchers[i](annotation)
      }
      return fulfill(namePredictionObj)
    })
  })
}



module.exports = narrationTextToGCNLP;


