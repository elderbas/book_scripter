let _ = require('lodash');
let router = require('express').Router();

let Books = require(`${_serverDir_}/src/dbModels/Books`);

// /api/books/characters
router.post('/', addCharacterProfile);
router.post('/edit', modifyCharacterProfile);


function addCharacterProfile (req, res) {
  let bookName = _.get(req, 'body.bookName');
  let characterProfileToAdd = _.get(req, 'body.characterProfileToAdd');
  if (_.some([bookName, characterProfileToAdd], _.isUndefined)) {
    return errorHandler(req, res, 500, 'Missing params provided to POST - /api/books/characters')
  }
  let addCharPromise = Books.addCharacterProfile(bookName, characterProfileToAdd);
  addCharPromise
    .then((updatedBookDoc) => {
      console.log('updatedBookDoc.characterProfiles', updatedBookDoc.characterProfiles);
      return res.json({upToDateCharacterProfiles: updatedBookDoc.characterProfiles});
    })
    .catch((e) => {
      return errorHandler(req, res, 500, JSON.stringify(e));
    })
}

function modifyCharacterProfile(req, res) {
  console.log('@ endpoint res.body', req.body);
  res.json({goodJob: 'buddy'})
}





module.exports = router;


