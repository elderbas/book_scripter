"use strict";
let express = require('express');
let app = express();
let _ = require('lodash');

let cors = require('cors');
let fileUpload = require('express-fileupload');

const PORT = 3333;


app.use(cors());
app.use(fileUpload());

app.get('/book_data', function (req, res) {

});

// https://www.npmjs.com/package/express-fileupload
app.post('/book_data', function (req, res) {

  // get raw text data from book
  const file = _.get('req.files.file');
  if (!_.get(file)) {
    console.log('NO FILES UPLOADED');
    res.send('NO FILES UPLOADED');
    return;
  }
  let bookSplitter = require('./src/bookSplitter');
  //let objToStore = requ

  // process raw data to split blobs of text for storage

  //file.mv(`./book_files/${req.files.file.name}`, function(err) {
  //  if (err) {
  //    res.status(500).send(err);
  //  }
  //  else {
  //    res.send('File uploaded!');
  //  }
  //});
});



app.listen(PORT, function () {
  console.log(`Examples app listening on ${PORT}`);
});