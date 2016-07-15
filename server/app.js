"use strict";
let express = require('express');
let app = express();

let cors = require('cors');
let fileUpload = require('express-fileupload');

const PORT = 3333;


app.use(cors());
app.use(fileUpload());

app.get('/book_data', function (req, res) {

});

// https://www.npmjs.com/package/express-fileupload
app.post('/book_data', function (req, res) {
  if (!req.files || !req.files.file) {
    console.log('NO FILES UPLOADED');
    res.send('Hello World!');
    return;
  }
  req.files.file.mv(`./book_files/${req.files.file.name}`, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }
  });
});



app.listen(PORT, function () {
  console.log(`Examples app listening on ${PORT}`);
});