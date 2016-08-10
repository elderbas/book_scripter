let router = require('express').Router();
let _ = require('lodash');
let BookModel = require(`${_serverDir_}/src/dbModels/Books`);
let uF = require(`${_serverDir_}/utilityFunks`);

router.post('/', uploadBookFile);

function uploadBookFile (req, res) {
  // get name of book
  let bookData = _.get(req, 'files.data');
  let fileNameWithExtension = _.get(req, 'files.file.name');
  let fileNameWithoutExtension = fileNameWithExtension ? uF.extractFileName(fileNameWithExtension) : undefined;

  res.json({bookName: fileNameWithoutExtension});
}

module.exports = router;