let router = require('express').Router();
let _ = require('lodash');

router.post('/', uploadBookFile);

function uploadBookFile (req, res) {
  console.log('req.body', req.body);
  console.log('res.files', req.files);
  res.send(201);
}

module.exports = router;