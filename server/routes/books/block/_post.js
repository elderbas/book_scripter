// _post.js
let _ = require('lodash');
let router = require('express').Router();
let Books = require(`${_serverDir_}/src/dbModels/Books`);
let validateType = require('../../../utilityFunks').validateType

router.post('/', confirmBlockCompletedAndGetNext);
function confirmBlockCompletedAndGetNext (req, res) {
  console.log('inside api/book/block/getBlockById');
  const bookName = _.get(req, 'body.bookName');
  const tempBlockId = _.get(req, 'body.blockId');
  if (_.some([bookName, tempBlockId], _.isUndefined)) {
    return res.send('Missing query param to /api/book/block');
  }
  const blockId = parseInt(tempBlockId)
  console.log('blockId', blockId);
  if (_.some([
      validateType('bookName', bookName, _.isString),
      validateType('blockId', blockId, _.isNumber),
    ], (x) => x === false)) {
    return res.send('Missing query param to /api/books/block/');
  }
  console.log('about to run Books.getBlockByIndex');
  Books.getBlockByIndex(blockId, bookName)
  .then((block) => {
    console.log('block', block);
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
