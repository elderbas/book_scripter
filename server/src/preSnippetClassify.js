'use strict';
const lexiconTagTypes = require('../constants/lexiconTagTypes');
const nlp = require('nlp_compromise');
const _ = require('lodash');

const narrationType = (preSnip, nlpInstance) => {
    let classifyingPieces = [];
    let nlpTextOutput = nlpInstance.text(preSnip.text);
    nlpTextOutput.sentences.forEach((sentence) => {
      sentence.terms.forEach((term) => {
        let termType = lexiconTagTypes[term.tag];
        if (termType && classifyingPieces.length <= 1) {
          classifyingPieces.push(termType);
        }
      });
    });
    return classifyingPieces.join(' ');
};

const SPACE = ' ';
const NEWLINE = '\n';
const whitespaceType = (preSnip) => {
  let countObj = _.countBy(preSnip.text.split(''), ch => ch);
  console.log('countObj', countObj);
  let quantityWhiteSpaces = _.isUndefined(countObj[SPACE]) ? 0 : countObj[SPACE];
  let quantityNewLines = _.isUndefined(countObj[NEWLINE]) ? 0 : countObj[NEWLINE];
  let quantityOthers = Object.keys(countObj).filter(c => c !== SPACE && c !== NEWLINE).length;

  if (quantityWhiteSpaces === 1 && quantityNewLines === 0 && quantityOthers === 0) {
    return lexiconTagTypes.WS_SINGLE_SPACE;
  }
  else if (quantityWhiteSpaces === 0 && quantityNewLines === 1 && quantityOthers === 0) {
    return lexiconTagTypes.WS_SINGLE_NEWLINE;
  }
  else if (quantityWhiteSpaces > 1 && quantityNewLines === 0 && quantityOthers === 0) {
    return lexiconTagTypes.WS_MULTI_SPACE;
  }
  else if (quantityWhiteSpaces === 0 && quantityNewLines > 1 && quantityOthers === 0) {
    return lexiconTagTypes.WS_MULTI_NEWLINE;
  }
  else if (quantityWhiteSpaces > 0 && quantityNewLines > 0 && quantityOthers === 0) {
    return lexiconTagTypes.WS_MIXED_WS;
  }
  else if (quantityOthers > 0) {
    return lexiconTagTypes.WS_NON_WS;
  }
  else {
    throw new Error('Non space type chars present');
  }
};

/*
* only playing attention to tag types in
* lexiconTagTypes hash
*
* so far only works on NARRATION PreSnippet type
* */
const preSnippetClassify = (preSnip, customLexicon) => {
  nlp.lexicon(customLexicon || {});
  if (preSnip.type === 'narration') {
    return narrationType(preSnip, nlp);
  }
  else if (preSnip.type === 'whitespace') {
    return whitespaceType(preSnip);
  }
  else if (preSnip.type === 'speech') {
    return function () {};
  }
};

module.exports = preSnippetClassify;