let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);

// /api/books/verbs
router.post('/', addVerb);

function addVerb (req, res) {
  let bookName = _.get(req, 'body.bookName');
  let verbSpokeSynonymToAdd = _.get(req, 'body.verbSpokeSynonymToAdd');
  if (_.some([bookName, verbSpokeSynonymToAdd], _.isUndefined)) {
    return errorHandler(req, res, 'Missing parameters to /api/books/verbs', 500);
  }
  Books.addVerbSpokeSynonym(bookName, verbSpokeSynonymToAdd)
  .then((successfullyAdded) => {
    if (successfullyAdded) {
      res.status(200).json({verbSpokeSynonymAddingResult: true});
    }
  })
  .catch((err) => {

    return errorHandler(req, res, `Unsuccessfully added ${verbSpokeSynonymAddingResult} to ${bookName}`, 500);
  });

}

module.exports = router;
