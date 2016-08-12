let _ = require('lodash');
let nlp = require('nlp_compromise');
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
  let customLex;
  let charProfilesAndVSSPromise = Books.getCharacterProfilesAndVerbSpokeSynonyms(bookName);
  charProfilesAndVSSPromise
    .then((charProfsAndVSS) => {
      // add character names and verbs so the NLP library can figure out patterns
      customLex = buildCustomLexicon([{displayName: 'Bob', aliases:[]}], charProfsAndVSS.verbSpokeSynonyms);
      return Books.getBlockByIndex(bookName, blockId)
    })
    .then((block) => {
      let suggested;
      let preSnippetExtendedObj = grabExtendingPreSnippets(block.preSnippets, 2, 6);
      let preSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
      let nameSuggested = nameSuggest(preSnippetArrangementObj, preSnippetExtendedObj);

      if (_.isNull(nameSuggested)) {
        suggested = [];
      }
      res.send({characterProfilesSuggested: suggested});
    })
    .catch((err) => {
      if (err) {res.send(`Server error @ GET /api/books/suggestion using book - '${bookName}'`);}
      return res.send({a: 'ERROR'})
    });


}

module.exports = router;
