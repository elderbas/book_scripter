let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);

// /api/books/characters
router.post('/edit', modifyCharacterProfileAliases);
router.post('/', addCharacterProfile);



function addCharacterProfile (req, res) {
  // console.log(req.url);
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

function modifyCharacterProfileAliases(req, res) {
  let bookName = _.get(req, 'body.bookName');
  let newCharacterProfile = _.get(req, 'body.newCharacterProfile');
  if (_.some([bookName, newCharacterProfile], _.isUndefined)) {
    return errorHandler(req, res, 500, 'Missing params provided to POST - /api/books/characters/edit')
  }
  Books.modifyCharacterProfileAliases(bookName, newCharacterProfile)
  .then((updateWorked) => {
    res.json({updateWorked})
  })
  .catch((err) => {
    return errorHandler(req, res, 500, JSON.stringify(err))
  })
}





module.exports = router;


