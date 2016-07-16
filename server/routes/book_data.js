'use strict';
let express = require('express');
let _ = require('lodash');
let lowdb = require('lowdb');
let fse = require('fs-extra');
let router = express.Router();

router.get('/', function (req, res) {

});

/*
 * If a custom book name is sent, use that, otherwise use the full file name
 * */
// https://www.npmjs.com/package/express-fileupload
router.post('/', function (req, res) {
  console.log('inside book data');
  const file = _.get(req, 'files.file.data');
  const fileName = _.get(req, 'files.file.name');
  const customBookName = _.get(req, 'body.customBookName');
  const bookNameToUse = customBookName !== null ? fileName : customBookName;

  if (!file) {
    console.log('bad parameters sent. yes this is intentionally vague.');
    res.send('bad parameters sent. yes this is intentionally vague.');
    return;
  }
  const bookSplitter = require(`${_serverDir_}/src/bookSplitter`);
  const bookStorageFormat = require(`${_serverDir_}/src/bookStorageFormat`);

  // TODO - need to get custom values for booksplitter
  // for now use default
  const bookSplitterConfig = {
    textToSplit: file.toString(),
    strPattern: '\n\n',
    indexIntervalCount: 10000
  };
  let objToStore = bookStorageFormat(bookNameToUse, bookSplitter(bookSplitterConfig));

  let filePath = `${_serverDir_}/db/${bookNameToUse}.json`;
  fse.ensureFile(filePath, function (err) {
    if (err) { return res.send(err); }
    const db = lowdb(filePath);
    db.set('book', objToStore).value();
    return res.send('Book split up and stored.')
  });
});//end router.post('/book_data'


module.exports = router;