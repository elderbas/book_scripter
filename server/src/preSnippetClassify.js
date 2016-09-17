'use strict';
const fs = require('fs')
const lexiconTagTypes = require('../constants/lexiconTagTypes');
let nlp = require('nlp_compromise');
const _ = require('lodash');
const narrationType = (preSnip, customLexicon) => {
  let classifyingPieces = [];
  let nlpTextOutput = nlp.text(preSnip.text, {lexicon: customLexicon});

  if (process.env.NODE_ENV === 'development' && _.get(global, 'log.preSnippetClassify')) {
    let logObj = {
      customLexicon,
      preSnipText: preSnip.text,
      sentences: nlpTextOutput.sentences
    }
    fs.writeFileSync(`${_serverDir_}/log/preSnippetClassify.txt`, '!!!!!!\n\n' + JSON.stringify(logObj, null, 4))
  }

  nlpTextOutput.sentences.forEach((sentence) => {
    sentence.terms.forEach((term) => {

      // since we added custom lexicon types based on this hash, if the current term's tag type matches
      // one of these, then it's one we care about looking for
      let termType = lexiconTagTypes[term.tag];
      // wont execute for all sentences, if the first sentence contains 2 classifying pieces already
      if (termType && classifyingPieces.length <= 1) {
        if (termType === lexiconTagTypes.PERSON_CONFIRMED) {
          preSnip.predictedCharacterNameNormalized = term.normal;
        }
        classifyingPieces.push(termType);
      }
    });
  });

  preSnip.classification = `NAR(${classifyingPieces.join(' ')})`;
  return preSnip;
};

const SPACE = ' ';
const NEWLINE = '\n';
const whitespaceType = (preSnip) => {
  let countObj = _.countBy(preSnip.text.split(''), ch => ch);
  let quantityWhiteSpaces = _.isUndefined(countObj[SPACE]) ? 0 : countObj[SPACE];
  let quantityNewLines = _.isUndefined(countObj[NEWLINE]) ? 0 : countObj[NEWLINE];
  let quantityOthers = Object.keys(countObj).filter(c => c !== SPACE && c !== NEWLINE).length;

  if (quantityWhiteSpaces === 1 && quantityNewLines === 0 && quantityOthers === 0) {
    preSnip.classification = lexiconTagTypes.WS_SINGLE_SPACE;
  }
  else if (quantityWhiteSpaces === 0 && quantityNewLines === 1 && quantityOthers === 0) {
    preSnip.classification = lexiconTagTypes.WS_SINGLE_NEWLINE;
  }
  else if (quantityWhiteSpaces > 1 && quantityNewLines === 0 && quantityOthers === 0) {
    preSnip.classification = lexiconTagTypes.WS_MULTI_SPACE;
  }
  else if (quantityWhiteSpaces === 0 && quantityNewLines > 1 && quantityOthers === 0) {
    preSnip.classification = lexiconTagTypes.WS_MULTI_NEWLINE;
  }
  else if (quantityWhiteSpaces > 0 && quantityNewLines > 0 && quantityOthers === 0) {
    preSnip.classification = lexiconTagTypes.WS_MIXED_WS;
  }
  else if (quantityOthers > 0) {
    preSnip.classification = lexiconTagTypes.WS_NON_WS;
  }
  else {
    throw new Error(`one of the white space classifier conditions didn't hit`);
  }
  return preSnip;
};

/*
 * only playing attention to tag types in
 * lexiconTagTypes hash
 * */
const preSnippetClassify = (preSnip, customLexicon) => {
  customLexicon = customLexicon || nlp.lexicon();
  if (preSnip.type === 'narration') {
    return narrationType(preSnip, customLexicon);
  }
  else if (preSnip.type === 'whitespace') {
    return whitespaceType(preSnip);
  }
  else if (preSnip.type === 'speech') {
    preSnip.classification = lexiconTagTypes.SPEECH;
    return preSnip;
  }
};

module.exports = preSnippetClassify;