// _post.js
let _ = require('lodash');
let router = require('express').Router();
let Books = require(`${_serverDir_}/src/dbModels/Books`);
let validateType = require('../../../utilityFunks').validateType
let logger = require('../../../../dopeAssHelpers').logger

router.post('/next', confirmBlockCompletedAndGetNext);
function confirmBlockCompletedAndGetNext (req, res) {
  const bookName = _.get(req, 'body.bookName');
  const tempBlockId = _.get(req, 'body.blockId');
  if (_.some([bookName, tempBlockId], _.isUndefined)) { return res.send('Missing query param to /api/book/block/next') }

  const blockId = parseInt(tempBlockId)
  let arrValidz = [ validateType('bookName', bookName, _.isString), validateType('blockId', blockId, _.isNumber)]
  if (_.some(arrValidz, (x) => x === false)) { return res.send('Missing query param to /api/books/block/next') }

  Books.setBlockAsCompletedAndGetNext(bookName, blockId)
    .then((respObj) => {
      res.json(respObj)
    })
    .catch((err) => {
      res.send(err)
    })
}

module.exports = router;
