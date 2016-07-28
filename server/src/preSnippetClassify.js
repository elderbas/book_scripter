'use strict';
const lexiconTagTypes = require('../constants/lexiconTagTypes');
const nlp = require('nlp_compromise');
const narrationClassify = (preSnippet) => {

};



const preSnippetClassify = (preSnip, customLexicon) => {
  nlp.lexicon(customLexicon);
  let classifyingPieces = [];
  let nlpTextOutput = nlp.text(preSnip.text);
  nlpTextOutput.sentences.forEach((sentence) => {
    sentence.terms.forEach((term) => {
      // console.log('term', term);
      let termType = lexiconTagTypes[term.tag];
      if (termType) {
        classifyingPieces.push(termType);
      }
    });
  });
  return classifyingPieces.join(' ');
};

module.exports = preSnippetClassify;