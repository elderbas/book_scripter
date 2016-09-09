let router = require('express').Router();
let Books = require(`${_serverDir_}/src/dbModels/Books`);
let _ = require('lodash')

router.get('/', getBookNames);
router.get('/info', getBookInfoByName);

function getBookNames (req, res) {
  console.log('IS HERE');
  Books.getNamesOfBooksLoaded()
  .then(arrBookNames => {
    res.send(arrBookNames);
  })
  .catch((err) => {
    console.log('err', err);
    res.send(err);
  });
}

function getBookInfoByName (req, res) {
  let bookName = _.get(req, 'query.bookName')
  if (!bookName) { return errorHandler(req, res, 'empty bookname passed as param', 500) }

  Books.getBookInfo(bookName)
    .then(bookInfo => {
      res.send(bookInfo)
    })
    .catch(err => res.send(err))
}



module.exports = router;
