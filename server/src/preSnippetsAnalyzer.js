'use strict';
const _ = require('lodash');
const extractRunningCapitalWords = require('./extractRunningCapitalWords');


/* description:
  looks over the preSnippet object text and has some logic looking for character names and returns a uniq list of names
  note: if a name is referenced in two different ways, for example 'Jon' and 'Ser Jon', they will be considered different,
        and the user will have to mark one of them as a duplicate of the other later in the UI
   input - array of PreSnippet objects
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