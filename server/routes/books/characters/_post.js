let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);

// /api/books/suggestion
router.get('/', addCharacterProfile);

let nameSuggest = require(`${_serverDir_}/src/nameSuggest`);
function addCharacterProfile (req, res) {
  console.log('!!!!!!!!!!!!!!!!!!');
  console.log('!!!!!!!!!!!!!!!!!!');
  console.log(req.body);
  return res.send('Hey')
}

module.exports = router;
