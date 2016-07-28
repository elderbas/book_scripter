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

let hp = `“I shall see you soon, I expect, Professor McGonagall,” said Dumbledore, nodding to her. Professor McGonagall blew her nose in reply.`;
let preSnippetsBlobOne = createPreSnippetsForBlob(hp);
let lexicon = nlp.lexicon();
lexicon['said'] = 'VerbSynonymToSaid';
// // lexicon['professor mcgonagall'] = 'Person';
// lexicon['said'] = 'VerbSpoken';
// lexicon['professor dumbledore'] = 'Person';
lexicon['dumbledore'] = 'PersonConfirmed';
// // lexicon['pointed out'] = 'VerbSpoken';
// let s = nlp.sentence('Jon Snow said quietly.', {lexicon})
let nlpResult = nlp.text('said Dumbledore, nodding to her. Professor McGonagall blew her nose in reply.');
nlpResult.sentences.forEach((sentence) => {
  console.log(sentence.terms);
});










