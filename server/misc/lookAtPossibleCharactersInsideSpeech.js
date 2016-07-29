// scratch for just investigating what sort of charact
'use strict';
require('../setGlobalVars.js');
require('babel-polyfill');
const _ = require('lodash');
let nlp = require('nlp_compromise');

// const extractRunningCapitalWords = require('../src/extractRunningCapitalWords.js');
const predictedNamesByParse = require(`${_serverDir_}/src/predictedNamesByParse.js`);
const createPreSnippetsForBlob = require(`${_serverDir_}/src/createPreSnippetsForBlob.js`);
const jsonfile = require('jsonfile');
let blobOne = jsonfile.readFileSync(`${_serverDir_}/db/Game of Thrones - Book 1.json`).book.textBlobs[0];


let nlpResult = nlp.text('Uncle Vernon entered the kitchen as Harry was turning over the bacon');
nlpResult.sentences.forEach((sentence) => {
  console.log(sentence.terms);
});










