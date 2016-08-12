let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);

// /api/books/characters
router.post('/', addCharacterProfile);

let nameSuggest = require(`${_serverDir_}/src/nameSuggest`);
function addCharacterProfile (req, res) {
  let bookName = _.get(req, 'body.bookName');
  let characterProfileToAdd = _.get(req, 'body.characterProfileToAdd');
  if (_.some([bookName, characterProfileToAdd], _.isUndefined)) {
    return errorHandler(req, res, 500, 'Missing params provided to POST - /api/books/characters')
  }
  let addCharPromise = Books.addCharacterProfile(bookName, characterProfileToAdd);
  addCharPromise
    .then((updatedBookDoc) => {
      return res.json({upToDateCharacterProfiles: updatedBookDoc.characterProfiles});
    })
    .catch((e) => {
      return errorHandler(req, res, 500, JSON.stringify(e));
    })

}

module.exports = router;
