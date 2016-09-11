let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);

// /api/books/multi
router.post('/nameConfirmedOnPreSnippet', nameConfirmedOnPreSnippet);

function nameConfirmedOnPreSnippet (req, res) {

  let bookName = _.get(req, 'body.bookName');
  let blockId = _.get(req, 'body.blockId');
  let preSnippetId = _.get(req, 'body.preSnippetId');
  let displayName = _.get(req, 'body.displayName');
  let snippetType = _.get(req, 'body.snippetType');

  if (_.some([bookName, blockId, preSnippetId, displayName, snippetType], _.isUndefined)) {
    return errorHandler(req, res, 'Missing parameters to /api/books/multi/nameConfirmedOnPreSnippet', 500);
  }

  Books.nameConfirmedOnPreSnippet(bookName, blockId, preSnippetId, displayName, snippetType)
  .then(newBlock => {
    res.send(newBlock.snippets)
  })
  .catch((err) => {
    return errorHandler(req, res, 500, JSON.stringify(err));
  })

}

module.exports = router;
