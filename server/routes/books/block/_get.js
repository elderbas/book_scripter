// _get.js

let _ = require('lodash');
let router = require('express').Router();
let fs = require('fs');
let Books = require(`${_serverDir_}/src/dbModels/Books`);
let validateType = require('../../../utilityFunks').validateType

router.get('/', getBlockById);
function getBlockById (req, res) {
  const bookName = _.get(req, 'query.bookName');
  const tempBlockId = _.get(req, 'query.blockId');
  if (_.some([bookName, tempBlockId], _.isUndefined)) {
    return res.send('Missing query param to /api/book/block');
  }
  const blockId = parseInt(tempBlockId)
  if (_.some([
      validateType('bookName', bookName, _.isString),
      validateType('blockId', blockId, _.isNumber),
    ], (x) => x === false)) {
    return res.send('Missing query param to /api/books/block/');
  }

  Books.getBlockByIndex(bookName, blockId)
    .then((block) => {
      if (block === undefined) {
        return res.json({
          preSnippets: [],
          snippets: [],
          status: 'non-existent'
        })
      }
      return res.json(block)
    })
    .catch((err) => {
      if (err) {
        console.log('ERR in _get suggestion', err, err.message);
        errorHandler(req, res, `Server error @ GET /api/books/block using book - '${bookName}'`, 500);
      }
    })
}

module.exports = router;
