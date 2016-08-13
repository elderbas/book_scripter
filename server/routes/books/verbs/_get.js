let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);

// /api/books/verbs
router.get('/', getVerbs);

function getVerbs (req, res) {
  let bookName = _.get(req, 'query.bookName');
  if (_.some([bookName], _.isUndefined)) {
    return errorHandler(req, res, 'Missing parameters to /api/books/verbs', 500);
  }
  Books.getCharacterProfilesAndVerbSpokeSynonyms(bookName)
  .then((cPandVSS) => {
    res.status(200).json({verbSpokeSynonyms: cPandVSS.verbSpokeSynonyms});
  })
  .catch((err) => {
    return errorHandler(req, res, `Unsuccessfully got verbSpokeSynonym from ${bookName}`, 500);
  });

}

module.exports = router;
