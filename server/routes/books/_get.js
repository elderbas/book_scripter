let router = require('express').Router();
let Books = require(`${_serverDir_}/src/dbModels/Books`);

router.get('/', getBookNames);

function getBookNames (req, res) {
  Books.getNamesOfBooksLoaded()
  .then(arrBookNames => {
    res.send(arrBookNames);
  })
  .catch((err) => {
    console.log('err', err);
    res.send(err);
  });
}

module.exports = router;
