// _get.js

let _ = require('lodash');
let router = require('express').Router();
let fs = require('fs');
let Books = require(`${_serverDir_}/src/dbModels/Books`);
let validateType = require('../../../utilityFunks').validateType

router.get('/', (req, res) => {
  console.log('TESTED');
  res.json({name: 'hey'})
});

module.exports = router