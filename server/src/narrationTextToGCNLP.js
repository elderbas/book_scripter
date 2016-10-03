// narrationTextToGCNLP.js
let _ = require('lodash')
let googleNarMatchers = require('./googleNarMatchers.js')

// return a name from googleCloudResponse
// it is not responsibility of this function to verify that name suggested is part of the characterProfile list
const narrationTextToGCNLP = (nonSingleSpacePatternArrangement, nonSingleSpacePreSnippetExtendedObj, googleCloudLanguage) => {
  return new Promise((fulfill, reject) => {
    // console.log('\nnonSingleSpacePatternArrangement', nonSingleSpacePatternArrangement);
    let foundMatcher = _.find(googleNarMatchers, matcher => nonSingleSpacePatternArrangement.includes(matcher.arrangementTextMatcher))
    // console.log('foundMatcher', foundMatcher);
    if (!foundMatcher) { return fulfill(null) }
    let textToAnalyze = foundMatcher.getNarrationTextOut(nonSingleSpacePreSnippetExtendedObj)
    // console.log('textToAnalyze', textToAnalyze);


    let languageClient = googleCloudLanguage({})
    languageClient.annotate(textToAnalyze, {verbose: true}, (err, annotation) => {
      if (err) { return reject(err) }
      let namePredicted = null;
      for (let i = 0; i < foundMatcher.googleResponseRuleMatchers.length; i++) {
        if (namePredicted) { break }
        namePredicted = foundMatcher.googleResponseRuleMatchers[i](annotation)

      }
      console.log('namePredicted', namePredicted);
      return fulfill(namePredicted)
    })
  })
}



module.exports = narrationTextToGCNLP;























