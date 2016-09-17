let _ = require('lodash');
let router = require('express').Router();
let fs = require('fs');
let Books = require(`${_serverDir_}/src/dbModels/Books`);
let grabExtendingPreSnippets = require(`${_serverDir_}/src/grabExtendingPreSnippets`);
let buildCustomLexicon = require(`${_serverDir_}/src/buildCustomLexicon`);
let classifyPreSnippetArrangement = require(`${_serverDir_}/src/classifyPreSnippetArrangement`);
let validateType = require('../../../utilityFunks').validateType

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


      // let prettyJson = (x) => JSON.stringify(x, null, 4)
      // console.log(`block -`, prettyJson(block));
      // console.log('specific pre snippet', prettyJson(block.preSnippets[speechPreSnippetIdSelected]));
      // TODO change to readFile instead of sync (but for now that'd make it ugly <_>)
      let commonSpokenSynonyms = JSON.parse(fs.readFileSync(`${_serverDir_}/db_helper/common_spoken_synonyms.json`).toString());
      // console.log('existing CHAR PROFILES', prettyJson(charProfsAndVSS.characterProfiles));
      customLex = buildCustomLexicon(charProfsAndVSS.characterProfiles, commonSpokenSynonyms.concat(charProfsAndVSS.verbSpokeSynonyms));
      // console.log('block.preSnippets', block.preSnippets);
      let preSnippetExtendedObj = grabExtendingPreSnippets(block.preSnippets, speechPreSnippetIdSelected, 6);
      // console.log('preSnippetExtendedObj', prettyJson(preSnippetExtendedObj.nonSingleSpace));
      let preSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
      // console.log('preSnippetArrangementObj', prettyJson(preSnippetArrangementObj));
      let nameSuggestOutput = nameSuggest(preSnippetArrangementObj, preSnippetExtendedObj);
      let profilesToSuggest;
      if (_.isNull(nameSuggestOutput)) {
        profilesToSuggest = [];
      }
      else {
        profilesToSuggest = _.filter(charProfsAndVSS.characterProfiles, (cp) => {
          let displayName = cp.displayName.toLowerCase(), suggestedName = nameSuggestOutput.suggestedName.toLowerCase()
          return displayName === suggestedName || _.some(cp.aliases, a => a.toLowerCase() === suggestedName)
        });

      }
      if (process.env.NODE_ENV === 'development' && _.get(global, 'log.getNameSuggestion')) {
        let suggestionLogObj = {
          speechText: block.preSnippets[speechPreSnippetIdSelected],
          nameSuggestOutput,
          preSnippetArrangementObj,
          profilesToSuggest,
          charProfiles: charProfsAndVSS.characterProfiles
        }
        fs.writeFileSync(`${_serverDir_}/log/nameSuggest.txt`, JSON.stringify(suggestionLogObj, null, 4) + '\n\n')
      }

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
