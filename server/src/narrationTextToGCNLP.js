// narrationTextToGCNLP.js
let _ = require('lodash')
let googleNarMatchers = require('./googleNarMatchers.js')
let fs = require('fs')
let googleCloudConfig = require(`${_serverDir_}/config/googleCloudConfig.js`)

// return a name from googleCloudResponse
// it is not responsibility of this function to verify that name suggested is part of the characterProfile list
const narrationTextToGCNLP = (nonSingleSpacePatternArrangement, nonSingleSpacePreSnippetExtendedObj, googleCloudLanguage) => {
  return new Promise((fulfill, reject) => {
    let foundMatcher = _.find(googleNarMatchers, matcher => {
      if (nonSingleSpacePatternArrangement.includes(matcher.arrangementTextMatcher)) {
        console.log('nonSingleSpacePatternArrangement', nonSingleSpacePatternArrangement);
        console.log('matcher.arrangementTextMatcher', matcher.arrangementTextMatcher);
      }
      return nonSingleSpacePatternArrangement.includes(matcher.arrangementTextMatcher)
    })
    if (!foundMatcher) { return fulfill(null) }
    console.log('foundMatcher', foundMatcher);
    let preSnippetToAnalyze = foundMatcher.getNarrationTextOut(nonSingleSpacePreSnippetExtendedObj)
    let languageClient = googleCloudLanguage({
      projectId: googleCloudConfig.projectId,
      keyFilename: `${_serverDir_}/config/${googleCloudConfig.keyFileName}`
    })
    console.log('preSnippetToAnalyze', preSnippetToAnalyze);
    languageClient.annotate(preSnippetToAnalyze.text, {verbose: true}, (err, annotation) => {
      console.log('annotation', annotation);
      if (err) { return reject(err) }
      let namePredictionObj = null;
      for (let i = 0; i < foundMatcher.googleResponseRuleMatchers.length; i++) {
        if (namePredictionObj) { break }
        namePredictionObj = foundMatcher.googleResponseRuleMatchers[i](annotation)
      }
      return fulfill(namePredictionObj)
    })
  })
}



module.exports = narrationTextToGCNLP;























