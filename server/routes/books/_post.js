let router = require('express').Router();
let _ = require('lodash');
let BookModel = require(`${_serverDir_}/src/dbModels/Books`);
let uF = require(`${_serverDir_}/utilityFunks`);
let bookSplitter = require(`${_serverDir_}/src/bookSplitter`);
let defaultValues = require(`${_serverDir_}/constants/defaultValues`);

router.post('/', uploadBookFile);

function uploadBookFile (req, res) {
  // get name of book
  let customBookName, fileNameWithExtension, fileNameWithoutExtension, bookData, bookNameToUse;
  customBookName = bookNameToUse = _.get(req, 'body.bookName');
  bookData = _.get(req, 'files.file.data').toString();
  if (!customBookName) {
    fileNameWithExtension = _.get(req, 'files.file.name');
    fileNameWithoutExtension = fileNameWithExtension ? uF.extractFileName(fileNameWithExtension) : undefined;
    bookNameToUse = fileNameWithoutExtension;
  }

  // save book to database
  let textBlobs = bookSplitter({
    strPatternToSplitOn: _.get(req, 'body.strPatternToSplitOn') || defaultValues.bookSplitterConfig.strPatternToSplitOn,
    splitAtThisIntervalIndex: _.get(req, 'body.splitAtThisIntervalIndex') || defaultValues.bookSplitterConfig.splitAtThisIntervalIndex,
    textToSplit: bookData,
  });
  BookModel.addBookAndGetStarted(bookNameToUse, textBlobs)
  .then((toGetStartedWith) => {
    res.json(toGetStartedWith);
  })
  .catch((e) => {
    res.send('Server error adding booking.');
  });

  // get other meta data



}

module.exports = router;





