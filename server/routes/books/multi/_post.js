let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);

// /api/books/multi
router.post('/nameConfirmedOnPreSnippet', nameConfirmedOnPreSnippet);

function nameConfirmedOnPreSnippet (req, res) {
  let bookName = _.get(req, 'body.bookName');
  let tempBlockId = _.get(req, 'body.blockId');
  let tempPreSnippetId = _.get(req, 'body.preSnippetId');
  let displayName = _.get(req, 'body.displayName');
  let snippetType = _.get(req, 'body.snippetType');

  if (_.some([bookName, tempBlockId, tempPreSnippetId, displayName, snippetType], _.isUndefined)) {
    return errorHandler(req, res, 'Missing parameters to /api/books/multi/nameConfirmedOnPreSnippet', 500);
  }

  let blockId = parseInt(tempBlockId)
  let preSnippetId = parseInt(tempPreSnippetId)
  
  if (_.some([blockId, preSnippetId], (x) => !_.isNumber(x))) {
    return errorHandler(req, res, 'Invalid parameter types to /api/books/multi/nameConfirmedOnPreSnippet', 500);
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
