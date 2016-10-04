let _ = require('lodash');
let router = require('express').Router();
let fs = require('fs');
let Books = require(`${_serverDir_}/src/dbModels/Books`);
let grabExtendingPreSnippets = require(`${_serverDir_}/src/grabExtendingPreSnippets`);
let buildCustomLexicon = require(`${_serverDir_}/src/buildCustomLexicon`);
let classifyPreSnippetArrangement = require(`${_serverDir_}/src/classifyPreSnippetArrangement`);
let validateType = require('../../../utilityFunks').validateType
const narrationTextToGCNLP = require(`${_serverDir_}/src/narrationTextToGCNLP`)
const googleLanguage = require('@google-cloud/language');
let commonSpokenSynonyms = JSON.parse(fs.readFileSync(`${_serverDir_}/db_helper/common_spoken_synonyms.json`).toString());

// this should really only end up being 1 person, but I was thinking there might be a probability based thing later
// so set it up to be multiple based
const getCharacterProfilesMatchingAName = (charProfsAndVSS, nameSuggested) => {
  return _.filter(charProfsAndVSS.characterProfiles, (cp) => {
    let displayName = cp.displayName.toLowerCase(), suggestedName = nameSuggested.toLowerCase()
    return displayName === suggestedName || _.some(cp.aliases, a => a.toLowerCase() === suggestedName)
  });
}

// /api/books/suggestion
router.get('/', getSuggestedName);
let nameSuggest = require(`${_serverDir_}/src/nameSuggest`);
function getSuggestedName (req, res) {
  // const longStars = '************************************************************************************'
  // const longStars2 = [longStars,longStars].join('')
  // console.log(longStars2, longStars2, longStars2);
  const bookName = _.get(req, 'query.bookName');
  const tempBlockId = _.get(req, 'query.blockId');
  const tempSpeechPreSnippetIdSelected = _.get(req, 'query.speechPreSnippetIdSelected');
  if (_.some([bookName, tempBlockId, tempSpeechPreSnippetIdSelected], _.isUndefined)) {
    return res.send('Missing query param to /api/books/suggestion');
  }
  const blockId = parseInt(tempBlockId)
  const speechPreSnippetIdSelected = parseInt(tempSpeechPreSnippetIdSelected)

  if (_.some([
      validateType('bookName', bookName, _.isString),
      validateType('blockId', blockId, _.isNumber),
      validateType('speechPreSnippetIdSelected', speechPreSnippetIdSelected, _.isNumber),
    ], (x) => x === false)) {
    return res.send('Missing query param to /api/books/suggestion');
  }
  // I feel like Im being redundant in getting these individual values, depending on how MongoDB
  // works there might be a more memory performant way? Maybe it would be the same memory
  let customLex, charProfsAndVSS;
  let charProfilesAndVSSPromise = Books.getCharacterProfilesAndVerbSpokeSynonyms(bookName);
  charProfilesAndVSSPromise
    .then((charProfsAndVSSResponse) => {
      charProfsAndVSS = charProfsAndVSSResponse;
      // add character names and verbs so the NLP library can figure out patterns
      return Books.getBlockByIndex(bookName, blockId)
    })
    .then((block) => {

      customLex = buildCustomLexicon(charProfsAndVSS.characterProfiles, commonSpokenSynonyms.concat(charProfsAndVSS.verbSpokeSynonyms));
      let preSnippetExtendedObj = grabExtendingPreSnippets(block.preSnippets, speechPreSnippetIdSelected, 6);
      let preSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
      let nameSuggestOutput = nameSuggest(preSnippetArrangementObj, preSnippetExtendedObj);
      if (nameSuggestOutput === null) { // attempt to get suggestion from google cloud nlp prediction
        let preSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, undefined, true);
        return narrationTextToGCNLP(
          preSnippetArrangementObj.nonSingleSpaceArrangement, preSnippetExtendedObj.nonSingleSpace, googleLanguage
        )
        .then((nameSuggestObj) => {
          let profilesToSuggest;
          if (nameSuggestObj === null) {
            profilesToSuggest = [];
          }
          else {
            profilesToSuggest = getCharacterProfilesMatchingAName(charProfsAndVSS, nameSuggestObj.predictedEntity.name)
          }
          console.log('!!!!!!!!---------!!!!!!!!!!!');
          console.log('profilesToSuggest GOOGLE', profilesToSuggest);
          return profilesToSuggest
        })
        .catch((err) => {
          if (err) {
            console.log('ERR in _get suggestion for google cloud api', err, err.message);
            errorHandler(req, res, `Server error @ GET /api/books/suggestion using book - '${bookName}'`, 500);
          }
        })
      }
      else {
        let profilesToSuggest = getCharacterProfilesMatchingAName(charProfsAndVSS, nameSuggestOutput.suggestedName)
        if (process.env.NODE_ENV === 'development' && _.get(global, 'log.getNameSuggestion')) {
          let suggestionLogObj = {
            speechText: block.preSnippets[speechPreSnippetIdSelected],
            nameSuggestOutput,
            preSnippetArrangementObj,
            profilesToSuggest
          }
          fs.writeFileSync(`${_serverDir_}/log/nameSuggest.txt`, JSON.stringify(suggestionLogObj, null, 4) + '\n\n')
        }
        // res.send({characterProfilesSuggested: profilesToSuggest});
        return profilesToSuggest
      }
    })
    .then((profilesToSuggest) => {
      res.send({characterProfilesSuggested: profilesToSuggest});
    })
    .catch((err) => {
      if (err) {
        console.log('ERR in _get suggestion', err, err.message);
        errorHandler(req, res, `Server error @ GET /api/books/suggestion using book - '${bookName}'`, 500);
      }
    });


}

module.exports = router;
