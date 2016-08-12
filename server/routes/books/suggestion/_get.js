let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);
let grabExtendingPreSnippets = require(`${_serverDir_}/src/grabExtendingPreSnippets`);
let buildCustomLexicon = require(`${_serverDir_}/src/buildCustomLexicon`);
let classifyPreSnippetArrangement = require(`${_serverDir_}/src/classifyPreSnippetArrangement`);

// /api/books/suggestion
router.get('/', getSuggestedName);

let nameSuggest = require(`${_serverDir_}/src/nameSuggest`);
function getSuggestedName (req, res) {
  let bookName = _.get(req, 'query.bookName');
  let blockId = _.get(req, 'query.blockId');
  let speechPreSnippetIdSelected = _.get(req, 'query.speechPreSnippetIdSelected');
  if (_.some([bookName, blockId, speechPreSnippetIdSelected], _.isUndefined)) {
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
      customLex = buildCustomLexicon(charProfsAndVSS.characterProfiles, ['said', 'cheap']);
      let profilesToSuggest;
      let preSnippetExtendedObj = grabExtendingPreSnippets(block.preSnippets, 2, 6);
      let preSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
      let nameSuggestOutput = nameSuggest(preSnippetArrangementObj, preSnippetExtendedObj);
      if (_.isNull(nameSuggestOutput)) {
        profilesToSuggest = [];
      }
      else {
        profilesToSuggest = _.filter(charProfsAndVSS.characterProfiles, (cp) => {
          return cp.displayName.toLowerCase() === nameSuggestOutput.suggestedName || (
            _(cp.aliases).map(x => x.toLowerCase()).some(nameSuggestOutput.suggestedName)
          );
        });
      }

      // res.send({characterProfilesSuggested: suggested});
      res.send({characterProfilesSuggested: profilesToSuggest});
    })
    .catch((err) => {
      if (err) {
        errorHandler(req, res, `Server error @ GET /api/books/suggestion using book - '${bookName}'`, 500);
      }
    });


}

module.exports = router;
