'use strict';
const _ = require('lodash');
const extractRunningCapitalWords = require('./extractRunningCapitalWords');

/* input - array of PreSnippet objects
*  returns obj with
*   predicted character names
* */
function preSnippetsAnalyzer (originalPreSnippetArr) {
  let preSnipForAnal = [];
  _.forEach(originalPreSnippetArr, (preSnip, i) => {
    if (preSnip.type !== 'whitespace') {
      preSnip.id = i;
      preSnipForAnal.push(preSnip);
    }
  });
  let predictedCharacterNames = [];
  _.forEach(preSnipForAnal, (preSnip) => {
    predictedCharacterNames.push(extractRunningCapitalWords(preSnip.text));
  });
  return {
    predictedCharacterNames: _(predictedCharacterNames).flatten().uniq().value()
  };
}

module.exports = preSnippetsAnalyzer;