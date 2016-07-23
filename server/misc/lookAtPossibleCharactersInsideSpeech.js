// scratch for just investigating what soort of charact
'use strict';
require('babel-polyfill');
let _ = require('lodash');
const snippetTypeHighlighter = require('../src/snippetTypeHighlighter.js');
const extractRunningCapitalWords = require('../src/extractRunningCapitalWords.js');
const preSnippetsAnalyzer = require('../src/preSnippetsAnalyzer.js');
const jsonfile = require('jsonfile');


let mostCommonWordsNoPunc = jsonfile.readFileSync('../db_helper/most_common_1000_english_no_punctuation.json');
let textBlobArr = jsonfile.readFileSync('../db/Game of Thrones - Book 1.json').book.textBlobs;

let predictedCharacterList = [];
_.forEach(textBlobArr, (textBlob) => {
  let streamArr = snippetTypeHighlighter(textBlob, null, null, true);
  console.log('streamArr', streamArr);
  //console.log('preSnippetsArr', preSnippetsArr);
});














