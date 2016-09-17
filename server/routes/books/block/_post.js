// _post.js
let _ = require('lodash');
let router = require('express').Router();
let Books = require(`${_serverDir_}/src/dbModels/Books`);
let validateType = require('../../../utilityFunks').validateType

router.post('/next', confirmBlockCompletedAndGetNext);
function confirmBlockCompletedAndGetNext (req, res) {
  console.log('inside POST - api/book/block/next');
  const bookName = _.get(req, 'body.bookName');
  const tempBlockId = _.get(req, 'body.blockId');
  if (_.some([bookName, tempBlockId], _.isUndefined)) {
    return res.send('Missing query param to /api/book/block');
  }
  const blockId = parseInt(tempBlockId)
  if (_.some([
      validateType('bookName', bookName, _.isString),
      validateType('blockId', blockId, _.isNumber),
    ], (x) => x === false)) {
    return res.send('Missing query param to /api/books/block/next');
  }
  Books.setBlockAsCompletedAndGetNext(bookName, blockId)



}

module.exports = router;
