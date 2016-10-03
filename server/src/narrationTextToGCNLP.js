// narrationTextToGCNLP.js
let _ = require('lodash')
let googleNarMatchers = require('./googleNarMatchers.js')

// return a name from googleCloudResponse
// it is not responsibility of this function to verify that name suggested is part of the characterProfile list
const narrationTextToGCNLP = (nonSingleSpacePatternArrangement, nonSingleSpacePreSnippetExtendedObj, googleCloudLanguage) => {
  return new Promise((fulfill, reject) => {
    let foundMatcher = _.find(googleNarMatchers, matcher => nonSingleSpacePatternArrangement.includes(matcher.arrangementTextMatcher))
    if (!foundMatcher) { return fulfill(null) }
    let textToAnalyze = foundMatcher.getNarrationTextOut(nonSingleSpacePreSnippetExtendedObj)

    let languageClient = googleCloudLanguage({})
    languageClient.annotate(textToAnalyze, {verbose: true}, (err, annotation) => {
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























